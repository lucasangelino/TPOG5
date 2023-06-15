const { pg_pool } = require('../database')
const MultimediaRepository = require("./MultimediaRepository.js");
const PasoBuilder = require("../../helpers/builder/PasoBuilder.js");
const PasoCompletoVOBuilder = require("../../helpers/builder/PasoCompletoVOBuilder.js");

const getPasoById = async (idPaso) => {
	try {

		let query = ` SELECT * FROM pasos WHERE idPaso = '${idPaso}' `;
		const records = await pg_pool.query(query);
		if (records.rows.length >= 1) {
			let record = records.rows[0];

			let paso = new PasoBuilder().buildWithRecord(record);

			// obtenemos la multimedia asociada al paso
			let multimedia = await MultimediaRepository.getMultimediaByIdPaso(paso.getIdPaso());

			// construimos el VO completo con los datos
			let pasoCompleto = new PasoCompletoVOBuilder()
			.paso(paso)
			.multimedia(multimedia)
			.build();

			return pasoCompleto;
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
		for (const record of records.rows) {

			let paso = new PasoBuilder().buildWithRecord(record);

			// obtenemos la multimedia asociada al paso
			let multimedia = await MultimediaRepository.getMultimediaByIdPaso(paso.getIdPaso());

			// construimos el VO completo con los datos
			let pasoCompleto = new PasoCompletoVOBuilder()
			.paso(paso)
			.multimedia(multimedia)
			.build();

			result.push(pasoCompleto);
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