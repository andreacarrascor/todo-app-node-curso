require('colors');


const showMenu = () => {

    return new Promise(resolve => {
        console.clear();
        console.log('================================'.brightMagenta);
        console.log('     Seleccione una opción     '.brightGreen);
        console.log('================================\n'.brightMagenta);

        console.log(`${'1.'.brightMagenta} Crear tarea`);
        console.log(`${'2.'.brightMagenta} Listar tareas`);
        console.log(`${'3.'.brightMagenta} Listar tareas completadas`);
        console.log(`${'4.'.brightMagenta} Listar tareas pendientes`);
        console.log(`${'5.'.brightMagenta} Completar tarea(s)`);
        console.log(`${'6.'.brightMagenta} Borrar tarea`);
        console.log(`${'0.'.brightMagenta} Salir\n`);

        // prepararemos la interfaz que le mostramos al usuario
        const readline = require('readline').createInterface({
            // pausa la ejecución para esperar un input del usuario
            input: process.stdin,
            // mostramos un mensaje al usuario en la consola
            output: process.stdout
        })
        // para mostrarle información al usuario 
        readline.question('Seleccione una opción: ', (option) => {
            // lo cerramos para que no quede esperando información del usuario
            readline.close();
            resolve(option);
        })
    });


}

const pause = () => {

    return new Promise(resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        readline.question(`\nPresione ${'ENTER'.brightGreen} para continuar\n`, (option) => {
            readline.close();
            resolve();
        })
    })

    
}

module.exports = {
    showMenu,
    pause
}