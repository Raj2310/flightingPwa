const applicationServerPublicKey = 'BMD79y7gEnO5W97k5XDasjDp2VrZCSOgMC2PXt0-JbxT90kO8Kb5rQ_3RZXcEesqBUJT8xT6n1GWb-FDbq_XA7o';
var swRegistration;
var isSubscribed = false;
if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function(swReg) { 
                console.log('Service Worker Registered');
                swRegistration = swReg;
                 initialiseUI(); 
              })
             .catch(function(error) {
                console.error('Service Worker Error', error);
              });
  }else{
    console.warn('Push messaging is not supported');
}
function saveBookingToLocal(bookingdata){
  console.log(typeof bookingdata);
  localStorage.bookingdata=JSON.stringify(bookingdata);
    console.log(typeof localStorage.bookingdata);
}

function initialiseUI() {
  // Set the initial subscription value
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    isSubscribed = !(subscription === null);
    if (isSubscribed) {
      console.log('User IS subscribed.');
    } else {
      console.log('User is NOT subscribed.');
    }
  });
}
function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
  .then(function(subscription) {
    console.log('User is subscribed.');

    updateSubscriptionOnServer(subscription);

    isSubscribed = true;
  })
  .catch(function(err) {
    console.log('Failed to subscribe the user: ', err);
  });
}

function updateSubscriptionOnServer(subscription) {
  // TODO: Send subscription to application server
  $("#abcd").html(JSON.stringify(subscription));
  //alert(JSON.stringify(subscription));
}

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}


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
      },
      subsPushNotification(){
        if (isSubscribed) {
      // TODO: Unsubscribe user
        } else {
          subscribeUser();
        }
      }  
  }
});
var mainContainer=Vue.component('left-sidebar',{
	data:function(){
	return{
    	currentFlightIndex:0,
    	flightList:{},
      pushBtnDisplay:false
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
           if(localStorage.bookingdata){
            console.log(localStorage.bookingdata);
            self.flightList=JSON.parse(localStorage.bookingdata);
           }
           try{
				    axios.get('https://krkfans.herokuapp.com/api/userFlightsInfo/'+localStorage.authKey, {
				    })
			  	  .then(function (response) {
			  		 console.log(response)
			    	  self.flightList=response;
              saveBookingToLocal(response)
				      })
			  	  .catch(function (error) {
			    	  console.log(error);
				  });
          }catch(e){

          }
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
