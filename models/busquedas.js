const axios = require('axios');

class Busquedas {

    constructor() {

    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'language': 'es',
            'limit': 5
        };
    }

    get paramsOpenWeather() {
        return {
            'appid': process.env.OPEN_WEATHER_KEY,
            'lang': 'es',
            'units': 'metric'
        };
    }

    searchPlace = async(place) => {
        try {
            //const result = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?proximity=ip&types=place%2Ccountry%2Cregion%2Cneighborhood%2Cdistrict&language=es&access_token=${this.TOKEN}`);
                        
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.paramsMapbox
            });
            
            const result = await instance.get();
            if(result && result.statusText === 'OK') {
                // console.log(result.data);
                // console.log(result.data.features);
                return result.data.features.map(p => ({
                    id: p.id,
                    name: p.place_name,
                    lng: p.center[0],
                    lat: p.center[1]
                })) ;
            }
        } catch (error) {
            console.log(error)
        }  
        
        return [];
    }

    searchWeather = async(lat, lon) => {
        try {
            //const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=-0.220164&lon=-78.512327&appid=ceeae41fc8f1f4f7bced9bf1bef51f71&lang=es`);
                        
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather?`,
                params: {...this.paramsOpenWeather, lat, lon } // ampliar el objeto mediante desestructuracion
            });
            
            const result = await instance.get();
            //console.log(result.data)
            if(result && result.status === 200) {
                return {
                    temp: result.data.main.temp,
                    humidity: result.data.main.humidity,
                    description: result.data.weather[0].description
                }
            }
        } catch (error) {
            console.log(error)
        }  
        
        return undefined;
    }

}

module.exports = Busquedas;