import React from 'react';
import { Scaler } from "dapparatus";
import Ruler from "./Ruler";
import {CopyToClipboard} from "react-copy-to-clipboard";

export default ({changeView}) => {
  return (
    <div className="main-card card w-100">
      <div className="content bridge row">
        <div className="col-6 p-1">
          <button className="btn btn-large w-100" style={{whiteSpace:"nowrap"}} onClick={()=>{
            changeView('bridge')}
          }>
            <Scaler config={{startZoomAt:500,origin:"40% 50%"}}>
              <i className="far fa-money-bill-alt"></i> Exchange
            </Scaler>
          </button>
        </div>
        <div className="col-6 p-1">
        <button className="btn btn-large w-100" style={{whiteSpace:"nowrap"}} onClick={()=>{
          changeView('request_funds')}
        }>
          <Scaler config={{startZoomAt:500,origin:"40% 50%"}}>
            <i className="fas fa-hand-holding-usd"></i> Request
          </Scaler>
        </button>
        </div>
      </div>
    </div>
  )
}
