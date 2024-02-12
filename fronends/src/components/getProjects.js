import React, { useEffect, useState } from 'react';
import Navbarleft from './Navbar';
import '../style/ProjectList.css';

const ProjectList = () => {
  const [projects, setProjects] = useState([ ]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  const getProjects = async () => {
    try {
      const response = await fetch('http://localhost:3001/project-list'); 
      const data = await response.json();
      setProjects(data);
      setFilteredProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  

  const updateStatus = async (projectId, newStatus) => {
    try {
      await fetch(` http://localhost:3001/projects/${projectId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const updatedProjects = projects.map((project) =>
        project.id === projectId ? { ...project, status: newStatus } : project
      );
      setProjects(updatedProjects);
      setFilteredProjects(updatedProjects);
    } catch (error) {
      console.error('Error updating project status:', error);
    }
  };

  useEffect(() => {
    getProjects();

  }, []);

  const handleStatusUpdate = (projectId, newStatus) => {
    updateStatus(projectId, newStatus);
  };
console.warn(handleStatusUpdate)

  const handleSearchChange = (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);

    const filtered = projects.filter((project) =>
      Object.values(project).some(
        (value) => typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase())
      )
    );

    setFilteredProjects(filtered);
  };

  const handleSortChange = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    const aValue = a[sortColumn] || ''; 
    const bValue = b[sortColumn] || '';

    if (sortOrder === 'asc') {
      return aValue.localeCompare(bValue, undefined, { numeric: true, sensitivity: 'base' });
    } else {
      return bValue.localeCompare(aValue, undefined, { numeric: true, sensitivity: 'base' });
    }
  });

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = sortedProjects.slice(indexOfFirstProject, indexOfLastProject);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div> <Navbarleft />
      <div className='list'>
        <div className="card">
          <h1>Project Listing</h1><i className="fa fa-search"></i>
          <input type="text" placeholder="Search..." value={searchText} onChange={handleSearchChange} />

          <table className="table">
            <thead>
              <tr>
                <th onClick={() => handleSortChange('projectName')}>Project Name</th>
                <th onClick={() => handleSortChange('Reason')}>Reason</th>
                <th onClick={() => handleSortChange('ProjectType')}>Project Type</th>
                <th onClick={() => handleSortChange('Division')}>Division</th>
                <th onClick={() => handleSortChange('Category')}>Category</th>
                <th onClick={() => handleSortChange('Priority')}>Priority</th>
                <th onClick={() => handleSortChange('Department')}>Department</th>
                <th onClick={() => handleSortChange('Location')}>Location</th>
                <th onClick={() => handleSortChange('startDate')}>Start Date</th>
                <th onClick={() => handleSortChange('endDate')}>End Date</th>
                <th onClick={() => handleSortChange('status')}>Status</th>
                <th >button</th>

              </tr>
            </thead>
            <tbody>
              {currentProjects.map((project) => (
                <tr key={project + 1}>

                  <td>{project.projectName}</td>
                  <td>{project.Reason}</td>
                  <td>{project.PTypes}</td>
                  <td>{project.Division}</td>
                  <td>{project.Category}</td>
                  <td>{project.Priority}</td>
                  <td>{project.Department}</td>
                  <td>{project.Location}</td>
                  <td>{project.startDate}</td>
                  <td>{project.endDate}</td>
                  <td>{project.status}</td>
                  <td>
                    <button className='button1' onClick={() => handleStatusUpdate(project.id, 'Running')}>Start</button>
                    <button className='button2' onClick={() => handleStatusUpdate(project.id, 'Closed')}>Close</button>
                    <button className='button3' onClick={() => handleStatusUpdate(project.id, 'Cancelled')}>Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='page'>
          <ul className="pagination">
            {Array.from({ length: Math.ceil(filteredProjects.length / projectsPerPage) }).map((_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button onClick={() => paginate(index + 1)} className="page-link">
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>

  );
};

export default ProjectList;
