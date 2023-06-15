const { pg_pool } = require('../database')
const RecetaBuilder = require("../../helpers/builder/RecetaBuilder.js");
const RecetaCompletaBuilder = require("../../helpers/builder/RecetaCompletaBuilder.js");
const TipoRepository = require('./TipoRepository.js')
const PasoRepository = require('./PasoRepository')
const MultimediaRepository = require('./MultimediaRepository');
const PasoCompletoBuilder = require('../../helpers/builder/PasoCompletoBuilder.js');

/**
* Creates User with the given data
* @returns account created
*/
const getRecetas = async ({receta_id, usuario_id, nombre, tipo_receta, rating_min,
	con_ingredientes, sin_ingredientes, order_by, order_type, skip, limit}) => {
	try {

		// Se filtra por los campos recibidos en el body.
		let query = "SELECT r.* FROM recetas r WHERE r.estado = 1 ";		
		
		if (receta_id) {
			query = query + ` AND r.idReceta = '${receta_id}' `
		}
		
		if (usuario_id) {
			query = query + ` AND r.idusuario = '${usuario_id}' `
		}
		
		if (nombre) {
			query = query + ` AND (r.nombre LIKE '%${nombre}%' `
			query = query + ` OR r.descripcion LIKE '%${nombre}%' ) `
		}
		
		if (tipo_receta) {
			query = query + ` AND r.idTipo = '${tipo_receta}' `
		}
		
		if (rating_min) {
			query = query + ` AND r.rating > '${rating_min}' `
		}

		// con_ingredientes contiene la lista de ingredientes que la receta debe tener
		let ingredientes = con_ingredientes;
		if(ingredientes && ingredientes.length > 0) {
			query = query + ` AND EXISTS (SELECT * FROM utilizados u WHERE u.idReceta = r.idReceta AND u.idingrediente IN (${ingredientes})) `
		}

		// sin_ingredientes contiene los ingredientes que deben ser excluidos
		let excluidos = sin_ingredientes;
		if(excluidos && excluidos.length > 0) {
			query = query + ` AND NOT EXISTS (SELECT * FROM utilizados u WHERE u.idReceta = r.idReceta AND u.idingrediente IN (${excluidos})) `
		}

		// TODO validate field exists
		if(order_by && order_type) {
			if (order_by == 'rating') {
				query = query + ` ORDER BY rating, positiveCount+negativeCount ${order_type} `
			} else {
				query = query + ` ORDER BY ${order_by} ${order_type} `
			}
		}

		if (skip) {
			query = query + ` OFFSET ${skip} `
		}

		if (limit) {
			query = query + ` LIMIT ${limit} `
		}

		// ejecuta query
		const records = await pg_pool.query(query);

		// obtenemos los resultados y creamos los value object de respuesta
		let result = [];
		for (const record of records.rows) {

			let receta = new RecetaBuilder().buildWithRecord(record);

			// obtenemos los pasos asociados a la receta
			let pasos = await PasoRepository.getPasosByIdReceta(receta.idReceta);

			// construimos VO de receta completa
			let recetaCompleta = new RecetaCompletaBuilder()
			.receta(receta)
			.pasos(pasos)
			.build();

			result.push(recetaCompleta);
		}

		return result;
	} catch (error) {
		return [];
	}
};

// Agrega receta
const addReceta = async ({idUsuario, nombre,descripcion,tipo,foto,porciones,cantidadPersonas}) => {
	try {


		let type = await TipoRepository.getTipoByName(tipo);

		// no existe el tipo lo creo
		if (!type) {
			type = await TipoRepository.addNewTipo(tipo);
		}

		let query = ` INSERT INTO recetas (idUsuario, nombre, descripcion, foto, porciones, cantidadPersonas, idTipo) `
		query = query  + ` VALUES('${idUsuario}', '${nombre}', '${descripcion}', '${foto}', '${porciones}', '${cantidadPersonas}', '${type.idTipo}') RETURNING *`;
		const records = await pg_pool.query(query);
		if (records.rows.length >= 1) {
			let record = records.rows[0];

			let receta = new RecetaBuilder().buildWithRecord(record);
			return receta;
		} else {
			return null;
		}
	} catch (error) {
		return null;
	}
};

// actualiza receta existente
const updateReceta = async (body) => {
	try {

		var clone = JSON.parse(JSON.stringify(body));
		delete clone.idReceta;
		delete clone.idUsuario;
		delete clone.tipo;

		let query = ` UPDATE recetas SET `

		// generar parte del SET dinamicamente
		let i = 1;
		for (let key in clone) {
			query = query + `${key} = '${body[key]}'`
			if (i != Object.keys(clone).length) {
				query = query + ", "
			}
			i++;
		}

		query = query + ` WHERE idReceta = '${body.idReceta}' RETURNING * `;
		
		const records = await pg_pool.query(query);
		if (records.rows.length >= 1) {
			let record = records.rows[0];

			let receta = new RecetaBuilder().buildWithRecord(record);
			return receta;
		} else {
			return null;
		}
	} catch (error) {
		return null;
	}
};

// Elimina receta existente
const deleteReceta = async ({idReceta}) => {
	try {

		let query = ` UPDATE recetas SET estado = 0 WHERE idReceta = '${idReceta}' `;
		const records = await pg_pool.query(query);
		if (records.rowCount >= 1) {
			return true
		} else {
			return false;
		}
	} catch (error) {
		return false;
	}
};


module.exports = {
	getRecetas,
	addReceta,
	updateReceta,
	deleteReceta,
};