const { pg_pool } = require('../database')
const IngredienteBuilder = require("../../helpers/builder/IngredienteBuilder.js");


const addIngrediente = async (nombre) => {
	try {

		let query = ` INSERT INTO ingredientes(nombre) VALUES('${nombre}') RETURNING *`;
		const records = await pg_pool.query(query);
		if (records.rows.length >= 1) {
			let record = records.rows[0];

			let ingrediente = new IngredienteBuilder().buildWithRecord(record);
			return ingrediente;
		} else {
			return null;
		}
	} catch (error) {
		return null;
	}
};

const getIngredienteById = async ({idIngrediente}) => {
	try {

		let query = ` SELECT * FROM ingredientes WHERE idPaso = '${idIngrediente}' `;
		const records = await pg_pool.query(query);
		if (records.rows.length >= 1) {
			let record = records.rows[0];

			let ingrediente = new IngredienteBuilder().buildWithRecord(record);
			return ingrediente;
		} else {
			return null;
		}
	} catch (error) {
		return null;
	}
};

const getIngredienteByNombre = async (nombreIngrediente) => {
	try {

		let query = ` SELECT * FROM ingredientes WHERE nombre = '${nombreIngrediente}' `;
		const records = await pg_pool.query(query);
		if (records.rows.length >= 1) {
			let record = records.rows[0];

			let ingrediente = new IngredienteBuilder().buildWithRecord(record);
			return ingrediente;
		} else {
			return null;
		}
	} catch (error) {
		return null;
	}
};

module.exports = {
	addIngrediente,
	getIngredienteById,
	getIngredienteByNombre,
};