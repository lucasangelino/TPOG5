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
}



module.exports = Receta;
