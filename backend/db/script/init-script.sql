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
	tipo_usuario VARCHAR(10) CONSTRAINT chk_tipo_usuario CHECK (tipo_usuario in ('Alumno','Visitante')),
	otp VARCHAR(100)
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
	rating int default 0,
	positiveCount int default 0,
	negativeCount int default 0,
	estado int default 1,
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
	estado int default 1,
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
	tipoContenido VARCHAR(10) CONSTRAINT chk_tipo_contenido CHECK (tipoContenido in ('foto','video','audio')),
	extension VARCHAR(5),
	urlContenido VARCHAR(300),
	estado int default 1,
	CONSTRAINT fk_multimedia_pasos foreign key (idPaso) references pasos
);

INSERT INTO tipos(idTipo, descripcion) 
OVERRIDING SYSTEM VALUE
VALUES(1, 'Pastas');

INSERT INTO usuarios(idusuario, mail, nickname, habilitado, nombre, password, avatar, tipo_usuario) 
OVERRIDING SYSTEM VALUE
VALUES(1, 'alumno@uade.edu.ar', 'alumno', 'Si', 'AlumnoUade', '$2b$06$Nqq5r0jxYW8YO6K7d83ug.9fvDcLF3Ul3uzrXhC/ty9K5UZKW2F1a', ' ', 'Alumno');


-- Ingredientes
INSERT INTO ingredientes(idIngrediente, nombre) 
OVERRIDING SYSTEM VALUE
VALUES(1, 'Spaghetti');

INSERT INTO ingredientes(idIngrediente, nombre) 
OVERRIDING SYSTEM VALUE
VALUES(2, 'Tomate');

INSERT INTO ingredientes(idIngrediente, nombre) 
OVERRIDING SYSTEM VALUE
VALUES(3, 'Agua Hirviendo');

INSERT INTO ingredientes(idIngrediente, nombre) 
OVERRIDING SYSTEM VALUE
VALUES(4, 'Queso en Hebras');

INSERT INTO ingredientes(idIngrediente, nombre) 
OVERRIDING SYSTEM VALUE
VALUES(5, 'Pesto');

INSERT INTO ingredientes(idIngrediente, nombre) 
OVERRIDING SYSTEM VALUE
VALUES(6, 'Manteca');


-- Unidades
INSERT INTO unidades(idUnidad, descripcion) 
OVERRIDING SYSTEM VALUE
VALUES(1, 'gramo');

INSERT INTO unidades(idUnidad, descripcion) 
OVERRIDING SYSTEM VALUE
VALUES(2, 'unidad');

INSERT INTO unidades(idUnidad, descripcion) 
OVERRIDING SYSTEM VALUE
VALUES(3, 'cm3');


-- Spaghettis con Pesto
INSERT INTO recetas(idusuario, nombre, descripcion,foto,porciones,cantidadPersonas,idTipo, rating, positiveCount, negativeCount) 
VALUES(1, 'Spaghetti con pesto', 'Spaghettis con pesto', '', 1, 1, 1, 5, 499, 0);

INSERT INTO utilizados(idUtilizado, idReceta, idIngrediente, cantidad, idUnidad, observaciones) 
OVERRIDING SYSTEM VALUE
VALUES(1, 1, 1, 100, 1, '100 gramos de Spaghettis Spaghetti');

INSERT INTO utilizados(idUtilizado, idReceta, idIngrediente, cantidad, idUnidad, observaciones) 
OVERRIDING SYSTEM VALUE
VALUES(2, 1, 5, 20, 1, '20 gramos de Pesto');

INSERT INTO utilizados(idUtilizado, idReceta, idIngrediente, cantidad, idUnidad, observaciones) 
OVERRIDING SYSTEM VALUE
VALUES(3, 1, 3, 500, 3, '500 cm3 de agua hirviendo');

INSERT INTO utilizados(idUtilizado, idReceta, idIngrediente, cantidad, idUnidad, observaciones) 
OVERRIDING SYSTEM VALUE
VALUES(4, 1, 4, 50, 1, '50 gramos de queso en hebras');


-- Spaghettis con Fileto
INSERT INTO recetas(idusuario, nombre, descripcion,foto,porciones,cantidadPersonas,idTipo, rating, positiveCount, negativeCount) 
VALUES(1, 'Spaghetti con Fileto', 'Spaghettis con Fileto', '', 1, 1, 1, 5, 500, 0);

INSERT INTO utilizados(idUtilizado, idReceta, idIngrediente, cantidad, idUnidad, observaciones) 
OVERRIDING SYSTEM VALUE
VALUES(5, 2, 1, 100, 1, '100 gramos de Spaghettis Spaghetti');

INSERT INTO utilizados(idUtilizado, idReceta, idIngrediente, cantidad, idUnidad, observaciones) 
OVERRIDING SYSTEM VALUE
VALUES(6, 2, 2, 2, 2, '2 unidades de tomate');

INSERT INTO utilizados(idUtilizado, idReceta, idIngrediente, cantidad, idUnidad, observaciones) 
OVERRIDING SYSTEM VALUE
VALUES(7, 2, 3, 500, 3, '500 cm3 de agua hirviendo');

INSERT INTO utilizados(idUtilizado, idReceta, idIngrediente, cantidad, idUnidad, observaciones) 
OVERRIDING SYSTEM VALUE
VALUES(8, 2, 6, 50, 1, '50 gramos de manteca');

-- Sorrentinos de Ricota
INSERT INTO recetas(idusuario, nombre, descripcion,foto,porciones,cantidadPersonas,idTipo, rating, positiveCount, negativeCount) 
VALUES(1, 'Sorrentinos de Ricota', 'Sorrentinos de Ricota', '', 1, 1, 1, 5, 200, 0);

-- Sorrentinos de Verdura
INSERT INTO recetas(idusuario, nombre, descripcion,foto,porciones,cantidadPersonas,idTipo) 
VALUES(1, 'Sorrentinos de Verdura', 'Sorrentinos de Verdura', '', 1, 1, 1);

-- Sorrentinos de Salmon
INSERT INTO recetas(idusuario, nombre, descripcion,foto,porciones,cantidadPersonas,idTipo) 
VALUES(1, 'Sorrentinos de Salmon', 'Sorrentinos de Salmon', '', 1, 1, 1);

-- Macarrones con Bolognesa
INSERT INTO recetas(idusuario, nombre, descripcion,foto,porciones,cantidadPersonas,idTipo) 
VALUES(1, 'Macarrones con Bolognesa', 'Macarrones con Bolognesa', '', 1, 1, 1);

-- Macarrones con Queso
INSERT INTO recetas(idusuario, nombre, descripcion,foto,porciones,cantidadPersonas,idTipo) 
VALUES(1, 'Macarrones con Queso', 'Macarrones con Queso', '', 1, 1, 1);

-- Canelones
INSERT INTO recetas(idusuario, nombre, descripcion,foto,porciones,cantidadPersonas,idTipo) 
VALUES(1, 'Canelones', 'Canelones', '', 1, 1, 1);

-- Tallarines
INSERT INTO recetas(idusuario, nombre, descripcion,foto,porciones,cantidadPersonas,idTipo) 
VALUES(1, 'Tallarines', 'Tallarines', '', 1, 1, 1);

-- Lasagna
INSERT INTO recetas(idusuario, nombre, descripcion,foto,porciones,cantidadPersonas,idTipo) 
VALUES(1, 'Lasagna', 'Lasagna', '', 1, 1, 1);