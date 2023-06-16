const { pg_pool } = require('../database')
const CalificacionBuilder = require("../../helpers/builder/CalificacionBuilder.js");

const addCalificacion = async ({idUsuario, idReceta, calificacion, comentarios}) => {
	try {

		let query = ` INSERT INTO calificaciones(idusuario, idReceta, calificacion, comentarios) `;
		query = query + `VALUES('${idUsuario}','${idReceta}','${calificacion}','${comentarios}')  `;
		const records = await pg_pool.query(query);
		if (records.rowCount > 0) {
			return getCalificacionByIdRecetaAndIdUsuario(idReceta, idUsuario);
		} else {
			return null;
		}
	} catch (error) {
		return null;
	}
};

const getCalificacionById = async (idCalificacion) => {
	try {

		let query = ` SELECT * FROM calificaciones WHERE idCalificacion = '${idCalificacion}' `;
		const records = await pg_pool.query(query);
		if (records.rows.length >= 1) {
			let record = records.rows[0];

			let calificacion = new CalificacionBuilder().buildWithRecord(record);
			return calificacion;
		} else {
			return null;
		}
	} catch (error) {
		return null;
	}
};

const getCalificacionByIdRecetaAndIdUsuario = async (idReceta, idUsuario) => {
	try {

		let query = ` SELECT * FROM calificaciones WHERE idReceta = '${idReceta}' AND idusuario = '${idUsuario}' `;
		const records = await pg_pool.query(query);

		if (records.rows.length >= 1) {
			let calificacion = new CalificacionBuilder().buildWithRecord(records.rows[0]);
			return calificacion;
		} else {
			return null;
		}
	} catch (error) {
		return null;
	}
};

const updateCalificacion = async (idCalificacion, estado, calificacion, comentarios) => {
	try {

		let query = ` UPDATE calificaciones SET estado = '${estado}', calificacion = '${calificacion}', comentarios = '${comentarios}' `;
		query = query + `WHERE idCalificacion = '${idCalificacion}' `;
		const records = await pg_pool.query(query);

		if (records.rowCount > 0) {
			return getCalificacionById(idCalificacion);
		} else {
			return null;
		}
	} catch (error) {
		return null;
	}
};

module.exports = {
	addCalificacion,
	getCalificacionById,
	getCalificacionByIdRecetaAndIdUsuario,
	updateCalificacion,
};