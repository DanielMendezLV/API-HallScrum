//Variable que obtiene la libreria de postgre
var pg = require('pg');
//Cadena de conexión.                              //Motor DB //usuario:password@host:puerto/db
var cadenaDeConexion = process.env.DATABASE_URL || 'postgres://postgres:123@localhost:5432/dbHallScrum';

var client = new pg.Client(cadenaDeConexion);
client.connect();
//var query = client.query('CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
query.on('end', function () { client.end(); });