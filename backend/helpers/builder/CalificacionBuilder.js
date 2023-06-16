const Calificacion = require("../../models/Calificacion");

class CalificacionBuilder {

  constructor() {
    this.entity = new Calificacion();
  }

  idCalificacion(idCalificacion) {
    this.entity.idCalificacion = idCalificacion;
    return this;
  } 

  idusuario(idusuario) {
    this.entity.idusuario = idusuario;
    return this;
  }

  idReceta(idReceta) {
    this.entity.idReceta = idReceta;
    return this;
  }

  calificacion(calificacion) {
    this.entity.calificacion = calificacion;
    return this;
  }

  comentarios(comentarios) {
    this.entity.comentarios = comentarios;
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

    return this 
      .idCalificacion(record.idcalificacion)
      .idusuario(record.idusuario)
      .idReceta(record.idreceta)
      .calificacion(record.calificacion)
      .comentarios(record.comentarios)
      .estado(record.estado)
			.build();
  }
}

module.exports = CalificacionBuilder;
