# 🚀 Decentralized ToDo DApp

A full-stack Web3 ToDo application built with **Solidity, Hardhat, Ethers.js, React, and MetaMask**.

This project demonstrates the complete lifecycle of a decentralized application, from smart contract development and blockchain deployment to frontend integration and real-time user interaction through MetaMask.

Unlike traditional ToDo applications, all tasks are stored and managed on-chain, giving each wallet address complete ownership of its data.

---

## ✨ Features

### 📝 Task Management

* Create Tasks
* Edit Existing Tasks
* Delete Tasks
* Toggle Task Completion Status

### 📊 Task Analytics

* Total Tasks Counter
* Completed Tasks Counter
* Pending Tasks Counter

### 👤 User-Specific Storage

Each connected wallet maintains its own independent task list.

```solidity
mapping(address => Task[]) private userTasks;
```

No user can view or modify another user's tasks.

### 🦊 MetaMask Integration

* Connect Wallet
* Sign Transactions
* Interact with Smart Contracts
* Real-Time Blockchain Updates

### ⚡ Event-Driven Updates

The frontend listens for smart contract events and updates the UI automatically without requiring page refreshes.

---

# 🏗 Architecture

```text
React Frontend
       │
       ▼
   Ethers.js
       │
       ▼
   MetaMask
       │
       ▼
 Ethereum Sepolia
       │
       ▼
 Solidity Smart Contract
```

---

# 🔗 Tech Stack

## Smart Contracts

* Solidity ^0.8.20

## Blockchain Development

* Hardhat 3
* TypeScript

## Blockchain Interaction

* Ethers.js v6

## Frontend

* React
* JavaScript
* CSS

## Wallet Integration

* MetaMask

## Network

* Ethereum Sepolia Testnet

---

# 📜 Smart Contract Design

## Task Structure

```solidity
struct Task {
    uint256 id;
    string content;
    bool completed;
}
```

## Storage

```solidity
mapping(address => Task[]) private userTasks;
```

## Events

```solidity
event TaskCreated(
    uint256 id,
    string content
);
```

Used by the frontend to receive real-time blockchain updates.

## Custom Errors

```solidity
error TaskNotFound();
```

Custom errors reduce deployment and execution gas costs compared to revert strings.

---

# ⚙ Smart Contract Functions

## Write Operations

### Create Task

```solidity
createTask(string memory _content)
```

Creates a new task.

### Toggle Task Status

```solidity
toggleTask(uint256 taskId)
```

Marks a task as completed or pending.

### Update Task

```solidity
updateTask(
    uint256 taskId,
    string memory newContent
)
```

Updates task content.

### Delete Task

```solidity
deleteTask(uint256 taskId)
```

Removes a task permanently.

---

## Read Operations

### Get All Tasks

```solidity
getTask()
```

Returns all user tasks.

### Get Task By ID

```solidity
getTaskById(uint256 taskId)
```

Returns a specific task.

### Get Total Tasks

```solidity
getTotalTasks()
```

Returns total task count.

### Get Completed Tasks

```solidity
getCompletedTasks()
```

Returns completed task count.

### Get Pending Tasks

```solidity
getPendingTasks()
```

Returns pending task count.

---

# 🖥 Frontend Capabilities

### Wallet Connection

Connect MetaMask directly from the React interface.

### Real-Time Blockchain Interaction

Perform read and write operations through Ethers.js.

### Dynamic UI Updates

The interface automatically reflects on-chain state changes.

### Event Listening

```javascript
contract.on("TaskCreated", ...)
```

The frontend listens for blockchain events and updates immediately.

---

# 🚀 Deployment

### Smart Contract

Network: Ethereum Sepolia

Contract Address:

```text
0xA191727d7f27530D404d31DD4708d81C930e6FB8
```

### Frontend

Deployed using Vercel.

```text
Add deployment URL here
```

---

# 📚 Key Concepts Learned

## Solidity

* Structs
* Mappings
* Dynamic Arrays
* Storage vs Memory
* Events
* Custom Errors
* msg.sender
* CRUD Smart Contract Design

## Hardhat

* Project Setup
* Compilation
* Deployment Scripts
* Local Blockchain Network
* Contract Testing Workflow

## Ethers.js

* Providers
* BrowserProvider
* Wallets
* Signers
* Contract Factories
* Contract Deployment
* Read Operations
* Write Operations
* Transaction Lifecycle
* Event Listening
* tx.wait()
* BigInt Handling
* Nonce Management

## React + Web3

* State Management
* MetaMask Integration
* Wallet Connection Flow
* Smart Contract Interaction
* Event-Driven UI Updates

## Blockchain Fundamentals

* Transaction Lifecycle
* State Changes
* Gas Fees
* Event Logs
* Transaction Receipts
* Contract Deployment Flow
* Frontend ↔ Smart Contract Communication

---

# 🛠 Local Development

Clone the repository:

```bash
git clone <repo-url>
cd ToDo_list
```

Install dependencies:

```bash
npm install
```

Start Hardhat node:

```bash
npx hardhat node
```

Deploy contract:

```bash
npx tsx scripts/deploy.ts
```

Run frontend:

```bash
cd frontend
npm install
npm run dev
```

---

# 🔮 Future Improvements

* Unit Testing with Hardhat
* Gas Optimization
* Contract Verification
* Task Categories
* Due Dates
* Task Priorities
* Responsive Mobile UI
* Multi-Chain Support
* Advanced Event Handling

---

# 🎯 Project Outcome

This project was built to understand how modern decentralized applications work from end to end.

```text
Smart Contract Development
            ↓
Compilation
            ↓
Deployment
            ↓
Blockchain Interaction
            ↓
MetaMask Integration
            ↓
React Frontend
            ↓
Real User Transactions
```

By completing this project, I gained practical experience in full-stack Web3 development, smart contract deployment, wallet integration, and blockchain-based application architecture.
