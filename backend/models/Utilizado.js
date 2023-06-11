class Utilizado {
	
	constructor() {
		this.idUtilizado = 0
		this.idReceta = ""
		this.idIngrediente = ""
		this.cantidad = ""
		this.idUnidad = ""
		this.observaciones = ""
	}


	getIdUtilizado() {
		return this.idUtilizado;
	}

	getIdReceta() {
		return this.idReceta;
	}

	getidIngrediente() {
		return this.idIngrediente;
	}

	getCantidad() {
		return this.cantidad;
	}

	getIdUnidad() {
		return this.idUnidad;
	}

	getObservaciones() {
		return this.observaciones;
	}


}



module.exports = Utilizado;
