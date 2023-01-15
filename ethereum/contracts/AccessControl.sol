// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.17;

contract PatientVerificator {

    address private admin;
    address[] private patients;

    mapping(address => bool) private patient; //boolean

    constructor() {
        admin = msg.sender;
    }

    function addPatient(address _address) public {
        if (!patient[_address]) {
            patient[_address] = true;
            patients.push(_address); 
        }
    }

    function verify(address _address) public view returns(bool _bool) {
        if(patient[_address]) {
            return true;
        } else {
            return false;
        }
    }

    function getAllPatients() onlyAdmin public view returns(address[] memory _address) {
        return patients;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin);
        _;
    }
}

contract DoctorVerificator {

    struct Logs {
        address add;
        string activity;
        string dateAndTime;
    }

    address private admin;
    address[] private doctors;

    mapping(address => bool) private doctor; //boolean
    mapping(address => Logs[]) private logs;

    constructor() {
        admin = msg.sender;
    }

    function addDoctor(address _address) onlyAdmin public {
        require(!doctor[_address]);      
        doctor[_address] = true;
        doctors.push(_address);      
    }

    function verify(address _address) onlyAdmin public view returns(bool _bool) {
        if(doctor[_address]) {
            return true;
        } else {
            return false;
        }
    }

    function logThis(Logs memory _logs) onlyAdmin public {
        // ["0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2", "Updating this (id) patient data", "24-12-2022"]
        Logs memory activity;
        activity.add = _logs.add;
        activity.activity = _logs.activity;
        activity.dateAndTime = _logs.dateAndTime;
        logs[msg.sender].push(activity);
    }

    function getAddressLogs(address _add) onlyAdmin public view returns(Logs[] memory _logs) {
        return logs[_add];
    }

    function getAllDoctors() onlyAdmin public view returns(address[] memory _address) {
        return doctors;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not Authorized");
        _;
    }
}