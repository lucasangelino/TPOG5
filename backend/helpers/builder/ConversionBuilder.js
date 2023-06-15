const Conversion = require("../../models/Conversion");

class ConversionBuilder {

  constructor() {
    this.entity = new Conversion();
  }

  idConversion(idConversion) {
    this.entity.idConversion = idConversion;
    return this;
  } 

  idUnidadOrigen(idUnidadOrigen) {
    this.entity.idUnidadOrigen = idUnidadOrigen;
    return this;
  }

  idUnidadDestino(idUnidadDestino) {
    this.entity.idUnidadDestino = idUnidadDestino;
    return this;
  }

  factorConversiones(factorConversiones) {
    this.entity.factorConversiones = factorConversiones;
    return this;
  }


  build() {
    return this.entity;
  }

  buildWithRecord(record) {

    return this 
      .idConversion(record.idconversion)
      .idUnidadOrigen(record.idunidadorigen)
      .idUnidadDestino(record.idunidaddestino)
      .factorConversiones(record.factorconversiones)
			.build();
  }
}

module.exports = ConversionBuilder;
