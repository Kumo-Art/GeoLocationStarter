//-----------------Grab our HTML ELements-----------------//

const button = document.getElementById("find-me");
const status = document.getElementById("status");
const latitudeText = document.getElementById("latitude");
const longitudeText = document.getElementById("longitude");




const success = (position) => {
   console.log(position);

   const lat = position.coords.latitude;
   const lon = position.coords.longitude;

   latitudeText.textContent = lat.toFixed(2);
   longitudeText.textContent = lon.toFixed(2);
   status.textContent = "Found you !";

   getWeather(lat, lon)
}


const getWeather = async (lat, lon) => {
   const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=c000c84816aec73364c225d5e4077806`;

   const res = await fetch(url);
   const data = await res.json();
   console.log(data);
}


const error = (err) => {
   console.log(err.message);

   if(err.code === 1) {
      status.textContent = "You blocked location. Allow it and try again";
   }else {
      status.textContent = "We could'nt get your location.";
   }
}





button.addEventListener("click", () => {
    status.textContent = "Finding you....."

    //navigator.geolocation is the browsers location tool
    //getCurrentPosition asks where is the user right now?
    navigator.geolocation.getCurrentPosition(success, error);
});