const fs = require('fs').promises;
const { Command } = require('commander');
let chalk;  // Chalk will be loaded dynamically

async function loadChalk() {
    if (!chalk) {
        chalk = (await import('chalk')).default;  // Dynamically import chalk
    }
}

const program = new Command();

async function loadTodos(){
    try{
        const data = await fs.readFile('todos.json');
        const dataJSON = data.toString();
        return JSON.parse(dataJSON);
    }
    catch(e){
        return [];
    }
}

async function saveTodos(todos) {
    const dataJSON = JSON.stringify(todos);
    await fs.writeFile('todos.json', dataJSON);
}

async function addTodo(task){
    const todos = await loadTodos();
    todos.push({task, completed: false});
    await saveTodos(todos);
    console.log(`Added new task: "${task}"`);
}

async function listTodos(){
    await loadChalk();
    const todos = await loadTodos();
    console.log("Your To-Dos:");
    todos.forEach((todo, index) => {
        const status = todo.completed ? "[x]" : "[ ]";
        if(todo.completed){
            console.log(chalk.green(`${index+1}. ${status} ${todo.task}`));
        }
        else{
            console.log(chalk.blue(`${index+1}. ${status} ${todo.task}`));
        }
              
    });
}

async function markCompleted(index){
    try{
        const todos = await loadTodos();
        if(index>0 && index<=todos.length){
            todos[index-1].completed = true;
            await saveTodos(todos);
            console.log(`Marked Task ${index} as completed`);
        }
        else console.log("Invalid Task number");
    }
    catch(e){
        console.log('Error: ', e);
    }
}

async function deleteTask(index){
    try{
        const todos = await loadTodos();
        if(index > 0 && index<=todos.length){
            todos.splice(index-1, 1);
            await saveTodos(todos);
            console.log(`Deleted Task ${index}`);
        }
        else{
            console.log("Invalid Index");
        }
    }
    catch(e){
        console.log("Error: ", e);
    }
}

// Commander set up
program
  .name('ToDo CLI')
  .description('CLI application to manage your ToDo list')
  .version('1.0.0');

program.command('add')
    .description('Add a new task to your To-Do List')
    .argument('<task>', 'New Task as a string')
    .action(addTodo);

program.command('list')
    .description('Lists all To-Dos')
    .action(listTodos);

program.command('complete')
    .description('Marks the provided task as completed')
    .argument('<index>', 'Index of the task as a string')
    .action((index) => markCompleted(parseInt(index)));

program.command('remove')
    .description('Removes To-Do from the list')
    .argument('<index>', 'Index of the task as a string')
    .action((index) => deleteTask(parseInt(index)));

program.parse(process.argv);