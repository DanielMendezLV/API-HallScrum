CREATE TABLE Usuario(
	idUsuario SERIAL,
	nombre VARCHAR(255),
	apellido VARCHAR(255),
	nickname VARCHAR(255),
	contrasena VARCHAR(255)
	
);

INSERT INTO Usuario(nombre,apellido,nickname,contrasena) VALUES('Daniel','Mendez','rose','123');

SELECT * from Usuario;