
Api.Product = {
    uri: `${ Api.apiServer}/product`,
    uriCategory: `${ Api.apiServer}/product-by-category`,
    productList: null,
    productByCategoryList: null,

    filterAllProducts: function(description) {

        $.ajax({
            url: this.uri,
            type: 'get',
            data: {description : description},
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': localStorage.getItem('auth')
            },
            dataType: 'json',
            beforeSend: function(){
                $('#product-list').html('<img src="assets/img/loading.gif" width="50" height="50">');
            },
            success: function (json) {

                $('#product-list').html('');
                
                if (json.success && json.quantity > 0) {

                    for (let i in json.products) {

                        $('#product-list').append(Api.Product.container(json.products[i]));
                    }
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.responseJSON.err.message)
            }
        });
    },

    searchByCategory: function(idCategory) {

        $.ajax({
            url: this.uriCategory,
            type: 'get',
            data: {category : idCategory},
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': localStorage.getItem('auth')
            },
            dataType: 'json',
            beforeSend: function(){
                $('#product-list').html('<img src="assets/img/loading.gif" width="50" height="50">');
            },
            success: function (json) {

                $('#product-list').html('');

                if (json.success && json.quantity > 0) {

                    for (let i in json.products) {

                        $('#product-list').append(Api.Product.container(json.products[i]));
                    }
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.responseJSON.err.message)
            }
        });
    },


    container: function(data) {

        return `<div class="col-lg-4 col-sm-6 col-xs-12">
                    <div class="white-box analytics-info">
                        <h3 class="box-title">${ data.provider }</h3>
                        <img src="assets/img/products/${ data.img }">
                        <br><br>
                        <h3>
                            <span class="text-purple">${ Api.Tools.moneyFormat(data.price) }</span>
                        </h3>
                        <p>
                            ${ data.description }<br>
                            <a onclick="Api.Product.details('${ data._id }')" style="cursor: pointer;">See more</a>
                        </p>
                        <div class="row">
                            <div class="col-lg-6">
                                <input id="quantity-${ data._id }" type="number" min="0" class="form-control" value="0">
                            </div>
                            <div class="col-lg-6">
                                <button type="button" class="btn btn-danger"
                                onclick="Api.Cart.addCart('${ data._id }', '${ data.description }', ${ data.price })">
                                    <i class="fa fa-cart-plus fa-fw"></i> 
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>`;
    },

    details: function(idProduct, category) {

        $.ajax({
            url: `${ this.uri }/${ idProduct }`,
            type: 'get',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': localStorage.getItem('auth')
            },
            dataType: 'json',
            beforeSend: function(){
                // Null
            },
            success: function (json) {

                if (json.success && json.quantity === 1) {

                    var rankin = '';

                    $('#pd-title').html(json.product.provider);
                    $('#pd-provider').html(json.product.provider);
                    $('#pd-price').html(Api.Tools.moneyFormat(json.product.price));
                    $('#pd-description').html(json.product.description);
                    $('#pd-img').attr('src',`assets/img/products/${ json.product.img }`);

                    for (var i = 0; i < parseInt(json.product.rankin); i++) {
                        rankin += '<i class="fa fa-star warning-color"></i>';
                    }

                    $('#pd-rankin').html(rankin);

                    $('#modal-detail').modal({
                        show: 'false'
                    });
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.responseJSON.err.message)
            }
        });
    }
};