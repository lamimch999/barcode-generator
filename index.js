const btn = document.querySelector(".main-content .inp-field button");

const checkb = document.querySelector(".main-content .inp-field input[type=checkbox]");

const inp = document.querySelector(".main-content .inp-field input[type=text]");


btn.addEventListener("click", function(){
    JsBarcode("#barcode", inp.value);

    if(checkb.checked){
        JsBarcode("#barcode", inp.value, {
            displayValue: false
        });
    }
})

checkb.addEventListener("click", function(){
    if(checkb.checked){
    JsBarcode("#barcode", inp.value, {
        displayValue: false
    });
}

if(checkb.checked == false){
    JsBarcode("#barcode", inp.value, {
        displayValue: true
    });
}
})



function downloadBarcode(e){
    const canvas = document.createElement("canvas");
    const svg = document.getElementById("barcode");
    const base64doc = btoa(unescape(encodeURIComponent(svg.outerHTML)));
    const w = parseInt(svg.getAttribute('width'));
    const h = parseInt(svg.getAttribute('height'));
    const img_to_download = document.createElement('img');
    img_to_download.src = 'data:image/svg+xml;base64,' + base64doc;
    console.log(w, h);
    img_to_download.onload = function () {
      console.log('img loaded');
      canvas.setAttribute('width', w);
      canvas.setAttribute('height', h);
      const context = canvas.getContext("2d");
      //context.clearRect(0, 0, w, h);
      context.drawImage(img_to_download,0,0,w,h);
      const dataURL = canvas.toDataURL('image/png');
      if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(canvas.msToBlob(), "download.png");
        e.preventDefault();
      } else {
        const a = document.createElement('a');
        const my_evt = new MouseEvent('click');
        a.download = 'download.png';
        a.href = dataURL;
        a.dispatchEvent(my_evt);
      }
  //canvas.parentNode.removeChild(canvas);
}  
}


