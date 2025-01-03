import React, { useState } from 'react';
import AddEmployee from './components/AddEmployee';
import { BrowserRouter as Router, Route, Routes, Link  } from "react-router-dom";
import './App.css'
import EmployeeList from './components/getEmployees';
import { Offcanvas, OffcanvasHeader, OffcanvasBody } from 'react-bootstrap';
import AttendanceFormFormik from './components/MarkAttendance';

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return(
    <Router>
      <div className='container-fluid'>
        <div className='header-width'>
          <header className="d-flex justify-content-between align-items-center p-2">  
            <div className='d-flex justify-content-end'>
              <button className="btn btn-primary" onClick={handleShow}>
                ☰ Menu
              </button>
            </div>
            
            <Link to="/" className='text-decoration-none'><h2>Attendance Management</h2></Link>
          </header>
        </div>
        

        <Offcanvas show={show} onHide={handleClose}>
          <OffcanvasHeader closeButton>
            <h5>Navigation</h5>
          </OffcanvasHeader>
          <OffcanvasBody>
            <nav className="d-flex flex-column">
              <Link to="/" className='mb-2 text-decoration-none' onClick={handleClose}>Home</Link>
              <Link to="/add" className='mb-2 text-decoration-none' onClick={handleClose}>Add Employee</Link>
              <Link to="/emplist" className='mb-2 text-decoration-none' onClick={handleClose}>Employee List</Link>
              <Link to="/attendace" className='mb-2 text-decoration-none' onClick={handleClose}>Attendance</Link>
            </nav>
          </OffcanvasBody>
        </Offcanvas>
      </div>

      
      <Routes>
        <Route path='/add' element={<AddEmployee/>} />
        <Route path='/emplist' element={<EmployeeList/>} />
        <Route path='/attendace' element={<AttendanceFormFormik/>} />
      </Routes>
    </Router>
  );
}

export default App;
