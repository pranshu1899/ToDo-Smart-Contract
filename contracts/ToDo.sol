// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ToDo {

    struct Task{
        uint256 id;
        string content;
        bool completed;
    }

    mapping(address => Task[]) private userTasks;
    uint256 count = 0;

    
    error TaskNotFound();

    function createTask(string memory _content) public {
        Task memory newTask = Task ({
            id: count,
            content : _content,
            completed : false
        });
        userTasks[msg.sender].push(newTask);
        count++;
    }

    function toggleTask(uint256 taskId) public {
        
        Task[] storage tasks = userTasks[msg.sender];
        
        for(uint256 i = 0 ; i< tasks.length ; i++){
           
            if(tasks[i].id == taskId){
                tasks[i].completed = !tasks[i].completed;
                return;
            }
        }
        revert TaskNotFound();
    }

    function deleteTask(uint256 taskId) public {
        Task[] storage tasks = userTasks[msg.sender];
        uint target;
        bool found;
        for(uint256 i=0 ; i<tasks.length ; i++){
            if(tasks[i].id == taskId){
                target = i;
                found = true;
                break;
            }
        }
        if(!found){
            revert TaskNotFound();
        }
        tasks[target] = tasks[tasks.length-1];
        tasks.pop();
    }

    function updateTask(uint256 taskId, string memory newContent) public {
        Task[] storage tasks = userTasks[msg.sender];
        for(uint256 i=0; i<tasks.length; i++){
          if(tasks[i].id == taskId ){
          tasks[i].content = newContent;
          return; 
          }
        } 
      revert TaskNotFound();
    }     

    function getTask() public view returns(Task[] memory){  // sare tasks ke liye 
        return userTasks[msg.sender];    
        }
    
    function getTaskById(uint256 taskId) public view returns(Task memory){
        Task[] storage tasks = userTasks[msg.sender];
        for(uint256 i=0; i<tasks.length; i++){
          if(tasks[i].id == taskId ){
          return tasks[i]; 
          }
        } 
      revert TaskNotFound();
    }

    function getTotalTasks() public view returns(uint256){
        return userTasks[msg.sender].length;
    }
    function getCompletedTasks() public view returns(uint256){
        Task[] storage tasks = userTasks[msg.sender];
        uint256 completedCount = 0;
        for(uint256 i=0 ; i<tasks.length ; i++){
            if(tasks[i].completed){
                completedCount++;
            }
        }
        return completedCount;
    }
    function getPendingTasks() public view returns(uint256){
        Task[] storage tasks = userTasks[msg.sender];
        uint256 pendingCount = 0;
        for(uint256 i =0; i<tasks.length ; i++){
            if(!tasks[i].completed){
                pendingCount++;
            }
        }
        return pendingCount;
    }  // remaining tasks : priority ke hisab se pending tasks ko dikhana
}