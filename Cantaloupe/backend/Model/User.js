var User = function (name, avatar, id, email) {
    this.name = name;
    this.avatar = avatar;
    this.id = id;
    this.email = email;
};

User.prototype.getName = function () {
    return this.name;
};

User.prototype.getAvatar = function () {
    return this.avatar;
};

User.prototype.getId = function () {
    return this.id;
};

User.prototype.getEmail = function () {
    return this.email;
};