let map=L.map('map')
.setView([20.5937,78.9629],5)

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
).addTo(map)

let currentLat
let currentLon

navigator.geolocation.watchPosition(pos=>{

currentLat=pos.coords.latitude

currentLon=pos.coords.longitude

map.setView(
[currentLat,currentLon],
16
)

})
