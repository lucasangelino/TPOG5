const ConversionVO = require("../../models/vo/ConversionVO");

class ConversionVOBuilder {

  constructor() {
    this.entity = new ConversionVO();
  }

  idConversion(idConversion) {
    this.entity.idConversion = idConversion;
    return this;
  } 

  unidadOrigen(unidadOrigen) {
    this.entity.unidadOrigen = unidadOrigen;
    return this;
  }

  unidadDestino(unidadDestino) {
    this.entity.unidadDestino = unidadDestino;
    return this;
  }

  cantidadOrigen(cantidadOrigen) {
    this.entity.cantidadOrigen = cantidadOrigen;
    return this;
  }

  cantidadConvertida(cantidadConvertida) {
    this.entity.cantidadConvertida = cantidadConvertida;
    return this;
  }

  build() {
    return this.entity;
  }
}

module.exports = ConversionVOBuilder;
