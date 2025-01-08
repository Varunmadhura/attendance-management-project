import React, { useState, useEffect } from "react";
import axios from "axios";
import "D:/attendance-management-system/attendance-management-project/src/App.css"

const LeavesList = () => {
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/leaves/");
        setLeaves(response.data);
      } catch (error) {
        setError("Error fetching leaves.");
        console.error(error.message);
      }
    };

    fetchLeaves();
  }, []);

  return (
    <div>
      <h2>Leave Requests</h2>
      {error && <p>{error}</p>}
      <table className="table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>Reason</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaves.length > 0 ? (
            leaves.map((leave) => (
              <tr key={leave.Id}>
                <td>{leave.employeeId}</td>
                <td>{leave.fromdate}</td>
                <td>{leave.todate}</td>
                <td>{leave.reason}</td>
                <td>{leave.description}</td>
                <td>{leave.status === 1 ? "Pending" : leave.status === 2 ? "Approved" : "Rejected"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No leave requests found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeavesList;
