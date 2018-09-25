var Item = function(name, sku, quantity, description, created, modified) {
    this.name = name;
    this.sku = sku;
    this.quantity = quantity;
    this.description = description;
    this.created = created;
    this.modified = modified;
}

User.prototype.name = function () {
    return this.name;
}

User.prototype.sku = function () {
    return this.sku;
}

User.prototype.quantity = function () {
    return this.description;
}
