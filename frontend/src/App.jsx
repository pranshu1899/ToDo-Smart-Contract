import { useState } from "react";
import { ethers } from "ethers";
import ToDoArtifact from "./contract/ToDo.json";
import "./App.css";

const abi = ToDoArtifact.abi;
const address =
"0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {

  const [wallet, setWallet] = useState("");

  const [todo, setTodo] = useState(null);
  // so that todoContract object can be used outside connectWallet too
  
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState([]);

  const [editText, setEditText] = useState("");
  const [editingId, setEditingId] = useState(null);

  // statistics
  const [total, setTotal] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [pending, setPending] = useState(0);

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
  const allTasks = await todoContract.getTask();
  setTasks(allTasks);
  
  const totalTasks = await todoContract.getTotalTasks();
  const completedTasks = await todoContract.getCompletedTasks();
  const pendingTasks = await todoContract.getPendingTasks();

setTotal(totalTasks.toString());
setCompleted(completedTasks.toString());
setPending(pendingTasks.toString());
  }

  // -----------------------------------------
  async function createTask(){
     if (!taskText.trim()) return;

    const tx = await todo.createTask(taskText);
    await tx.wait();
    setTaskText("");

    const allTasks = await todo.getTask();
    setTasks(allTasks);

    await loadStats();
  }

  // --------------------------------------------
  async function toggleTask(taskId){
    const tx = await todo.toggleTask(taskId);
    await tx.wait();

    const allTasks = await todo.getTask();
    setTasks(allTasks);

    await loadStats();
  }

  // --------------------------------------------
  async function deleteTask(taskId){
    const tx = await todo.deleteTask(taskId);
    await tx.wait();

    const allTasks = await todo.getTask();
    setTasks(allTasks);
    await loadStats();

  }

  // ---------------------------------------------
  async function updateTask(taskId){
    if(!editText.trim()) return;
    const tx = await todo.updateTask(taskId,editText);
    await tx.wait();

    const allTasks = await todo.getTask();
    setTasks(allTasks);
    setEditText("");
    setEditingId(null);

    await loadStats();
  }

  // ------------------------------------------
  async function loadStats(){
    const totalTasks = await todo.getTotalTasks();
    const completedTasks = await todo.getCompletedTasks();
    const pendingTasks = await todo.getPendingTasks();

    setTotal(totalTasks.toString());
    setCompleted(completedTasks.toString());
    setPending(pendingTasks.toString());
  }

  return (
    <div className="container">
      <h1>ToDo DApp</h1>

      <h3 className="wallet">
        Wallet: {wallet ? wallet : "Not Connected"} 
      </h3>  
{/* print iski wjh se ho r */}
      <button className="btn" onClick={connectWallet}>
        Connect Wallet
      </button>

      <div className="stats">
        <div className="card">
          <h2>{total}</h2> <p>Total</p>
        </div>
        <div className="card">
          <h2>{completed}</h2> <p>Completed</p>
        </div>
        <div className="card">
          <h2>{pending}</h2> <p>Pending</p>
        </div>
      </div>
      

      {/* ---- Create task from ui */}
      <div className="input-section">

          <input
            className="task-input"
            type="text"
            value={taskText}
            onChange={(e)=>setTaskText(e.target.value)}
            placeholder="Add a task..."
          />

          <button
            className="btn"
            onClick={createTask}
           >Add Task</button>
       </div>

      {/* <input type="text"
      value={editText}
      onChange = {(e) => setEditText(e.target.value)}
      /> */}

      <div className="task-list">
       {
        tasks.map((task)=>(
          
          <div
            className="task-card"
            key={task.id.toString()}
          >
      
            <div>
              {task.completed ? "✅" : "❌"}{" "}
              {
                editingId === task.id ? (
                  <input
                    value = {editText}
                    onChange={(e) => setEditText(e.target.value)
                    }/>
                ) : (
                  task.content
                )
              }
            </div>
      
            <div className="task-actions">
      
              <button
                className="small-btn"
                onClick={() => toggleTask(task.id)}
              >
                Toggle
              </button>
      
              <button
                className="small-btn"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
      
              {
                editingId === task.id ? (
                  <button
                    className="small-btn"
                    onClick={() => updateTask(task.id)}
                    >Save</button>
                ) : (
                  <button
                    className="small-btn"
                    onClick = {() => {
                      setEditingId(task.id);
                      setEditingText(task.content);
                    }}>Edit</button>
                )
              }
      
            </div>
      
          </div>
      
        ))
       }

</div>

    </div>
  );
}

export default App;