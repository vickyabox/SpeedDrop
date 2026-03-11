const rec=new webkitSpeechRecognition()

rec.onresult=function(e){

let text=e.results[0][0].transcript

if(text.includes("scan")){

startScanner()

}

if(text.includes("location")){

lockExactLocation()

}

}

function startVoice(){

rec.start()

}
