const file_system = require('fs');
let employees = [];
let managers = [];
let departments = [];


module.exports.initialize = function () {

  return new Promise((resolve, reject) => {

    file_system.readFile('./data/departments.json', (error, info) => {
      if (!error) 
      {
        departments = JSON.parse(info);
        resolve();
      }

      else 
      {
        reject();
      }
    });


    file_system.readFile('./data/employees.json', (error, info) => {
      if (!error) 
      {
        employees = JSON.parse(info);
        resolve();
      }

      else 
      {
        reject();
      }
    });
    
  });
};

module.exports.getAllEmployees = function () {
  
  return new Promise((resolve, reject) => {
    
    if ((employees.length != 0)||(employees.length >0))
    {
      resolve(employees);
    }

    else {
      reject();
    }
  });
};

module.exports.getManagers = function () {

  return new Promise((resolve, reject) => {
   
    for (var randomvarname = 0; randomvarname < employees.length; randomvarname++) 
    {
      if (employees[randomvarname].isManager == true) 
      {
        managers.push(employees[randomvarname]);
      }
    }
    if ((managers.length != 0) || (managers.length>0))
    {
      resolve(managers);
    } 

    else
    {
      reject();
    }
    
  });
};

module.exports.getDepartments = function () {

  return new Promise((resolve, reject) => {

    if ((departments.length != 0) || (departments.length>0) )
    {
      resolve(departments);
    }

    else
    {
    reject();
    }
  });
};



module.exports.addEmployee = function(employeeData) {
  return new Promise((resolve, reject)=> {
    
    if (employeeData.isManager == undefined) {
      employeeData.isManager = false;
    
    }
    else if (employeeData.isManager == ' '){
      
    }
    else{
      employeeData.isManager = true;
    }

    employeeData.employeeNum = employees.length+1;
    employees.push(employeeData);


    resolve(employees);
  });


}

module.exports.getEmployeesByStatus = function(empstatus) {
  return new Promise((resolve, reject)=> {
    var statemployees = [];

    for (let tempvariable= 0; tempvariable < employees.length; tempvariable++) {

      if (employees[tempvariable].status == empstatus) {statemployees.push(employees[tempvariable]);}

      else if (employees[tempvariable].empstatus == ' ') {reject();}}
  
      if (employees.length == 0) {reject();}

      else if (employees.length <0) { reject();}

  resolve(statemployees);});}


module.exports.getEmployeesByDepartment = function(department) {
  return new Promise((resolve, reject)=> {

    var getbydepartment = [];

    for (let randomvarname= 0; randomvarname < employees.length; randomvarname++) {
      
      if (employees[randomvarname].department == department) {getbydepartment.push(employees[randomvarname]);}

      else if (employees[randomvarname].department == ' ') {reject();}}
  
      if (employees.length == 0) {reject();}

      else if (employees.length <0) { reject();}
  
  resolve(getbydepartment);
  });

}

module.exports.getEmployeesByManager = function(info) {
  return new Promise((resolve, reject)=> {

    var tempmanager = [];

    for (let randomvarname= 0; randomvarname < employees.length; randomvarname++) {
     
      if (employees[randomvarname].employeeManagerNum == info ) {tempmanager.push(employees[randomvarname]);}

      else if (employees[randomvarname].employeeManagerNum == ' ') {reject();}}
  
      if (employees.length == 0) {reject();}

      else if (employees.length <0) { reject();}
  
  resolve(tempmanager);
    
  });

}


module.exports.getEmployeeByNum = function(number) {

  return new Promise((resolve, reject)=> {

    var empbynumber = [];

    for (let randomvarname= 0; randomvarname < employees.length; randomvarname++) {

      if (employees[randomvarname].employeeNum == number) {empbynumber.push(employees[randomvarname]);}

      else if (employees[randomvarname].employeeNum == '') {empbynumber.push(employees[randomvarname]);}}
  
      if (employees.length == 0) {reject();}

      else if (employees.length <0) { reject();}

  resolve(empbynumber);
    
  });

}