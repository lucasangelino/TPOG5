const { pg_pool } = require('../database')
const ConversionBuilder = require("../../helpers/builder/ConversionBuilder.js");

const getConversionById = async (idConversion) => {
	try {

		let query = ` SELECT * FROM conversiones WHERE idConversion = '${idConversion}' `;
		const records = await pg_pool.query(query);
		if (records.rows.length >= 1) {
			let record = records.rows[0];

			let ingrediente = new ConversionBuilder().buildWithRecord(record);
			return ingrediente;
		} else {
			return null;
		}
	} catch (error) {
		return null;
	}
};

const getConversion = async (idUnidadOrigen) => {
	try {

		let query = ` SELECT * FROM conversiones WHERE idUnidadOrigen = '${idUnidadOrigen}' `;
		const records = await pg_pool.query(query);
		if (records.rows.length >= 1) {
			let record = records.rows[0];

			let conversion = new ConversionBuilder().buildWithRecord(record);
			return conversion;
		} else {
			return null;
		}
	} catch (error) {
		return null;
	}
};

module.exports = {
	getConversionById,
	getConversion,
};