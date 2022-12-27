import axios from "axios"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { deletePlant } from "../services/internalApiServices"
import { AllPlants } from "../views/AllPLants"
import { MyPlants } from "../views/MyPlants"

export const Delete = (props) =>{
    const {id} = useParams()
    const [plants, setPlants] = useState()
    const handleDeleteClick = (idToDelete) => {
        deletePlant(idToDelete)
            .then((data) => {
                console.log(data)
                const filteredPlants = plants.filter((plant) => {
                    return plant._id !== idToDelete
                })
                setPlants(filteredPlants)
            })
            .catch((error) => {
                console.log(error)
            })
    }
<button
    className="btn btn-sm btn-outline-danger m-3"
    onClick={(e) => {
        handleDeleteClick(plants._id)
    }}> Delete2</button>
}