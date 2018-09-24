let connection = require('mysql');

let con = connection.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "pjamasc"
    }
);

module.exports = {
    connection: con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    })
};