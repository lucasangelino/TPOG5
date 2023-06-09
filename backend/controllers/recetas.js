const { response } = require("express");
var constants = require("../common/constants");
const UserRepository = require("../db/repository/UserRepository");
const RecetaRepository = require("../db/repository/RecetaRepository.js");
const PasoRepository = require("../db/repository/PasoRepository.js");

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

    let receta = await RecetaRepository.addRecetas(body);
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

module.exports = {
  getRecetas,
  addReceta,
  getRecetaStepById,
  addRecetaStep,
  updateRecetaStep,
  deleteRecetaStep,
};
