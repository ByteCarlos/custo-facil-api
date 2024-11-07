CREATE DATABASE br_custo_facil;

\c br_custo_facil;

CREATE TABLE Department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE Roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE MonthlyPeriod (
    id SERIAL PRIMARY KEY,
    month_year VARCHAR(7) NOT NULL,
    status VARCHAR(50) NOT NULL
);

CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role_fk INT REFERENCES Roles(id),
    department_fk INT REFERENCES Department(id)
);

CREATE TABLE Cost (
    id SERIAL PRIMARY KEY,
    department_fk INT REFERENCES Department(id),
    monthly_period_fk INT REFERENCES MonthlyPeriod(id),
    personnel_cost DECIMAL(15, 2) NOT NULL,
    material_cost DECIMAL(15, 2) NOT NULL,
    administrative_cost DECIMAL(15, 2) NOT NULL,
    insertion_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL
);

CREATE TABLE CostReport (
    id SERIAL PRIMARY KEY,
    monthly_period_fk INT REFERENCES MonthlyPeriod(id),
    department_fk INT REFERENCES Department(id),
    generation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    format VARCHAR(50) NOT NULL
);

CREATE TABLE Logs (
    id SERIAL PRIMARY KEY,
    user_fk INT REFERENCES Users(id),
    log_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    action_fk INT REFERENCES Actions(id)
);

CREATE TABLE Actions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
