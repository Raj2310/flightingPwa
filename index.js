var navbar=Vue.component('app-nav',{
	template:`<!--Navigation-->
<div class="band navigation">
    <nav class="container primary">
        <div class="sixteen columns">
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Projects</a></li>
                <li><a href="#">Contact Us</a></li>
            </ul>
        </div>
    </nav>
</div>`
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
	    	console.log("Local Storage",localStorage.authKey);
	    	if (localStorage.authKey) {
	    		 var self=this;
				axios.get('http://krkfans.herokuapp.com/api/userFlightsInfo/'+localStorage.authKey, {
				})
			  	.then(function (response) {
			  		console.log(response)
			    	self.flightList=response;
				})
			  	.catch(function (error) {
			    	console.log(error);
				});
	    	} else {
	    		router.go('/login')
	    	}
    	},
    	logoutAttempt(){
    		localStorage.removeItem("authkey");
    		router.go('/login')
    	}  
  	},
	template:`<div><button v-on:click="logoutAttempt">Logout</button><select v-model="currentFlightIndex" >
  		<option v-for="(flight,index) in flightList.data.bookings" v-bind:value="index">{{flight.flightNo}}</option>
		</select>
		<flight-info :flights="flightList.data.bookings" :current-flight-index="currentFlightIndex"></flight-info>
		<flight-msg :flights="flightList.data.bookings" :current-flight-index="currentFlightIndex"></flight-msg>
		</div>`
});
var flightMessages=Vue.component(`flight-msg`,{
	props:['flights','currentFlightIndex'],
	template:`<ul>
	<li v-for="msg in flights[currentFlightIndex].msg">{{msg}}</li>
	</ul>`
})
var flightInfo=Vue.component(`flight-info`,{
	props:['flights','currentFlightIndex'],
	template:'<h2>start:{{flights[currentFlightIndex].sourceName}} end:{{flights[currentFlightIndex].destinationName}}</h2>'
});

const Login = { 
	template: '#login-template',
	methods: {
    	loginAttempt: function () {
      		const email=document.getElementById("email").value;
      		const password=document.getElementById("password").value;
      		$.post("https://krkfans.herokuapp.com/api/login", {email: 'dey7.kol@gmail.com',
			    	password: 'abcd1234'}, function(result){
        		if(result){
        			localStorage.setItem("authKey", result.authKey);
        		}else{	
        		}
    		});
      		/*axios({
      			method:'post',
      			url:'https://krkfans.herokuapp.com/api/login',
			    
			    data:{
			    	email: 'dey7.kol@gmail.com',
			    	password: 'abcd1234'
			    },
			    headers: {
        			'Content-Type': 'application/json'
    			}
			  })
			  .then(function (response) {
			    console.log(response);
			  })
			  .catch(function (error) {
			    console.log(error);
			  });*/
      		//console.log(email+" "+password);
    	}
  	} 
}
const routes = [
  { path: '/dashboard', component: mainContainer },
  { path: '/login', component: Login }
]
const router = new VueRouter({
  routes // short for routes: routes
});
var app = new Vue({
  router
}).$mount('#app')