// se recomienda que primero vayan las importaciones de paquetes de terceros, luego las nuestras
require('colors');
const { inquirerMenu, inquirerPause, readInput, deleteTasksList, confirmMessage, showChecklist} = require('./helpers/inquirer');
const { saveData, readData } = require('./helpers/saveFile');
const Tasks = require('./models/tasks');

const main = async() => {

    let opt= '';
    const tasks = new Tasks();

    const tasksData = readData();

    if(tasksData) {
        // Establecer las tareas
        tasks.loadingTasksFromArray(tasksData);
    }

    do {
        opt = await inquirerMenu();

        switch(opt) {
            case '1':
            // crear opcion
            const desc = await readInput('Descripción:');
            tasks.createTask(desc);
            break;

            case '2':
                tasks.fullList();
            break;

            case '3':
                tasks.listPendingCompletedTasks(true);
            break;

            case '4':
                tasks.listPendingCompletedTasks(false);
            break;

            case '5':
                const ids = await showChecklist(tasks.arrayList);
                tasks.toggleComplete(ids);
            break;

            case '6':
                const id = await deleteTasksList(tasks.arrayList);
                if(id !== '0'){
                    const ok = await confirmMessage('¿Está seguro de borrar la tarea?');
                    if(ok){
                        tasks.deleteTask(id);
                        console.log('Tarea eliminada exitosamente')
                }
                }
                
            break;
        }

        saveData(tasks.arrayList);

        await inquirerPause();

    } while (opt !== '0');
    
}

main();
