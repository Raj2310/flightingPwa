import router from '../router.js'
import Vue from '../lib/vue.js'
var navbar = Vue.component('app-nav', {
    props: ['username'],
    data: function () {
        return {}
    },
    template: "#navbar-template",
    methods: {
        logoutAttempt() {
            localStorage.removeItem("authKey");
            router.go('/login')
        }
    }
});