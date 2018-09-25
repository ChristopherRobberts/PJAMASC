let dataBaseConnection = require('./Integration/DataBaseConnection.js');

let updateItemQuantity = (SKU, owner, amount, sign) => {
    (sign < 0)? dataBaseConnection.updateItemQuantity(SKU, owner, -amount) :
        dataBaseConnection.updateItemQuantity(SKU, owner, amount);
};