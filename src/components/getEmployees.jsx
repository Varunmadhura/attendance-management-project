import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/employees")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteClick = (Id) => {
        console.log("Deleting employee with ID:", Id);
        const confirmDelete = window.confirm("Are you sure you want to delete this employee");
        if(!confirmDelete) return;

        axios.delete(`http://127.0.0.1:8000/api/employees/${Id}/`)
        .then(() => {
            alert("Employee deleted successfully");
            setEmployees(employees.filter(emp => emp.id !== Id));

        })
        .catch(error => {
            console.log("There was an error deleting the employee", error)
        })
  }

  return (
    <div>
      <h2>Employee List</h2>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Employee Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Job Title</th>
            <th>Joining Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp.Id}>
                <td>{emp.employeeid}</td>
                <td>{emp.employeename}</td>
                <td>{emp.email}</td>
                <td>{emp.phonenumber}</td>
                <td>{emp.address}</td>
                <td>{emp.jobtitle}</td>
                <td>{emp.joiningdate}</td>
                <td>
                    <button className="bi bi-trash-fill" onClick={() => deleteClick(emp.Id)}>
                    </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No Employees Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
