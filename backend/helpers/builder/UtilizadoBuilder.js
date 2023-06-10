const Utilizado = require("../../models/Utilizado");

class UtilizadoBuilder {

  constructor() {
    this.entity = new Utilizado();
  }

  idUtilizado(idUtilizado) {
    this.entity.idUtilizado = idUtilizado;
    return this;
  } 

  idReceta(idReceta) {
    this.entity.idReceta = idReceta;
    return this;
  }

  idIngrediente(idIngrediente) {
    this.entity.idIngrediente = idIngrediente;
    return this;
  }

  cantidad(cantidad) {
    this.entity.cantidad = cantidad;
    return this;
  }

  idUnidad(idUnidad) {
    this.entity.idUnidad = idUnidad;
    return this;
  }

  observaciones(observaciones) {
    this.entity.observaciones = observaciones;
    return this;
  }


  build() {
    return this.entity;
  }

  buildWithRecord(record) {

    return new UtilizadoBuilder()
      .idUtilizado(record.idutilizado)
      .idReceta(record.idreceta)
      .idIngrediente(record.idingrediente)
      .cantidad(record.cantidad)
      .idUnidad(record.idunidad)
      .observaciones(record.observaciones)
			.build();
  }
}

module.exports = UtilizadoBuilder;
