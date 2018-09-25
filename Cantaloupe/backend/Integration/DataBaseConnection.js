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
    }),

    getItems: function getItems(user, fn) {
        let query = `CALL getItems(${user})`;
        con.query(query, (err, result) => {
            (err)? console.log(err) : console.log("success!");
            fn(result[0]);
        });
    },

    updateItemQuantity: function updateItemQuantity(sku, owner, quantity, fn) {
        let query = `CALL UpdateItemQuantity('${sku}', ${owner}, ${quantity})`;
        con.query(query, (err, result) => {
            if (err)
                console.log(err);
            else {
                con.query(`SELECT Quantity FROM product_list WHERE sku = '${sku}' AND owner = ${owner}`,
                    (err, result) => {
                        fn(result);
                })
            }
        });
    },

    deleteItem: function deleteItem(id) {
        let query = `CALL deleteItem(${id})`;
        con.query(query, (err) => {
            (err) ? console.log(err) : console.log("Item successfully deleted.");
        })
    },

    updateItemDescription: function updateItemDescription(id, description) {
        let query = `CALL updateItemDescription(${id}, ${description})`;
        con.query(query, (err) => {
            (err) ? console.log(err) : console.log("Item description successfully updated.");
        })
    },

    addItem: function addItem(id, sku, description, image, quantity, ownerId) {
        let query = `CALL addItem(${id}, ${sku}, ${description}, ${image}, ${quantity}, ${ownerId})`;
        con.query(query, (err) => {
            (err) ? console.log(err) : console.log("Item successfully added.");
        })
    }
};
