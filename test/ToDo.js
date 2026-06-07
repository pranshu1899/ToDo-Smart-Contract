import { expect } from "chai";
import { network } from "hardhat";

describe("ToDo", function () {

    async function deployFixture() {
        const { ethers } = await network.connect();

        const ToDo = await ethers.getContractFactory("ToDo");
        const todo = await ToDo.deploy();

        return { todo };
    }

    it("Should create a task", async function () {
        const { todo } = await deployFixture();

        await todo.createTask("Learn Solidity");

        const tasks = await todo.getTask();

        expect(tasks.length).to.equal(1);
        expect(tasks[0].content).to.equal("Learn Solidity");
        expect(tasks[0].completed).to.equal(false);
    });

});