function addParcel(){

let name=prompt("Customer Name")

let address=prompt("Address")

let parcel={
name,
address,
lat:currentLat,
lon:currentLon,
photo:""
}

let list=getParcels()

list.push(parcel)

saveParcels(list)

renderList()

}

function renderList(){

let list=getParcels()

let html=""

list.forEach((p,i)=>{

html+=`

<div class="parcel"><b>${p.name}</b><br>

${p.address}

${p.photo?"<img src="${p.photo}">":""}

<br><button onclick="takePhoto(${i})">
Photo
</button><button onclick="navigate(${i})">
Navigate
</button><button onclick="deleteParcel(${i})">
Delete
</button></div>`

})

document.getElementById(
"parcelList"
).innerHTML=html

}

function navigate(i){

let p=getParcels()[i]

window.open(
"https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lon}"
)

}

function deleteParcel(i){

let list=getParcels()

list.splice(i,1)

saveParcels(list)

renderList()

}

renderList()
