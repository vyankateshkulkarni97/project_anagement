import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../src/components/Login';
// import Dashboard from '../src/components/Dashboard';
import ProjectForm from './components/ProjectForm';
import ProjectList from './components/getProjects';
// import DashboardChart from './components/DashboardChart';
import Home from './components/Home';
// import { Navbar } from 'react-bootstrap-v5';
// import Navbarleft from '../src/components/Navbar'

function App  () {
  return (
    
    <Router>
      <div>
      <div className="first-div"> </div>
      <div className="second-div"> </div>
      
      {/* <Navbarleft/> */}
      <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/Home" element={<Home />} />
      <Route exact path="/createproject" element={<ProjectForm />} />
      <Route exact path="/allproject" element={<ProjectList />} />

      </Routes>
      </div>
    </Router>
    // <Router>
    //   <div>
        
    //     <div>
    //       <h1>Dashboard</h1>
      
    //       <DashboardChart />
    //     </div>
    //     <Routes>
    //       <Route exact path="/home"  element={Home} />
    //       <Route exact path="/project-listing" element={ProjectList} />
    //       <Route exact path="/add-project" element={ProjectForm} />
    //       <Route exact path="/login" element={Login} />
    //     </Routes>
    //   </div>
    // </Router>

  );
};

export default App;
