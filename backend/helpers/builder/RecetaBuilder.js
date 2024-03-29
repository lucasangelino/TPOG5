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

  estado(estado) {
    this.entity.estado = estado;
    return this;
  }

  build() {
    return this.entity;
  }

  buildWithRecord(record) {

    return new RecetaBuilder()
      .idReceta(record.idreceta)
      .idusuario(record.idusuario)
      .nombre(record.nombre)
			.descripcion(record.descripcion)
			.foto(record.foto)
      .porciones(record.porciones)
			.cantidadPersonas(record.cantidadpersonas)
			.idTipo(record.idtipo)
      .rating(record.rating)
      .positiveCount(record.positivecount)
      .negativeCount(record.negativecount)
      .estado(record.estado)
			.build();
  }
}

module.exports = RecetaBuilder;
