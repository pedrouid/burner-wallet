import React from 'react';
import { Scaler } from "dapparatus";
import Ruler from "./Ruler";
import {CopyToClipboard} from "react-copy-to-clipboard";
const QRCode = require('qrcode.react');

export default class Advanced extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      privateKeyQr:false
    }
  }
  render(){
    let {balance, address, privateKey, changeAlert, changeView, goBack, setPossibleNewPrivateKey} = this.props

    let url = window.location.protocol+"//"+window.location.hostname
    if(window.location.port&&window.location.port!=80&&window.location.port!=443){
      url = url+":"+window.location.port
    }
    let qrSize = Math.min(document.documentElement.clientWidth,512)-90
    let qrValue = url+"/"+privateKey
    let privateKeyQrDisplay = ""
    if(this.state.privateKeyQr){
      privateKeyQrDisplay = (
        <div className="main-card card w-100">
          <div className="content qr row">
            <QRCode value={qrValue} size={qrSize}/>
          </div>
        </div>
      )
    }

    return (
      <div style={{marginTop:20}}>
        <div className="main-card card w-100">
          <div className="content qr row">
            <div style={{width:"100%",textAlign:"center",padding:20}}>
              {address}
            </div>
            <QRCode value={address} size={qrSize}/>
          </div>
        </div>
        <div className="main-card card w-100">
          <div className="content ops row">
            <div className="col-6 p-1">

                <input type="text" className="form-control" placeholder="private key" value={this.state.newPrivateKey}
                       onChange={event => this.setState({newPrivateKey:event.target.value})} />
            </div>
            <div className="col-6 p-1">
              <button className="btn btn-large w-100" style={{whiteSpace:"nowrap"}}
                      onClick={()=>{
                        //let pkutils = require("ethereum-mnemonic-privatekey-utils")
                        //const newPrivateKey = pkutils.getPrivateKeyFromMnemonic(newPrivateKey)
                        changeView('main')
                        let possibleNewPrivateKey = this.state.newPrivateKey
                        if(possibleNewPrivateKey.indexOf("0x")!=0){
                          possibleNewPrivateKey = "0x"+possibleNewPrivateKey
                        }
                        setPossibleNewPrivateKey(possibleNewPrivateKey)
                      }}>
                <Scaler config={{startZoomAt:500,origin:"0% 50%"}}>
                  <i className="fas fa-plus-square"/> Create Wallet
                </Scaler>
              </button>
            </div>
          </div>
        </div>
        <div className="main-card card w-100">
          <div className="content ops row">
            <div className="col-6 p-1">
            <input type="text" className="form-control" placeholder="seed phrase" value={this.state.newSeedPhrase}
                   onChange={event => this.setState({newSeedPhrase:event.target.value})} />
            </div>
            <div className="col-6 p-1">
              <button className="btn btn-large w-100" style={{whiteSpace:"nowrap"}}
                      onClick={()=>{
                        let pkutils = require("ethereum-mnemonic-privatekey-utils")
                        const newPrivateKey = pkutils.getPrivateKeyFromMnemonic(this.state.newSeedPhrase)
                        changeView('main')
                        setPossibleNewPrivateKey("0x"+newPrivateKey)
                      }}>
                <Scaler config={{startZoomAt:500,origin:"0% 50%"}}>
                  <i className="fas fa-plus-square"/> Create Wallet
                </Scaler>
              </button>
            </div>
          </div>
        </div>
        <div className="main-card card w-100">
          {privateKey &&
          <div>
            <div className="content ops row">
              <CopyToClipboard text={privateKey}>
                <div className="col-6 p-1"
                     onClick={() => changeAlert({type: 'success', message: 'Private Key copied to clipboard'})}>
                  <button className="btn btn-large w-100" style={{whiteSpace:"nowrap"}}>
                    <Scaler config={{startZoomAt:650,origin:"0% 50%"}}>
                      <i className="fas fa-save"/> Copy Private Key
                    </Scaler>
                  </button>
                </div>
              </CopyToClipboard>
              <div className="col-6 p-1">
                <button className="btn btn-large w-100" style={{whiteSpace:"nowrap"}}
                        onClick={()=>{
                          console.log("BALANCE",balance)
                          changeView('burn-wallet')
                        }}>
                  <Scaler config={{startZoomAt:500,origin:"0% 50%"}}>
                    <i className="fas fa-fire"/> Burn Wallet
                  </Scaler>
                </button>
              </div>
            </div>
          </div>
          }
        </div>
        <div className="main-card card w-100">
          {privateKey &&
          <div>
            <div className="content ops row">
                <div className="col-12 p-1"
                     onClick={() => {
                       this.setState({privateKeyQr:!this.state.privateKeyQr})
                     }}>
                  <button className="btn btn-large w-100" style={{whiteSpace:"nowrap"}}>
                    <Scaler config={{startZoomAt:650,origin:"0% 50%"}}>
                      <i className="fas fa-qrcode"/> Show Private Key QR Code
                    </Scaler>
                  </button>
                </div>
                {privateKeyQrDisplay}
            </div>
          </div>
          }
        </div>
        <div className="text-center bottom-text">
          <span style={{padding:10}}>
            <a href="#" style={{color:"#FFFFFF"}} onClick={goBack}>
              <i className="fas fa-times"/> done
            </a>
          </span>
        </div>
      </div>
    )
  }
}
