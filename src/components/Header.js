import React from 'react';
import { Scaler, Blockie } from "dapparatus";
export  default ({balance, address, changeView, view}) => {
  let actionWord = "Send"
  if(balance<=0){
    actionWord = "Scan"
  }

  let topRight = (
    <div style={{position:"fixed",right:20,top:20,zIndex:1,cursor:"pointer"}} onClick={() => changeView('send_by_scan')} >
      <button className="btn btn-large w-100" style={{backgroundColor:"#FFFFFF",border:"3px solid #8762A6"}}>
        <a href="#" style={{color:"#8762A6"}}>
          <span style={{paddingRight:10,fontSize:22,paddingBottom:10}}>
            {actionWord}
          </span>
          <i className="fas fa-camera" />
        </a>
      </button>
    </div>
  )
  if(view=="bridge"){
    topRight = (
      <div style={{position:"absolute",right:0,top:-10,zIndex:1,cursor:"pointer"}}  >
        <a href={"https://blockscout.com/poa/dai/address/"+address+"/transactions"} target="_blank" style={{color:"#FFFFFF"}}>
        <Scaler config={{startZoomAt:1000,origin:"100% 100%",adjustedZoom:1}}>
        <div style={{position:"absolute",right:70,top:20}}>
          {address}
        </div>
        <div>
          <Blockie
            address={address}
            config={{size:7}}
           />
        </div>
        </Scaler>
        </a>
      </div>
    )
  }


  return (
    <div className="header">
      <Scaler config={{startZoomAt:600,origin:"0% 0%",adjustedZoom:1}}>
        <a href="#" style={{color:"#FFFFFF"}} onClick={()=>{
          changeView('main')
        }}>
          <i className="fas fa-fire" />
          <span style={{paddingLeft:10}}>Burner Wallet</span>
        </a>
      </Scaler>
      {topRight}
    </div>
  )
};
