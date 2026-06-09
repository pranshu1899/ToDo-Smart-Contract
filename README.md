# ToDo Smart Contract

A decentralized ToDo application built with Solidity, Hardhat, TypeScript, and Ethers.js. This project was created to learn the complete smart contract development workflow, from writing and deploying contracts to interacting with them using Ethers.js.

## Features

### Task Management

* Create new tasks
* Update existing tasks
* Delete tasks
* Toggle task completion status

### Task Retrieval

* Get all tasks of a user
* Get a task by ID
* Get total task count
* Get completed task count
* Get pending task count

### User Isolation

Each user's tasks are stored separately using:

```solidity
mapping(address => Task[]) private userTasks;
```

Only the owner of a task list can access and modify their tasks.

---

## Smart Contract Structure

### Task Struct

```solidity
struct Task {
    uint256 id;
    string content;
    bool completed;
}
```

### Storage

```solidity
mapping(address => Task[]) private userTasks;
```

---

## Tech Stack

### Blockchain

* Solidity ^0.8.20

### Development Environment

* Hardhat 3
* TypeScript

### Web3 Library

* Ethers.js v6

---

## Functions

### Write Functions

#### Create Task

```solidity
createTask(string memory _content)
```

Creates a new task.

#### Toggle Task Status

```solidity
toggleTask(uint256 taskId)
```

Marks a task as completed or pending.

#### Update Task

```solidity
updateTask(uint256 taskId, string memory newContent)
```

Updates task content.

#### Delete Task

```solidity
deleteTask(uint256 taskId)
```

Removes a task from storage.

---

### Read Functions

#### Get All Tasks

```solidity
getTask()
```

Returns all tasks belonging to the caller.

#### Get Task By ID

```solidity
getTaskById(uint256 taskId)
```

Returns a specific task.

#### Get Total Tasks

```solidity
getTotalTasks()
```

Returns total number of tasks.

#### Get Completed Tasks

```solidity
getCompletedTasks()
```

Returns number of completed tasks.

#### Get Pending Tasks

```solidity
getPendingTasks()
```

Returns number of pending tasks.

---

## Custom Errors

```solidity
error TaskNotFound();
```

Used instead of revert strings to reduce gas costs.

---

## What I Learned

### Solidity

* Structs
* Mappings
* Dynamic Arrays
* Storage vs Memory
* Custom Errors
* msg.sender
* CRUD Operations

### Hardhat

* Project Setup
* Compilation
* Local Blockchain Node
* Deployment Scripts

### Ethers.js

* Providers
* Wallets
* Signers
* ABI and Bytecode
* Contract Factory
* Contract Deployment
* Contract Objects
* Read Functions
* Write Functions
* Transaction Responses
* tx.wait()
* BigInt Handling
* Nonce Basics

### Blockchain Concepts

* Transaction Lifecycle
* Mempool
* Block Confirmation
* Contract Deployment Flow
* State Changes
* Smart Contract Interaction

---

## Deployment

Start local blockchain:

```bash
npx hardhat node
```

Deploy contract:

```bash
npx tsx scripts/deploy.ts
```

Interact with deployed contract:

```bash
npx tsx scripts/interact.ts
```

---

## Future Improvements

* Event Emission
* Unit Tests
* Gas Optimization
* Frontend Integration (React)
* MetaMask Connection
* Task Priority System
* Task Categories
* Due Dates
* On-chain Analytics

---

## Project Goal

The goal of this project is not only to build a ToDo application but also to gain a deep understanding of smart contract development, deployment, and interaction using Ethers.js and Hardhat.
