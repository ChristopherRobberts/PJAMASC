const bcrypt = require('bcryptjs');
let dataHandler = require('../integration/DataBaseConnection');

//for storing passwords:
//call getHash(password)
//ex: let hash = encrypt.getHash(password);
//return: hash value of password
//store this hash value in db as password

//for validating passwords:
//call validatePassword(user, password)
//returns true or false

//public functions:
//getHash(password)
//validatePass(user, password)
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

validatePass: function validatePassword(user, password){

    //asks dataHandler to provide the password of the user.
    let storedPassword = dataHandler.getPassword(user);
    if(storedPassword == null){
        console.log('password not found');
        return false;
    }
        //validates the password: true/false and returns.
        return bcrypt.compareSync(password, storedPassword)

}

};