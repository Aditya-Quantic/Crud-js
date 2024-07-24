// // show users

// let list = JSON.parse(localStorage.getItem("users")) || [
//   { id: 1, name: "Aditya", contact: 1234567890 },
// ];

// function showTable() {
//   const tbody = document.querySelector("tbody");
//   // console.log(tbody);
//   const tableData = list
//     .map((item) => {
//       return `<tr>
//     <td>${item.id}</td>
//     <td>${item.name}</td>
//     <td>${item.contact}</td>
//       <button onclick='editData(${JSON.stringify(item)})'>Edit</button>
//       <button onclick='deleteData(${JSON.stringify(item.id)})'>Delete</button>
//     </tr>`;
//     })
//     .join("");
//   // console.log(tableData);
//   tbody.innerHTML = tableData;
//   //   console.log(tbody);
// }

// function saveToLocal() {
//   localStorage.setItem("users", JSON.stringify(list));
// }
// showTable();
// // create user
// const createBtn = document.querySelector(".create-account-btn");

// function createUser(event) {
//   event.preventDefault();
//   // console.log(list.length + 1);
//   const name = document.querySelector("#name");
//   const contact = document.querySelector("#contact");
//   const id = list.length + 1;
//   const obj = {};
//   if (name.value !== "" && contact.value !== "") {
//     obj.name = name.value;
//     obj.contact = contact.value;
//     obj.id = id;
//     console.log(obj);
//     list.push(obj);
//     showTable();
//     name.value = "";
//     contact.value = "";
//     saveToLocal();
//   }
// }

// createBtn.addEventListener("click", createUser);

// // edit
// function editData(data) {
//   // console.log(data);
//   const createForm = document.getElementById("create-account");
//   const editform = document.getElementById("edit-account");
//   createForm.style.display = "none";
//   editform.style.display = "block";
//   const name = document.querySelector("#name");
//   const contact = document.querySelector("#contact");
//   name.value = data.name;
//   contact.value = data.contact;
//   editform.addEventListener("click", (event) => updateData(event, data.id));
// }

// function updateData(event, id) {
//   event.preventDefault();
//   const editform = document.getElementById("edit-account");
//   const name = document.querySelector("#name");
//   const contact = document.querySelector("#contact");
//   console.log(name.value, contact.value, id);
//   console.log(list);
//   for (let i = 0; i < list.length; i++) {
//     if (list[i].id == id) {
//       console.log("id found");
//       list.splice(i, 1, { id: id, name: name.value, contact: contact.value });
//     }
//   }
//   console.log(list);
//   saveToLocal();
//   showTable();
// }

// // delete
// function deleteData(id) {
//   for (let i = 0; i < list.length; i++) {
//     if (list[i].id == id) {
//       list.splice(i, 1);
//     }
//   }
//   saveToLocal();
//   showTable();
// }
let list = JSON.parse(localStorage.getItem("user"));
console.log(list);

function showData() {
  const tbody = document.querySelector("tbody");
  console.log(list, "list");

  const tableData = list.map((item) => {
    return `<tr>
    <td>${item.id}</td>
    <td>${item.name}</td>
    <td>${item.contact}</td>
    <td>
    <button onclick='editData(${JSON.stringify(item)})'>Edit</button>
    <button onclick='deleteData(${JSON.stringify(
      item.id
    )})'>Delete</button></td>
    </tr>
    `;
  });
  tbody.innerHTML = tableData;
}

showData();

function saveData() {
  localStorage.setItem("user", JSON.stringify(list));
}

const createButton = document.querySelector(".create-account-btn");
const nameError = document.querySelector("#name-error");
const contactError = document.querySelector("#contact-error");

function createUser(event) {
  event.preventDefault();
  const name = document.querySelector("#name");
  const contact = document.querySelector("#contact");
  const id = list.length + 1;
  const obj = {};
  console.log(obj);

  if (name.value == "" || name.value.length <= 1) {
    alert("Please write your name");
    return;
  }
  if (contact.value.length != 10) {
    alert("Please write your contact number");
    return;
  }

  obj.id = id;
  obj.name = name.value.trim();
  obj.contact = contact.value.trim();
  list.push(obj);
  saveData();
  showData();
  name.value = "";
  contact.value = "";
}

createButton.addEventListener("click", createUser);

function editData(item) {
  const createBtn = document.querySelector("#create-account");
  const updateBtn = document.querySelector("#edit-account");
  createBtn.style.display = "none";
  updateBtn.style.display = "block";
  let name = document.querySelector("#name");
  let contact = document.querySelector("#contact");
  console.log(item, "data");
  name.value = item.name;
  contact.value = item.contact;
  updateBtn.addEventListener("click", (event) => updateData(event, item.id));
}

function updateData(event, id) {
  event.preventDefault();
  const name = document.querySelector("#name");
  const contact = document.querySelector("#contact");
  for (let i = 0; i < list.length; i++) {
    if (list[i].id == id) {
      console.log("id found");
      list.splice(i, 1, { id: id, name: name.value, contact: contact.value });
    }
  }
  const createBtn = document.querySelector("#create-account");
  const updateBtn = document.querySelector("#edit-account");
  createBtn.style.display = "block";
  updateBtn.style.display = "none";
  name.value = "";
  contact.value = "";
  saveData();
  showData();
}

function deleteData(id) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id == id) {
      console.log("id found");
      list.splice(i, 1);
    }
  }
  saveData();
  showData();
}
