import router from '../router.js'
import Vue from '../lib/vue.js'
const Register = Vue.component(`register`, {
    template: "#register-template",
    created() {
        this.checkLogin()
    },
    methods: {
        registerAttempt: function () {
            const email = $("#email_r").val();
            const password = $("#password_r").val();
            const name = $("#name_r").val();
            $.get("https://udankhatola.herokuapp.com/api/register/1staprilwtf/" + name + "/" + email + "/" + password, function (result) {
                if (result.status) {
                    localStorage.setItem("authKey", result.authKey);
                    console.log(result);
                    router.push('/dashboard')
                } else {
                    alert("Sorry could not register");
                }
            });
        }
    },
    checkLogin: function () {
        if (localStorage.authKey) {
            console.log("localStorage.authKey", localStorage.authKey);
            //router.push('/dashboard');
        } else {
            console.log("No")
            //router.push('/dashboard');
        }
    }
});
export default Register;