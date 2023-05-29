create user root with encrypted password '1234';
grant all privileges on database recetas to recetas;
grant all privileges on database recetas to root;

\connect recetas

CREATE TABLE usuarios(
	idusuario int GENERATED ALWAYS AS IDENTITY CONSTRAINT pk_usuarios PRIMARY KEY,
	mail VARCHAR(150) UNIQUE,
	nickname VARCHAR(100)  NOT NULL,
	habilitado VARCHAR(2) CONSTRAINT chk_habilitado CHECK (habilitado in ('Si','No')) default 'No',
	nombre VARCHAR(150),
	password VARCHAR(500),
	avatar VARCHAR(300),
	tipo_usuario VARCHAR(10) CONSTRAINT chk_tipo_usuario CHECK (tipo_usuario in ('Alumno','Visitante'))
);

CREATE TABLE tipos(
	idTipo int NOT NULL GENERATED ALWAYS AS IDENTITY CONSTRAINT pk_tipos PRIMARY KEY,
	descripcion VARCHAR(250)
);

CREATE TABLE recetas(
	idReceta int NOT NULL GENERATED ALWAYS AS IDENTITY CONSTRAINT pk_recetas PRIMARY KEY,
	idusuario int,
	nombre VARCHAR(500),
	descripcion VARCHAR(1000),
	foto VARCHAR(300),
	porciones int,
	cantidadPersonas int,
	idTipo int,
	CONSTRAINT fk_recetas_usuarios foreign key (idusuario) references usuarios,
	CONSTRAINT fk_recetas_tipos foreign key (idTipo) references tipos
);

CREATE TABLE ingredientes(
	idIngrediente int NOT NULL GENERATED ALWAYS AS IDENTITY CONSTRAINT pk_ingredientes PRIMARY KEY,
	nombre VARCHAR(200)
);

CREATE TABLE unidades(
	idUnidad int NOT NULL GENERATED ALWAYS AS IDENTITY CONSTRAINT pk_unidades PRIMARY KEY,
	descripcion VARCHAR(50) NOT NULL
);

CREATE TABLE utilizados (
	idUtilizado int NOT NULL GENERATED ALWAYS AS IDENTITY CONSTRAINT pk_utilizados PRIMARY KEY,
	idReceta int,
	idIngrediente int,
	cantidad int,
	idUnidad int,
	observaciones VARCHAR(500),
	CONSTRAINT fk_utilizados_recetas foreign key (idReceta) references recetas,
	CONSTRAINT fk_utilizados_ingredientes foreign key (idIngrediente) references ingredientes,
	CONSTRAINT fk_utilizados_unidades foreign key (idUnidad) references unidades
);

CREATE TABLE calificaciones(
	idCalificacion int NOT NULL GENERATED ALWAYS AS IDENTITY CONSTRAINT pk_calificaciones PRIMARY KEY,
	idusuario int,
	idReceta int,
	calificacion int,
	comentarios VARCHAR(500),
	CONSTRAINT fk_calificaciones_usuarios foreign key (idusuario) references usuarios,
	CONSTRAINT fk_calificaciones_recetas foreign key (idReceta) references recetas
);

CREATE TABLE conversiones(
	idConversion int NOT NULL GENERATED ALWAYS AS IDENTITY CONSTRAINT pk_conversiones PRIMARY KEY,
	idUnidadOrigen int NOT NULL,
	idUnidadDestino int NOT NULL,
	factorConversiones float,
	CONSTRAINT fk_unidad_origen foreign key (idUnidadOrigen) references unidades (idUnidad),
	CONSTRAINT fk_unidad_destino foreign key (idUnidadDestino) references unidades (idUnidad)
);

CREATE TABLE pasos(
	idPaso int NOT NULL GENERATED ALWAYS AS IDENTITY CONSTRAINT pk_pasos PRIMARY KEY,
	idReceta int,
	nroPaso int,
	texto VARCHAR(2000),
	CONSTRAINT fk_pasos_recetas foreign key (idReceta) references recetas
);

CREATE TABLE fotos(
	idfoto int NOT NULL GENERATED ALWAYS AS IDENTITY CONSTRAINT pk_fotos PRIMARY KEY,
	idReceta int NOT NULL,
	urlFoto VARCHAR(300),
	extension VARCHAR(5),
	CONSTRAINT fk_fotos_recetas foreign key (idReceta) references recetas
);

CREATE TABLE multimedia(
	idContenido int NOT NULL GENERATED ALWAYS AS IDENTITY CONSTRAINT pk_multimedia PRIMARY KEY,
	idPaso int NOT NULL,
	tipo_contenido VARCHAR(10) CONSTRAINT chk_tipo_contenido CHECK (tipo_contenido in ('foto','video','audio')),
	extension VARCHAR(5),
	urlContenido VARCHAR(300),
	CONSTRAINT fk_multimedia_pasos foreign key (idPaso) references pasos
);