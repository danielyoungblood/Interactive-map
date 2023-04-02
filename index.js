let myLatLong = [];

async function getLocationOnMap() {
  if (navigator.geolocation) {
    myLatLong = await getCoords(); // waiting on getCoords function to complete
    alert(myLatLong[0] + ", " + myLatLong[1]);
  } else {
    document.getElementById("map").innerHTML =
      "Geolocation is not supported by this browser.";
  }
}

async function getCoords() {
  let location = await new Promise((myResolve, myReject) => {
    //navigator.geolocation.getCurrentPosition then passes control to the function showPosition
    //a coordinates object is automatically passed to the showPosition function
    navigator.geolocation.getCurrentPosition(myResolve);
  });
  return [location.coords.latitude, location.coords.longitude];
}
