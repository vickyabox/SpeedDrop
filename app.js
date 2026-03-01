let map = L.map('map').setView([20.5937, 78.9629], 5);
let parcels = [];
let markers = [];

let normal = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
let satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}');
normal.addTo(map);

L.control.layers({
  "Normal": normal,
  "Satellite": satellite
}).addTo(map);

navigator.geolocation.watchPosition(position => {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  map.setView([lat, lon], 15);
  L.marker([lat, lon]).addTo(map).bindPopup("You are here").openPopup();
});

function addParcel() {
  let address = document.getElementById("address").value;
  if(!address) return;

  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`)
  .then(res => res.json())
  .then(data => {
    if(data.length === 0) return alert("Address not found");

    let lat = parseFloat(data[0].lat);
    let lon = parseFloat(data[0].lon);

    let number = parcels.length + 1;
    parcels.push({address, lat, lon});

    let marker = L.marker([lat, lon]).addTo(map)
      .bindPopup(number + ". " + address);
    markers.push(marker);

    document.getElementById("parcelList").innerHTML +=
      `<li>${number}. ${address}</li>`;

    map.setView([lat, lon], 15);
  });
}
