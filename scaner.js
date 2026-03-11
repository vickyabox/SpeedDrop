const codeReader=new ZXing.BrowserMultiFormatReader()

function startScanner(){

codeReader.decodeFromVideoDevice(null,'video',(result,err)=>{

if(result){

saveParcel(result.text,currentLat,currentLng)

alert("Parcel Scanned")

}

})

}
