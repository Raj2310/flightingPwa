export const saveBookingToLocal= function(bookingdata){
  console.log(typeof bookingdata);
  localStorage.bookingdata=JSON.stringify(bookingdata);
    console.log(typeof localStorage.bookingdata);
}