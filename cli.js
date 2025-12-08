// import input from "analiza-sync";
import { nanoid } from "nanoid";

let toDoList = []

function createTask(taskDesc, status = false) {
    toDoList.push({
        id: nanoid(),
        createDate: new Date(),
        taskDesc,
        status
    })
}

const a = createTask("shop");
console.log(a);

function deleteTask(id) {
  if (tasks.find((item) => item.id === id)) {
    const restTasks = tasks.filter((item) => item.id !== id);
    console.log("Error: this id dosent exsist in db");
  }
  return restTasks
}

const del = deleteTask()
console.log(del);

// console.log("======Menu======");
// console.log("Add a new task: ");
// console.log("Delete a task");



// im on branch-------
// not save to the main---------




// const startApp = () => {
//     console.log("--- Task Manager CLI App ---");

//     createTask("Finish the Node.js project documentation");
//     changeStatus(toDoList[0].id.substring(0, 8));
//     createTask("Prepare for the next lecture");
//     createTask("Buy bread and milk");
//     createTask("Call the mechanic");

//     while (true) {
//         console.log("\n====== Main Menu ======");
//         console.log("1. Add a new task");
//         console.log("2. Delete a task");
//         console.log("3. Toggle Task Status (Open to Completed)");
//         console.log("4. View/Filter Tasks");
//         console.log("5. Exit");
//         console.log("=======================");

//         const choice = input("Enter your choice (1-5): ");

//         switch (choice.trim()) {
//             case '1':
//                 handleAddTask();
//                 break;
//             case '2':
//                 handleDeleteTask();
//                 break;
//             case '3':
//                 handleToggleStatus();
//                 break;
//             case '4':
//                 viewTasksMenu();
//                 break;
//             case '5':
//                 console.log("\nExiting application. Goodbye!");
//                 return;
//             default:
//                 console.log("\nInvalid choice. Please enter a number between 1 and 5.");
//         }
//     }
// };

// startApp();