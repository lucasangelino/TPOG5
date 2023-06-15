const UnidadRepository = require('../db/repository/UnidadRepository.js')
const ConversionRepository = require('../db/repository/ConversionRepository.js');
const ConversionVOBuilder = require('../helpers/builder/ConversionVOBuilder.js');


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

    let unidadOrigen = await UnidadRepository.getUnidadById(idUnidadOrigen);
    let unidadDestino = await UnidadRepository.getUnidadById(idUnidadDestino);

    // La misma unidad
    if (idUnidadOrigen == idUnidadDestino) {
      

      let result = new ConversionVOBuilder()
      .unidadOrigen(unidadOrigen)
      .unidadDestino(unidadDestino)
      .cantidadOrigen(cantidadOrigen)
      .cantidadConvertida(cantidadOrigen)
      .build();

      return res.status(200).json({
        status: "ok",
        data: result,
      });
    }

    let conversion = await ConversionRepository.getConversion(idUnidadOrigen, idUnidadDestino);
    if(conversion) {

      let result = new ConversionVOBuilder()
      .idConversion(conversion.getIdConversion())
      .unidadOrigen(unidadOrigen)
      .unidadDestino(unidadDestino)
      .cantidadOrigen(cantidadOrigen)
      .cantidadConvertida(cantidadOrigen * conversion.getFactorConversiones())
      .build();

      return res.status(200).json({
        status: "ok",
        data: result,
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

    let result = new ConversionVOBuilder()
    .idConversion(conversion.getIdConversion())
    .unidadOrigen(unidadOrigen)
    .unidadDestino(unidadDestino)
    .cantidadOrigen(cantidadOrigen)
    .cantidadConvertida(cantidadOrigen / conversion.getFactorConversiones())
    .build();

    return res.status(200).json({
      status: "ok",
      data: result,
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
