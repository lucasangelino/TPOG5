const { pg_pool } = require('../database')
const RecetaBuilder = require("../../helpers/builder/RecetaBuilder.js");
const UserRepository = require('./UserRepository.js')
const TipoRepository = require('./TipoRepository.js')

/**
* Creates User with the given data
* @returns account created
*/
const getRecetas = async ({receta_id, usuario_id, nombre, tipo_receta, rating_min,
	con_ingredientes, sin_ingredientes, order_by, order_type, skip, limit}) => {
	try {

		// Se filtra por los campos recibidos en el body.
		let query = "SELECT r.* FROM recetas r ";

		// Se lee la lista de ingredientes a incluir o excluir
/* 		let ingredientes = con_ingredientes;
		let excluidos = sin_ingredientes;
		if ((ingredientes && ingredientes.length > 0)
			|| (excluidos && excluidos.length > 0) ) {
		
			query = query + ` JOIN utilizados u ON r.idreceta = u.idreceta `
			
			if(ingredientes && ingredientes.length > 0) {
				query = query + ` AND u.idingrediente IN (${ingredientes}) `
			}
		
			if(excluidos && excluidos.length > 0) {
				query = query + ` AND u.idingrediente NOT IN (${excluidos}) `
			}
		} */
		
		query = query + "WHERE r.estado = 1 ";
		
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

		let ingredientes = con_ingredientes;
		
		if(ingredientes && ingredientes.length > 0) {
			query = query + ` AND EXISTS (SELECT * FROM utilizados u WHERE u.idReceta = r.idReceta AND u.idingrediente IN (${ingredientes})) `
		}

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

		const records = await pg_pool.query(query);

		let result = [];
		for (let index = 0; index < records.rows.length; index++) {
			result.push(new RecetaBuilder().buildWithRecord(records.rows[index]));
		}

		return result;
	} catch (error) {
		return null;
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
	deleteReceta,
};