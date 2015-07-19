CREATE TABLE Usuario(
	idUsuario SERIAL,
	nombre VARCHAR(255),
	apellido VARCHAR(255),
	nickname VARCHAR(255),
	contrasena VARCHAR(255)
	
);

CREATE TABLE Proyecto(
	idProyecto SERIAL,
	nombre VARCHAR(255),
	fechaCreacion DATE
);

INSERT INTO Usuario(nombre,apellido,nickname,contrasena) VALUES('Daniel','Mendez','rose','123');
INSERT INTO Proyecto(nombre,fechaCreacion) VALUES('Mini-Mundi', CURRENT_DATE);

SELECT * from Usuario;
SELECT * from Proyecto;