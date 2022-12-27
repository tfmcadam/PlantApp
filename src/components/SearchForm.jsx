import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export const SearchForm = (props) => {
    const [category, setCategory] = useState("common");
    const [name, setName] = useState("")
    // const [id, setId] = useState("");

    const navigate = useNavigate();
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        // console.log(category)
        // console.log(name)
        
        
        // adds ability to turn multiple words into a single string 
        const plantName = name.split(' ')
        navigate(`/${category}/${plantName?.join('')}`)
        setName('')
    }

    return (
        <div className="container w-50">

            <Link to="/">All Plants</Link>
            
            <form className="form-group shadow" onSubmit={handleSubmit}>
                <div className="form-control mt-3">
                    <div >
                    <label className="me-3">Search For: </label>
                    <select className="form-select" name="category" id="category" onChange={(e) =>{
                        setCategory(e.target.value);
                    }} value= {category}>
                        
                        <option value="common">Common Name</option>
                        <option value="latin">Latin Name</option>
                    </select>
                    </div>
                    <label >{category}  name of Plant: </label>
                    <input className="m-3" type="text" name="id" onChange={(e) =>{
                        // const plantName = e.target.value.split(' ')
                        setName(e.target.value);
                    }} value={name}/>
                    <input className="btn btn-primary m-3" type="submit" value="Search" />
                </div>
            </form>
        </div>
    )
}