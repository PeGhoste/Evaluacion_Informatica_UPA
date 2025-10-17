-- En este caso por ser una DB de pruebas, para ahorrar tiempo
-- Se borra desde 0 y se empieza de nuevo para no hacer ALTER's
-- En caso de querer aplicar un cambio
DROP DATABASE IF EXISTS DBEvaluacion_Jose_Peralta;

-- Creación y utilización de la DB
-- Con las palabras reservadas CREATE DATABASE para crearla y USE para hacer uso de esta
CREATE DATABASE DBEvaluacion_Jose_Peralta;
USE DBEvaluacion_Jose_Peralta;

-- Con CREATE TABLE podemos crear una tabla y 
-- darle "forma" con los atributos que le daremos
CREATE TABLE EstadoUsuario(
	id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(25)  NOT NULL,
    clave VARCHAR(20)  NOT NULL
);

-- Creamos la tabla de Usuario y el cuerpo que conlleva esta
CREATE TABLE Usuario(
	id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    fecha DATE NOT NULL,
    telefono VARCHAR(15) NOT NULL,
    correo VARCHAR(30) NOT NULL,
    creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    estadoUsuarioId INT NOT NULL,
    CONSTRAINT FK_Usuario_EstadoUsuario FOREIGN KEY (estadoUsuarioId)
		REFERENCES EstadoUsuario (id)
);

-- Con INSERT INTO indicamos a qué tabla y con qué atributos
-- haremos un ingreso de datos
INSERT INTO EstadoUsuario(titulo, clave) 
VALUES ('Activo','activo'), ('Baja permanente', 'baja');