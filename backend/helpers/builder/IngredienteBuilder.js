const Ingrediente = require("../../models/Ingrediente");

class IngredienteBuilder {

  constructor() {
    this.entity = new Ingrediente();
  }

  idIngrediente(idIngrediente) {
    this.entity.idIngrediente = idIngrediente;
    return this;
  } 

  nombre(nombre) {
    this.entity.nombre = nombre;
    return this;
  }


  build() {
    return this.entity;
  }

  buildWithRecord(record) {

    return new IngredienteBuilder()
      .idIngrediente(record.idingrediente)
      .nombre(record.nombre)
			.build();
  }
}

module.exports = IngredienteBuilder;
