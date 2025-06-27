// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentRegistryV2 {
    struct Student {
        string name;
        uint age;
        bool isRegistered;
    }
    
    mapping(address => Student) public students;
    address public owner;
    
    event StudentRegistered(address indexed studentAddress, string name, uint age);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    function registerStudent(address studentAddress, string memory name, uint age) public onlyOwner {
        students[studentAddress] = Student(name, age, true);
        emit StudentRegistered(studentAddress, name, age);
    }
    
    function getStudent(address user) public view returns (string memory, uint, bool) {
        Student memory student = students[user];
        return (student.name, student.age, student.isRegistered);
    }
    
    function isStudentRegistered(address user) public view returns (bool) {
        return students[user].isRegistered;
    }
} 