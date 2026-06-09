import { ethers } from "ethers";
import fs from "fs";

async function main(){

    // Provider
    const provider = new ethers.JsonRpcProvider(
        "http://127.0.0.1:8545"
    );

    // Wallet (Account #0 ki private key 
    const wallet = new ethers.Wallet(
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
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