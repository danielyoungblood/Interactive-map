let myLatLong = []; //this is a global variable named myLatLong, it is array consisting of two values- latitude and longitude

//function having name getLocationOnMap, called by click event in browser, onClick attribute of input tag
async function getLocationOnMap(businessType) {
  if (navigator.geolocation) {
    //the following line defines a variable whose name is businesses, which contains an array of 5 businesses returned by the getBusiness function
    let businesses = await getBusinesses(businessType);
    console.log(businesses);

    //adding markers for each business, each business is stored in a array
    for (i = 0; i < businesses.length; i++) {
      var marker = L.marker([
        businesses[i].geocodes.main.latitude,
        businesses[i].geocodes.main.longitude,
      ]).addTo(map);
      marker.addTo(map).bindPopup(businesses[i].name).openPopup();
    }
  } else {
    document.getElementById("map").innerHTML =
      "Geolocation is not supported by this browser.";
  }
}

//function having name getCoords, called by getLocationOnMap function
async function getCoords() {
  let location = await new Promise((myResolve, myReject) => {
    //navigator.geolocation.getCurrentPosition then passes control to the function showPosition
    //a coordinates object is automatically passed to the showPosition function
    navigator.geolocation.getCurrentPosition(myResolve);
  });
  return [location.coords.latitude, location.coords.longitude]; //returns the latitude and longitude to what calls getCoords()
}

async function getBusinesses(businessType) {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "fsq3eU3OqKd/q8GcauAsN9hq5kyGZAYo74ey1TWxeCibwW8=",
    },
  };

  var url = `https://api.foursquare.com/v3/places/search?&query=${businessType}&ll=${myLatLong[0]}%2C${myLatLong[1]}&radius=30000&limit=5`;
  console.log(url);

  const response = await fetch(url, options);
  const data = await response.text();
  var businesses = JSON.parse(data);
  console.log(businesses.results);
  return businesses.results;
}

window.onload = async () => {
  myLatLong = await getCoords(); // waiting on getCoords function to complete.
  map = L.map("map").setView([myLatLong[0], myLatLong[1]], 13); //initilizing the variable map using L.map leaflet API

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  //in the following line, myLatLong[0] is replaced with an actual number and myLatLong[1] is replaced with an actual number
  //so whats passed to marker is an array indicated by the two brackets with consisting of two numbers
  var marker = L.marker([myLatLong[0], myLatLong[1]]);
  marker.addTo(map).bindPopup("<b>You are here!</b>").openPopup();
};
