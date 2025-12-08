import input from "analiza-sync";
import { nanoid } from "nanoid";


let toDoList = [];

// find by id => use in the next functions
const findTaskById = (Id) => {
    return toDoList.find(task => task.id);
};

// add new task
const createTask = (desc) => {
    const newTask = {
        id: nanoid(),
        createDate: new Date(),
        taskDesc: desc,
        status: false
    };
    toDoList.push(newTask);
    return true;
};

// delete task by ID
const deleteTask = (id) => {
    const taskToDelete = findTaskById(id);
    if (taskToDelete) {
        toDoList = toDoList.filter(item => item.id !== taskToDelete.id);
        return true;
    }
    return false;
};

// mark if task dun
const changeStatus = (id) => {
    const task = findTaskById(id);
    if (task) {
        task.status = !task.status;
        return task.status;
    }
    return null;
};

//  check if string exsist - and creating with createTask func
const handleAddTask = () => {
    const desc = input("Enter task description: ");
    if (desc.trim()) {
        createTask(desc.trim());
        console.log(`task added: ${desc.trim()}`);
    } else {
        console.log("Error: description cannot be empty");
    }
};

// get id of task to delete - check if exsist - and delete
const handleDeleteTask = () => {
    const id = input("enter the ID of the task to delete: ");
    if (deleteTask(id)) {
        console.log(`Task id '${id}' was deleted`);
    } else {
        console.log(`Error: no task found matching ID '${id}'`);
    }
};

// get the id to change his status - check if get valid input - change with changeStatus func
const handleChangeStatus = () => {
    const id = input("enter the ID of the taskto change status")
    const newStatus = changeStatus(id);

    if (newStatus !== null){
        const statusText = newStatus ? "completed" : "open";
        console.log(`task status update to: ${statusText}`);
    } else {
        console.log(`error: not found task with this id ${id}`);
    }
};

// the gol of this func is to show all tasks with details - if the tasks is empty clg error msg and bereak with return.
const showTasks = (tasks, title) => {
    console.log(` ${title} \ {tasks.length} total`);
    if (tasks.length === 0) {
        console.log("no tasks to display");
        return;
    }
    tasks.forEach(task => {
        const displayId = task.id;
        const displayDate = task.createDate;
        const displayDesc = task.taskDesc;
        const displayStatus = task.status ? "Completed" : "Open";
        console.log(`task id ${displayId}, created in: ${displayDate}, the task is: ${displayDesc}, status task: ${displayStatus}`);
    });
};

const viewTasksMenu = () => {
    let tasksToDisplay = [toDoList];
    
    console.log("--- filter tasks by ---");
    console.log("i. sort by creation date (newest first)");
    console.log("ii. sort by creation Date (oldest first)");
    console.log("iii. sort by status (open / completed)");
    console.log("iv. search by Task name");
    
    const viewChoice = input("Enter your viewing option: ").toLowerCase();

    switch (viewChoice) {
        case 'i':
            tasksToDisplay.sort((a, b) => b.createDate.getTime() - a.createDate.getTime());
            showTasks(tasksToDisplay, "sorted by newest date");
            break;
        case 'ii':
            tasksToDisplay.sort((a, b) => a.createDate.getTime() - b.createDate.getTime());
            showTasks(tasksToDisplay, "sorted by oldest date");
            break;
        case 'iii':
            tasksToDisplay.sort((a, b) => (a.status === b.status) ? 0 : a.status ? 1 : -1);
            showTasks(tasksToDisplay, "sorted by status");
            break;
        case 'iv':
            const searchText = input("Enter text to search in description: ");
            if (searchText.trim()) {
                const searchResults = tasksToDisplay.filter(task => 
                    task.taskDesc.toLowerCase().includes(searchText.trim())
                );
                showTasks(searchResults, `search results for "${searchText}"`);
            } else {
                console.log("search term cannot be empty ");
            }
            break;
        case 'v':
            return;
        default:
            console.log("invalid option. returning to main menu");
    }
};



