import React from 'react';
import './styles.css'
import { useState, useEffect } from "react";

const App = () => {
    //using useState hook to implement state, initializing initial state as an empty array
    const [allPets, setAllPets] = useState([])
    
    //delete functionality to assign to a button later on rerendering page on state change
    // eslint-disable-next-line no-unused-vars
    const handleDelete = (index,e) => {
        setAllPets(allPets.filter((v,i) => i !== index));
    }

    //use effect hook to leverage PetStore API, first receiving available pets
    //once available pets received, ensure all pets to be charted have defined values in requested areas
    //reset state of application to received and filtered data
    useEffect(() =>{
        fetch('https://petstore.swagger.io/v2/pet/findByStatus?status=available')
        .then((res)=> res.json())
        .then((data)=> data.filter(data => {
            return data.category && data.name
        }))
        .then(data=> setAllPets(data))
        .catch(err => console.log(err))
    },[])
    //map over our array from our new state to create rows with info needed (name, category, status)
    //using the index of the state as unique key in order to be able to find and delete pets when needed
    //add a button to each row and connect handleDelete function created above
    const tableData = allPets.map((data,index) => {
            return (
                <tr className = 'row' id = {index} key = {index}>
                    <td>{data.name}</td>
                    <td>{data.category.name}</td>
                    <td>{data.status}</td>
                    <button onClick={e=>handleDelete(index,e)}>Adopted!!</button>
                </tr>
            )
        })

    //create the table with appropriate headings and pass in tableData variable from above to fill each row

    return (
         <div>
            <h1 className = "table-title">Pet Table</h1>
            <table className="main-table">
                <thead className = 'column-names'>
                    <tr>
                        <th>Pet Name</th>
                        <th>Category</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody className = 'body-table'>
                    {tableData}  
                </tbody>
            </table>
        </div> 
    );
};

export default App;