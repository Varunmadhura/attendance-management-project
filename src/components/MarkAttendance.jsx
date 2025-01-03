import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import './AttendanceForm.css';

const AttendanceFormFormik = () => {
  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch list of employees to populate dropdown
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/employees/");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error.message);
      }
    };

    fetchEmployees();
  }, []);

  const formik = useFormik({
    initialValues: {
      employee_id: "",
      attendance_status: "Present", // Default option
      day_status: "Working", // Default option
      status: true, // Active by default
      comments: "",
    },
    validationSchema: Yup.object({
      employee_id: Yup.string().required("Employee ID is required"),
      attendance_status: Yup.string().required("Please select attendance status"),
      day_status: Yup.string().required("Please select day status"),
      comments: Yup.string().max(100, "Comments must be 100 characters or less"),
    }),
    onSubmit: async (values) => {
      console.log("Submitted Values:", values);  
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/attendance/",
          values
        );
        if (response.status === 201) {
          setMessage("Attendance successfully recorded!");
        } else {
          setMessage("Failed to record attendance.");
        }
      } catch (error) {
        console.error("Error submitting attendance:", error.response?.data || error.message);
        setMessage("Error submitting attendance. Please try again.");
      }
    },
  });

  return (
    <div className="attendance-form-container">
      <h2>Employee Attendance</h2>
      <form onSubmit={formik.handleSubmit} className="attendance-form">
        <div className="form-group">
          <label htmlFor="employee_id">Employee ID:</label>
          <select
            id="employee_id"
            name="employee_id"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.employee_id}
          >
            <option value="">Select Employee</option>
            {employees.map((employee) => (
              <option key={employee.Id} value={employee.Id}>
                {employee.employeeid} - {employee.employeename}
              </option>
            ))}
          </select>
          {formik.touched.employee_id && formik.errors.employee_id ? (
            <div className="error">{formik.errors.employee_id}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="attendance_status">Attendance Status:</label>
          <select
            id="attendance_status"
            name="attendance_status"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.attendance_status}
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Late">Late</option>
          </select>
          {formik.touched.attendance_status && formik.errors.attendance_status ? (
            <div className="error">{formik.errors.attendance_status}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="day_status">Day Status:</label>
          <select
            id="day_status"
            name="day_status"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.day_status}
          >
            <option value="Working">Working Day</option>
            <option value="Holiday">Holiday</option>
            <option value="Weekend">Weekend</option>
          </select>
          {formik.touched.day_status && formik.errors.day_status ? (
            <div className="error">{formik.errors.day_status}</div>
          ) : null}
        </div>

        <button type="submit">Submit Attendance</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default AttendanceFormFormik;
