# Blockchain To-Do List Smart Contract

A decentralized To-Do List application built with Solidity. This project allows users to create, manage, complete, and delete tasks directly on the blockchain while maintaining separate task lists for each wallet address.

## Features

* Create new tasks
* Mark tasks as completed
* Delete existing tasks
* Retrieve all tasks associated with a wallet
* Unique task IDs for each task
* User-specific task storage using mappings
* Custom error handling for invalid operations

## Smart Contract Structure

### Task

Each task contains:

```solidity
struct Task {
    uint256 id;
    string content;
    bool completed;
}
```

### Storage

Tasks are stored separately for each user:

```solidity
mapping(address => Task[]) private userTasks;
```

This ensures that every wallet address can access only its own tasks.

## Functions

### addTask()

Creates a new task.

```solidity
addTask(string memory _content)
```

### completeTask()

Marks a task as completed.

```solidity
completeTask(uint256 taskId)
```

### deleteTask()

Deletes a task using the swap-and-pop technique for gas efficiency.

```solidity
deleteTask(uint256 taskId)
```

### getTasks()

Returns all tasks belonging to the caller.

```solidity
getTasks()
```

## Concepts Used

* Structs
* Mappings
* Dynamic Arrays
* msg.sender
* Storage vs Memory
* Custom Errors
* Array Manipulation
* Swap-and-Pop Deletion
* Function Visibility
* State Variables

## Tech Stack

* Solidity
* Hardhat
* Ethers.js
* Chai
* Mocha

## Project Structure

```text
├── contracts
│   └── ToDoList.sol
│
├── test
│   └── ToDoList.js
│
├── scripts
│
├── hardhat.config.js
│
└── README.md
```

## Running Locally

Install dependencies:

```bash
npm install
```

Compile the contract:

```bash
npx hardhat compile
```

Run tests:

```bash
npx hardhat test
```

Start a local Hardhat node:

```bash
npx hardhat node
```

## Future Improvements

* Task editing
* Task priorities
* Categories and tags
* Timestamps
* Event emissions
* Pagination
* Frontend integration with React and Ethers.js
* Deployment to Sepolia Testnet

## Learning Outcomes

This project was built to strengthen understanding of Solidity fundamentals, smart contract design, state management, mappings, arrays, and Hardhat-based development workflows.

## License

MIT License
