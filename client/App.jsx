import React from 'react';
import './styles.css'
import { useState, useEffect } from "react";
import PetTable from './PetTable.jsx';

const App = () => {
    const [allPets, setAllPets] = useState([])
    const handleDelete = (index,e) => {
        setAllPets(allPets.filter((v,i) => i !== index));
    }
    useEffect(() =>{
        fetch('https://petstore.swagger.io/v2/pet/findByStatus?status=available')
        .then((res)=> res.json())
        .then((data)=> data.filter(data => {
            return data.category && data.name
        }))
        .then(data=> setAllPets(data))
        .catch(err => console.log(err))
    },[])
    console.log(allPets)
    // const petData = allPets.filter(data =>{
    //     return data.category && data.name
    // })
    // console.log(petData)
    const tableData = allPets.map((data,index) => {
        //console.log(data.category.name)
        // const randomNumber = Math.floor(Math.random()*1000000)
        //console.log(randomNumber)
            return (
                <tr id = {index} key = {index}>
                    <td>{data.name}</td>
                    <td>{data.category.name}</td>
                    <td>{data.status}</td>
                    <button onClick={e=>handleDelete(index,e)}>Adopted!!</button>
                </tr>
            )
        })
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