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
    console.log(`task add`);
    return newTask
};

function deleteTask(id){
    const taskToDelete = id;
    if (taskList) {
        taskList = taskList.filter(item => item.id !== taskList.id);
        return true;
    }
    console.log(`task with ${id} not exsist in taskList`);
    return false
}


function changeStatus(id) {
    if (task) {
        task.status = !task.status;
        return task.status;
    }
    return null;
};

function showTasksOrder(taskList){
    console.log("How do you wont to display tasks? ");
    console.log("i. sort by creation date (newest first)");
    console.log("ii. sort by creation Date (oldest first)");
    console.log("iii. sort by status (open / completed)");
    console.log("iv. search by Task name");

    let choice = input("enter your choice: ")

    switch (choice){
        case 'i':
                taskList = taskList.sort((a, b) => b.createDate.getTime() - a.createDate.getTime());
                console.log(`all task: \n ${taskList}`);
                break;
        case 'ii':
            tasksToDisplay.sort((a, b) => a.createDate.getTime() - b.createDate.getTime());
            showTasks(tasksToDisplay, "sorted by oldest date");
            break;
        case 'iii':
                taskList = taskList.sort((a, b) => (a.status === b.status) ? 0 : a.status ? 1 : -1);
                console.log(`all task: \n ${taskList}`);
                break;
        case 'iv':
            const searchTxt = input("enter what you search")
            taskList.foreach((task) => {
                if(task.includes(searchTxt)){
                    console.log(`task found ${task.id}`);
                } else {
                    console.log("error! not found this text in task");
                }
            })
    }
}

function showMenu(){
    console.log("press 1 to create a task: ");
    console.log("press 2 to delete a task: ");
    console.log("press 3 to change status of task: ");
    console.log("press 4 to show tasks");
    

    let req = input("enter your choice: ")

    switch(req) {
        case "1":
            createTask(details);
            break;
        case "2":
            deleteTask(id);
            break;
        case "3":
            changeStatus(id);
            break;
        case "4":
            showTasksOrder()
    }
}

showMenu("go to shop")
