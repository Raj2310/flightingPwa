import Vue from '../lib/vue';

export const flightMessages=Vue.component(`flight-msg`,{
	props:['flights','currentFlightIndex'],
	template:"#flight-msg-template"
})
export const flightInfo=Vue.component(`flight-info`,{
	props:['flights','currentFlightIndex'],
	template:"#flight-info-template"
});