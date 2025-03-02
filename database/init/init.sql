CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    director VARCHAR(255) NOT NULL,
    year INTEGER NOT NULL,
    rating DECIMAL(2,1) NOT NULL CHECK (rating >= 1 AND rating <= 5)
);

INSERT INTO movies (name, director, year, rating) VALUES
('El Padrino', 'Francis Ford Coppola', 1972, 4.8),
('Cadena Perpetua', 'Frank Darabont', 1994, 4.7),
('La La Land', 'Damien Chazelle', 2016, 4.1),
('El Caballero Oscuro', 'Christopher Nolan', 2008, 4.6),
('Pulp Fiction', 'Quentin Tarantino', 1994, 4.5),
('Forrest Gump', 'Robert Zemeckis', 1994, 4.4),
('El Señor de los Anillos: El Retorno del Rey', 'Peter Jackson', 2003, 4.7),
('Titanic', 'James Cameron', 1997, 4.3),
('Origen', 'Christopher Nolan', 2010, 4.5),
('El Club de la Lucha', 'David Fincher', 1999, 4.4),
('Volver al Futuro', 'Robert Zemeckis', 1985, 4.2),
('Interestelar', 'Christopher Nolan', 2014, 4.6),
('El Rey León', 'Roger Allers, Rob Minkoff', 1994, 4.0),
('Parque Jurásico', 'Steven Spielberg', 1993, 4.1),
('Gladiator', 'Ridley Scott', 2000, 4.3),
('El Silencio de los Corderos', 'Jonathan Demme', 1991, 4.4),
('La Red Social', 'David Fincher', 2010, 4.2),
('Vengadores: Infinity War', 'Anthony Russo, Joe Russo', 2018, 4.5),
('Toy Story', 'John Lasseter', 1995, 4.3),
('El Resplandor', 'Stanley Kubrick', 1980, 4.5),
('Matrix', 'Lana Wachowski, Lilly Wachowski', 1999, 4.6),
('El Laberinto del Fauno', 'Guillermo del Toro', 2006, 4.5);