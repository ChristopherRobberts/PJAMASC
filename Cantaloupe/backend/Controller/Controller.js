let DataBaseConnection = require('../Integration/DataBaseConnection.js');

module.exports = {

    updateItemQuantity: function (SKU, owner, amount, sign, fn) {
        if (sign < 0) {
            DataBaseConnection.updateItemQuantity(SKU, owner, -1 * amount, function (newAmount) {
                fn(newAmount);
            })
        } else {
            DataBaseConnection.updateItemQuantity(SKU, owner, amount, function (newAmount) {
                fn(newAmount);
            });
        }
    },

    getItems: function (userID, fn) {
        DataBaseConnection.getItems(userID, function (itemInformation) {
            fn(itemInformation);
        })
    },

    deleteItems: function (sku, owner, fn) {
        DataBaseConnection.deleteItem(sku, owner, function (deleteStatus) {
            fn(deleteStatus);
        });
    },

    addItem: function (sku, owner, quantity, image, description, name, fn) {
        DataBaseConnection.addItem(sku, name, description, image, quantity, owner, function (status) {
            fn(status);
        })
    },

    updateItemDescription: function (sku, owner, quantity, fn) {
        DataBaseConnection.updateItemQuantity(sku, owner, quantity, function (updateStatus) {
            fn(updateStatus);
        })
    },

    getUserInfo: function (userID, name, password, avatar, fn) {
        DataBaseConnection.getUserInfo(userID, name, password, avatar, function (returnedInformation) {
            fn(returnedInformation);
        })
    },
    login: function (user, password) {
        return DataBaseConnection.login(user, password);
    }
};