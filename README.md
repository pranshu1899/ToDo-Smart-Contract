# Decentralized ToDo DApp

A full-stack decentralized ToDo application built using Solidity, Hardhat, Ethers.js, React, and MetaMask.

This project was developed as a hands-on learning journey to understand the complete blockchain application lifecycle, from smart contract development and deployment to frontend integration and real user interaction through MetaMask.

---

## Features

### Task Management

* Create Tasks
* Update Task Content
* Delete Tasks
* Toggle Task Completion Status

### Task Analytics

* View Total Tasks
* View Completed Tasks
* View Pending Tasks

### User Isolation

Each wallet address maintains its own independent task list.

```solidity
mapping(address => Task[]) private userTasks;
```

Only the owner of a task list can access and modify their tasks.

---

## Smart Contract Architecture

### Task Structure

```solidity
struct Task {
    uint256 id;
    string content;
    bool completed;
}
```

### Storage Design

```solidity
mapping(address => Task[]) private userTasks;
```

### Events

```solidity
event TaskCreated(
    uint256 id,
    string content
);
```

Used to notify the frontend whenever a new task is created.

### Custom Errors

```solidity
error TaskNotFound();
```

Custom errors are used instead of revert strings to reduce gas consumption.

---

## Tech Stack

### Smart Contracts

* Solidity ^0.8.20

### Development Environment

* Hardhat 3
* TypeScript

### Blockchain Interaction

* Ethers.js v6

### Frontend

* React
* JavaScript

### Wallet Integration

* MetaMask

---

## Smart Contract Functions

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

Switches a task between completed and pending.

#### Update Task

```solidity
updateTask(
    uint256 taskId,
    string memory newContent
)
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

Returns total task count.

#### Get Completed Tasks

```solidity
getCompletedTasks()
```

Returns completed task count.

#### Get Pending Tasks

```solidity
getPendingTasks()
```

Returns pending task count.

---

## Frontend Features

### Wallet Connection

Users can connect their MetaMask wallet directly from the React frontend.

### Task Creation

Users can create tasks through the UI.

### Task Editing

Tasks can be updated without interacting directly with the contract.

### Task Deletion

Tasks can be removed from the frontend.

### Task Completion

Tasks can be marked as completed or pending using a toggle button.

### Statistics Dashboard

The frontend displays:

* Total Tasks
* Completed Tasks
* Pending Tasks

### Event Listening

The frontend listens for contract events using Ethers.js:

```javascript
contract.on("TaskCreated", ...)
```

This provides real-time feedback when new tasks are created.

---

## What I Learned

### Solidity

* Structs
* Mappings
* Dynamic Arrays
* Storage vs Memory
* Custom Errors
* Events
* msg.sender
* CRUD Smart Contract Design

### Hardhat

* Project Setup
* Compilation
* Deployment Scripts
* Local Blockchain Node
* Contract Testing Workflow

### Ethers.js

* Providers
* BrowserProvider
* Wallets
* Signers
* Contract Factories
* Contract Deployment
* Contract Objects
* Read Operations
* Write Operations
* Transaction Responses
* Transaction Receipts
* Event Reading
* Event Listening
* tx.wait()
* BigInt Handling
* Nonce Basics

### React + Web3

* React State Management
* MetaMask Integration
* Wallet Connection Flow
* Smart Contract Interaction
* Dynamic UI Updates
* Event-Driven Updates

### Blockchain Concepts

* Transaction Lifecycle
* State Changes
* Mempool
* Block Confirmation
* Contract Deployment Flow
* Event Logs
* Transaction Receipts
* Frontend ↔ Smart Contract Communication

---

## Local Development

Start local blockchain:

```bash
npx hardhat node
```

Deploy contract:

```bash
npx tsx scripts/deploy.ts
```

Run frontend:

```bash
npm run dev
```

---

## Future Improvements

* Hardhat Unit Tests
* Gas Optimization
* Sepolia Deployment
* Vercel Deployment
* Task Priority System
* Task Categories
* Due Dates
* Responsive UI Design
* Advanced Event Handling

---

## Project Outcome

This project helped me understand the complete workflow of building a decentralized application:

```text
Smart Contract
      ↓
Compilation
      ↓
Deployment
      ↓
Ethers.js Interaction
      ↓
MetaMask Integration
      ↓
React Frontend
      ↓
Real User Interaction
```

The goal was not simply to build a ToDo application, but to gain practical experience in full-stack Web3 development and understand how blockchain applications work end-to-end.
