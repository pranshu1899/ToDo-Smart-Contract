import { useState } from "react";
import { ethers } from "ethers";
import ToDoArtifact from "./contract/ToDo.json";

const abi = ToDoArtifact.abi;
const address =
"0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e";

function App() {

  const [wallet, setWallet] = useState("");

  const [todo, setTodo] = useState(null);
  // so that todoContract object can be used outside connectWallet too
  
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState([]);

  const [editText, setEditText] = useState("");

  //connect wallet wahi kaam karwa raha jo interact.ts karwata tha bs ab frontend and metamask ka role aa gya
  // -----------------------------------------
  async function connectWallet() {
    const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  setWallet(accounts[0]);

  const provider = new ethers.BrowserProvider(window.ethereum);

  // console.log(provider);

  const signer = await provider.getSigner();
  // console.log(signer);

  const todoContract = new ethers.Contract(
    address,
    abi,
    signer
  );
  setTodo(todoContract);
  // console.log(todo);

 
  // console.log("Task created");
  // console.log(tx.hash);

  //    ----events reading----
  // const receipt = await tx.wait();
  // console.log(receipt.logs);
  // receipt.logs :- sare events
  // receipt.logs[0] :- pehla event
  // receipt.logs[0].args :- us event ka actual data 

  // console.log(receipt.logs[0].args);
  // console.log(receipt);

  // console.log(receipt.blockNumber);
  // console.log(receipt.gasUsed);
  // console.log(receipt.status);
  // console.log(receipt.hash);

  //     ---- EVENT LISTENER ----
  todoContract.on("TaskCreated", (id, content) => {
    console.log("New Task");
    console.log(id.toString());
    console.log(content);
  });
  console.log("Listener staarted");

  //  const tx = await todo.createTask("Learn blockchain");
  //  await tx.wait();


  // const tasks = await todo.getTask();
  // console.log(tasks);
  // const total = await todo.getTotalTasks();
  // console.log(total.toString());
  //  //toString isiliye kiya nahi to bigInt me hota to 0n types aate sirf 0 ke liye toString
  // const tasks = await todo.getTask();
  // console.log(tasks);
  }

  // -----------------------------------------
  async function createTask(){
    const tx = await todo.createTask(taskText);
    await tx.wait();
    setTaskText("");

    const allTasks = await todo.getTask();
    setTasks(allTasks);
  }

  // --------------------------------------------
  async function toggleTask(taskId){
    const tx = await todo.toggleTask(taskId);
    await tx.wait();

    const allTasks = await todo.getTask();
    setTasks(allTasks);

  }

  // --------------------------------------------
  async function deleteTask(taskId){
    const tx = await todo.deleteTask(taskId);
    await tx.wait();

    const allTasks = await todo.getTask();
    setTasks(allTasks);
  }

  // ---------------------------------------------
  async function updateTask(taskId){
    const tx = await todo.updateTask(taskId,editText);
    await tx.wait();

    const allTasks = await todo.getTask();
    setTasks(allTasks);
    setEditText("");
  }

  return (
    <div>
      <h1>ToDo DApp</h1>

      <h3>
        Wallet: {wallet ? wallet : "Not Connected"} 
      </h3>  
{/* print iski wjh se ho r */}
      <button onClick={connectWallet}>
        Connect Wallet
      </button>

      {/* ---- Create task from ui */}
      <input type="text" 
      value={taskText}
      onChange = {(e) => setTaskText(e.target.value)}
      />
      <button onClick={createTask}>
        Add Task
      </button>

      <input type="text"
      value={editText}
      onChange = {(e) => setEditText(e.target.value)}
      />

      {
        tasks.map((task) => (
          <div key={task.id.toString()}>
            {task.completed ? "✅" : "❌"} {" "} {task.content}

            <button onClick={
              () => toggleTask(task.id)
            }
            >Toggle</button>

            <button onClick={
              () => deleteTask(task.id)
            }>Remove</button>

            <button onClick={
              () => updateTask(task.id)
            }>Edit</button>
          </div>
        ))
      }

    </div>
  );
}

export default App;