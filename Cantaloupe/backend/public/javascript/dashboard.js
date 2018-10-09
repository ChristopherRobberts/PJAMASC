$(document).ready(function () {
    $.ajax({
        method: 'GET',
        url: '/getProfileImage',
    }).done(function (data) {
        document.getElementById('loginpic').src = data;
    });
});

var app = new Vue({
    el: '#items',
    data: {
        displayInfo: '',
        displayDesc: '',
        displayImg: '',
        displayQty: '',
        displaySku: '',
        items: [],
        itemText: '',
        product: '',
        description: '',
        imagepath: '',
        quantity: '',
        sku: '',
        showDiv: '',
        image: '',
        profileImage: ''
    },
    methods: {
        //--------METHODS-------
        editdescription(item) {
            $.ajax({
                method: 'POST',
                url: '/item/edit-description',
                data:
                    {
                        //SKU + user together identify item:
                        sku: item.sku,
                        //The new product name
                        description: this.description
                    }
            }).done(function (data) {
                this.getAllItems();
            }.bind(this))
        },

        incrementQuantity(item) {
            console.log(this.quantity);
            $.ajax({
                method: 'POST',
                url: '/item/editQuantity',
                data:
                    {
                        //SKU + user together identify item:
                        sku: item.sku,
                        //The new product name
                        amount: this.quantity
                    }
            }).done(function (data) {
                this.getAllItems();
            }.bind(this))
        },

        decrementQuantity(item) {
            $.ajax({
                method: 'POST',
                url: '/item/editQuantity',
                data:
                    {
                        //SKU + user together identify item:
                        sku: item.sku,
                        //The new product name
                        amount: -this.quantity
                    }
            }).done(function (data) {
                this.getAllItems();
            }.bind(this))
        },

        getAllItems() {
            $.ajax({
                url: './item/getAllItems'
            }).done(function (data) {
                this.items = data;
                //console.log(data);
            }.bind(this))
        },
        addItem() {
            let formData = new FormData();
            formData.append("sku", this.sku);
            formData.append("name", this.product);
            formData.append("description", this.description);
            formData.append("amount", this.quantity);
            formData.append("profileImage", $('input[type=file]')[0].files[0]);
            $.ajax({
                processData: false,
                contentType: false,
                method: 'POST',
                url: './item/addItem',
                data: formData,
            }).done(function (data) {
                this.product = "";
                this.description = "";
                this.quantity = "";
                this.sku = "";
                this.getAllItems()
            }.bind(this))
        },
        editsku(item) {
            $.ajax({
                method: 'POST',
                url: './item/editSKU',
                data:
                    {
                        //SKU + user together identify item:
                        sku: item.sku,
                        newSku: this.sku
                    }
            }).done(function (data) {
                this.getAllItems()
            }.bind(this))
        },
        editquantity(item) {
            $.ajax({
                method: 'POST',
                url: './item/editQuantity',
                data:
                    {
                        sku: item.sku,
                        amount: this.quantity
                    }
            }).done(function (data) {
                console.log('edited quantity');
                this.getAllItems()
            }.bind(this))
        },
        editimage(item) {
            $("#uploadImage").off().submit(function (evt) {
                evt.preventDefault();
                let formData = new FormData($(this)[0]);
                formData.append("sku", item.sku);

                $.ajax({
                    processData: false,
                    method: 'POST',
                    url: './item/fileUpload',
                    data: formData,
                    contentType: false,
                }).done(function (data) {
                    app.getAllItems();
                }.bind(this))
            })
        },
        editproduct(item) {
            $.ajax({
                method: 'POST',
                url: '/item/edit-name',
                data:
                    {
                        //SKU + user together identify item:
                        sku: item.sku,
                        //The new product name
                        product: this.product
                    }
            }).done(function (data) {
                this.getAllItems()
            }.bind(this))
        },
        deleteitem(item) {
            $.ajax({
                method: 'POST',
                url: './item/deleteItem',
                data:
                    {
                        sku: item.sku
                    }
            }).done(function (data) {
                this.getAllItems()
            }.bind(this))
        },
        //----------EVENTS-----------
        showdesc(item) {
            showDiv = document.getElementById('expand');
            descDiv = document.getElementById('expandDesc');
            imgDiv = document.getElementById('expandImg');
            qtyDiv = document.getElementById('expandQty');
            skuDiv = document.getElementById('expandSku');

            this.displayInfo = item.name;
            this.displayDesc = item.description;
            this.displayQty = item.quantity;
            this.displaySku = item.sku;

            showDiv.style.display = "block";
            descDiv.style.display = "block";
            imgDiv.style.display = "none";
            qtyDiv.style.display = "block";
            skuDiv.style.display = "block";

            //console.log("displayInfo: " + this.displayData);
            //document.getElementById('info').innerHTML = product;
            //document.getElementById('data').innerHTML = data;
        },
        showimg(item) {
            showDiv = document.getElementById('expand');
            descDiv = document.getElementById('expandDesc');
            imgDiv = document.getElementById('expandImg');
            qtyDiv = document.getElementById('expandQty');
            skuDiv = document.getElementById('expandSku');

            this.displayInfo = item.name;
            this.displayImg = item.image;

            showDiv.style.display = "block";
            descDiv.style.display = "none";
            imgDiv.style.display = "block";
            qtyDiv.style.display = "none";
            skuDiv.style.display = "none";
        },
        submititem(event) {
            this.addItem()
        },
    },
    mounted() {
        this.getAllItems()
    }
});