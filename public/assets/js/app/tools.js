
Api.Tools = {

    publicMessage: function(type, id, message) {

        var content  = `<div class="alert alert-dismissable alert-${ type }">`;
        content += message;
        content += '</div>';

        $(`#${ id }`).html(content)
    },

    moneyFormat: function(numero) {

        return '$' + numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
};