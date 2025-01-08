import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import 'D:/attendance-management-system/attendance-management-project/src/App.css';

const EditEmployee = () => {
  const { id } = useParams();  
  const navigate = useNavigate();  
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({
    employeeid: "",
    employeename: "",
    email: "",
    phonenumber: "",
    address: "",
    jobtitle: "",
    joiningdate: "",
  });

 
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/employees/${id}/`);
        setInitialValues(response.data);  
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };

    fetchEmployee();
  }, [id]); 

  const updateEmployee = async (values) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/employees/${id}/`, values);
      alert("Employee updated successfully!");
      navigate("/emplist");  
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Failed to update employee");
    }
  };

  const formik = useFormik({
    enableReinitialize: true,  
    initialValues: initialValues, 
    validationSchema: Yup.object({
      employeeid: Yup.string().required("Employee ID Required"),
      employeename: Yup.string().required("Employee Name Required"),
      email: Yup.string().email("Invalid Email format").required("Email Required"),
      phonenumber: Yup.string()
        .max(10, "Invalid Mobile Number")
        .matches(/^\d+$/, "Mobile number must be in digits")
        .required("Mobile Required"),
      address: Yup.string().required("Address Required"),
      jobtitle: Yup.string().required("Job Title Required"),
      joiningdate: Yup.string().required("Joining Date Required"),
    }),
    onSubmit: updateEmployee,
  });

  if (loading) {
    return <p>Loading employee data...</p>;
  }

  return (
    <div className="container-fluid">
      <form onSubmit={formik.handleSubmit}>
        <h2>Edit Employee Details</h2>
        <div className="scrollable-section">
          <div>
            <label htmlFor="employeeid">Employee ID</label>
            <div>
              <input
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="employeeid"
                className="form-control"
                value={formik.values.employeeid}
                id="employeeid"
              />
              {formik.touched.employeeid && formik.errors.employeeid ? (
                <div className="text-danger">{formik.errors.employeeid}</div>
              ) : null}
            </div>
          </div>

          <div>
            <label htmlFor="employeename">Employee Name</label>
            <div>
              <input
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="employeename"
                className="form-control"
                value={formik.values.employeename}
                id="employeename"
              />
              {formik.touched.employeename && formik.errors.employeename ? (
                <div className="text-danger">{formik.errors.employeename}</div>
              ) : null}
            </div>
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <div>
              <input
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="email"
                className="form-control"
                value={formik.values.email}
                id="email"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-danger">{formik.errors.email}</div>
              ) : null}
            </div>
          </div>

          <div>
            <label htmlFor="phonenumber">Mobile</label>
            <div>
              <input
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="phonenumber"
                className="form-control"
                value={formik.values.phonenumber}
                id="phonenumber"
              />
              {formik.touched.phonenumber && formik.errors.phonenumber ? (
                <div className="text-danger">{formik.errors.phonenumber}</div>
              ) : null}
            </div>
          </div>

          <div>
            <label htmlFor="address">Address</label>
            <div>
              <input
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="address"
                className="form-control"
                value={formik.values.address}
                id="address"
              />
              {formik.touched.address && formik.errors.address ? (
                <div className="text-danger">{formik.errors.address}</div>
              ) : null}
            </div>
          </div>

          <div>
            <label htmlFor="jobtitle">Job Title</label>
            <div>
              <input
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="jobtitle"
                className="form-control"
                value={formik.values.jobtitle}
                id="jobtitle"
              />
              {formik.touched.jobtitle && formik.errors.jobtitle ? (
                <div className="text-danger">{formik.errors.jobtitle}</div>
              ) : null}
            </div>
          </div>

          <div>
            <label htmlFor="joiningdate">Joining Date</label>
            <div>
              <input
                type="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="joiningdate"
                className="form-control"
                value={formik.values.joiningdate}
                id="joiningdate"
              />
              {formik.touched.joiningdate && formik.errors.joiningdate ? (
                <div className="text-danger">{formik.errors.joiningdate}</div>
              ) : null}
            </div>
          </div>

          <div>
            <button type="submit" className="w-100 mt-2 btn btn-warning">
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
