import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
import axios from "axios";


export const CommonName = (props) => {
    const { name } = useParams();
    const [plant, setPlant] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    // const navigate = useNavigate()
    
    useEffect(() => {
        
        const commonName = {
            method: 'GET',
            url: `https://house-plants.p.rapidapi.com/common/${name}`,
            headers: {
                'X-RapidAPI-Key': '1f4102c85amsh7b1fd631b37565ep1fcd19jsn4a1786c72ac6',
                'X-RapidAPI-Host': 'house-plants.p.rapidapi.com'
            }
        };

        axios.request(commonName).then(function (response) {
            // console.log("Common Name", response.data);
            setPlant(response.data)
        }).catch(function (error) {
            console.error(error);
        }).finally(() => {
            setIsLoading(true)
        });

        

    }, [name])




    return (
        <div>
            
            {
                isLoading ?

                <div className="plant">
                        <div className="card1 center">
                            <h1 className="card-title">{plant[0]?.common} </h1>
                            <p className="card-text">Common name: {plant[0]?.latin}</p>
                            <p className="card-text">Category: {plant[0]?.category}</p>
                            <p className="card-text"> Watering: {plant[0]?.watering}</p>
                            <p className="card-text">Ideal Light: {plant[0]?.ideallight}</p>
                            <p className="card-text">Temperature Range: {plant[0]?.tempmin?.fahrenheit}F - {plant[0]?.tempmax?.fahrenheit}F</p>
                            <p className="card-text">Insects: {plant[0]?.insects}</p>
                            <p className="card-text">Diseases: {plant[0]?.diseases}</p>
                        </div>
                    </div>
                
                :
                
                        <p>Loading...</p>

            }
        </div>
    )
}