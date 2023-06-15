class PasoCompletoVO {
	
	constructor() {
		this.idPaso = 0
		this.idReceta = 0
		this.nroPaso = 0
		this.texto = ""
		this.estado = 1
		this.multimedia = [];
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

	getMultimedia() {
		return this.multimedia;
	}
}



module.exports = PasoCompletoVO;
