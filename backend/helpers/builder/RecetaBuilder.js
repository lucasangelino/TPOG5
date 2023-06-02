const Receta = require("../../models/Receta.js");

class RecetaBuilder {

  constructor() {
    this.entity = new Receta();
  }

  idReceta(idReceta) {
    this.entity.idReceta = idReceta;
    return this;
  } 

  idusuario(idusuario) {
    this.entity.idusuario = idusuario;
    return this;
  } 

  nombre(nombre) {
    this.entity.nombre = nombre;
    return this;
  } 

  descripcion(descripcion) {
    this.entity.descripcion = descripcion;
    return this;
  } 

  foto(foto) {
    this.entity.foto = foto;
    return this;
  } 

  porciones(porciones) {
    this.entity.porciones = porciones;
    return this;
  } 

  cantidadPersonas(cantidadPersonas) {
    this.entity.cantidadPersonas = cantidadPersonas;
    return this;
  } 

  idTipo(idTipo) {
    this.entity.idTipo = idTipo;
    return this;
  } 

  rating(rating) {
    this.entity.rating = rating;
    return this;
  } 

  positiveCount(positiveCount) {
    this.entity.positiveCount = positiveCount;
    return this;
  } 

  negativeCount(negativeCount) {
    this.entity.negativeCount = negativeCount;
    return this;
  } 

  build() {
    return this.entity;
  }

  buildWithRecord(record) {

    return new RecetaBuilder()
      .idReceta(record.idReceta)
      .idusuario(record.idusuario)
      .nombre(record.nombre)
			.descripcion(record.descripcion)
			.foto(record.foto)
      .porciones(record.porciones)
			.cantidadPersonas(record.cantidadPersonas)
			.idTipo(record.idTipo)
      .rating(record.rating)
      .positiveCount(record.positiveCount)
      .negativeCount(record.negativeCount)
			.build();
  }
}

module.exports = RecetaBuilder;
