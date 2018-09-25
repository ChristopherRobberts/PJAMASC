var Item = function(name, sku, quantity, description, created, modified) {
    this.name = name;
    this.sku = sku;
    this.quantity = quantity;
    this.description = description;
    this.created = created;
    this.modified = modified;
}

Item.prototype.getName = function () {
    return this.name;
}

Item.prototype.getSku = function () {
    return this.sku;
}

Item.prototype.getQuantity = function () {
    return this.guantity;
}

Item.prototype.getDescription = function () {
    return this.description;
}

Item.prototype.getCreated = function () {
    return this.created;
}

Item.prototype.getModified = function () {
    return this.modified;
}

var car = new Item("x70", "A32", 50, "Bla, Bla, Bla", "5/12", "15/8");
console.log("An Item", car);