var app = new Vue({
    el: '#items',
    data: {
        displayInfo: '',
        displayData: '',
        items: [],
        itemText: '',
        product: '',
        description: '',
        imagepath: '',
        quantity: '',
        sku: '',
        showDiv: '',
        image: ''
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
        getAllItems() {
            $.ajax({
                url: './item/getAllItems'
            }).done(function (data) {
                this.items = data;
                console.log(data);
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
                console.log('edited quantity')
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
        showdiv(product, data) {
            showDiv = document.getElementById('expand');
            showDiv.style.display = "block";
            this.displayInfo = product;
            this.displayData = data;
            console.log("Displayinfo: " + this.displayInfo);
            //document.getElementById('info').innerHTML = product;
            //document.getElementById('data').innerHTML = data;
        },
        submititem(event) {
            this.addItem()
        },
    },
    mounted() {
        this.getAllItems()
    }
})