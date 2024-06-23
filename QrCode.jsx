import { useState } from "react"


export const QrCode = () => {
  const[img,setImg]=useState("");
  const[loading,setLoading]=useState(false);
  const[qrData,setQrData]=useState("Data");
  const[qrSize,setQrSize]=useState("150");
  async function hello(){
    setLoading(true);
    try{
      const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
      setImg(url);
    }catch(error){
      console.log("Error Generating Qr Code",error);
    }
    finally{
      setLoading(false)
    }
  }
  function dqr(){
   fetch(img).then((response)=>response.blob()).then((blob)=>{
      const link=document.createElement("a");
      link.href=URL.createObjectURL(blob);
      link.download="qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
   });
  }
  return (
    <div className="app-container">
      <h1>QR CODE GENERATER</h1>
      {loading &&<p>Please Wait...</p>}
      { img &&<img src={img} alt="" className="qr-code-image"/>}
    <div>
        <label htmlFor="dataInput" className="input-label">Data for QR code</label>
        <input type="text" id="dataInput" value={qrData} onChange={(e)=>setQrData(e.target.value)}></input>
        <label htmlFor="sizeInput" className="input-label">
            Image size
        </label>
        <input type="text" id="sizeInput" value={qrSize} onChange={(e)=>setQrSize(e.target.value)}></input>
        <button className="generate-button" onClick={hello} disabled={loading}>Generate QR code</button>
        <button className="download-button" onClick={dqr} >Download QR code</button>
    </div>
    <p className="footer">Designed by <a>vallimayil</a></p>
    </div>
  )
}


