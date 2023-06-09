const Tipo = require("../../models/Tipo");

class TipoBuilder {

  constructor() {
    this.entity = new Tipo();
  }

  idTipo(idTipo) {
    this.entity.idTipo = idTipo;
    return this;
  } 

  descripcion(descripcion) {
    this.entity.descripcion = descripcion;
    return this;
  } 

  build() {
    return this.entity;
  }

  buildWithRecord(record) {

    return new TipoBuilder()
      .idTipo(record.idtipo)
      .descripcion(record.descripcion)
			.build();
  }
}

module.exports = TipoBuilder;
