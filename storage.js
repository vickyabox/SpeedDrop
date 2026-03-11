function saveParcel(code,lat,lng){

let parcels = JSON.parse(localStorage.getItem("parcels")||"[]")

parcels.push({
code:code,
lat:lat,
lng:lng,
time:Date.now()
})

localStorage.setItem("parcels",JSON.stringify(parcels))

renderParcels()

}

function renderParcels(){

let list=document.getElementById("parcelList")

list.innerHTML=""

let parcels=JSON.parse(localStorage.getItem("parcels")||"[]")

parcels.forEach((p,i)=>{

let li=document.createElement("li")

li.innerText="Parcel "+(i+1)+" : "+p.code

list.appendChild(li)

})

}
