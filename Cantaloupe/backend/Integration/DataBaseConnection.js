let connection = require('mysql');

let con = connection.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "cantaloupe"
    }
);

module.exports = {
    connection: con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    })
};