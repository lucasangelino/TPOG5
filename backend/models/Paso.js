class Paso {
	
	constructor() {
		this.idPaso = 0
		this.idReceta = 0
		this.nroPaso = 0
		this.texto = ""
		this.estado = 1
	}

	getIdPaso() {
		return this.idPaso;
	}
	
	getIdReceta() {
		return this.idReceta;
	}

	getNroPaso() {
		return this.nroPaso;
	}

	getTexto() {
		return this.texto;
	}

	getEstado() {
		return this.estado;
	}
}



module.exports = Paso;
