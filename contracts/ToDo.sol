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
        revert("Task not found");
    }

    error taskNotFound();
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
            revert taskNotFound();
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
    revert taskNotFound();   }

    function getTask() public view returns(Task[] memory){
        return userTasks[msg.sender];    
        }
}