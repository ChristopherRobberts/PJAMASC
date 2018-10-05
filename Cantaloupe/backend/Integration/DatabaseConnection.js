let connection = require('mysql');
let encrypter = require('../util/encryption');

let con = connection.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "cantaloupe",
    }
);

/*
* test functions for password validation
* validatePassword, getHash
* */
function validatePassword(hash, pass) {
    console.log("validating");
    console.log(hash);
    console.log(pass);

    return hash === pass;
}

function getHash(pass) {
    return pass;
}

module.exports = {
    connection: con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    }),

    getItems: function (owner, fn) {
        let query = `CALL getItems(${owner})`;
        con.query(query, function (err, result) {
            (err) ? fn(err) : fn(result);
        });
    },

    updateItemQuantity: function (sku, owner, quantity, fn) {
        let query = `CALL UpdateItemQuantity('${sku}', ${owner}, ${quantity})`;
        con.query(query, (err, result) => {
            (err) ? fn(err) : fn(result);
        });
    },

    deleteItem: function (sku, owner, fn) {
        let query = `CALL deleteItem('${sku}', ${owner})`;
        con.query(query, function (err, result) {
            (err) ? fn(err) : fn(result);
        })
    },

    updateItemDescription: function (sku, owner, description, fn) {
        let query = `CALL updateItemDescription('${sku}', ${owner}, '${description}')`;
        con.query(query, (err, result) => {
            (err) ? fn(err) : fn(result);
        })
    },


    updateItemName: function (sku, owner, newName, fn) {
        let query = `CALL updateItemName('${sku}', ${owner}, '${newName}')`;
        con.query(query, (err, result) => {
            (err) ? fn(err) : fn(result);
        })
    },
    updateItemImage: function (sku, owner, newImage, fn) {
        let query = `CALL updateItemImage('${sku}', ${owner}, '${newImage}')`;
        con.query(query, (err, result) => {
            (err) ? fn(err) : fn(result);
        })
    },
    updateItemSKU: function (sku, owner, newSKU, fn) {
        let query = `CALL updateItemSKU('${sku}', ${owner}, '${newSKU}')`;
        con.query(query, (err, result) => {
            (err) ? fn(err) : fn(result);
        })
    },

    addItem: function (sku, name, owner, description, image, quantity, fn) {
        let query = `CALL addItem('${sku}', '${name}', ${owner}, '${description}', '${image}', ${quantity})`;
        con.query(query, (err, result) => {
            (err) ? fn(err) : fn(result);
        })
    },

    addUser: function (name, email, password, avatar, fn) {
        let hash = getHash(password);
        if (hash == null) {
            return false;
        }
        let query = `CALL addUser('${name}', '${email}', '${hash}', '${avatar}')`;
        con.query(query, function (err, result) {
            if (err) {
                fn(err);
            } else {
                fn(result);
            }
        })
    },

    getUserInfo: function (username, password, fn) {
        let query = `CALL getUserInfo('${username}')`;

        con.query(query, function (err, result) {
            if (err) console.log(err);
            else {
                //let hashedPassword = result[0][0].password;
                if (result[0][0]) {
                    //arguments: plaintext password, hashed and salted password from database
                    let passValidated = encrypter.validatePass(password, result[0][0].password);
                    fn({
                        loginSuccess: passValidated,
                        userID: result[0][0].id,
                        avatar: result[0][0].avatar
                    });
                } else {
                    fn({
                        loginSuccess: false,
                        userID: null,
                        avatar: null
                    });
                }
            }
        })
    }
};
