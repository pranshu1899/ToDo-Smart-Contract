// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ToDo {

    struct Task{
        string content;
        bool completed;
    }

    mapping(address => Task[]) private userTasks;

    function createTask(string memory _content) public {
        Task memory newTask = Task ({
            content : _content,
            completed : false
        });
        userTasks[msg.sender].push(newTask);
    }

    function getTask() public view returns(Task[] memory){
        return userTasks[msg.sender];
    }
}