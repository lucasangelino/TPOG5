const { pg_pool } = require('../database')
const PasoBuilder = require("../../helpers/builder/PasoBuilder.js");

const getPasoById = async ({idPaso}) => {
	try {

		let query = ` SELECT * FROM pasos WHERE idPaso = '${idPaso}' `;
		const records = await pg_pool.query(query);
		if (records.rows.length >= 1) {
			let record = records.rows[0];

			let paso = new PasoBuilder().buildWithRecord(record);
			return paso;
		} else {
			return null;
		}
	} catch (error) {
		return null;
	}
};

const addPaso = async ({idReceta, nroPaso, texto}) => {
	try {

		let query = ` INSERT INTO pasos(idReceta, nroPaso, texto) VALUES('${idReceta}', '${nroPaso}', '${texto}') RETURNING *`;
		const records = await pg_pool.query(query);
		if (records.rows.length >= 1) {
			let record = records.rows[0];

			let tipo = new PasoBuilder().buildWithRecord(record);
			return tipo;
		} else {
			return null;
		}
	} catch (error) {
		return null;
	}
};

const deletePaso = async ({idPaso}) => {
	try {

		let query = ` UPDATE pasos SET estado = 0 WHERE idPaso = '${idPaso}' `;
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
	addPaso,
	getPasoById,
	deletePaso
};