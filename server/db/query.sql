USE project;


CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Create the protask table
CREATE TABLE protask (
    id INT AUTO_INCREMENT PRIMARY KEY,
    projectName VARCHAR(255) NOT NULL,
    Reason VARCHAR(255),
    PTypes VARCHAR(255),
    Division VARCHAR(255),
    Category VARCHAR(255),
    Priority VARCHAR(255),
    Department VARCHAR(255),
    Location VARCHAR(255),
    startDate VARCHAR(255),
    endDate VARCHAR(255),
    status VARCHAR(255)
);