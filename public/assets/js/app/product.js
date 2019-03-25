
Api.Product = {
    uri: `${ Api.apiServer}/product`,
    productList: null,
    productByCategoryList: null,

    loadDataLeftSideBar: function() {
        $.ajax({
            url: this.uri,
            type: 'get',
            data: {},
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': localStorage.getItem('auth')
            },
            dataType: 'json',
            beforeSend: function(){
                $('#side-menu').html('<img src="assets/img/loading.gif" width="50" height="50">');
            },
            success: function (json) {

                $('#side-menu').html('');
                
                if (json.success && json.quantity > 0) {

                    var menu = '',
                        resize = 'style="padding: 70px 0 0;"';

                    for (let i in json.categories) {

                        menu += `<li ${ parseInt(i) === 0 ? resize : '' }>` +
                            `<a href="#" class="waves-effect" onclick="Api.Product.searchByCategory('${ json.categories[i]._id }')">` +
                                `<i class="fa fa-shopping-bag fa-fw" aria-hidden="true"></i>${ json.categories[i].name }</a>` +
                            '</li>';
                    }


                    $('#side-menu').html(menu);
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.responseJSON.err.message)
            }
        });
    }
};