const UnidadRepository = require('../db/repository/UnidadRepository.js')
const ConversionRepository = require('../db/repository/ConversionRepository.js')


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

const convertirUnidad = async (req, res) => {
  try {

    let {idUnidadOrigen, idUnidadDestino, cantidadOrigen} = req.query;

    if (idUnidadOrigen == idUnidadDestino) {
      return res.status(200).json({
        status: "ok",
        data: cantidadOrigen,
      });
    }

    let conversion = await ConversionRepository.getConversion(idUnidadOrigen, idUnidadDestino);
    if(conversion) {

      return res.status(200).json({
        status: "ok",
        data: cantidadOrigen * conversion.getFactorConversiones(),
      });
    }

    // buscamos a la inversa
    conversion = await ConversionRepository.getConversion(idUnidadDestino, idUnidadOrigen);
    if(!conversion) {
      return res.status(404).json({
        status: "error",
        message: "No se pudo realizar la conversion porque no existe la relacion entre las unidades.",
      });
    }

    return res.status(200).json({
      status: "ok",
      data: cantidadOrigen / conversion.getFactorConversiones(),
    });
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
  convertirUnidad,
};
