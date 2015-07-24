/*Nombre general de la base de datos, tomar en cuenta para las conecciones de todos:
DB_HallScrum
Script:
*/
/*
    drop table  Mensaje;
    drop table Reunion;
    drop table Meta;
    drop table Fase;
    drop table Proyecto;
    drop table Usuario_Equipo;
    drop table Equipo;
    drop table Usuario;
    drop table Rol;
    drop function agregar_clave();
    drop trigger triger_add_key_equipo on Equipo; 
    
*/

CREATE TABLE Rol(
	idRol SERIAL PRIMARY KEY,
	nombre varchar(255) NOT NULL
) WITH (
  OIDS=FALSE
);


CREATE TABLE Usuario (
	idUsuario SERIAL PRIMARY KEY,
	nombre varchar(255),
	apellido varchar(255),
	nickname varchar(255),
	contrasena varchar(255),
	idRol integer NOT NULL REFERENCES Rol(idRol) match simple on update cascade on delete no action
) WITH (
  OIDS=FALSE
);



CREATE TABLE Equipo(
	idEquipo SERIAL PRIMARY KEY,
	nombre varchar(255),
	myKey varchar(255)
) WITH (
  OIDS=FALSE
);


CREATE TABLE Usuario_Equipo(
	idUsuario integer NOT NULL REFERENCES Usuario(idUsuario) match simple on update cascade on delete cascade,
	idEquipo integer NOT NULL REFERENCES Equipo(idEquipo) match simple on update cascade on delete cascade,
	idRol integer NOT NULL REFERENCES Rol(idRol) match simple on update cascade on delete cascade,
	status boolean NOT NULL,
	PRIMARY KEY(idUsuario, idEquipo)
) WITH (
  OIDS=FALSE
);




CREATE TABLE Proyecto(
	idProyecto SERIAL PRIMARY KEY,
	nombre varchar(255),
	fechaCreacion DATE,
	idEquipo integer NOT NULL REFERENCES Equipo(idEquipo) match simple on update cascade on delete cascade
) WITH (
  OIDS=FALSE
);



CREATE TABLE Fase (
	idFase SERIAL PRIMARY KEY,
	nombre varchar(255),
	fechaInicio DATE,
	fechaFinalizacion DATE,
	idProyecto integer NOT NULL REFERENCES Proyecto(idProyecto) match simple on update cascade on delete cascade
) WITH (
  OIDS=FALSE
);



CREATE TABLE Meta (
	idMeta SERIAL PRIMARY KEY,
	descripcion varchar(255),
	estado BOOLEAN,
	idFase integer NOT NULL REFERENCES Fase(idFase) match simple on update cascade on delete cascade
) WITH (
  OIDS=FALSE
);




CREATE TABLE Reunion (
	idReunion SERIAL PRIMARY KEY,
	fecha DATE,
	hora varchar(15),
	idEquipo integer NOT NULL REFERENCES Equipo(idEquipo) match simple on update cascade on delete cascade
) WITH (
  OIDS=FALSE
);



CREATE TABLE Mensaje(
	idMensaje SERIAL PRIMARY KEY,
	idReunion integer REFERENCES Reunion(idReunion) match simple on update cascade on delete cascade,
	texto varchar(255)
) WITH (
  OIDS=FALSE
);

CREATE OR REPLACE FUNCTION agregar_clave() RETURNS TRIGGER AS $BODY$
BEGIN 
	NEW.mykey := 'TMH' || '' || NEW.idequipo::VARCHAR(255);
	RETURN NEW;
END
$BODY$ LANGUAGE plpgsql;


CREATE TRIGGER triger_add_key_equipo 
	BEFORE INSERT OR UPDATE ON Equipo
	FOR EACH ROW 
	EXECUTE PROCEDURE agregar_clave();




CREATE OR REPLACE FUNCTION agregar_fecha_proyecto() RETURNS TRIGGER AS $BODY$
BEGIN 
	NEW.fechaCreacion := CURRENT_DATE;
	RETURN NEW;
END
$BODY$ LANGUAGE plpgsql;


CREATE TRIGGER triger_add_fecha_proyecto
	BEFORE INSERT OR UPDATE ON Proyecto
	FOR EACH ROW 
	EXECUTE PROCEDURE agregar_fecha_proyecto();





CREATE OR REPLACE FUNCTION agregar_fechas_fase() RETURNS TRIGGER AS $BODY$
BEGIN 
	NEW.fechainicio := CURRENT_DATE;
    NEW.fechafinalizacion:= CURRENT_DATE;
	RETURN NEW;
END
$BODY$ LANGUAGE plpgsql;


CREATE TRIGGER triger_add_fecha_fase
	BEFORE INSERT OR UPDATE ON Fase
	FOR EACH ROW 
	EXECUTE PROCEDURE agregar_fechas_fase();

	
    
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
INSERT INTO Usuario_Equipo(idusuario,idequipo,idrol,status) VALUES(3,2, 1,true);
INSERT INTO Usuario_Equipo(idusuario,idequipo,idrol,status) VALUES(2,2, 1,true);
INSERT INTO Usuario_Equipo(idusuario,idequipo,idrol,status) VALUES(4,2, 2,false);

/*Insertando datos de Proyecto */
INSERT INTO Proyecto(nombre,idequipo) VALUES('Hallscrum', 2);
INSERT INTO Proyecto(nombre,idequipo) VALUES('PaginaWebEstatica',2);


/*Insertando datos de Fase */
INSERT INTO Fase(nombre,idproyecto) VALUES('Login Android',1);
INSERT INTO Fase(nombre,idproyecto) VALUES('Web Service',2);

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