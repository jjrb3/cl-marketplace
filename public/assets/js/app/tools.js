
Api.Tools = {

    /**
     * Public messages
     * @param {string} type
     * @param {number} id
     * @param {string} message
     */
    publicMessage: function(type, id, message) {

        var content  = `<div class="alert alert-dismissable alert-${ type }">`;
        content += message;
        content += '</div>';

        $(`#${ id }`).html(content)
    },


    /**
     * Money format
     * @param {number} number
     * @return {string}
     */
    moneyFormat: function(number) {

        return '$' + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
};