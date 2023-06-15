class ConversionVO {
	
	constructor() {
		this.idConversion = 0
		this.unidadOrigen = null;
		this.unidadDestino = null;
		this.cantidadOrigen = 0;
		this.cantidadConvertida = 0;
	}

	getIdConversion() {
		return this.idConversion;
	}

	getUnidadOrigen() {
		return this.unidadOrigen;
	}

	getUnidadDestino() {
		return this.unidadDestino;
	}

	getCantidadOrigen() {
		return this.cantidadOrigen;
	}

	getCantidadconvertida() {
		return this.cantidadConvertida;
	}
}



module.exports = ConversionVO;
