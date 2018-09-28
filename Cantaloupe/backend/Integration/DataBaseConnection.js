let connection = require('mysql');
//let encrypter = require('../encryption/encryption');

function validatePassword(hash, pass){
    console.log("validating");
    console.log(hash);
    console.log(pass);

    return hash === pass;
}

function generateHash(pass){
    return pass;
}

let con = connection.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "cantaloupe",
    }
);

module.exports = {
    connection: con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    }),

    getItems: function (user, fn) {
        let query = `CALL getItems(${user})`;
        con.query(query, function (err, result) {
            (err) ? fn(err) : fn("success!");
            fn(result[0]);
        });
    },

    updateItemQuantity: function (sku, owner, quantity, fn) {
        let query = `CALL UpdateItemQuantity('${sku}', ${owner}, ${quantity})`;
        con.query(query, (err, result) => {
            if (err)
                fn(err);
            else {
                con.query(`SELECT Quantity FROM product_list WHERE sku = '${sku}' AND owner = ${owner}`,
                    (err, result) => {
                        fn(result);
                    })
            }
        });
    },

    getPassword: function (user) {

        let query = `SELECT password FROM user WHERE name = '${user}'`;
        //let query = `SELECT password * FROM user`;
        con.query(query, function (err, result) {
console.log(result);
            return result[0].password;
            //console.log(result);
        })


    },

    login: function (user, password) {
        let query = `SELECT password FROM user WHERE name = '${user}'`;
        con.query(query, function (err, result) {
            console.log("jag är här");
            //console.log(result);
            console.log(result[0].password);
            return result[0].password;
            //console.log("password");
            //console.log(result);
            /*
            if(result == null){
                console.log('password not found');
                return false;
            }
            //asks encrypter to validate that the encrypted password is compatible with the plaintext password
            return validatePassword(result[0].password, password);
            */
        });
        //console.log(encryptedPassword);



    },

    deleteItem: function (sku, owner, fn) {
        let query = `CALL deleteItem(${sku}, ${owner})`;
        con.query(query, function (err) {
            (err) ? fn("Item could not be deleted") : fn("Item was deleted successfully");
        })
    },

    updateItemDescription: function (sku, owner, description, fn) {
        let query = `CALL updateItemDescription(${sku}, ${owner}, ${description})`;
        con.query(query, (err) => {
            (err) ? fn(err) : fn("Item description successfully updated.");
        })
    },

    addItem: function (sku, name, description, image, quantity, owner, fn) {
        let query = `CALL addItem(${sku}, ${name}, ${owner}, ${description}, ${image}, ${quantity})`;
        con.query(query, (err) => {
            (err) ? fn("Something went wrong") : fn("Item successfully added.");
        })
    },

    getUserInfo: function (name) {
        let query = `CALL getUserInfo(${name})`;
        con.query(query, function (err, result) {
            if(err){
                return null;
            }else{
                return result;
            }
        })
    },

    addUser: function (name, email, password, avatar) {
        let hash = getHash(password);
        if(hash==null){
            return false;
        }
        let query = `CALL addUser(${name}, ${email}, ${hash}, ${avatar})`;
        con.query(query, function (err, result) {
            if (err) {
                return false;
            }else {
                return true;
            }
            })
    },
};
