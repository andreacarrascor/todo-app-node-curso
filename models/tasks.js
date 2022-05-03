const Task = require('./task');


class Tasks {
    // creamos una propiedad en la cual irán todas nuestras tareas
    _list = {};
    // usamos un getter para retornar un nuevo arreglo
    get arrayList() {
        // este es el nuevo arreglo
        const list = [];
        // va a regresar otro nuevo arreglo con todas las llaves del arreglo _list
        // la llave nos sirve para ver cuántas tareas tenemos insertadas en el listado
        Object.keys(this._list).forEach(key => {
            // extraemos la tarea que ya tenemos ahí 
            const task = this._list[key];
            // añadimos la tarea al nuevo listado
            list.push(task);
        });
        return list;
    }
    // es lo que se va a ejecutar cuando creemos una nueva instancia de nuestra tarea
    constructor() {
        this._list = {};
    }

    deleteTask(id = ''){

        if(this._list[id]){
            delete this._list[id];
        }
    }

    loadingTasksFromArray(tasks = []){
        tasks.forEach(task => {
            this._list[task.id] = task;
        });
    }

    fullList(){
        console.log();
        this.arrayList.forEach((task, i) => {
            const idx = `${i + 1}`.brightMagenta;
            const {desc, completedIn} = task;
            const state = (completedIn)? 'Completada'.brightGreen : 'Pendiente'.brightRed
            console.log(`${idx} ${desc} :: ${state}`);
        });
    }

    createTask( desc = '') {

        const task = new Task(desc);
        this._list[task.id] = task;

    }

    listPendingCompletedTasks(completed = true) {
        console.log();
            let counter = 0;
            this.arrayList.forEach(task => { 
                const {desc, completedIn} = task;
                const state = (completedIn)? 'Completada'.brightGreen : 'Pendiente'.brightRed;
                if(completed) {
                    if(completedIn) {
                        counter += 1;
                        console.log(`${(counter + '.').brightGreen} ${desc} :: ${state}`);
                    }
                } else {
                    if(!completedIn) {
                        counter += 1;
                        console.log(`${(counter + '.').brightGreen} ${desc} :: ${state}`);
                    }
                }
                
            });
    }

    toggleComplete (ids = []){
        
        ids.forEach(id => {
            // la ventaja de trabajar con un objeto es que de esta manera podemos acceder a la propiedad que nos interesa.
            const task = this._list[id];
            if(!task.completedIn){
                task.completedIn = new Date().toISOString()
            }
        });

        this.arrayList.forEach(task =>{

            if(!ids.includes(task.id)){
                this._list[task.id].completedIn = null;
            }
        })

    }
}





module.exports = Tasks;