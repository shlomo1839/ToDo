import input from "analiza-sync";
import { nanoid } from "nanoid";

let taskList = []

function createTask(details){
    const newTask = {
        id: nanoid(),
        createDate: new Date(),
        details,
        statusTask: false,
    }
    taskList.push(newTask)
    console.log(`task add: ${details}`);
    return newTask
};

function deleteTask(id){
    if (taskList.length > 0) {
        const TaskListLen = taskList.length
        // comand to delete
        taskList = taskList.filter(item => item.id !== id);
        
        // check the task deleted
        if(taskList.length < TaskListLen){
            console.log(`task with ID ${id} deleted.`);
            return true
        }
    }
    console.log(`task with ID ${id} not exsist in taskList`);
    return false
}


function changeStatus(id) {
    // find the specific task
    const task = taskList.find(item => item.id === id)

    if (task) {
        task.statusTask = !task.statusTask;
        console.log(`status for task ${id} changed to ${task.statusTask ? 'completed' : 'open'}`);
        return task.statusTask;
    }
    console.log(`task with ID ${id} not found`);
    return null;
};

function displayTasks(tasks, title = "all tasks"){
    console.log(`\n=== ${title} (${tasks.length} tasks) ===`);
    if (tasks.length === 0) {
        console.log("no tasks to display");
        return;
    }
    tasks.forEach(task =>{
        const status = task.statusTask ? "completed" : "open"
        console.log(`ID ${task.id} | status: ${status} | created: ${task.createDate.toLocaleDateString()} | details: ${task.details}`);
    }) 
}

function showTasksOrder(taskList){
    console.log("\nHow do you wont to display tasks? ");
    console.log("i. sort by creation date (newest first)");
    console.log("ii. sort by creation Date (oldest first)");
    console.log("iii. sort by status (open / completed)");
    console.log("iv. search by Task name");

    let choice = input("enter your choice: ")

    // this copy of tasklist make shure the original tasklist no changed
    let tasksToDisplay = [...taskList]

    switch (choice){
        case 'i':
                tasksToDisplay.sort((a, b) => b.createDate.getTime() - a.createDate.getTime());
                displayTasks(tasksToDisplay, "Sorted by Newest Date");
                break;
        case 'ii':
            tasksToDisplay.sort((a, b) => a.createDate.getTime() - b.createDate.getTime());
            displayTasks(tasksToDisplay, "Sorted by Oldest Date");
            break;
        case 'iii':
            tasksToDisplay.sort((a, b) => (a.statusTask === b.statusTask) ? 0 : a.statusTask ? 1 : -1); 
            displayTasks(tasksToDisplay, "Sorted by Status (Open First)");
            break;
        case 'iv':
            const searchTxt = input("enter what you search").toLowerCase();
            const foundTasks = taskList.filter((task) => {
                return task.details.toLowerCase().includes(searchTxt);
            });
            displayTasks(foundTasks, `Search Results for "${searchTxt}"`);
                break;
        default:
            console.log("invalid option");
            
    }
}

function showMenu(){
    let keepRunning = true;
    
    while(keepRunning) {
        console.log("press 1 to create a task: ");
        console.log("press 2 to delete a task: ");
        console.log("press 3 to change status of task: ");
        console.log("press 4 to show tasks");
        console.log("press 5 to exit");
        
    

        let req = input("enter your choice: ")

        switch(req) {
            case "1":
                const details = input("enter task details: ");
                if (details) {
                    createTask(details);
                } else {
                    console.log("No task received. Please enter again: ");
                }
                break;
            case "2":
                const idToDelete = input("enter task ID to delete: ")
                deleteTask(idToDelete);
                break;
            case "3":
                const idToChange = input("enter task UD to change statusTask: ")
                changeStatus(idToChange);
                break;
            case "4":
                showTasksOrder(taskList)
                break;
            case "5":
                console.log("Exiting application. Goodbye!!");
                keepRunning = false;
                break;
            default:
                console.log("invalid choice. Please enter 1, 2, 3, 4, or 5.");
        }
        
    }
}

showMenu("go to shop")
