let DataBaseConnection = require('../Integration/DataBaseConnection.js');

module.exports = {

    updateItemQuantity: (SKU, owner, amount, sign, fn) => {
        if (sign < 0) {
            DataBaseConnection.updateItemQuantity(SKU, owner, -1 * amount, (newAmount) => {
                fn(newAmount);
            })
        } else {
            DataBaseConnection.updateItemQuantity(SKU, owner, amount, (newAmount) => {
                fn(newAmount);
            });
        }
    },

    getItems: (userID, fn) => {
        DataBaseConnection.getItems(userID, (itemInformation) => {
            fn(itemInformation);
        })
    }
};