import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import 'D:/attendance-management-system/attendance-management-project/src/AddEmployee.css';
export function AddEmployee(){

  const addEmployee = async (values, {resetForm}) => {
    axios.post("http://127.0.0.1:8000/api/employees/", values)
  .then(response => {
    console.log("Employee added successfully", response.data);
    alert("Employee added successfully")
    resetForm();
  })
  .catch(error => {
    alert("Employee not added")
    if (error.response) {
      console.log("Error response data:", error.response.data);
    } else if (error.request) {
      console.log("Error request:", error.request);
    } else {
      console.log("Error:", error.message);
    }
  });
}


  const formik = useFormik({
    initialValues: {
      employeeid:"",
      employeename:"",
      email:"",
      phonenumber:"",
      address:"",
      jobtitle:"",
      joiningdate:"",


    },
    validationSchema: Yup.object({
      employeeid: Yup.string().required("EmployeeID Required"),
      employeename: Yup.string().required("Employee Name required"),
      email: Yup.string().email("Invalid Email format").required("Employee Name required"),
      phonenumber: Yup.string().max(10,"Invalid Mobile Number").matches(/^\d+$/,"Mobile number must be in digits").required("Mobile required"),
      address: Yup.string().required("Address required"),
      jobtitle: Yup.string().required("Job title required"),
      joiningdate: Yup.string().required("joining date required"),
    }),
    onSubmit: addEmployee
  });

  return(
    <div className="container-fluid">
      <form onSubmit={formik.handleSubmit}>
        <h2>Add Employee Details</h2>
        <div className="scrollable-section">
        <div>
          <label htmlFor="employeeid">Employee ID</label>
          <div>
            <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} name="employeeid" className="form-control" value={formik.values.employeeid} id="employeeid" />
            {formik.touched.employeeid && formik.errors.employeeid ? (
              <div className="text-danger">{formik.errors.employeeid}</div>
               ) : null}
          </div>
        </div>
        <div>
          <label htmlFor="employeename">Employee Name</label>
          <div>
            <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} name="employeename" className="form-control" value={formik.values.employeename} id="employeename" />
            {formik.touched.employeename && formik.errors.employeename ? (
              <div className="text-danger">{formik.errors.employeename}</div>
               ) : null}
          </div>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <div>
            <input type="email" onChange={formik.handleChange} onBlur={formik.handleBlur} name="email" className="form-control" value={formik.values.email} id="email" />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-danger">{formik.errors.email}</div>
               ) : null}
          </div>
        </div>
        <div>
          <label htmlFor="phonenumber">Mobile</label>
          <div>
            <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} name="phonenumber" className="form-control" value={formik.values.phonenumber} id="phonenumber" />
            {formik.touched.phonenumber && formik.errors.phonenumber ? (
              <div className="text-danger">{formik.errors.phonenumber}</div>
               ) : null}
          </div>
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <div>
            <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} name="address" className="form-control" value={formik.values.address} id="address" />
            {formik.touched.address && formik.errors.address ? (
              <div className="text-danger">{formik.errors.address}</div>
               ) : null}
          </div>
        </div>
        <div>
          <label htmlFor="jobtitle">Job Title</label>
          <div>
            <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} name="jobtitle" className="form-control" value={formik.values.jobtitle} id="jobtitle" />
            {formik.touched.jobtitle && formik.errors.jobtitle ? (
              <div className="text-danger">{formik.errors.jobtitle}</div>
               ) : null}
          </div>
        </div>
        <div>
          <label htmlFor="joiningdate">Joining Date</label>
          <div>
            <input type="date" onChange={formik.handleChange} onBlur={formik.handleBlur} name="joiningdate" className="form-control" value={formik.values.joiningdate} id="joiningdate" />
            {formik.touched.joiningdate && formik.errors.joiningdate ? (
              <div className="text-danger">{formik.errors.joiningdate}</div>
               ) : null}
          </div>
        </div>
        <div>
          <button type="submit" className="w-100 mt-2 btn btn-warning">Add</button>
        </div>
        </div>
      </form>
    </div>
  )
}

export default AddEmployee;