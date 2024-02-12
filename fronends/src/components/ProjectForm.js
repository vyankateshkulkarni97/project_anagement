import React, { useState } from 'react';
import Navbarleft from '../components/Navbar';
import '../style/ProjectFrom.css'

const ProjectForm = () => {
  const [projectName, setProjectName] = useState('');
  const [Reason, setReasonDropdown] = useState('');
  const [PTypes, setPTypesDropdown] = useState('');
  const [Division, setDivisionDropdown] = useState('');
  const [Category, setCategoryDropdown] = useState('');
  const [Priority, setPriorityDropdown] = useState('');
  const [Department, setDepartmentDropdown] = useState(' ');
  const [Location, setLocationDropdown] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  console.warn(Reason,PTypes,Division,Category,Priority,Department,Location);
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    if (endDate && e.target.value > endDate) {
      setEndDate(''); 
    }
  };
  
  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    if (startDate && e.target.value < startDate) {
      setError('End date cannot be smaller than start date');
    } else {
      setError('');
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submit button clicked!');

    
    if (!projectName || !Reason || !PTypes ||  !Division || !Category || !Priority || !Department || !Location || !startDate || !endDate) {
      setError('Please fill in all fields');
      return;
    }

    const data = {
      projectName,
      Reason,
      PTypes,
      Division,
      Category,
      Priority,
      Department,
      Location,
      startDate,
      endDate,
      status: 'Registered',
    };
    console.warn(data);
    try {
      const response = await fetch('http://localhost:3001/project/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.warn(response);
      if (!response.ok) {
        throw new Error('Failed to insert project');
      }

      setProjectName('');
      setReasonDropdown('');
      setPTypesDropdown('');
      setDivisionDropdown('');
      setCategoryDropdown('');
      setPriorityDropdown('');
      setDepartmentDropdown('');
      setLocationDropdown('');
      setStartDate('');
      setEndDate('');
      setError('');

      console.log('Project inserted successfully');
    } catch (error) {
      console.error('Error inserting project:', error);
      setError('Failed to insert project. Please try again.');
    }
  };


  return (
    <div>
      <Navbarleft />

      <h1 className="card-title">Create Project</h1>
      <div className="container m-5">

        <div className="card">
          <div className="card-body">

            <form  className="needs-validation" noValidate>
              <div className="mb-3 row">
                <label className="form-label col-sm-4">Project Name:</label>
                <div className="col-sm-8">
                  <input type="text" placeholder="Enter project theme" className="form-control" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
                </div>
              </div>
          
               
              <div className="mb-3 row">
                <div className="col">
                  <label className="form-label">Reason:</label>
                  <select className="form-select" value={Reason} onChange={(e) => setReasonDropdown(e.target.value)}>
                    <option value="">Select Option</option>
                    <option value="Business">Business</option>
                    <option value="Dealership">Dealership</option>
                    <option value="Transport">Transport</option>
                  </select>
                </div>
                 
                <div className="col">
                  <label className="form-label">Type:</label>
                  <select className="form-select" value={PTypes} onChange={(e) => setPTypesDropdown(e.target.value)}>
                  <option value="">Select Option</option>
                    <option value="External">External</option>
                    <option value="Vendor">Vendor</option>
                    <option value="Internal">Internal</option>
                  </select>
                </div>
                 
                <div className="col">
                  <label className="form-label">Division:</label>
                  <select className="form-select" value={Division} onChange={(e) => setDivisionDropdown(e.target.value)}>
                  <option value="">Select Option</option>
                    <option value="Compressor">Compressor</option>
                    <option value="Filters">Filters</option>
                    <option value="Pumps">Pumps</option>
                    <option value="Glass">Glass</option>

                  </select>
                </div>
              </div>
              
               
              <div className="mb-3 row">
                <div className="col">
                  <label className="form-label">Category :</label>
                  <select className="form-select" value={Category} onChange={(e) => setCategoryDropdown(e.target.value)}>
                    <option value="">Select Option</option>
                    <option value="Quality A">Quality A</option>
                    <option value="Quality B">Quality B</option>
                    <option value="Quality C">Quality C</option>

                    {/* Add more options as needed */}
                  </select>
                </div>      
                 
                <div className="col">
                  <label className="form-label">Priority :</label>
                  <select className="form-select" value={Priority} onChange={(e) => setPriorityDropdown(e.target.value)}>
                    <option value="">Select Option</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                    
                  </select>
                </div>
                <div className="col">
                  <label className="form-label">Department :</label>
                  <select className="form-select" value={Department } onChange={(e) => setDepartmentDropdown(e.target.value)}>
                    <option value="">Select Option</option>
                    <option value="Strategy">Strategy</option>
                    <option value="Finance">Finance</option>
                    <option value="Quality">Quality</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Stores">Stores</option>
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Location :</label>
                <select className="form-select" value={Location} onChange={(e) => setLocationDropdown(e.target.value)}>
                  <option value="">Select Option</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Pune">Pune</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Mohali">Mohali</option>


                </select>
              </div>

              <div className="mb-3 row">
                <label className="form-label col-sm-4">Start Date:</label>
                <div className="col-sm-8">
                  <input type="date" className="form-control" value={startDate} onChange={handleStartDateChange} />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="form-label col-sm-4">End Date:</label>
                <div className="col-sm-8">
                  <input type="date" className="form-control" value={endDate} onChange={handleEndDateChange} />
                </div>
              </div>

              <div className="mb-3 font-italic">
                <label className="form-label ">Status:</label>
                <p className="form-text fw-bolder">Registered</p>
              </div>

              <div className="mb-3">
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
              </div>

              {error && <p className="text-danger mt-3">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>



  );
};

export default ProjectForm;
