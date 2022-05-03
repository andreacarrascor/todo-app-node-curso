const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
            value: '1',
            name: `${'1'.brightMagenta}. Crear tarea` 
            },
            {
                value: '2',
                name: `${'2'.brightMagenta}. Listar tareas`
            },
            {
                value: '3',
                name: `${'3'.brightMagenta}. Listar tareas completadas` 
            },
            {
                value: '4',
                name: `${'4'.brightMagenta}. Listar tareas pendientes` 
            },
            {
                value: '5',
                name: `${'5'.brightMagenta}. Completar tarea(s)` 
            },
            {
                value: '6',
                name: `${'6'.brightMagenta}. Borrar tarea` 
            },
            {
                value: '0',
                name: `${'0'.brightMagenta}. Salir` 
            }

        ]
    }
]

// función para imprimir el menú
const inquirerMenu = async() => {
    console.clear();
    console.log('================================'.brightMagenta);
    console.log('     Seleccione una opción     '.brightWhite);
    console.log('================================\n'.brightMagenta);

    const {opcion} = await inquirer.prompt(questions);

    return opcion;
}

const inquirerPause = async() => {

    const questionToContinue = [
        {
            type: 'input',
            name: 'input',
            message: `Presione ${'ENTER'.brightGreen} para continuar`,
        }
    ]
    console.log('\n');
    await inquirer.prompt(questionToContinue);

}

const readInput = async( message ) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if(value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);
    return desc;

}

const deleteTasksList = async (tasks = []) => {

    const choices = tasks.map((task, i) => {
        const idx = `${i+1}.`.brightMagenta;
        return {
            value: task.id,
            name:`${idx} ${task.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.brightMagenta + 'Cancelar'
    })

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const {id} = await inquirer.prompt(questions);
    return id;

}

const confirmMessage = async(message) =>{

    const question = [{
        type: 'confirm',
        name: 'ok',
        message
    }];

    const {ok} = await inquirer.prompt(question);
    return ok;
}

const showChecklist = async (tasks = []) => {

    const choices = tasks.map((task, i) => {
        const idx = `${i+1}.`.brightMagenta;
        return {
            value: task.id,
            name:`${idx} ${task.desc}`,
            checked: (task.completedIn) ? true: false
        }
    });

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]

    const {ids} = await inquirer.prompt(question);
    return ids;

}

module.exports = {
    inquirerMenu,
    inquirerPause,
    readInput,
    deleteTasksList,
    confirmMessage,
    showChecklist
}