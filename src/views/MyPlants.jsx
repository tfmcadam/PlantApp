import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Delete } from "../components/Delete";
import { getAllPlants, deletePlant } from "../services/internalApiServices"

export const MyPlants = (props) => {
    const [plants, setPlants] = useState([]);
    const [show, setShow] = useState(false)

    const [filteredResults, setFilteredResults] = useState([])
    const [searchInput, setSearchInput] = useState('')

    useEffect(() => {
        getAllPlants()
            .then((data) => {
                console.log(data[0]._id)
                console.table(data)
                setPlants(data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const handleClick = (e) => {
        setShow(current => !current);

    }

    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        console.log(searchValue)
        if (searchInput !== '') {
            const filteredPlants = plants.filter((plant, idx) => {
                return Object.values(plant).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredPlants)
        }
        else {
            setFilteredResults(plants)
        }
    }
    // delete your plant
    const handleDeleteClick = (idToDelete) => {

        deletePlant(idToDelete)
            .then((data) => {
                console.log(data)

                const filteredPlants = plants.filter((plant) => {
                    return plant._id !== idToDelete
                })
                console.log(data)
                setPlants(filteredPlants)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="plant">
            <div className="card2 mt-3 mx-auto text-center">
                <h2 className="wood mt-3">My Plants</h2>
                <div >
                    {/* all plants search box */}
                    <input
                        onChange={(e) => searchItems(e.target.value)}
                        className="rounded m-3"
                        type="search"
                        placeholder="search..." />

                    {/* shows results if any input other nothing shows */}

                    {filteredResults.length === 0 ? <></> : <p>{filteredResults.length} Available Result(s)</p>}
                </div>
                {/* <CommonName/> */}
            </div>

            
            <div className="flex-row flex-wrap">

                {searchInput.length > 1 ? (
                    filteredResults.map((plant, idx) => {
                        // console.log(filteredResults.length)

                        return (

                            
                            <div className="card2 m-3 text-center">
                                {/* <Link to={`common/${plantName?.join('')}`}>
                                    <h4 className="card-title wood mb-2">{plant.common[0]}</h4>
                                </Link> */}

                                <h5 className="card-text">Latin Name: </h5>
                                <p className="card-text">{plant.latin}</p>
                                <h5 className="card-text">Ideal Light: </h5>
                                <p className="card-text">{plant.ideallight}</p>
                                <div className="d-flex justify-content-center align-items-center">

                                    <button 
                                        onClick={ (e) =>{
                                            handleDeleteClick(plant._id)
                                        }}
                                        className="btn"
                                    >Delete</button>
                                    

                                    {/* <Link to={`users/new/common/${plantName?.join('')}`}>
                                        <button className="btn">Add Plant</button>
                                    </Link> */}
                                </div>
                            </div>
                        )
                    })
                ) : (

                    // <p>There are no results</p>
                    plants.sort((a, b) => a.latin > b.latin ? 1 : -1).map((plant, i) => {

                        // console.table(plantName?.join(''))

                        return (

                            <div className="card2 m-3 text-center">

                                {/* <Link to={`common/${plantName?.join('')}`}>
                                    <h4 className="card-title wood mb-2">{plant.common[0]}</h4>
                                </Link> */}
                                <h3 className="card-title mb-1">{plant.common}</h3>
                                <h5 className="card-text">Latin Name: </h5>
                                <p className="card-text">{plant.latin}</p>
                                <h5 className="card-text">Ideal Light: </h5>
                                <p className="card-text">{plant.ideallight}</p>
                                <div className="d-flex justify-content-center align-items-center">

                                    <button
                                        onClick={(e) => {
                                            handleDeleteClick(plant._id)
                                        }}
                                        className="btn"
                                    >Delete</button>
                                    <button className="btn">Details</button>
                                    
                                    {/* <Link to={`users/new/common/${plantName?.join('')}`}>
                                        <button className="btn">Add Plant</button>
                                    </Link> */}
                                </div>
                            </div>
                        )
                    })
                )}
                

            </div>
        </div>


    )
}