import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Select from "react-select";
import "D:/attendance-management-system/attendance-management-project/src/leaves.css"

const LeavesForm = () => {
  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState("");
  const [isManualEntry, setIsManualEntry] = useState(true);

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

  const employeeOptions = employees.map((employee) => ({
    value: employee.Id, 
    label: `${employee.employeeid} - ${employee.employeename}`, 
  }));

  const formik = useFormik({
    initialValues: {
      employeeId: "",
      fromdate: "",
      todate: "",
      reason: "",
      description: "",
      status: 1, // Assuming '1' is for pending status
    },
    validationSchema: Yup.object({
      employeeId: Yup.string().required("Employee ID is required"),
      fromdate: Yup.date().required("From Date is required"),
      todate: Yup.date()
        .required("To Date is required")
        .min(Yup.ref("fromdate"), "To Date cannot be before From Date"),
      reason: Yup.string().required("Reason is required"),
      description: Yup.string("Description is required").max(750, "Description must be 750 characters or less"),
      status: Yup.number().required("Status is required"),
    }),
    onSubmit: async (values) => {
      console.log("Submitted Values:", values); 
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/leaves/",
          values
        );
        console.log("Response from API:", response);
        if (response.status === 201) {
          setMessage("Leave request successfully submitted!");
        } else {
          setMessage("Failed to submit leave request.");
        }
      } catch (error) {
        setMessage("Error submitting leave request.");
        console.error(error.response?.data || error.message);
      }
    },
  });

  return (
    <div className="leaves-form-container">
      <h2>Request Leave</h2>
      <div>
        <label>
          <input 
            type="radio" 
            name="entryType" 
            value="manual" 
            checked={isManualEntry} 
            onChange={() => setIsManualEntry(true)} 
          /> 
          Enter Employee ID
        </label>
        <label>
          <input 
            type="radio" 
            name="entryType" 
            value="select" 
            checked={!isManualEntry} 
            onChange={() => setIsManualEntry(false)} 
          /> 
          Select Employee
        </label>
      </div>
      <form onSubmit={formik.handleSubmit}>
        {/* Employee ID: Manual Input or Select Dropdown */}
        <div className="form-group">
          <label htmlFor="employeeId">Employee ID:</label>
          {isManualEntry ? (
            // Manual Input Field
            <input
              id="employeeId"
              name="employeeId"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.employeeId}
            />
          ) : (
            // Select Dropdown
            <Select
              id="employeeId"
              name="employeeId"
              options={employeeOptions}
              onChange={(selectedOption) =>
                formik.setFieldValue("employeeId", selectedOption?.value || "")
              }
              onBlur={formik.handleBlur}
              value={employeeOptions.find(
                (option) => option.value === formik.values.employeeId
              )}
            />
          )}
          {formik.touched.employeeId && formik.errors.employeeId ? (
            <div className="error">{formik.errors.employeeId}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="fromdate">From Date:</label>
          <input
            id="fromdate"
            name="fromdate"
            type="date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fromdate}
          />
          {formik.touched.fromdate && formik.errors.fromdate ? (
            <div className="error">{formik.errors.fromdate}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="todate">To Date:</label>
          <input
            id="todate"
            name="todate"
            type="date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.todate}
          />
          {formik.touched.todate && formik.errors.todate ? (
            <div className="error">{formik.errors.todate}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="reason">Reason:</label>
          <textarea
            id="reason"
            name="reason"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.reason}
          />
          {formik.touched.reason && formik.errors.reason ? (
            <div className="error">{formik.errors.reason}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="error">{formik.errors.description}</div>
          ) : null}
        </div>

        <button type="submit">Submit Leave</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default LeavesForm;
