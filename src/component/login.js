import router from '../router';
const Login = {
    template: '#login-template',
    created() {
        this.checkLogin()
    },
    methods: {
        loginAttempt: function () {
            const email = $("#email").val();
            const password = $("#password").val();
            $.post("https://udankhatola.herokuapp.com/api/login", {
                email: email,
                password: password
            }, function (result) {
                if (result.status) {
                    localStorage.setItem("authKey", result.authKey);
                    router.push('/dashboard')
                } else {
                    alert("Wrong email/password");
                }
            });
        },
        checkLogin: function () {
            if (localStorage.authKey) {
                console.log("localStorage.authKey", localStorage.authKey);
                router.replace('/dashboard');
            } else {
                console.log("No")
                //router.push('/dashboard');
            }
        }
    }
}


export default Login