let activeParcelIndex=null
let cameraStream=null

async function takePhoto(i){

activeParcelIndex=i

document.getElementById(
"cameraBox"
).style.display="block"

cameraStream=
await navigator.mediaDevices.getUserMedia({

video:{
facingMode:"environment"
}

})

document.getElementById(
"video"
).srcObject=cameraStream

}

function captureNow(){

let video=document.getElementById("video")

let canvas=document.createElement("canvas")

canvas.width=video.videoWidth
canvas.height=video.videoHeight

let ctx=canvas.getContext("2d")

ctx.drawImage(video,0,0)

let img=canvas.toDataURL("image/png")

let list=getParcels()

list[activeParcelIndex].photo=img

saveParcels(list)

cameraStream.getTracks().forEach(
t=>t.stop()
)

document.getElementById(
"cameraBox"
).style.display="none"

renderList()

}
