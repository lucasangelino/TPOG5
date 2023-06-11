const Unidad = require("../../models/Unidad");

class UnidadBuilder {

  constructor() {
    this.entity = new Unidad();
  }

  idUnidad(idUnidad) {
    this.entity.idUnidad = idUnidad;
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

    return new UnidadBuilder()
      .idUnidad(record.idUnidad)
      .descripcion(record.descripcion)
			.build();
  }
}

module.exports = UnidadBuilder;
