import { ethers } from "ethers";
import fs from "fs";

async function main() {

    // Provider
    const provider = new ethers.JsonRpcProvider(
        "http://127.0.0.1:8545"
    );

    // wallet
    const wallet = new ethers.Wallet(
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
        provider
    );

    //ABI 
    const artifact = JSON.parse(
        fs.readFileSync(
            "./artifacts/contracts/ToDo.sol/ToDo.json",
            "utf8"
        )
    );
    const abi = artifact.abi;
        
    // comtract object
    const todo = new ethers.Contract(
        "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        abi,
        wallet 
    );

   console.log(
  "Nonce:",
  await provider.getTransactionCount(wallet.address)
);

    //writing functions
    const tx1 = await todo.createTask("learn ethers");
    
    console.log("Transaction Sent...");
    console.log(tx1.hash);

    await tx1.wait();

    console.log("Transaction Confirmed!!");

   

   
    const tasks = await todo.getTask();
    console.log(tasks);
}

main().catch((error) => {
    console.log(error);
});