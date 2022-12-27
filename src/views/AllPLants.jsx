import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

// import { getAllPlants, deletePlant } from "../services/internalApiServices"

export const AllPlants = (props) => {
    const [plants, setPlants] = useState([]);
    const [filteredResults, setFilteredResults] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const [show, setShow] = useState(false)
    useEffect(() => {
        // get all plants
        const allPlants = {
            method: 'GET',
            url: 'https://house-plants.p.rapidapi.com/all',
            headers: {
                'X-RapidAPI-Key': 'Your_API_Key',
                'X-RapidAPI-Host': 'house-plants.p.rapidapi.com'
            }
        };


        axios.request(allPlants)
            .then(function (response) {
                // console.log(response.data)
                setPlants(response.data)

            }).catch(function (error) {
                console.error(error);
            });
    }, [])

    const handleClick = (e) => {
        setShow(current => !current);

    }


    // search bar for all plants
    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        // console.log(searchValue)
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

    return (

        // header search bar
        <div>
            <div className="card2 mx-auto mt-3 text-center">
                <h2 className="wood mt-3">Available Plants</h2>
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
                {/* 👇️ show elements on click */}


                {searchInput.length > 1 ? (
                    filteredResults.map((plant, idx) => {
                        // console.log(filteredResults.length)
                        const plantName = plant.common[0]?.split(' ')
                        return (


                            <div className="card2 text-center m-3">

                                <Link to={`common/${plantName?.join('')}`}>
                                    <h4 className="card-title wood mb-2">{plant.common[0]}</h4>
                                </Link>

                                <h5 className="card-text">Latin Name: </h5>
                                <p className="card-text">{plant.latin}</p>
                                <h5 className="card-text">Ideal Light: </h5>
                                <p className="card-text">{plant.ideallight}</p>
                                <div className="d-flex justify-content-center align-items-center">

                                    <button onClick={handleClick}

                                        className="btn"
                                    >Details</button>
                                    <Link to={`users/new/common/${plantName?.join('')}`}>
                                        <button className="btn">Add Plant</button>
                                    </Link>
                                </div>
                                {show ? (
                                    <div>
                                        <h2>{plant.common[0]}</h2>
                                    </div>
                                ) :
                                    <></>}
                            </div>
                        )
                    })

                ) : (
                
                    // <p>There are no results</p>
                    plants.sort((a, b) => a.latin > b.latin ? 1 : -1).map((plant, i) => {
                        const plantName = plant.common[0]?.split(' ')
                        // console.table(plantName?.join(''))

                        return (

                            <div className="card2 text-center m-3">

                                <Link to={`common/${plantName?.join('')}`}>
                                    <h4 className="card-title wood mb-2">{plant.common[0]}</h4>
                                </Link>

                                <h5 className="card-text">Latin Name: </h5>
                                <p className="card-text">{plant.latin}</p>
                                <h5 className="card-text">Ideal Light: </h5>
                                <p className="card-text">{plant.ideallight}</p>
                                <div className="d-flex justify-content-center align-items-center">
                                    <button
                                        onClick={handleClick}
                                        className="btn ">Details</button>
                                    <Link to={`users/new/common/${plantName?.join('')}`}>
                                        <button className="btn">Add Plant</button>
                                    </Link>
                                </div>
                                {show && (
                                    <div>
                                        <h2>Some content here</h2>
                                    </div>
                                )}
                            </div>
                        )
                    })
                )
                }

            </div>
        </div>
    )
}


