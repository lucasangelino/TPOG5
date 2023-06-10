var constants = require("../common/constants");

const UserRepository = require("../db/repository/UserRepository");
const RecetaRepository = require("../db/repository/RecetaRepository.js");
const IngredienteRepository = require("../db/repository/IngredienteRepository.js");
const PasoRepository = require("../db/repository/PasoRepository.js");
const TipoRepository = require("../db/repository/TipoRepository.js");
const MultimediaRepository = require("../db/repository/MultimediaRepository.js");
const UnidadRepository = require("../db/repository/UnidadRepository.js");
const UtilizadoRepository = require("../db/repository/UtilizadoRepository.js");

// Metodo general que es utilizado en dos endpoints distintos ya que es configurable el metodo de ordenamiento, por cuales campos filtrar
// y el paginado que se desea.
const getRecetas = async (req, res) => {
  try {
    var skip = req.query.skip ? req.query.skip : 0;
    var limit = req.query.limit ? req.query.limit : 10;

    const body = req.body;
    body.skip = skip;
    body.limit = limit;

    let clases = await RecetaRepository.getRecetas(body);
    return res.status(200).json({ status: "ok", data: clases });
  } catch (e) {
    return res.status(400).json({ status: "err", message: e.message });
  }
};

// Usuario agrega receta
const addReceta = async (req, res) => {
  const body = req.body;
  body.idUsuario = req.idUsuario;

  try {
    let user = await UserRepository.getUserByidusuario(body.idUsuario);
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "No existe el usuario para dar de alta la receta",
      });
    }

    let receta = await RecetaRepository.addReceta(body);
    return res.status(200).json({
      status: "ok",
      message: "Receta dada de alta exitosamente",
      data: receta,
    });
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ status: e.name, message: e.message });
  }
};

// Actualiza receta existente
const updateReceta = async (req, res) => {
  const body = req.body;
  body.idUsuario = req.idUsuario;

    // TODO validar ownership de la receta para el usuario

    let tipo = await TipoRepository.getTipoByName(body.tipo);
		// no existe el tipo lo creo
		if (!tipo) {
			tipo = await TipoRepository.addNewTipo(body.tipo);
		}
    body.idTipo = tipo.idTipo;

  try {

    // Validar que la receta existe
    let recetas = await RecetaRepository.getRecetas({receta_id: body.idReceta});
    if (recetas.length < 1) {
      return res.status(404).json({
        status: "error",
        message: "la receta no existe",
      });
    }
    

    let result = await RecetaRepository.updateReceta(body);
    if (!result) {
      return res.status(200).json({
        status: "error",
      });
    }

    return res.status(200).json({
      status: "ok",
      message: "receta actualizada",
      data: result,
    });
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ status: e.name, message: e.message });
  }
};

// Elimina unastente receta exi
const deleteReceta = async (req, res) => {
  const body = req.body;
  body.idUsuario = req.idUsuario;

    // TODO validar ownership de la receta para el usuario

  try {

    // Validar que la receta existe
    let recetas = await RecetaRepository.getRecetas({receta_id: body.idReceta});
    if (recetas.length < 1) {
      return res.status(404).json({
        status: "error",
        message: "la receta no existe",
      });
    }

    let result = await RecetaRepository.deleteReceta(body);
    if (!result) {
      return res.status(200).json({
        status: "error",
      });
    }

    return res.status(200).json({
      status: "ok",
      message: "receta dada de baja, no se mostrara en resultados de busqueda",
    });
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ status: e.name, message: e.message });
  }
};


// Usuario agrega Ingrediente a Receta existente
const addRecetaIngrediente = async (req, res) => {
  const body = req.body;
  body.idUsuario = req.idUsuario;

  if (!body.observaciones) {
    body.observaciones = ''
  }

   // TODO validar ownership de la receta para el usuario

  try {

    // si el ingrediente existe lo obtengo, sino lo creo
    let ingrediente = await IngredienteRepository.getIngredienteByNombre(body.nombreIngrediente);
    if (!ingrediente) {
      ingrediente = await IngredienteRepository.addIngrediente(body.nombreIngrediente);
    }

    body.idIngrediente = ingrediente.getIdIngrediente();

    // obtengo la unidad
    let unidad = await UnidadRepository.getUnidadById(body.idUnidad);
    if (!unidad) {
      return res.status(400).json({
        status: "error",
        message: "No existe la unidad",
      });
    }

    let receta = await RecetaRepository.getRecetas({
      receta_id: body.idReceta,
    });
    if (!receta || receta.length < 1) {
      return res.status(400).json({
        status: "error",
        message: "No existe la receta",
      });
    }

    // TODO convertir utilizado primary key en idReceta+idIngrediente
    let utilizado = await UtilizadoRepository.addUtilizado(body);
    return res.status(200).json({
      status: "ok",
      data: utilizado,
    });
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ status: e.name, message: e.message });
  }
};

// Usuario elimina ingrediente utilizado en receta
const deleteRecetaIngrediente = async (req, res) => {
  const body = req.body;
  body.idUsuario = req.idUsuario;

    // TODO validar ownership de la receta para el usuario

  try {

    let utilizado = await UtilizadoRepository.getUtilizadoById(body.idUtilizado);
    if (!utilizado) {
      return res.status(404).json({
        status: "error",
        message: "no se encontro ingrediente utilizado",
      });
    }


    let result = await UtilizadoRepository.deleteUtilizado(body.idUtilizado);
    if (!result) {
      return res.status(500).json({
        status: "error",
        message: "no se pudo eliminar el ingrediente utilizado"
      });
    }
    return res.status(200).json({
      status: "ok",
      message: "ingrediente utilizado eliminado exitosamente"
    });
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ status: e.name, message: e.message });
  }
};




// Obtiene Paso Existente
const getRecetaStepById = async (req, res) => {
  const body = req.body;
  body.idUsuario = req.idUsuario;

  try {
    let paso = await PasoRepository.getPasoById({idPaso: body.idPaso});
    if (!paso) {
      return res.status(400).json({
        status: "error",
        message: "No existe el paso",
      });
    }

    return res.status(200).json({
      status: "ok",
      data: paso,
    });
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ status: e.name, message: e.message });
  }
};

// Usuario agrega Paso a Receta existente
const addRecetaStep = async (req, res) => {
  const body = req.body;
  body.idUsuario = req.idUsuario;

   // TODO validar ownership de la receta para el usuario

  try {
    let receta = await RecetaRepository.getRecetas({
      receta_id: body.idReceta,
    });
    if (!receta) {
      return res.status(401).json({
        status: "error",
        message: "No existe la receta a la cual agregar el paso",
      });
    }

    let paso = await PasoRepository.addPaso(body);
    return res.status(401).json({
      status: "ok",
      data: paso,
    });
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ status: e.name, message: e.message });
  }
};

// Usuario agrega Paso a Receta existente
const updateRecetaStep = async (req, res) => {
  const body = req.body;
  body.idUsuario = req.idUsuario;

   // TODO validar ownership de la receta para el usuario

  try {
    let paso = await PasoRepository.updatePasoById(body);
    if (!paso) {
      return res.status(404).json({
        status: "error",
        message: "No se encontro el paso"
      });
    }

    return res.status(200).json({
      status: "ok",
    });
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ status: e.name, message: e.message });
  }
};

// Usuario agrega Paso a Receta existente
const deleteRecetaStep = async (req, res) => {
  const body = req.body;
  body.idUsuario = req.idUsuario;

    // TODO validar ownership de la receta para el usuario

  try {
    let result = await PasoRepository.deletePaso(body);
    if (!result) {
      return res.status(200).json({
        status: "error",
      });
    }

    return res.status(200).json({
      status: "ok",
    });
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ status: e.name, message: e.message });
  }
};

// Usuario agrega Paso a Receta existente
const addStepMultimedia = async (req, res) => {
  const body = req.body;
  body.idUsuario = req.idUsuario;

  // TODO validar ownership de la receta para el usuario


  // el tipo de contenido debe ser foto, audio o video
  if (!constants.ContenidoEnum.includes(body.tipoContenido)) {
    return res
        .status(400)
        .json({ status: "error", message: `'${body.tipoContenido} no es un tipo de contenido valido'` });
  }
  
  // validar que el paso existe
  let paso = await PasoRepository.getPasoById({idPaso: body.idPaso});
  if (!paso) {
    return res.status(404).json({
      status: "error",
      message: "no se encontro el paso",
    });
  }


  try {
    let multimedia = await MultimediaRepository.addMultimedia(body);
    if(!multimedia) {
      return res.status(500).json({
        status: "error",
        message: "no se pudo agregar el contenido",
      });
    }

    return res.status(200).json({
      status: "ok",
      data: multimedia,
    });
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ status: e.name, message: e.message });
  }
};

// Obtiene contenido Existente por id
const getStepMultimediaById = async (req, res) => {
  const body = req.body;
  body.idUsuario = req.idUsuario;

  try {
    let contenido = await MultimediaRepository.getMultimediaById({idContenido: body.idContenido});
    if (!contenido) {
      return res.status(400).json({
        status: "error",
        message: "No existe el contenido",
      });
    }

    return res.status(200).json({
      status: "ok",
      data: contenido,
    });
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ status: e.name, message: e.message });
  }
};

// Usuario agrega Paso a Receta existente
const deleteStepMultimedia = async (req, res) => {
  const body = req.body;
  body.idUsuario = req.idUsuario;

    // TODO validar ownership de la receta para el usuario

  try {
    let result = await MultimediaRepository.deleteMultimedia(body);
    if (!result) {
      return res.status(200).json({
        status: "error",
      });
    }

    return res.status(200).json({
      status: "ok",
    });
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ status: e.name, message: e.message });
  }
};

module.exports = {
  getRecetas,
  addReceta,
  updateReceta,
  deleteReceta,
  addRecetaIngrediente,
  deleteRecetaIngrediente,
  getRecetaStepById,
  addRecetaStep,
  updateRecetaStep,
  deleteRecetaStep,
  addStepMultimedia,
  getStepMultimediaById,
  deleteStepMultimedia
};
