document.body.style.cssText = `background-image: url(ToDoList.jpeg)  ;
background-size: cover; background-repeat: no-repeat;  text-align:center;`;

let comment = document.createComment("The title section");
document.body.appendChild(comment);

let introSection = document.createElement("section");
introSection.style.marginTop = "90px";

let title = document.createElement("h1");
title.textContent = " To Do List";
title.style.cssText = `
height: 20%;
border-color: black;
height: 25px;
font-size: 40px;
margin-bottom: 120px;
text-align:center;
padding: 5px;border-color: black;`;

// textContent is not a function...  :-|

document.body.appendChild(introSection);
document.body.appendChild(title);

// the input to do list
let inputToDo = document.createElement("input");
inputToDo.setAttribute("id", "inputToDo");
inputToDo.setAttribute("type", "text");
inputToDo.setAttribute("placeholder", "Enter your task:");
inputToDo.style.cssText = `      
width: 35%;
padding: 8px;
height: 20%;
border-color: black;
height: 25px;
padding: 5px;border-color: black;
font-size: 20px
`;

let inputDue = document.createElement("span");
inputDue.setAttribute("id", "spanDue");
inputDue.setAttribute("value", "&#128197;");

inputDue.style.cssText = `width: 40px; hight: 20px;  backgruond: black`;

document.body.appendChild(inputToDo);
document.body.appendChild(inputDue);

// the button submit
let inputSubmit = document.createElement("input");
inputSubmit.setAttribute("id", "inputSubmit");
inputSubmit.setAttribute("type", "submit");
inputSubmit.setAttribute("value", "Done");

inputSubmit.style.cssText = `   
  width: 6%;
padding: 5px;
border-color: black;
height: 40px;
height: 5%;
font-size: 20px;
padding: 5px;border-color: green; margin-left: 20px;`;
document.body.appendChild(inputSubmit);

// create the list when the enter submit clicked

let theTaskInput = document.getElementById("inputSubmit");
let theinputToDo = document.getElementById("inputToDo");

let DivContent = document.createElement("div");
DivContent.style.cssText = `display: flex;
justify-content: center;
flex-direction: row;`;

// The code >>

let theDivTask = document.createElement("div");
theDivTask.textContent = "Tasks";
theDivTask.style = `border: solid 2px #ffffff;  color: #838946; font-size: 20px;width:(50)%; margin: 5%; padding:2%;   font-weight: bold; `;
//let butShowTasks = document.create()

// create list to show the done tasks
let listDoneTask = document.createElement("div");
listDoneTask.textContent = "Done Tasks";
listDoneTask.style = ` width: (25)%; border: solid 2px green;
  margin: 5%; padding:2%;  text-align:center; font-size: 20px; color: #838946;
 font-weight: bold; `;

// create list to show the deleted tasks
let listDeleteTask = document.createElement("div");
listDeleteTask.textContent = "Deleted Tasks";
listDeleteTask.style = `width: (25)%; border: solid 2px red;
  margin: 5%; padding:2%;  text-align:center; font-size: 20px; color: #838946;
 font-weight: bold; `;

let doneTasks = [];
let cannceledTasks = [];
let tasks = [];
theTaskInput.addEventListener("click", function (event) {
  if (inputToDo.value != "") {
    tasks.push(theinputToDo.value);

    theDivTask.innerHTML = "";
    theDivTask.textContent = "Tasks";

    tasks.forEach(function (element, index) {
      //-------------------------functions---------------

      function showTasks() {
        // -------------------Task text-----------------------
        let parText = document.createElement("p");
        parText.textContent = element;
        parText.style.cssText = ` 
      
      margin: 1%;
      font-size: 18px;
      margin-right: 20px;
      `;

        let newCreatedTask = document.createElement("div");
        newCreatedTask.style.cssText = ` display: flex;  justify-content: center;
      align-items: center;
      margin: 1%;
      padding: 5px;
      color: brown;
      margin-left: 72px;
      
      `;
        newCreatedTask.appendChild(parText);

        // -------------------Task done-----------------------
        let divDone = document.createElement("div");
        divDone.textContent = "✔︎";
        divDone.style.cssText =
          " id: divDone; color: red; font-size: 20px; cursor:pointer;  font-weigth:bold; background: #ffffff;   font-wigth: bold;";

        /*
          Inside the event listener, a Promise is created using the new Promise() constructor.
          The promise executor function takes a callback with a resolve parameter.
          Inside the promise executor callback, window.setTimeout() is used to introduce a slight delay 
          (0 milliseconds) before executing the code inside the callback.
          Inside the setTimeout callback, window.confirm("Done massage") is called to display a confirmation dialog with the message "Done massage". 
          The resolve function is passed the result of the confirmation dialog (either true or false) to fulfill the promise.
          The promise is awaited using await, which pauses the execution of the code until the promise is resolved.
        */
        divDone.addEventListener("click", async function (event) {
          // let doneResult = await new Promise((resolve) => {
          //   window.setTimeout(() => {
          //     resolve(window.confirm("Done massage"));
          //   }, 500);
          // });
          // if (await doneResult) {
          //   doneTasks.push(element);
          //   tasks.splice(index, 1);
          //   newCreatedTask.innerHTML = "";
          // }

          Swal.fire({
            title: "Task Done",
            showCancelButton: true,
            confirmButtonText: "OK",
            cancelButtonText: "Cancel",
            html: `<img src="TaskDone.png" width="90px" higth="60px" alt="Image"> `,
          }).then((result) => {
            if (result.isConfirmed) {
              doneTasks.push(element);
              tasks.splice(index, 1);
              newCreatedTask.innerHTML = "";
              showDoneTasks();
            }
          });
        });

        newCreatedTask.appendChild(divDone);

        // -------------------Task Delete-----------------------

        let divCanncel = document.createElement("div");
        divCanncel.textContent = "✘";
        divCanncel.style.cssText =
          "color: red; font-size: 20px; cusror: font-weigth:bold;   cursor:pointer;background:#ffffff ;  font-wigth: bold; margin-left: 5px;";

        divCanncel.addEventListener("click", function (event) {
          Swal.fire({
            title: "Are you suer to want to remove this task?",
            showCancelButton: true,
            confirmButtonText: "OK",
            cancelButtonText: "Cancel",
            html: `<img src="deleteIcon.jpeg" width="80px" higth="60px" alt="Image"> `,
          }).then((result) => {
            if (result.isConfirmed) {
              cannceledTasks.push(element);
              tasks.splice(index, 1);
              newCreatedTask.innerHTML = "";
              showDeletedTasks();
            }
          });
        });

        newCreatedTask.appendChild(divCanncel);

        theDivTask.appendChild(newCreatedTask);
      }

      function showDoneTasks() {
        const doneTasksContainer = document.createElement("div");
        listDoneTask.innerHTML = "";
        listDoneTask.textContent = "Done tasks";
        doneTasks.forEach(function (element) {
          let pargtex = document.createElement("p");
          pargtex.textContent = element;

          pargtex.style.cssText = ` 
              width: 100%;   
              margin: 3.5%;
              font-size: 15px;
              color: green;
              text-decoration: line-through;
              `;
          doneTasksContainer.appendChild(pargtex);
        });
        listDoneTask.appendChild(doneTasksContainer);
      }

      function showDeletedTasks() {
        //Delete div
        const canncleTasksContainer = document.createElement("div");

        listDeleteTask.innerHTML = "";
        listDeleteTask.textContent = "Deleted tasks";
        cannceledTasks.forEach(function (element) {
          let pargtex = document.createElement("p");
          pargtex.textContent = element;
          // listDeleteTask
          pargtex.style.cssText = ` 
                width: 100%;   
                margin: 3.5%;
                font-size: 15px;
                color: red;
                text-decoration: line-through;
                `;
          canncleTasksContainer.appendChild(pargtex);
        });

        listDeleteTask.appendChild(canncleTasksContainer);
      }

      showDoneTasks();
      showDeletedTasks();
      showTasks();
    });

    inputToDo.value = "";
  } else {
    Swal.fire({
      title: "plases enter the new task",
      showCancelButton: true,
      confirmButtonText: "OK",
      html: `<img src="warringIcon.png" width="90px" higth="60px" alt="Image"> `,
    }).then((result) => {
      if (result.isConfirmed) {
      }
    });
  }
});

DivContent.appendChild(theDivTask);
DivContent.appendChild(listDoneTask);
DivContent.appendChild(listDeleteTask);

document.body.appendChild(DivContent);
