let DataBaseConnection = require('../Integration/DatabaseConnection.js');

module.exports = {

    /* Function that lets you change the quantity of an item */
    updateItemQuantity: function (SKU, owner, amount, fn) {
        DataBaseConnection.updateItemQuantity(SKU, owner, amount, function (newAmount) {
            fn(newAmount);
        })
    },

    /* Add user to the database */
    addUser: function (name, email, password, avatar, fn) {
        DataBaseConnection.addUser(name, email, password, avatar, function (status) {
            fn(status);
        })
    },
    /* Function that gets all items of a user */
    getItems: function (owner, fn) {
        DataBaseConnection.getItems(owner, function (itemInformation) {
            fn(itemInformation);
        })
    },
    /* Function that lets a user delete an item */
    deleteItem: function (sku, owner, fn) {
        DataBaseConnection.deleteItem(sku, owner, function (deleteStatus) {
            fn(deleteStatus);
        });
    },

    /* Function that lets a user add an item */
    addItem: function (sku, name, owner, description, image, quantity, fn) {
        DataBaseConnection.addItem(sku, name, owner, description, image, quantity, function (status) {
            fn(status);
        })
    },
    /* Edit function of item, to change Description value */
    updateItemDescription: function (sku, owner, description, fn) {
        DataBaseConnection.updateItemDescription(sku, owner, description, function (updateStatus) {
            fn(updateStatus);
        })
    },
    /* Edit function of item, to change Name value */
    updateItemName: function (sku, owner, newName, fn) {
        DataBaseConnection.updateItemName(sku, owner, newName, function (updateStatus) {
            fn(updateStatus);
        })
    },
    /* Edit function of item, to change Image value */
    updateItemImage: function (sku, owner, newImage, fn) {
        DataBaseConnection.updateItemImage(sku, owner, newImage, function (updateStatus) {
            fn(updateStatus);
        })
    },
    /* Edit function of item, to change SKU value */
    updateItemSKU: function (sku, owner, newSKU, fn) {
        DataBaseConnection.updateItemSKU(sku, owner, newSKU, function (updateStatus) {
            fn(updateStatus);
        })
    },

    /* Login function, param name, password */
    login: function (name, password, fn) {
        DataBaseConnection.getUserInfo(name, password, function (returnedInformation) {
            fn(returnedInformation);
        })
    }
};