

let Api = {
    server: 'http://localhost:3000',
    apiServer: 'http://localhost:3000/api',


    /**
     * Segurity when login
     */
    securityLogin: function() {

        if (localStorage.getItem("auth") === null) {
            location.assign(this.server)
        }
    },


    /**
     * Verify if user is logged in
     */
    ifIsLogin: function() {
        if (!(localStorage.getItem("auth") === null)) {
            location.assign(`${ this.server }/home`)
        }
    },


    /**
     * Logout user
     */
    logout: function() {
        localStorage.clear();
        location.assign(this.server);
    },


    /**
     * Load user information
     */
    loadData: function() {

        if (!(localStorage.getItem("name") === null)) {
            $('#user-name').html(localStorage.getItem("name"))
        }
    }
};