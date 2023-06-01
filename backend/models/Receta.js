class Receta {
	
	constructor() {
		this.idReceta = 0
		this.idusuario = 0
		this.nombre = ""
		this.descripcion = ""
		this.foto = ""
		this.porciones = 0
		this.cantidadPersonas = 0
		this.idTipo = 0
		this.rating = 0
		this.positiveCount = 0
		this.negativeCount = 0
	}

	getIdReceta() {
		return this.idReceta;
	}
	
	getidusuario() {
		return this.idusuario;
	}

	getNombre() {
		return this.nombre;
	}

	getDescripcion() {
		return this.descripcion;
	}

	getFoto() {
		return this.foto;
	}

	getPorciones() {
		return this.porciones;
	}

	getCantidadPersonas() {
		return this.cantidadPersonas;
	}

    getIdTipo() {
        return this.idTipo
    }

	getRating() {
        return this.rating
    }

	getPositiveCount() {
        return this.positiveCount
    }

	getNegativeCount() {
        return this.negativeCount
    }
}



module.exports = Receta;
