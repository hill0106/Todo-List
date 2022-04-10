let section = document.querySelector("section.sort");
let add = document.querySelector("button.add");
add.addEventListener("click", e => {
    //prevent form from being submitted
    e.preventDefault();
    //get thr input values
    let form = e.target.parentElement;
    let taskInput = form.children[0].value;
    let monthInput = form.children[1].value;
    let dayInput = form.children[2].value;
    if(form.children[0].value == "" || form.children[1].value == "" || form.children[2].value == ""){
        alert("Must input some values.");
        return;
    }

    //create a todo HTML
    let todo = document.createElement("div");
    todo.classList.add("todo");
    let text = document.createElement("p");
    text.classList.add("todo-text");
    text.innerText = taskInput;
    let time = document.createElement("p");
    time.classList.add("todo-time");
    time.innerText = monthInput + "/" + dayInput;
    todo.appendChild(time);
    todo.appendChild(text);

    //create trash can and check icons
    let completeButton = document.createElement("button");
    completeButton.classList.add("complete");
    completeButton.innerHTML = '<i class="fa-regular fa-xl fa-circle-check"></i>';
    completeButton.addEventListener("click", e => {
        let todolist = e.target.parentElement;
        todolist.classList.toggle("done");
        let complete = e.target.parentElement.children[2];
        complete.classList.toggle("done-button");
    });

    let trashButton = document.createElement("button");
    trashButton.classList.add("trash");
    trashButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    trashButton.addEventListener("click", e => {
        let todolist = e.target.parentElement;
        let taskText = todolist.children[1].innerText;
        //remove from local storage
        let myListArray = JSON.parse(localStorage.getItem("list"));
        myListArray.forEach((item, index) => { 
            if(item.todoText == taskText){
                //remove from the array -> splice
                myListArray.splice(index,1); 
                localStorage.setItem("list",JSON.stringify(myListArray));
            }
        })
        todolist.addEventListener("animationend", () => {
            todolist.remove();
        })
        todolist.style.animation = "scaleDown 0.3s forwards";
    });


    todo.appendChild(completeButton);
    todo.appendChild(trashButton);
    todo.style.animation = "scaleUp 0.3s ease";
    
    //create an object
    let myobject = {
        todoText: taskInput,
        todoMonth: monthInput,
        todoDay: dayInput
    };
    //store data into array
    let myList = localStorage.getItem("list");
    //console.log(myList);
    if(myList == null){
        localStorage.setItem("list", JSON.stringify([myobject]));
    }
    else{ //localStorage內已經有資料
        let existedlist = JSON.parse(myList); //array -> string 
        existedlist.push(myobject);
        localStorage.setItem("list", JSON.stringify(existedlist));
    }
    console.log(JSON.parse(localStorage.getItem("list")));
    form.children[0].value="";
    form.children[1].value="";
    form.children[2].value="";
    section.appendChild(todo);
});

//load all the data
let myList = localStorage.getItem("list");
if(myList != null){
    JSON.parse(myList).forEach(element => {
        //create a todo HTML
        let todo = document.createElement("div");
        todo.classList.add("todo");
        let text = document.createElement("p");
        text.classList.add("todo-text");
        text.innerText = element.todoText;
        let time = document.createElement("p");
        time.classList.add("todo-time");
        time.innerText = element.todoMonth + "/" + element.todoDay;
        todo.appendChild(time);
        todo.appendChild(text);

        //create trash can and check icons
        let completeButton = document.createElement("button");
        completeButton.classList.add("complete");
        completeButton.innerHTML = '<i class="fa-regular fa-xl fa-circle-check"></i>';
        completeButton.addEventListener("click", e => {
            let todolist = e.target.parentElement;
            todolist.classList.toggle("done");
            let complete = e.target.parentElement.children[2];
            complete.classList.toggle("done-button");
        });

        let trashButton = document.createElement("button");
        trashButton.classList.add("trash");
        trashButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        trashButton.addEventListener("click", e => {
            let todolist = e.target.parentElement;
            //console.log(e.target.parentElement.children);
            let taskText = todolist.children[1].innerText;
            //remove from local storage
            let myListArray = JSON.parse(localStorage.getItem("list"));
            myListArray.forEach((item, index) => { 
                if(item.todoText == taskText){
                    //remove from the array -> splice
                    myListArray.splice(index,1); 
                    localStorage.setItem("list",JSON.stringify(myListArray));
                }
            })
            todolist.addEventListener("animationend", () => {
                todolist.remove();
            })
            todolist.style.animation = "scaleDown 0.3s forwards";
        });


        todo.appendChild(completeButton);
        todo.appendChild(trashButton);
        todo.style.animation = "scaleUp 0.3s ease";
        section.appendChild(todo);
    })
}