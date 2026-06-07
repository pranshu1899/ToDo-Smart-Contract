import { expect } from "chai";
import { network } from "hardhat";

describe("ToDo Contract", function () {

    let todo;
    let owner;
    let user2;
    let ethers;

    beforeEach(async function () {

        ({ ethers } = await network.connect());

        const ToDo = await ethers.getContractFactory("ToDo");

        [owner, user2] = await ethers.getSigners();

        todo = await ToDo.deploy();
        await todo.waitForDeployment();
    });

    it("Should create a task", async function () {
        await todo.createTask("Learn Solidity");

        const tasks = await todo.getTask();

        expect(tasks.length).to.equal(1);
        expect(tasks[0].content).to.equal("Learn Solidity");
    });

});