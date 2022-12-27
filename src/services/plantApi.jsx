import axios from "axios"

// figure out how to separate api call 
// into a service component



// get a plant by common name
const common = {
    method: 'GET',
    url: 'https://house-plants.p.rapidapi.com/common/',
    headers: {
        'X-RapidAPI-Key': 'Your_API_Key',
        'X-RapidAPI-Host': 'house-plants.p.rapidapi.com'
    }
};

axios.request(common).then(function (response) {
    console.log(response.data);
}).catch(function (error) {
    console.error(error);
});

// get by latin name
const latinName = {
    method: 'GET',
    url: 'https://house-plants.p.rapidapi.com/latin/',
    headers: {
        'X-RapidAPI-Key': 'Your_API_Key',
        'X-RapidAPI-Host': 'house-plants.p.rapidapi.com'
    }
};

axios.request(latinName).then(function (response) {
    console.log(response.data);
}).catch(function (error) {
    console.error(error);
});

// // get all plants
// const allPlants = {
//     method: 'GET',
//     url: 'https://house-plants.p.rapidapi.com/all',
//     headers: {
//         'X-RapidAPI-Key': 'Your_API_Key',
//         'X-RapidAPI-Host': 'house-plants.p.rapidapi.com'
//     }
// };

// axios.request(allPlants).then(function (response) {
//     console.log(response.data);
// }).catch(function (error) {
//     console.error(error);
// });
