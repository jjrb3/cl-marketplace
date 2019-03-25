
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
                            <span class="text-purple">${ Api.Product.moneyFormat(data.price) }</span>
                        </h3>
                        <p>
                            ${ data.description }<br>
                            <a href="#" data-toggle="modal" data-target="#modal-detail">See more</a>
                        </p>
                        <div class="row">
                            <div class="col-lg-6">
                                <input type="number" min="0" class="form-control" value="0">
                            </div>
                            <div class="col-lg-6">
                                <button type="button" class="btn btn-danger">
                                    <i class="fa fa-cart-plus fa-fw"></i> Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>`;
    },

    moneyFormat: function(numero) {

        return '$' + numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
};