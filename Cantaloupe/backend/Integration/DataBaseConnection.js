let connection = require('mysql');

let con = connection.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "pjamasc"
    }
);

function asd (argument) {
    return `hej, detta är mitt argument - ${argument}`
}
module.exports = {
    connection: con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    }),

    getItems: function getItems(user) {
        let query = `CALL getItems(${user})`;
        con.query(query, (err) => {
            (err)? console.log(err) : console.log("Items successfully retrieved.");
        })
    },

    updateItemQuantity: function updateItemQuantity(sku, owner, quantity) {
        let query = `CALL UpdateItemQuantity(${sku}, ${owner}, ${quantity})`;
        con.query(query, (err) => {
            (err)? console.log(err) : console.log("Item quantity successfully updated.");
        });
    },

    deleteItem: function deleteItem(id) {
        let query = `CALL deleteItem(${id})`;
        con.query(query, (err) => {
            (err)? console.log(err) : console.log("Item successfully deleted.");
        })
    },

    updateItemDescription: function updateItemDescription(id, description) {
        let query = `CALL updateItemDescription(${id}, ${description})`;
        con.query(query, (err) => {
            (err)? console.log(err) : console.log("Item description successfully updated.");
        })
    },

    addItem: function addItem(id, sku, description, image, quantity, ownerId) {
        let query = `CALL addItem(${id}, ${sku}, ${description}, ${image}, ${quantity}, ${ownerId})`;
        con.query(query, (err) => {
            (err)? console.log(err) : console.log("Item successfully added.");
        })
    }
};