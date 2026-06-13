import { useState } from "react";
import { ethers } from "ethers";
import ToDoArtifact from "./contract/ToDo.json";

const abi = ToDoArtifact.abi;
const address =
"0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {

  const [wallet, setWallet] = useState("");

  //connect wallet wahi kaam karwa raha jo interact.ts karwata tha bs ab frontend and metamask ka role aa gya
  async function connectWallet() {
    const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  setWallet(accounts[0]);

  const provider = new ethers.BrowserProvider(window.ethereum);

  console.log(provider);

  const signer = await provider.getSigner();
  console.log(signer);

  const todo = new ethers.Contract(
    address,
    abi,
    signer
  );
  console.log(todo);

  const tasks = await todo.getTask();
  console.log(tasks);

  }

  return (
    <div>
      <h1>ToDo DApp</h1>

      <h3>
        Wallet: {wallet ? wallet : "Not Connected"} 
      </h3>  
{/* print iski wjh se ho r */}
      <button onClick={connectWallet}>
        Connect Wallet
      </button>
    </div>
  );
}

export default App;