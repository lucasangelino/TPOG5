const Paso = require("../../models/Paso");

class PasoBuilder {

  constructor() {
    this.entity = new Paso();
  }

  idPaso(idPaso) {
    this.entity.idPaso = idPaso;
    return this;
  } 

  idReceta(idReceta) {
    this.entity.idReceta = idReceta;
    return this;
  } 

  nroPaso(nroPaso) {
    this.entity.nroPaso = nroPaso;
    return this;
  } 

  texto(texto) {
    this.entity.texto = texto;
    return this;
  }

  estado(estado) {
    this.entity.estado = estado;
    return this;
  } 

  build() {
    return this.entity;
  }

  buildWithRecord(record) {

    return new PasoBuilder()
      .idPaso(record.idpaso)
      .idReceta(record.idreceta)
      .nroPaso(record.nropaso)
      .texto(record.texto)
      .estado(record.estado)
			.build();
  }
}

module.exports = PasoBuilder;
