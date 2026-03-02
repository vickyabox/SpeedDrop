let map = L.map('map').setView([20.5937,78.9629],5);
let normal = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
let satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}');
normal.addTo(map);

L.control.layers({
  "Normal": normal,
  "Satellite": satellite
}).addTo(map);

let currentLat = null;
let currentLon = null;
let savedData = JSON.parse(localStorage.getItem("speeddrop")) || {};
let marker = null;

navigator.geolocation.watchPosition(pos=>{
  currentLat = pos.coords.latitude;
  currentLon = pos.coords.longitude;
  map.setView([currentLat,currentLon],16);
});

function startScan(){
  const qr = new Html5Qrcode("reader");
  qr.start({ facingMode:"environment" }, { fps:10, qrbox:250 },
  barcode=>{
    document.getElementById("personName").value = barcode;
    qr.stop();
    loadSaved(barcode);
  });
}

function lockLocation(){
  let name = document.getElementById("personName").value;
  if(!name || !currentLat) return alert("Scan or enter name first");

  savedData[name] = {lat:currentLat, lon:currentLon};
  localStorage.setItem("speeddrop", JSON.stringify(savedData));
  alert("Location Locked");
  showMarker(currentLat,currentLon);
}

function unlockLocation(){
  let name = document.getElementById("personName").value;
  delete savedData[name];
  localStorage.setItem("speeddrop", JSON.stringify(savedData));
  alert("Unlocked");
}

function loadSaved(name){
  if(savedData[name]){
    let lat = savedData[name].lat;
    let lon = savedData[name].lon;
    showMarker(lat,lon);
    calculateDistance(lat,lon);
  }
}

function showMarker(lat,lon){
  if(marker) map.removeLayer(marker);
  marker = L.marker([lat,lon]).addTo(map);
  map.setView([lat,lon],18);
}

function calculateDistance(lat,lon){
  let R = 6371e3;
  let φ1 = currentLat*Math.PI/180;
  let φ2 = lat*Math.PI/180;
  let Δφ = (lat-currentLat)*Math.PI/180;
  let Δλ = (lon-currentLon)*Math.PI/180;

  let a = Math.sin(Δφ/2)*Math.sin(Δφ/2) +
  Math.cos(φ1)*Math.cos(φ2) *
  Math.sin(Δλ/2)*Math.sin(Δλ/2);
  let c = 2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));

  let d = R*c;
  document.getElementById("distance").innerText =
  "Distance: "+Math.round(d)+" meters";
}

function openGoogleNav(){
  let name = document.getElementById("personName").value;
  if(savedData[name]){
    let lat = savedData[name].lat;
    let lon = savedData[name].lon;
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`);
  }
}
