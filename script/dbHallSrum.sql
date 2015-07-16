/*Nombre general de la base de datos, tomar en cuenta para las conecciones de todos:
DB_HallScrum

Script:
*/
/*
	drop table Usuario_Equipo;
	drop table Equipo;
	drop table Usuario;
	drop table Rol;
	drop table Mensaje;
	drop table Reunion;
*/
CREATE TABLE Rol(
	idRol SERIAL,
	nombre varchar(255),
	CONSTRAINT Rol_pk PRIMARY KEY (idRol)
) WITH (
  OIDS=FALSE
);


CREATE TABLE Usuario (
	idUsuario SERIAL,
	nombre varchar(255),
	apellido varchar(255),
	nickname varchar(255),
	contrasena varchar(255),
	idRol integer NOT NULL,
	CONSTRAINT Usuario_pk PRIMARY KEY (idUsuario)
) WITH (
  OIDS=FALSE
);



CREATE TABLE Equipo(
	idEquipo SERIAL,
	nombre varchar(255),
	CONSTRAINT Equipo_pk PRIMARY KEY (idEquipo)
) WITH (
  OIDS=FALSE
);




CREATE TABLE Usuario_Equipo(
	idUsuario integer NOT NULL,
	idEquipo integer NOT NULL,
	idRol integer NOT NULL,
	CONSTRAINT Usuario_Equipo_pk PRIMARY KEY (idUsuario,idEquipo)
) WITH (
  OIDS=FALSE
);




CREATE TABLE Proyecto(
	idProyecto SERIAL,
	nombre varchar(255),
	fechaCreacion DATE,
	idEquipo integer,
	CONSTRAINT Proyecto_pk PRIMARY KEY (idProyecto)
) WITH (
  OIDS=FALSE
);



CREATE TABLE Fase (
	idFase SERIAL,
	nombre varchar(255),
	fechaInicio DATE,
	fechaFinalizacion DATE,
	idProyecto integer,
	CONSTRAINT Fase_pk PRIMARY KEY (idFase)
) WITH (
  OIDS=FALSE
);



CREATE TABLE Meta (
	idMeta SERIAL,
	descripcion varchar(255),
	estado BOOLEAN,
	idFase integer,
	CONSTRAINT Meta_pk PRIMARY KEY (idMeta)
) WITH (
  OIDS=FALSE
);




CREATE TABLE Reunion (
	idReunion SERIAL,
	fecha DATE,
	hora varchar(15),
	idEquipo integer NOT NULL,
	CONSTRAINT Reunion_pk PRIMARY KEY (idReunion)
) WITH (
  OIDS=FALSE
);



CREATE TABLE Mensaje(
	idMensaje SERIAL,
	idReunion integer,
	texto varchar(255),
	CONSTRAINT Mensaje_pk PRIMARY KEY (idMensaje)
) WITH (
  OIDS=FALSE
);



/* LLaves foraneas */
ALTER TABLE Usuario ADD CONSTRAINT Usuario_fk0 FOREIGN KEY (idRol) REFERENCES Rol(idRol);
ALTER TABLE Usuario_Equipo ADD CONSTRAINT Usuario_Equipo_fk0 FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario);
ALTER TABLE Usuario_Equipo ADD CONSTRAINT Usuario_Equipo_fk1 FOREIGN KEY (idEquipo) REFERENCES Equipo(idEquipo);
ALTER TABLE Usuario_Equipo ADD CONSTRAINT Usuario_Equipo_fk2 FOREIGN KEY (idRol) REFERENCES Rol(idRol);
ALTER TABLE Proyecto ADD CONSTRAINT Proyecto_fk0 FOREIGN KEY (idEquipo) REFERENCES Equipo(idEquipo);
ALTER TABLE Fase ADD CONSTRAINT Fase_fk0 FOREIGN KEY (idProyecto) REFERENCES Proyecto(idProyecto);
ALTER TABLE Meta ADD CONSTRAINT Meta_fk0 FOREIGN KEY (idFase) REFERENCES Fase(idFase);
ALTER TABLE Reunion ADD CONSTRAINT Reunion_fk1 FOREIGN KEY (idEquipo) REFERENCES Equipo(idEquipo);
ALTER TABLE Mensaje ADD CONSTRAINT Mensaje_fk0 FOREIGN KEY (idReunion) REFERENCES Reunion(idReunion);


/*Insertando datos en Rol */
INSERT INTO Rol(nombre) VALUES ('Admin');
INSERT INTO Rol(nombre) VALUES ('Usuario');

/*Insertando datos en Usuario */
INSERT INTO Usuario(nombre,apellido,nickname,contrasena,idrol) VALUES('Admin','Admin','Admin','Admin',1);
INSERT INTO Usuario(nombre,apellido,nickname,contrasena,idrol) VALUES('Usuario','Usuario','Usuario','Usuario',2);
INSERT INTO Usuario(nombre,apellido,nickname,contrasena,idrol) VALUES('Daniel','Con','ldcon','123',2);
INSERT INTO Usuario(nombre,apellido,nickname,contrasena,idrol) VALUES('Pensamiento','Calderon','fpensa','123',2);


/* Insertando datos en Equipo */
INSERT INTO Equipo(nombre) VALUES('Produccion');
INSERT INTO Equipo(nombre) VALUES('Desarrollo');

/* Insertando datos en Usuario_Equipo */
INSERT INTO Usuario_Equipo(idusuario,idequipo,idrol) VALUES(1,2, 1);
INSERT INTO Usuario_Equipo(idusuario,idequipo,idrol) VALUES(2,2, 1);
INSERT INTO Usuario_Equipo(idusuario,idequipo,idrol) VALUES(3,2, 2);


/*Insertando datos de Proyecto */
INSERT INTO Proyecto(nombre, fechacreacion,idequipo) VALUES('Hallscrum',CURRENT_DATE, 2);
INSERT INTO Proyecto(nombre, fechacreacion,idequipo) VALUES('PaginaWebEstatica',CURRENT_DATE,2);

/*Insertando datos de Fase */
INSERT INTO Fase(nombre,fechainicio,fechafinalizacion,idproyecto) VALUES('Login Android', CURRENT_DATE,CURRENT_DATE,1);
INSERT INTO Fase(nombre,fechainicio,fechafinalizacion,idproyecto) VALUES('Web Service',CURRENT_DATE,CURRENT_DATE,2);

/*Insertando datos de Meta */
INSERT INTO Meta(descripcion,estado,idfase) VALUES('Conectar con NodeJS',false,1);
INSERT INTO Meta(descripcion,estado,idfase) VALUES('Conectar con PosgreSQL',false,2);

/*Insertando datos de Reunion */
INSERT INTO Reunion(fecha,hora,idequipo) VALUES(CURRENT_DATE,'09:00 pm', 1);
INSERT INTO Reunion(fecha,hora,idequipo) VALUES(CURRENT_DATE,'08:00 pm', 2);

/*Insertando datos de Mensaje */
INSERT INTO Mensaje(idreunion,texto) VALUES(1, 'Arregla la bd');
INSERT INTO Mensaje(idreunion,texto) VALUES(2, '..No estoy en contra');

select * from Rol;
select * from Usuario;
select * from Equipo;
select * from Usuario_Equipo;
select * from Proyecto;
select * from Fase;
select * from Meta;
select * from Reunion;
select * from Mensaje









