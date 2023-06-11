const { pg_pool } = require('../database')
const TipoBuilder = require("../../helpers/builder/TipoBuilder.js");

const addNewTipo = async (tipo) => {
	try {

		let query = ` INSERT INTO tipos(descripcion) VALUES('${tipo}') RETURNING idTipo, descripcion`;
		const records = await pg_pool.query(query);
		if (records.rows.length >= 1) {
			let record = records.rows[0];

			let tipo = new TipoBuilder().buildWithRecord(record);
			return tipo;
		} else {
			return null;
		}
	} catch (error) {
		return null;
	}
};

const getTipoByName = async (nombre) => {
	try {

		let query = ` SELECT * FROM tipos WHERE descripcion = '${nombre}' `
		const records = await pg_pool.query(query);

		if (records.rowCount > 0 ){
			return new TipoBuilder().buildWithRecord(records.rows[0]);
		}

		return null;
	} catch (error) {
		return null;
	}
};

const getTipoById = async ({id}) => {
	try {

		let query = ` SELECT * FROM tipos WHERE idTipo = '${id}' `
		const records = await pg_pool.query(query);
		if (records.rowCount > 0 ){
			return new TipoBuilder().buildWithRecord(records.rows[0]);
		}
	} catch (error) {
		return null;
	}
};

const getTipos = async ({}) => {
	try {

		let query = ` SELECT * FROM tipos `
		const records = await pg_pool.query(query);

		let result = [];
		for (let index = 0; index < records.rows.length; index++) {
			result = result.push(new TipoBuilder().buildWithRecord(records.rows[index]));
		}

		return result;
	} catch (error) {
		return null;
	}
};


module.exports = {
	addNewTipo,
	getTipoByName,
	getTipoById,
	getTipos
};