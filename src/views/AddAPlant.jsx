import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { createPlant } from '../services/internalApiServices'







export const AddAPlant = (props) => {
    const { name } = useParams();
    // const [plant, setPlant] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate()

    const [formData, setFormData] = useState(
        {
            latin: "",
            common: "",
            category: "",
            tempmax: "",
            tempmin: "",
            ideallight: "",
            toleratedlight: "",
            watering: "",
            insects: "",
            use: "",
        })



    const [errors, setErrors] = useState(null);

    useEffect(() => {

        const commonName = {
            method: 'GET',
            url: `https://house-plants.p.rapidapi.com/common/${name}`,
            headers: {
                'X-RapidAPI-Key': 'Your_API_Key',
                'X-RapidAPI-Host': 'house-plants.p.rapidapi.com'
            }
        };

        axios.request(commonName).then(function (response) {
            // console.log("Common Name", response.data);
            setFormData(response.data)
        }).catch(function (error) {
            console.error(error);
        }).finally(() => {
            setIsLoading(true)
        });
    }, [name])

    // Submit function to add plant to database
    const handleSubmit = (e) => {
        e.preventDefault();
        createPlant(formData)
            .then((data) => {
                console.log('new plant data:', data)
                navigate('/users/plants')

            })
            .catch((error) => {
                console.log(error.response);
                setErrors(error.response?.data?.errors);
            })
    }

    // updates data to be added
    const handleFormChanges = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        if (formData === null)
            return null
    }




    return (
        <div>

            {
                isLoading ?


                    <div className="card1 w-25 mx-auto mt-3">
                        <h1>Add a Plant</h1>
                        <div className="card-body shadow">
                            {/* new plant form */}
                            <form onSubmit={(e) => {
                                handleSubmit(e)
                                console.log(" Submit Data", formData);
                            }}>
                                <div className="form-group">
                                    <label className="h6">Common Name:</label>
                                    <input
                                        onChange={handleFormChanges}
                                        type="text"
                                        name="common"
                                        value={formData[0]?.common}
                                        className="form-control" />
                                </div>

                                <div className="form-group">
                                    <label className="h6">Latin Name:</label>
                                    <input type="text"
                                        onChange={handleFormChanges}
                                        name="latin"
                                        value={formData[0]?.latin}
                                        className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label className="h6">Category:</label>
                                    <input type="text"
                                        onChange={handleFormChanges}
                                        name="category"
                                        value={formData[0]?.category}
                                        className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label className="h6">Watering:</label>
                                    <input type="text"
                                        onChange={handleFormChanges}
                                        name="watering"
                                        value={formData[0]?.watering}
                                        className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label className="h6">Ideal Light:</label>
                                    <input type="text"
                                        onChange={handleFormChanges}
                                        name="ideallight"
                                        value={formData[0]?.ideallight}
                                        className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label className="h6">Min Temperature (F):</label>
                                    <input type="number"
                                        onChange={handleFormChanges}
                                        name="tempmin"
                                        value={formData[0]?.tempmin?.fahrenheit}
                                        className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label className="h6">Max Temperature (F):</label>
                                    <input type="number"
                                        onChange={handleFormChanges}
                                        name="tempmax"
                                        value={formData[0]?.tempmax?.fahrenheit}
                                        className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label className="h6">Insects:</label>
                                    <input type="text"
                                        onChange={handleFormChanges}
                                        name="insects"
                                        value={formData[0]?.insects}
                                        className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label className="h6">Common Diseases:</label>
                                    <input type="text"
                                        onChange={handleFormChanges}
                                        name="diseases"
                                        value={formData[0]?.diseases}
                                        className="form-control" />
                                </div>
                                <button className="btn btn-outline-dark m-2" type="submit">Add Plant</button>
                            </form>


                        </div>
                    </div>


                    :

                    <p>Loading...</p>
            }
        </div>
    )
}
