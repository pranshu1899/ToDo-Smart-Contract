import { ethers } from "ethers";
import fs from "fs";
import "dotenv/config";

async function main(){

    // Provider
    const provider = new ethers.JsonRpcProvider(
         process.env.SEPOLIA_RPC_URL
    );

    // Wallet (Account #0 ki private key 
    const wallet = new ethers.Wallet(
        process.env.PRIVATE_KEY!,
        provider
    );
    
    // ABI and Bytecode from ToDo.json
    const artifact = JSON.parse(
        fs.readFileSync(
            "./artifacts/contracts/ToDo.sol/ToDo.json",
            "utf8"
        )
    );
    const abi = artifact.abi;
    const bytecode = artifact.bytecode;

    // Contract factory
    const factory = new ethers.ContractFactory(
        abi,
        bytecode,
        wallet
    );

    // Deploy 
    const todo = await factory.deploy();

    // Waiting for deployment 
    await todo.waitForDeployment();

    // Address
    console.log(todo.target);
}

main().catch((error) => {
    console.error(error);
});