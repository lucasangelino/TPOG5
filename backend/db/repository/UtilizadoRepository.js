const { pg_pool } = require('../database')
const UtilizadoBuilder = require("../../helpers/builder/UtilizadoBuilder.js");


const addUtilizado = async ({idReceta, idIngrediente, cantidad, idUnidad, observaciones}) => {
	try {

		let query = ` INSERT INTO utilizados(idReceta, idIngrediente, cantidad, idUnidad, observaciones)`
		query = query + ` VALUES('${idReceta}','${idIngrediente}','${cantidad}','${idUnidad}','${observaciones}') RETURNING *`;
		const records = await pg_pool.query(query);
		if (records.rows.length >= 1) {
			let record = records.rows[0];

			let utilizado = new UtilizadoBuilder().buildWithRecord(record);
			return utilizado;
		} else {
			return null;
		}
	} catch (error) {
		return null;
	}
};

const getUtilizadoById = async (idUtilizado) => {
	try {

		let query = ` SELECT * FROM utilizados WHERE idUtilizado = '${idUtilizado}' `;
		const records = await pg_pool.query(query);
		if (records.rows.length >= 1) {
			let record = records.rows[0];

			let utilizado = new UtilizadoBuilder().buildWithRecord(record);
			return utilizado;
		} else {
			return null;
		}
	} catch (error) {
		return null;
	}
};


const deleteUtilizado = async (idUtilizado) => {
	try {

		let query = ` DELETE FROM utilizados WHERE idUtilizado = '${idUtilizado}' `;
		const records = await pg_pool.query(query);
		if (records.rowCount >= 1) {
			return true
		} else {
			return false;
		}
	} catch (error) {
		return null;
	}
};


module.exports = {
	addUtilizado,
	getUtilizadoById,
	deleteUtilizado,
};