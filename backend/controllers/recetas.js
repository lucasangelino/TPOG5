var constants = require("../common/constants");

const UserRepository = require("../db/repository/UserRepository");
const RecetaRepository = require("../db/repository/RecetaRepository.js");
const IngredienteRepository = require("../db/repository/IngredienteRepository.js");
const PasoRepository = require("../db/repository/PasoRepository.js");
const TipoRepository = require("../db/repository/TipoRepository.js");
const MultimediaRepository = require("../db/repository/MultimediaRepository.js");
const UnidadRepository = require("../db/repository/UnidadRepository.js");
const UtilizadoRepository = require("../db/repository/UtilizadoRepository.js");
const CalificacionRepository = require("../db/repository/CalificacionRepository.js");

// Metodo general que es utilizado en dos endpoints distintos ya que es configurable el metodo de ordenamiento, por cuales campos filtrar
// y el paginado que se desea.
const getRecetas = async (req, res) => {
  try {
    var skip = req.query.skip ? req.query.skip : 0;
    var limit = req.query.limit ? req.query.limit : 10;

    const body = req.body;
    
    let total = await RecetaRepository.getRecetas(body);

    body.skip = skip;
    body.limit = limit;

    let recetas = await RecetaRepository.getRecetas(body);

    return res.status(200).json({ status: "ok", count: total.length, data: recetas });
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

// rechaza receta existente, no aparecera en resultados de busqueda
const rechazarReceta = async (req, res) => {
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

    let result = await RecetaRepository.rechazarReceta(body);
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
    if (receta.length < 1) {
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
const getRecetaIngrediente = async (req, res) => {
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

// Usuario actualiza ingrediente utilizado en receta
const updateRecetaIngrediente = async (req, res) => {
  const body = req.body;
  body.idUsuario = req.idUsuario;

   // TODO validar ownership de la receta para el usuario

  try {
    let utilizado = await UtilizadoRepository.getUtilizadoById(body.idUtilizado);
    if (!utilizado) {
      return res.status(404).json({
        status: "error",
        message: "No se encontro el ingrediente utilizado"
      });
    }

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
        message: "No existe la unidad a la que se desea actualizar",
      });
    }

    // actualizo
    let result = await UtilizadoRepository.updateUtilizado(body);
    if (!result) {
      return res.status(500).json({
        status: "error",
        message: "No se pudo actualizar",
      });
    }

    utilizado = await UtilizadoRepository.getUtilizadoById(body.idUtilizado);
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
    let paso = await PasoRepository.getPasoById(body.idPaso);
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
    let recetas = await RecetaRepository.getRecetas({
      receta_id: body.idReceta,
    });
    if (recetas.length < 1) {
      return res.status(401).json({
        status: "error",
        message: "No existe la receta a la cual agregar el paso",
      });
    }

    let paso = await PasoRepository.addPaso(body);
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
  let paso = await PasoRepository.getPasoById(body.idPaso);
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

// agrega calificacion a receta, o actualiza calificacion si ya existe
const addCalificacion = async (req, res) => {
  try {
    const body = req.body;
    body.idUsuario = req.idUsuario;

    // Validar que la receta existe
    var recetas = await RecetaRepository.getRecetas({receta_id: body.idReceta});
    if (recetas.length < 1) {
      return res.status(404).json({
        status: "error",
        message: "la receta no existe",
      });
    }
    let receta = recetas[0];

    let cantNeg = receta.getNegativeCount();
    let cantPos = receta.getPositiveCount();

    // validar que no haya una calificacion ya para el que envia esta nueva calificacion
    let calificacion = await CalificacionRepository.getCalificacionByIdRecetaAndIdUsuario(body.idReceta, body.idUsuario);

    // si ya existe
    if(calificacion) {

      // recalculamos calificacion de la receta en base a la nueva
      if (body.calificacion > 0 ) {
        if(calificacion.calificacion < 0) {
          cantPos = cantPos + 1;
          cantNeg = cantNeg - 1;
        } 
      } else {
        if(calificacion.calificacion > 0) {
          cantPos = cantPos - 1;
          cantNeg = cantNeg + 1;
        } 
      }

      // se actualiza calificacion existente
      // debe ser enviada para evitar que el usuario
      // cambie la calificacion sin que la empresa la pueda volver a aceptar
      calificacion = await CalificacionRepository.updateCalificacion(calificacion.getIdCalificacion(),
        "enviada", body.calificacion, body.comentarios);
    } else {

      // no existe calificacion existente, creamos una
      calificacion = await CalificacionRepository.addCalificacion(body);
      if (!calificacion) {
        return res.status(500).json({
          status: "error",
          message: "Error inesperado al agregar la calificacion"
        });
      }

      if (body.calificacion > 0) {
        cantPos = cantPos + 1;
      } else {
        cantNeg = cantNeg + 1;
      }
    }

    // 0 ~ 5 stars
    let totalCount = cantPos + cantNeg;
    let rating = ((100 * cantPos) / (totalCount))/20;
    
    // actualizamos el calculo de calificacion en receta
    let newReceta = await RecetaRepository.updateReceta({idReceta: body.idReceta, positiveCount: cantPos, negativeCount: cantNeg, rating: rating})
    return res.status(200).json({
      status: "ok",
      data: {
        calificacion: calificacion,
        receta: newReceta,
      },
    });
  } catch (e) {
    return res.status(e.statusCode).json({ status: e.name, msg: e.message });
  }
};


const patchCalificacion = async (req, res) => {
  try {
   return null
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
  rechazarReceta,
  addRecetaIngrediente,
  getRecetaIngrediente,
  updateRecetaIngrediente,
  deleteRecetaIngrediente,
  getRecetaStepById,
  addRecetaStep,
  updateRecetaStep,
  deleteRecetaStep,
  addStepMultimedia,
  getStepMultimediaById,
  deleteStepMultimedia,
  addCalificacion,
  patchCalificacion,
};
