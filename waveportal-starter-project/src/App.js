import { useEffect, useState } from 'react';
import React from 'react';
import Contractabi from "./WavePortal.json"
import { ethers } from "ethers";
import './App.css';

export default function App() {

  const [currentAccount, setcurrentAccount] = useState("");
  const [allWaves, setAllWaves] = useState([]);
  const [currentmessage,setMessage]=useState("");
  const ContractAddress = "0x085f18313Ded47f1DEdc364202B4599a34b2BF65";
  const ContractABI = Contractabi.abi;

  const connectWallet = async () => {
    const { ethereum } = window;
    try {
      if (ethereum) {
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        if (accounts.length !== 0) {
          let account = accounts[0];
          setcurrentAccount(account);
          alert(`Connected to the Address ${account}😎😎✅`)
        }
      }
      else {
        alert("Metamask Not Injected😥😥!!");
      }
    }
    catch (err) {
      console.log(err);
    }
  }
  const wave = async () => {
    const { ethereum } = window;

    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const WaveContract = new ethers.Contract(ContractAddress, ContractABI, signer);

        const waves = await WaveContract.wave(currentmessage);
        await waves.wait();
        

      }
      else {
        alert("Metamask Not Injected😑😑")
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  const getWaves = async () => {
    const { ethereum } = window;
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const WaveContract = new ethers.Contract(ContractAddress, ContractABI, signer);

        const waves = await WaveContract.getAllWaves();

        let wavesCleaned = []
        waves.forEach(element => {
          wavesCleaned.push({
           message: element.message,
            sender: element.sender,
            time: new Date(element.timestamp)

          });

        });

        setAllWaves(wavesCleaned);
      }
      else {
        alert("Metamask Not Injected😑😑")
      }
    }
    catch (err) {
      console.log(err)
    }
  }



  useEffect(() => {
    connectWallet();
    
  }, [])


  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">
          👋 Hey there!
        </div>

        <div className="bio">
          I am Hydra Richie and I worked on Building dapps so that's pretty cool
          right? Connect your Ethereum wallet and wave at me!
        </div>
        
       <input onChange={e => setMessage(e.target.value)} placeholder="Enter Message" />



        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>


        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
         <button className="waveButton" onClick={getWaves}>
           Details
          </button>

        {allWaves.map((wave, index) => {
          return (
            <div key={index} style={{ backgroundColor: "OldLace", marginTop: "16px", padding: "8px" }}>
              <div>Message: {wave.message}</div>
              <div>Sender: {wave.sender}</div>
            
            </div>)
        })}     

  


      </div>
    </div>
  );
}
