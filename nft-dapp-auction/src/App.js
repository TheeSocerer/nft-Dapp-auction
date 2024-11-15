import React, { useState } from "react";
import { ethers } from "ethers";
import $u from "./utils/$u.js";

const ButtonState = { Normal: 0, Loading: 1, Disabled: 2 };

const App = () => {
  const [account, setAccount] = useState(null);
  const [metamaskButtonState, updateMetamaskButtonState] = useState(ButtonState.Normal);

  const connectMetamask = async () => {
    try {
      updateMetamaskButtonState(ButtonState.Disabled);
      if (!window.ethereum) {
        alert("Please install MetaMask to use this app.");
        throw new Error("no-metamask");
      }

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const chainId = window.ethereum.networkVersion;

      if (chainId !== "11155111") {
        alert("Please switch to Sepolia Testnet");
        throw new Error("wrong-chain");
      }

      const activeAccount = accounts[0];
      let balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [activeAccount, "latest"],
      });
      balance = $u.moveDecimalLeft(ethers.BigNumber.from(balance).toString(), 18);

      const accountData = {
        chainId,
        address: activeAccount,
        balance,
      };
      setAccount(accountData);
    } catch (error) {
      console.error(error);
    } finally {
      updateMetamaskButtonState(ButtonState.Normal);
    }
  };

  const PostLoginPage = () => {
    const handleMintBond = () => {
      alert("Mint Bond button clicked!");
    };

    const handleMintShare = () => {
      alert("Mint Share button clicked!");
    };

    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h1>Welcome</h1>
        <div>
          <button onClick={handleMintBond} className="btn btn-success" style={{ margin: "10px" }}>
            Mint Bond
          </button>
          <button onClick={handleMintShare} className="btn btn-warning" style={{ margin: "10px" }}>
            Mint Share
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      {!account ? (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
          <h1>Connect to MetaMask</h1>
          <button
            onClick={connectMetamask}
            className="btn btn-primary"
            disabled={metamaskButtonState === ButtonState.Disabled}
          >
            {metamaskButtonState === ButtonState.Loading ? "Connecting..." : "Connect MetaMask"}
          </button>
        </div>
      ) : (
        <PostLoginPage />
      )}
    </div>
  );
};

export default App;

