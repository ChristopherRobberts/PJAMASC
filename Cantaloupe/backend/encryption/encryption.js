const bcrypt = require('bcryptjs');
let dataHandler = require('./integration/DataBaseConnection');

//for storing passwords
//call getHash(password)
//ex: let hash = encrypt.getHash('password1');
//store this value in db as password

//for validating passwords
//call validatePassword(user, password)
//


module.exports = {
getHash: function generateHash(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
},

validatePass: function validatePassword(user, password){
    //const storedPassword ='$2a$09$oh4pvhnfrq1NMxjUnLAduOIdYZPFDc3jatFtCnEbQW9cLz5rVurAe';
    //for password = 'password1'
    let storedPassword = dataHandler.getPassword(user);
    return bcrypt.compareSync(password, storedPassword)
}


};