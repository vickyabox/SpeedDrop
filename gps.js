let currentLat=0
let currentLng=0

function lockExactLocation(){

navigator.geolocation.getCurrentPosition(

pos=>{

currentLat=pos.coords.latitude
currentLng=pos.coords.longitude

alert("Location Locked")

},

err=>{

alert("GPS Error")

},

{enableHighAccuracy:true}

)

}
