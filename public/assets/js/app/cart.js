
Api.Cart = {
    cart: [],

    loadData: function() {

        if (!(localStorage.getItem("cart") === null) && localStorage.getItem("cart") !== '{"data":[]}') {
            let json = JSON.parse(localStorage.getItem("cart"));

            for (let i in json) {
                this.cart[json[i].id] =json[i];
            }
        }

        this.updateButtonSeeProducts();
    },

    addCart: function(id, description, price) {

        let container = `#quantity-${ id }`;
        let quantity = parseInt($(container).val());

        $(container).val(0);

        if (quantity > 0) {
            if (this.cart[id] === undefined) {
                this.cart[id] = {
                    id,
                    description,
                    price,
                    quantity
                };
            }
            else {
                alert('This product is already added in the cart.');
            }
        }
        else {
            alert('The quantity must be greater than 0.');
        }

        this.updateButtonSeeProducts();

        this.saveLocalStorage();
    },

    saveLocalStorage: function() {

        var dataCart = [];

        for (let id in this.cart) {

            dataCart.push(this.cart[id]);
        }

        localStorage.setItem('cart', JSON.stringify(dataCart));
    },

    updateButtonSeeProducts: function() {

        var quantity = 0;

        for (i in this.cart) {
            quantity++;
        }

        if (quantity > 0) {
            $('#button-see-products').prop('disabled', false);
        }
        else {
            $('#button-see-products').prop('disabled', true);
        }

        $('#bsp-quantity').text(quantity);
    },

    showCart: function() {

        this.createTableCart();

        $('#modal-cart').modal({
            show: 'false'
        });
    },

    createTableCart: function() {

        let tbody = $('#table-cart').find('tbody');

        var quantity = 0,
            price = 0,
            table = '';

        tbody.html('');

        for (let id in this.cart) {

            price    += this.cart[id].quantity * this.cart[id].price;
            quantity += this.cart[id].quantity;

            table += `<tr>
                        <td>${ this.cart[id].description }</td>
                        <td width="10%" align="center">${ this.cart[id].quantity }</td>
                        <td width="10%" align="center">${ Api.Tools.moneyFormat(this.cart[id].quantity * this.cart[id].price) }</td>
                        <td align="center" width="5%">
                            <button class="btn btn-danger" onclick="Api.Cart.deleteProduct('${ id }')">
                            Delete
                            </button>
                        </td>
                    </tr>`;
        }

        if (table !== '') {
            table += `<tr>
                    <td align="right"><b>TOTAL:</b></td>
                    <td width="10%" align="center">${quantity}</td>
                    <td width="10%" align="center">${Api.Tools.moneyFormat(price)}</td>
                    <td align="center" width="5%">
                        &nbsp;
                    </td>
                </tr>`;
        }
        else {
            $('#modal-cart').modal('hide');
        }

        tbody.html(table);
    },

    deleteProduct: function(idProduct) {

        var newCart = [];

        for (let id in this.cart) {

            if (id !== idProduct) {
                newCart[id] = this.cart[id];
            }
        }

        this.cart = newCart;

        this.createTableCart();
        this.updateButtonSeeProducts();
        this.saveLocalStorage();
    }
};