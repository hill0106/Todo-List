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

function LoadData(){
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
}

LoadData();

function mergeTime(arr1, arr2){
    let result = [];
    let i=0, j=0;
    while(i < arr1.length && j < arr2.length){
        if(Number(arr1[i].todoMonth) < Number(arr2[j].todoMonth)){
            result.push(arr1[i]);
            i++;
        }
        else if(Number(arr1[i].todoMonth) > Number(arr2[j].todoMonth)){
            result.push(arr2[j]);
            j++;
        }
        else if(Number(arr1[i].todoMonth) == Number(arr2[j].todoMonth)){
            if(Number(arr1[i].todoDay) < Number(arr2[j].todoDay)){
                result.push(arr1[i]);
                i++;
            }
            else{
                result.push(arr2[j]);
                j++;
            }
        }
    }
    //沒被比較到的element
    while(i < arr1.length){
        result.push(arr1[i]);
        i++;
    }
    while(j < arr2.length){
        result.push(arr2[j]);
        j++;
    }
    return result;
}

function MergeSort(arr){
    if(arr.length == 1){
        return arr;
    }
    else{
        let mid = Math.floor(arr.length / 2);
        let left = arr.slice(0, mid);
        let right = arr.slice(mid, arr.length);
        return mergeTime(MergeSort(left), MergeSort(right));
    }
}

console.log(MergeSort(JSON.parse(localStorage.getItem("list"))));
let sortButton = document.querySelector("button.sortby");
sortButton.addEventListener("click", e => {
    //sort data
    let sortedArray = MergeSort(JSON.parse(localStorage.getItem("list")));
    localStorage.setItem("list", JSON.stringify(sortedArray));

    //remove data
    let len = section.children.length;
    for(let i=0; i<len; i++){
        section.children[0].remove();
    }
    section.appendChild(sortButton);
    //load data
    LoadData();
})