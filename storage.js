function getParcels(){

return JSON.parse(
localStorage.getItem("parcels")
)||[]

}

function saveParcels(data){

localStorage.setItem(
"parcels",
JSON.stringify(data)
)

}

function exportData(){

let data=localStorage.getItem("parcels")

let blob=new Blob(
[data],
{type:"application/json"}
)

let a=document.createElement("a")

a.href=URL.createObjectURL(blob)

a.download="speeddrop_backup.json"

a.click()

}

function importData(input){

let file=input.files[0]

let reader=new FileReader()

reader.onload=function(){

localStorage.setItem(
"parcels",
reader.result
)

renderList()

}

reader.readAsText(file)

}
