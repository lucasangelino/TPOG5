const { pg_pool } = require('../database')
const RecetaBuilder = require("../../helpers/builder/RecetaBuilder.js");

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
		
		query = query + "WHERE 0 = 0 ";
		
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


		return records.rows;


		if (records.rows.length >= 1) {
			let record = records.rows[0];

			let user = new RecetaBuilder().buildWithRecord(record);
			return user;
		} else {
			return null;
		}
	} catch (error) {
		return null;
	}
};

const addRecetas = async ({}) => {
	try {
/* 
	
		const records = await pg_pool.query(query);
		if (records.rows.length >= 1) {
			let record = records.rows[0];

			let user = new RecetaBuilder().buildWithRecord(record);
			return user;
		} else {
			return null;
		} */

		return null;
	} catch (error) {
		return null;
	}
};


module.exports = {
	getRecetas,
	addRecetas
};