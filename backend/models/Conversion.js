class Conversion {
	
	constructor() {
		this.idConversion = 0
		this.idUnidadOrigen = 0
		this.idUnidadDestino = 0
		this.factorConversiones = 0
	}

	getIdConversion() {
		return this.idConversion;
	}
	

	getIdUnidadOrigen() {
		return this.idUnidadOrigen;
	}

	getIdUnidadDestino() {
		return this.idUnidadDestino;
	}

	getFactorConversiones() {
		return this.factorConversiones;
	}
}



module.exports = Conversion;
