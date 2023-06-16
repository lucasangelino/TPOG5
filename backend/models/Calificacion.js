class Calificacion {
	
	constructor() {
		this.idCalificacion = 0
		this.idusuario = 0
		this.idReceta = 0
		this.calificacion = 0
		this.comentarios = ""
		this.estado = ""
	}

	getIdCalificacion() {
		return this.idCalificacion;
	}
	
	getIdUsuario() {
		return this.idusuario;
	}

	getIdReceta() {
		return this.idReceta;
	}

	getCalificacion() {
		return this.calificacion;
	}

	getComentarios() {
		return this.comentarios;
	}

	getEstado() {
		return this.estado;
	}
}



module.exports = Calificacion;
