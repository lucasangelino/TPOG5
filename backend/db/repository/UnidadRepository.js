const { pg_pool } = require('../database')
const UnidadBuilder = require("../../helpers/builder/UnidadBuilder.js");

const getUnidades = async () => {
	try {

		let query = ` SELECT * FROM unidades `;
		const records = await pg_pool.query(query);

		let unidades = [];
		for(const record of records.rows) {
			unidades.push(new UnidadBuilder().buildWithRecord(record));
		}

		return unidades;
	} catch (error) {
		return [];
	}
};

const getUnidadById = async (idUnidad) => {
	try {

		let query = ` SELECT * FROM unidades WHERE idUnidad = '${idUnidad}' `;
		const records = await pg_pool.query(query);
		if (records.rows.length >= 1) {
			let record = records.rows[0];

			let ingrediente = new UnidadBuilder().buildWithRecord(record);
			return ingrediente;
		} else {
			return null;
		}
	} catch (error) {
		return null;
	}
};

const getUnidadByDescripcion = async ({descripcion}) => {
	try {

		let query = ` SELECT * FROM unidades WHERE descripcion = '${descripcion}' `;
		const records = await pg_pool.query(query);
		if (records.rows.length >= 1) {
			let record = records.rows[0];

			let ingrediente = new UnidadBuilder().buildWithRecord(record);
			return ingrediente;
		} else {
			return [];
		}
	} catch (error) {
		return [];
	}
};

module.exports = {
	getUnidades,
	getUnidadById,
	getUnidadByDescripcion,
};