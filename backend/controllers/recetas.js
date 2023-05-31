const { response } = require("express");
const UserRepository = require("../db/repository/UserRepository");
var constants = require("../common/constants");
const RecetaRepository = require("../db/repository/RecetaRepository.js");


// Metodo general que es utilizado en dos endpoints distintos ya que es configurable el metodo de ordenamiento, por cuales campos filtrar
// y el paginado que se desea.
const getRecetas = async (req, res) => {
  try {

    var skip = req.query.page ? req.query.page : 1;
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

const addReceta = async (req, res) => {
  const body = req.body;
  body.user = req.user;

  try {
    let clase = await RecetaRepository.addRecetas(body);
    return res
      .status(200)
      .json({
        status: "ok",
        message: "Receta dada de alta exitosamente",
        data: clase,
      });
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ status: e.name, message: e.message });
  }
};

module.exports = {
  getRecetas,
  addReceta
};
