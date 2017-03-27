var navbar=Vue.component('app-nav',{
    props:['username'],
  data:function(){
    return {
    }
  },
	template:"#navbar-template",
  methods:{
      logoutAttempt(){
        localStorage.removeItem("authKey");
        router.go('/login')
      }  
  }
});
var mainContainer=Vue.component('left-sidebar',{
	data:function(){
	return{
    	currentFlightIndex:0,
    	flightList:{}
		};
	},
	created() {
   		this.fetchItem()
  	},
  	methods: {
    	fetchItem() {
	    	//console.log("Local Storage",localStorage.authKey);
	    	if (localStorage.authKey) {
	    		 var self=this;
				axios.get('https://krkfans.herokuapp.com/api/userFlightsInfo/'+localStorage.authKey, {
				})
			  	.then(function (response) {
			  		console.log(response)
			    	self.flightList=response;
				})
			  	.catch(function (error) {
			    	console.log(error);
				});
	    	} else {
	    		router.replace('/login')
	    	}
    	},
    	logoutAttempt(){
    		localStorage.removeItem("authKey");
    		console.log("After deletion",localStorage.authKey);
    		router.go('/login')
    	}  
  	},
	template:"#mainContainer-template"
});
var flightMessages=Vue.component(`flight-msg`,{
	props:['flights','currentFlightIndex'],
	template:"#flight-msg-template"
})
var flightInfo=Vue.component(`flight-info`,{
	props:['flights','currentFlightIndex'],
	template:"#flight-info-template"
});

const Login = { 
	template: '#login-template',
	created() {
   		this.checkLogin()
  	},
	methods: {
    	loginAttempt: function () {
      		const email=$("#email").val();
      		const password=$("#password").val();
      		$.post("https://krkfans.herokuapp.com/api/login", {email:email,
			    	password: password}, function(result){
        		if(result.status){
        			localStorage.setItem("authKey", result.authKey);
        			router.push('/dashboard')
        		}else{	
        			alert("Wrong email/password");
        		}
    		});
    	},
    	checkLogin:function(){
    		if (localStorage.authKey) {
    			console.log("localStorage.authKey",localStorage.authKey);
    			router.replace('/dashboard');
    		}else{
    			console.log("No")
    			//router.push('/dashboard');
    		}
    	}
  	} 
}

const Register=Vue.component(`register`,{
	template:"#register-template",
	created() {
   		this.checkLogin()
  	},
	methods:{
		registerAttempt:function(){
			const email=$("#email_r").val();
      		const password=$("#password_r").val();
      		const name=$("#name_r").val();
				$.get("https://krkfans.herokuapp.com/api/register/1staprilwtf/"+name+"/"+email+"/"+password, function(result){
        		if(result.status){
        			localStorage.setItem("authKey", result.authKey);
        			console.log(result);
        			//router.push('/dashboard')
        		}else{	
        			alert("Sorry could not register");
        		}
    		});
		}
	},
    	checkLogin:function(){
    		if (localStorage.authKey) {
    			console.log("localStorage.authKey",localStorage.authKey);
    			//router.push('/dashboard');
    		}else{
    			console.log("No")
    			//router.push('/dashboard');
    		}
    	}
});

const routes = [
  { path: '/dashboard', component: mainContainer },
  { path: '/login', component: Login },
  { path:'/register',component:Register}
]
const router = new VueRouter({
  routes // short for routes: routes
});
router.replace('/dashboard')
var app = new Vue({
  router
}).$mount('#app')