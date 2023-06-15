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

module.exports = {
  getUnidades,
};
