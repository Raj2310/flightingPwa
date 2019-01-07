import router from '../router.js'
import Vue from '../lib/vue'
const mainContainer = Vue.component('left-sidebar', {
    data: function () {
        return {
            currentFlightIndex: 0,
            flightList: {}
        };
    },
    created() {
        this.fetchItem()
    },
    methods: {
        fetchItem() {
            //console.log("Local Storage",localStorage.authKey);
            if (localStorage.authKey) {
                var self = this;
                if (localStorage.bookingdata) {
                    console.log(localStorage.bookingdata);
                    self.flightList = JSON.parse(localStorage.bookingdata);
                }
                try {
                    axios.get('https://udankhatola.herokuapp.com/api/userFlightsInfo/' + localStorage.authKey, {})
                        .then(function (response) {
                            console.log(response)
                            self.flightList = response;
                            saveBookingToLocal(response)
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } catch (e) {

                }
            } else {
                router.replace('/login')
            }
        },
        logoutAttempt() {
            localStorage.removeItem("authKey");
            console.log("After deletion", localStorage.authKey);
            router.go('/login')
        }
    },
    template: "#mainContainer-template"
});
router.addRoutes([{
    path: '/dashboard',
    component: mainContainer
}]);

export default mainContainer;