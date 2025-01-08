import React, { useState } from 'react';
import AddEmployee from './components/AddEmployee';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import EmployeeList from './components/getEmployees';
import { Offcanvas, OffcanvasHeader, OffcanvasBody } from 'react-bootstrap';
import AttendanceFormFormik from './components/MarkAttendance';
import LeavesForm from './components/Leaves';
import LeavesList from './components/LeavesList';
import './App.css'; // Separate CSS for App.js
import Dashboard from './components/Home';
import Home from './components/Home';
import EditEmployee from './components/UpdateEmployee';

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Router>
      <div className='app-container'>
      
        <header className="header">
          <h2>Attendance Management</h2>
        </header>

        
        <div className='menu-button'>
          <button className="btn btn-primary" onClick={handleShow}>
            ☰ 
          </button>
        </div>

        <Offcanvas show={show} onHide={handleClose}>
          <OffcanvasHeader closeButton>
            <h5>Navigation</h5>
          </OffcanvasHeader>
          <OffcanvasBody>
            <nav className="offcanvas-nav d-flex flex-column">
              <Link to="/" className='mb-2 text-decoration-none' onClick={handleClose}>Home</Link>
              <Link to="/add" className='mb-2 text-decoration-none' onClick={handleClose}>Add Employee</Link>
              <Link to="/emplist" className='mb-2 text-decoration-none' onClick={handleClose}>Employee List</Link>
              <Link to="/attendace" className='mb-2 text-decoration-none' onClick={handleClose}>Attendance</Link>
              <Link to="/leaves" className='mb-2 text-decoration-none' onClick={handleClose}>Employee Leaves</Link>
              <Link to="/leaveslist" className='mb-2 text-decoration-none' onClick={handleClose}>Leaves List</Link>
            </nav>
          </OffcanvasBody>
        </Offcanvas>

        
        <Routes>
          <Route path='/' element= {<Home/>} />
          <Route path='/add' element={<AddEmployee />} />
          <Route path='/emplist' element={<EmployeeList />} />
          <Route path='/attendace' element={<AttendanceFormFormik />} />
          <Route path='/leaves' element={<LeavesForm />} />
          <Route path='/leaveslist' element={<LeavesList />} />
          <Route path='/edit-employee/:id' element={<EditEmployee/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
