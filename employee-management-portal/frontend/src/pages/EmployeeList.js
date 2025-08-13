import React, { useState, useEffect } from "react"; // Imports React and hooks (useState, useEffect) for managing state and side effects.
import axios from "axios";

// For static demo
// const employees = [
//     // An array of static employee data.
//     {id: 1, name: "Geeta Kulkarni", department: "IT", salary: 60000}, // Employee 1 data.
//     {id: 2, name: "Atharva Joshi", department: "HR", salary: 50000}, // Employee 2 data.
// ];

// const EmployeeList = () => ( // Defines a functional component named EmployeeList.
//     <div>
//         <h1> Employee List </h1> {/* Displays the heading "Employee List". */}
//         <ul> {/* Starts an unordered list to display employee details. */}
//             {employees.map((employee) => (
//                 // Loops over each employee in the employees array.
//                 <li key={employee.id}> 
//                     {/* Creates a list item for each employee. The key ensures React tracks items efficiently. */}
//                     {employee.name} - {employee.department} - ${employee.salary}
//                     {/* Displays employee details (name, department, and salary) in a formatted string. */}
//                 </li>
//             ))}
//         </ul>
//     </div>
// );

// For dynamic demo
//useState([]): Initializes an empty list for employee data.
// useState(true): Tracks if data is loading.
const EmployeeList = () => {
    const [employees, setEmployees] = useState([]); // State to store employee data.
    const [loading, setLoading] = useState(true); // State to track loading status.

    useEffect (() => {
          // Fetch employee data when the component mounts.
          //axios.get(URL): Makes an HTTP GET request to fetch data from the backend API.
        axios.get("http://localhost:8080/api/employees") // /api/emplyees : name of api endpoint
        .then((response) => {
            // setEmployees(response.data): Updates the state with the fetched data.
            setEmployees(response.data); // Update state with fetched employee data.
            setLoading(false); // Set loading to false after data is fetched.
        })
        .catch((error) => {
            console.error("Error fetching employee data:", error); // Log any errors to the console.
            setLoading(false); // Handle errors and stop loading.
        })
    }, []); // Empty dependency array means this effect runs once on mount.
    if (loading) return <p>Loading...</p>; // Displays a loading message while data is being fetched.

    return(
        <div>
            <h1>Employee List</h1>
            <ul>
                {employees.map((employee) => (
                    <li key={employee.id}>
                        {/* Creates a list item for each employee. The key ensures React tracks items efficiently. */}
                        {employee.name} - {employee.department} - ${employee.salary}
                        {/* Displays employee details (name, department, and salary) in a formatted string. */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeList; // Exports the EmployeeList component for use in other files.
