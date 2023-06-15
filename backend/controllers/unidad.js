const UnidadRepository = require('../db/repository/UnidadRepository.js')

const getUnidades = async (req, res) => {
  try {
    
    let unidades = await UnidadRepository.getUnidades();
    return res.status(200).json({ status: "ok", data: unidades });
  
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Unexpected error",
      stack: error.stack,
    });
  }
};


const getUnidadById = async (req, res) => {
  try {

    let id = req.params.id;
    
    let unidad = await UnidadRepository.getUnidadById(id);
    return res.status(200).json({ status: "ok", data: unidad });
  
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Unexpected error",
      stack: error.stack,
    });
  }
};

const getUnidadesConvertibles = async (req, res) => {
  try {

    let id = req.params.id;
    
    let unidades = await UnidadRepository.getUnidadesConvertibles(id);
    return res.status(200).json({ status: "ok", data: unidades });
  
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Unexpected error",
      stack: error.stack,
    });
  }
};

const conversion = async (req, res) => {
  try {

    return null;
  
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Unexpected error",
      stack: error.stack,
    });
  }
};

module.exports = {
  getUnidades,
  getUnidadById,
  getUnidadesConvertibles,
  conversion,
};
