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

    addUser: function (name, email, password, avatar, fn) {
        DataBaseConnection.addUser(name, email, password, avatar, function(status) {
            fn(status);
        })
    },

    getItems: function (owner, fn) {
        DataBaseConnection.getItems(owner, function (itemInformation) {
            fn(itemInformation);
        })
    },

    deleteItem: function (sku, owner, fn) {
        DataBaseConnection.deleteItem(sku, owner, function (deleteStatus) {
            fn(deleteStatus);
        });
    },

    addItem: function (sku, name, owner, description, image, quantity, fn) {
        DataBaseConnection.addItem(sku, name, owner, description, image, quantity, function (status) {
            fn(status);
        })
    },

    updateItemDescription: function (sku, owner, description, fn) {
        DataBaseConnection.updateItemDescription(sku, owner, description, function (updateStatus) {
            fn(updateStatus);
        })
    },

    getUserInfo: function (name, password, fn) {
        DataBaseConnection.getUserInfo(name, password, function (returnedInformation) {
            fn(returnedInformation);
        })
    }
};