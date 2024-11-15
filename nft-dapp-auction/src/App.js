import React, { useState } from "react";
import { ethers } from "ethers";
import $u from "./utils/$u.js";
import contractERC1155 from "./artifacts/contracts/contractERC1155.sol/contractERC1155.json"

const ButtonState = { Normal: 0, Loading: 1, Disabled: 2 };

const contractERC1155Address = 0x5fbdb2315678afecb367f032d93f642f64180aa3;

const App = () => {
  const [account, setAccount] = useState(null);
  const [metamaskButtonState, updateMetamaskButtonState] = useState(ButtonState.Normal);

  async function fetchMint(params) {
    if(typeof window.ethereum !== "undefined"){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const mint = new ethers.Contract(contractERC1155Address,contractERC1155.abi , provider)
      try{
        const data = await mint.mint;
      }catch(error){
        console.log("Error",error )
      }
    }
  }

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

  const Navbar = () => (
    <nav
      className="navbar navbar-dark bg-dark"
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 20px",
      }}
    >
      <div>
        <h5 className="text-light">NFT Dapp Auction</h5>
      </div>
      {account ? (
        <div style={{ textAlign: "right" }}>
          <span className="text-light" style={{ fontWeight: "bold" }}>
            {account.address.slice(0, 10)}...
          </span>
          <br />
          <span className="text-light small">
            {account.balance.slice(0, 10)} ETH
          </span>
        </div>
      ) : (
        <button
          onClick={connectMetamask}
          className="btn btn-primary"
          disabled={metamaskButtonState === ButtonState.Disabled}
        >
          {metamaskButtonState === ButtonState.Loading ? "Connecting..." : "Connect MetaMask"}
        </button>
      )}
    </nav>
  );

  const PostLoginPage = () => (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Welcome</h1>
      <div>
        <button
          onClick={() => alert("Mint Bond clicked!")}
          className="btn btn-success"
          style={{ margin: "10px" }}
        >
          Mint Bond
        </button>
        <button
          onClick={() => alert("Mint Share clicked!")}
          className="btn btn-warning"
          style={{ margin: "10px" }}
        >
          Mint Share
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <Navbar />
      {account ? <PostLoginPage /> : (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
          <h1>Connect to MetaMask</h1>
        </div>
      )}
    </div>
  );
};

export default App;
