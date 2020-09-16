const input = document.getElementById("input"),
  btn_add = document.getElementById("add"),
  list = document.getElementById("lists"),
  btn_sort = document.getElementById("sorting"),
  btnFill = document.getElementById("filterCom"),
  buttonFilUnCom = document.getElementById("filterUncom"),
  buttonShowList = document.getElementById("showList");


class Task {
    //buat constructor
  constructor(value) {
    this.text = value;
    this.date = new Date();
    this.completed = false;
  }
}

class Todo {
    //buat constructor
  constructor() {
    this.data = JSON.parse(window.localStorage.getItem("todo")) || [];
    if (this.data) {
      this.show();
    }
  }

  show() {
      //render todo
    list.innerHTML = ""; //kosongin
    let num = 1; //temp num untuk loop
    for (let i in this.data) {
      const { text, date, completed } = this.data[i]; //destructuring 
      list.innerHTML += completed
        ? `<li><s>${num}. ${text} | ${date} |  <button onclick="todo.remove(${i})">delete</button> 
              <button onclick="todo.edit(${i})">edit</button><button onclick="todo.complete(${i})">✔️</button></s></li>`
        : `<li>${num}. ${text} | ${date} |  <button onclick="todo.remove(${i})">delete</button> 
                  <button onclick="todo.edit(${i})">edit</button><button onclick="todo.complete(${i})">✔️</button></li>`;
      num++;
    }//pake ternary krn bs langsung return
  }

  setTodo(value) { //menerima value dipanggil di klik
    this.data.push(new Task(value)); //push objek yang dibuat ke this.data    
    this.saveTaskInLocalStorage(); //jalankan fungsi simpan ke storage
    this.show(); //tunjukin
  }

  remove(index) {
    this.data.splice(index, 1); //ambil aray dan berikan array sisa
    this.show();
  }

  edit(index) {
    list.innerHTML = ""; //kosongin ul nya
    let num = 1; //temp num buat dipake di loop
    for (let i in this.data) {
      const { text, date } = this.data[i]; //destructure
      list.innerHTML +=
        index == i
          ? `<li><input type="text" id="inputEdit" value=${text}><button onclick=todo.done(${i})>Done</button></li>`
          : `<li>${num}. ${text} | ${date} |  <button onclick="todo.remove(${i})">delete</button> <button onclick="todo.edit(${i})">edit</button> </li>`;
      num++;
    }
  }

  done(index) { //fungsi done, ada di li, dipanggil saat di klik
    const inputEdit = document.getElementById("inputEdit");
    this.data[index].text = inputEdit.value; //asign ke objek tp di destructure
    this.show();
  }

  complete(index) {
    this.data[index].completed = true; //sama
    this.show();
  }

  sorting() {
    this.data.sort((a, b) => a.completed - b.completed);
    this.show();
  }

  filterComplete() {
    list.innerHTML = "";
    let completedTodo = this.data.filter((comp) => comp.completed === true);    
    let i = 1;
    for (let key in completedTodo) {
      const { text, date } = completedTodo[key];
      list.innerHTML += `<li>${i}. ${text} | ${date} | </li>`;
      i++;
    }
  }

  filterUnComplete() {
    list.innerHTML = "";
    let unComplete = this.data.filter((comp) => comp.completed === false);
    let i = 1;
    for (let key in unComplete) {
      const { text, date } = unComplete[key];
      list.innerHTML += `<li>${i}. ${text} | ${date} | </li>`;
      i++;
    }
  }

  saveTaskInLocalStorage() {
    window.localStorage.setItem("todo", JSON.stringify(this.data));
  }
}

let todo = new Todo(); //pake prototype Todo untuk bikin objek todo nanti di push ke todolist

btn_add.addEventListener("click", () => todo.setTodo(input.value));

