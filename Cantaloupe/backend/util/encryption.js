const bcrypt = require('bcryptjs');
//let dataHandler = require('../Integration/DatabaseConnection');

//public functions:
//getHash(password) returns hash value of password sent as argument
//validatePass(password, hash) returns true/false
module.exports = {
    getHash: function generateHash(password){
        let hash;
        try {
            //generates hash of password using bcrypt library
            hash = bcrypt.hashSync(password, bcrypt.genSaltSync(9));
        } catch (ex) {
            console.log("password couldn't be encrypted");
            return null;
        }
        return hash;
    },

    validatePass: function validatePassword(password, hash){

        return bcrypt.compareSync(password, hash)

    }
};