const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const PORT = 3001;
const cors = require('cors');
app.use(cors());
app.use(express.json());

const pool  = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'project',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL: ' + err.stack);
//     return;
//   }
//   console.log('Connected to MySQL as id ' + connection.threadId);
// });



app.get('/project-list', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM project.protask');
    res.json(results);
  } catch (error) {
    console.error('Error retrieving strings:', error);
    res.status(500).send('Error retrieving strings');
  }
});


app.post('/user/authenticate', async (req, res) => {
  const { email, password } = req.body;

  try {

    const isValidUser = await validateUserFromDatabase(email, password);

    if (isValidUser) {
      res.json({ success: true, message: 'Authentication successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


const validateUserFromDatabase = async (email, password) => {
  try {
    const [results] = await pool.query('SELECT * FROM project.user WHERE email = ? AND password = ?', [email, password]);

    return results.length > 0;
  } catch (error) {
    throw error;
  }
};

app.get('/dashboard/counters', async (req, res) => {
  try {
    const [totalProjectsResult] = await pool.query('SELECT COUNT(*) as total FROM project.protask');
    const [closedProjectsResult] = await pool.query('SELECT COUNT(*) as closed FROM project.protask WHERE status = "Closed"');
    const [runningProjectsResult] = await pool.query('SELECT COUNT(*) as running FROM project.protask WHERE status = "Running"');
    const [overdueProjectsResult] = await pool.execute('SELECT COUNT(*) as overdue FROM project.protask WHERE status = "Running" AND endDate < NOW()');
    const [cancelledProjectsResult] = await pool.execute('SELECT COUNT(*) as cancelled FROM project.protask WHERE status = "Cancelled"');


    const totalProjects = totalProjectsResult && totalProjectsResult[Symbol.iterator] ? totalProjectsResult[0].total : 0;
    const closedProjects = closedProjectsResult && closedProjectsResult[Symbol.iterator] ? closedProjectsResult[0].closed : 0;
    const runningProjects = runningProjectsResult && runningProjectsResult[Symbol.iterator] ? runningProjectsResult[0].running : 0;
    const overdueProjects = overdueProjectsResult[0].overdue;
    const cancelledProjects = cancelledProjectsResult[0].cancelled;

    const counters = {
      totalProjects,
      closedProjects,
      runningProjects,
      overdueProjects,
      cancelledProjects,

    };

    res.json(counters);
  } catch (error) {
    console.error('Error fetching counters:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/dashboard/chart', async (req, res) => {
  try {
    const [totalProjectsResult] = await pool.query('SELECT COUNT(*) as total FROM project.protask');
    const [closedProjectsResult] = await pool.query('SELECT COUNT(*) as closed FROM project.protask WHERE status = "Closed"');
    const [departmentResult] = await pool.query('SELECT Department FROM project.protask');
    
    const totalProjects = totalProjectsResult && totalProjectsResult[Symbol.iterator] ? totalProjectsResult[0].total : 0;
    const closedProjects = closedProjectsResult && closedProjectsResult[Symbol.iterator] ? closedProjectsResult[0].closed : 0;
   
    const chartData = [
      { TotalProjects: totalProjects },
      { ClosedProjects: closedProjects },
      {departmentResult}
      
     
    ];

    res.json(chartData);
  } catch (error) {
    console.error('Error fetching and processing data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/project/insert', async (req, res) => {
  try {
    const {
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
      status
    } = req.body;

    if (!projectName || !startDate || !endDate || !status) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const parameters = [
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
      status
    ].map(value => (value !== undefined ? value : null));
    const [result] = await pool.query(
      'INSERT INTO project.protask (projectName, Reason, PTypes, Division, Category, Priority, Department, Location, startDate, endDate, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      parameters
    );

    const insertedProjectId = result.insertId;

    res.json({ id: insertedProjectId, message: 'Project inserted successfully' });
  } catch (error) {
    console.error('Error inserting project:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/projects/:projectId/status', async (req, res) => {
  const { projectId } = req.params;
  const { status } = req.body;

  try {
    const updateSql = 'UPDATE project.protask SET status = ? WHERE id = ?';
    const updateParams = [status, projectId];
    pool.query(updateSql, updateParams, (updateErr, updateResults) => {
      if (updateErr) {
        console.error('Error updating project status:', updateErr);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
        return;
      }

      if (updateResults.affectedRows === 0) {
        res.status(404).json({ success: false, message: 'Project not found' });
      } else {
        res.status(200).json({ success: true, message: 'Project status updated successfully' });
      }
    });
  } catch (error) {
    console.error('Error updating project status:', error);

    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});