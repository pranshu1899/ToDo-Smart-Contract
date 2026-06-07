import { expect } from "chai";
import hre from "hardhat";

console.log("hre =", hre);
console.log("ethers =", hre.ethers);

describe("ToDo", function () {
    let todo;
    let owner;
    let user;
    let ethers;

   beforeEach(async function () {
    const { ethers } = await hre.network.connect();

    [owner, user] = await ethers.getSigners();

    const ToDo = await ethers.getContractFactory("ToDo");

    todo = await ToDo.deploy();
    await todo.waitForDeployment();
});

    it("should create a task", async function () {
        await todo.createTask("Learn Solidity");

        const tasks = await todo.getTask();

        expect(tasks.length).to.equal(1);
        expect(tasks[0].id).to.equal(0);
        expect(tasks[0].content).to.equal("Learn Solidity");
        expect(tasks[0].completed).to.equal(false);
    });

    it("should toggle task status", async function () {
        await todo.createTask("Learn Solidity");

        await todo.toggleTask(0);

        const tasks = await todo.getTask();

        expect(tasks[0].completed).to.equal(true);
    });

    it("should update a task", async function () {
        await todo.createTask("Old Task");

        await todo.updateTask(0, "New Task");

        const tasks = await todo.getTask();

        expect(tasks[0].content).to.equal("New Task");
    });

    it("should delete a task", async function () {
        await todo.createTask("Task 1");
        await todo.createTask("Task 2");

        await todo.deleteTask(0);

        const tasks = await todo.getTask();

        expect(tasks.length).to.equal(1);
        expect(tasks[0].content).to.equal("Task 2");
    });

    it("should revert when deleting non existing task", async function () {
        await expect(
            todo.deleteTask(999)
        ).to.be.revertedWithCustomError(todo, "taskNotFound");
    });

    it("should revert when updating non existing task", async function () {
        await expect(
            todo.updateTask(999, "Test")
        ).to.be.revertedWithCustomError(todo, "taskNotFound");
    });

    it("should keep tasks separate for different users", async function () {
        await todo.createTask("Owner Task");

        await todo.connect(user).createTask("User Task");

        const ownerTasks = await todo.getTask();
        const userTasks = await todo.connect(user).getTask();

        expect(ownerTasks.length).to.equal(1);
        expect(userTasks.length).to.equal(1);

        expect(ownerTasks[0].content).to.equal("Owner Task");
        expect(userTasks[0].content).to.equal("User Task");
    });
});