-- En este caso por ser una DB de pruebas, para ahorrar tiempo
-- Se borra desde 0 y se empieza de nuevo para no hacer ALTER's
DROP DATABASE IF EXISTS DBEvaluacion_Jose_Peralta;

-- Creación y utilización de la DB
CREATE DATABASE DBEvaluacion_Jose_Peralta;
USE DBEvaluacion_Jose_Peralta;

-- Estado de Usuarios
CREATE TABLE EstadoUsuario(
	id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(25)  NOT NULL,
    clave VARCHAR(20)  NOT NULL
);

-- Usuarios
CREATE TABLE Usuario(
	id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    fecha DATE NOT NULL,
    telefono VARCHAR(15) NOT NULL,
    correo VARCHAR(25) NOT NULL,
    creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    estadoUsuarioId INT NOT NULL,
    CONSTRAINT FK_Usuario_EstadoUsuario FOREIGN KEY (estadoUsuarioId)
		REFERENCES EstadoUsuario (id)
);

-- Inserts
INSERT INTO EstadoUsuario(titulo, clave) 
VALUES ('Activo','activo'), ('Baja permanente', 'baja');