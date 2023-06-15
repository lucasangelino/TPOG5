const RecetaCompletaVO = require("../../models/vo/RecetaCompletaVO.js");

class RecetaCompletaBuilder {

  constructor() {
    this.entity = new RecetaCompletaVO();
  }

  receta(receta) {
    this.entity.idReceta = receta.idReceta;
		this.entity.idusuario = receta.idusuario;
		this.entity.nombre = receta.nombre;
		this.entity.descripcion = receta.descripcion;
		this.entity.foto = receta.foto;
		this.entity.porciones = receta.porciones;
		this.entity.cantidadPersonas = receta.cantidadPersonas;
		this.entity.idTipo = receta.idTipo;
		this.entity.rating = receta.rating;
		this.entity.positiveCount = receta.positiveCount;
		this.entity.negativeCount = receta.negativeCount;
		this.entity.estado = receta.estado;
    return this;
  } 

  pasos(pasos) {
    this.entity.pasos = pasos;
    return this;
  } 
  
  build() {
    return this.entity;
  }
}

module.exports = RecetaCompletaBuilder;
