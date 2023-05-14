require('dotenv').config();

const {
    inquirerMenu,
    inquirerPause,
    leerInput,
    createMenuPlaces
} = require('./helpers/inquirer.js');
const Busquedas = require('./models/busquedas.js');
require('colors');


const main = async() => {
    console.clear();

    const busqueda = new Busquedas();
    let option;

    do {
        option = await inquirerMenu();

        switch (option) {
            case '1':
                const ciudad = await leerInput('Ingrese el nombre: ');

                const places = await busqueda.searchPlace(ciudad);

                const id = await createMenuPlaces(places);                
                if(id !== '0') {
                    const placeSelected = places.find(p => p.id == id);

                    const weather = await busqueda.searchWeather(placeSelected.lat, placeSelected.lng);

                    console.log('\nINFORMACION DEL SITIO CONSULTADO'.green);
                    console.log(`Ciudad: ${placeSelected.name}`);
                    console.log(`Latitud: ${placeSelected.lat}`);
                    console.log(`Longitud: ${placeSelected.lng}`);
                    if(weather) {
                        console.log(`Descripcion: ${weather.description}`);
                        console.log(`Temperatura: ${weather.temp}°`);
                        console.log(`Humedad: ${weather.humidity}%`);
                    }                    
                }

                break;
            case '2':
                console.log('no implementado')
                break;
            default:
                break;
        }


        if(option !== '0') { 
            await inquirerPause();
        }        
    } while (option !== '0');
    
}

main();