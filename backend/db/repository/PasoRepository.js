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

const getPasosByIdReceta = async (idReceta) => {
	try {

		let query = ` SELECT * FROM pasos WHERE idReceta = '${idReceta}' `;
		const records = await pg_pool.query(query);
		
		let result = [];
		for (let index = 0; index < records.rows.length; index++) {
			result.push(new PasoBuilder().buildWithRecord(records.rows[index]));
		}
		return result;

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

const updatePasoById = async ({idPaso, texto}) => {
	try {

		let query = ` UPDATE pasos SET texto = '${texto}' WHERE idPaso = '${idPaso}' `;
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
	getPasosByIdReceta,
	updatePasoById,
	deletePaso
};