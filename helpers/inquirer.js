const inquirer = require('inquirer');
require('colors');

const menuOptions = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Qué desea hacer ? ',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Buscar ciudad`
            },
            {
                value: '2',
                name: `${'2.'.green} Historial`
            },
            new inquirer.Separator(),
            {
                value: '0',
                name: `${'0.'.green} Salir \n`
            },
        ],
        pageSize: 10
    }
];

const pauseOptions = [
    {
        type: 'input',
        name: 'opcion',
        message: `Ingrese ${'ENTER'.green} para continuar...`
    }
];

const inquirerMenu = async() => {

    console.clear();
    console.log('__________________________'.green);
    console.log('                          '.green);
    console.log(' *** APLICACION CLIMA *** '.white);
    console.log('__________________________\n'.green);

    const {opcion} = await inquirer.prompt(menuOptions);
    return opcion;
}

const inquirerPause = async() => {
    console.log('\n');
    const {opcion} = await inquirer.prompt(pauseOptions);
    return opcion;
}

const leerInput = async(message) => {
    const question = [
        {
            type:'input',
            name: 'desc',
            message,
            validate(value) {
                if(value.length === 0) {
                    return 'Por favor ingrese un valor.'
                }
                return true;
            }
        }    
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const createMenuPlaces = async(places = []) => {
    console.clear();
    
    const choices = []; 

    places.forEach((t, index) => {
        choices.push(
            {
                value: t.id,
                name: `${(index+1).toString().green} ${t.name}`
            },
        );
    });

    choices.unshift(
        {
            value: '0',
            name: `${'0'.green} Cancelar`
        },
    );

    const options = [
        {
            type: 'list',
            name: 'id',
            message: 'Qué lugar desea consultar ? ',
            choices,
            pageSize: 10
        }
    ];

    const {id} = await inquirer.prompt(options);

    return id;
}


module.exports = { inquirerMenu, inquirerPause, leerInput, createMenuPlaces };