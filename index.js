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

// 2nd

// let users = JSON.parse(localStorage.getItem("api"));
// console.log(users);
// let list = users;
// console.log(list, "mapbkl");
// const url = "http://localhost:4000/users";

// let editFlag = false;
// let editIndex = null;

// async function getData() {
//   try {
//     const response = await fetch(url, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         // Add any other headers as needed
//       },
//     });
//     console.log(response, "response===>>");
//     if (!response.ok) {
//       throw new Error(`Response status: ${response.status}`);
//     }

//     const json = await response.json();
//     console.log(JSON.stringify(json), "locak");
//     localStorage.setItem("api", JSON.stringify(json));
//   } catch (error) {
//     console.error(error.message);
//   }
// }

// getData();

// function showData() {
//   const tbody = document.querySelector("tbody");
//   console.log(list, "list");

//   const tableData = list.map((item, index) => {
//     return `<tr>
//     <td>${item.id}</td>
//     <td>${
//       editFlag && editIndex == index
//         ? `<input class="input" id='ip-${editIndex}' />`
//         : item.name
//     }</td>
//     <td>${
//       editFlag && editIndex == index
//         ? `<input class="input" id='mp-${editIndex}'/>`
//         : item.contact
//     }</td>
//     <td>
//     <button onclick='${
//       editFlag && editIndex == index
//         ? `updateData(${item.id},${index})`
//         : `editData(${JSON.stringify(item)},${index})`
//     }'>${editFlag && editIndex == index ? "Save" : "Edit"}</button>
//     <button onclick='${
//       editFlag && editIndex == index
//         ? `cancelData()`
//         : `deleteData(${JSON.stringify(item.id)})`
//     }'>${editFlag && editIndex == index ? "Cancel" : "Delete"}</button></td>
//     </tr>`;
//   });

//   console.log(tableData);
//   tbody.innerHTML = tableData.join("");
// }

// showData();
// async function saveData(obj) {
//   console.log(obj);
//   const response = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       // Add any other headers as needed
//     },
//     body: JSON.stringify(obj),
//   });
//   console.log(response, "bc");
//   getData();
// }

// const createButton = document.querySelector(".create-account-btn");
// const nameError = document.querySelector("#name-error");
// const contactError = document.querySelector("#contact-error");

// function createUser(event) {
//   event.preventDefault();
//   const name = document.querySelector("#name");
//   const contact = document.querySelector("#contact");
//   const id = new Date().getTime();
//   const obj = {};
//   console.log(obj);

//   if (name.value == "" || name.value.length <= 1) {
//     alert("Please write your name");
//     return;
//   }
//   if (contact.value.length != 10) {
//     alert("Please write your 10 Digit contact number");
//     return;
//   }

//   obj.id = id;
//   obj.name = name.value.trim();
//   obj.contact = contact.value.trim();
//   list.push(obj);
//   saveData(obj);
//   showData();
//   name.value = "";
//   contact.value = "";
// }

// createButton.addEventListener("click", createUser);

// function editData(item, index) {
//   editFlag = true;
//   editIndex = index;
//   console.log(item, index);
//   showData();
//   const editName = document.getElementById(`ip-${index}`);
//   const editContact = document.getElementById(`mp-${index}`);

//   editName.value = item.name;
//   editContact.value = item.contact;

//   // const createBtn = document.querySelector("#create-account");
//   // const updateBtn = document.querySelector("#edit-account");
//   // createBtn.style.display = "none";
//   // updateBtn.style.display = "block";
//   // let name = document.querySelector("#name");
//   // let contact = document.querySelector("#contact");
//   // console.log(item, "data");
//   // name.value = item.name;
//   // contact.value = item.contact;

//   // updateBtn.addEventListener("click", (event) =>
//   //   updateData(event, item.id, index)
//   // );
// }

// function updateData(id, index) {
//   console.log("bojext", id, index);
//   // event.preventDefault();
//   // const name = document.querySelector("#name");
//   // const contact = document.querySelector("#contact");
//   const editName = document.getElementById(`ip-${index}`);
//   const editContact = document.getElementById(`mp-${index}`);
//   for (let i = 0; i < list.length; i++) {
//     if (list[i].id == id) {
//       console.log("id found");
//       list.splice(i, 1, {
//         id: id,
//         name: editName.value,
//         contact: editContact.value,
//       });
//     }
//   }
//   // const createBtn = document.querySelector("#create-account");
//   // const updateBtn = document.querySelector("#edit-account");
//   // createBtn.style.display = "block";
//   // updateBtn.style.display = "none";
//   name.value = "";
//   contact.value = "";
//   saveData();
//   editFlag = false;
//   editIndex = null;
//   showData();
// }

// function deleteData(id) {
//   for (let i = 0; i < list.length; i++) {
//     if (list[i].id == id) {
//       console.log("id found");
//       list.splice(i, 1);
//     }
//   }
//   saveData();
//   showData();
// }

// function cancelData() {
//   editFlag = false;
//   editIndex = null;
//   showData();
// }

// 3rd

// let list = JSON.parse(localStorage.getItem("users")) || [
//   { id: 1, name: "Aditya", contact: 1234567890 },
// ];
// const createBtn = document.getElementById("create-account");
// const updateBtn = document.getElementById("edit-account");
// const form = document.getElementById("main-form");

// function showData() {
//   const tbody = document.querySelector("tbody");
//   const tableData = list.map((item) => {
//     return `<tr>
//   <td>${item.id}</td>
//   <td>${item.name}</td>
//   <td>${item.contact}</td>
//   <button onclick='editData(${JSON.stringify(item)})'>Edit</button>
//   <button>Delete</button>
//   </tr> `;
//   });
//   console.log(tableData, "tableData ===>>");
//   tbody.innerHTML = tableData.join("");
// }
// showData();

// function saveToLocal() {
//   localStorage.setItem("users", JSON.stringify(list));
// }

// function createUser(event) {
//   event.preventDefault();
//   const name = document.getElementById("name");
//   const contact = document.getElementById("contact");
//   let id = list.length + 1;
//   const obj = {};
//   obj.id = id;
//   obj.name = name.value;
//   obj.contact = contact.value;
//   list.push(obj);
//   saveToLocal();
//   showData();
//   form.reset();
//   console.log(list, "list======>");
// }

// createBtn.addEventListener("click", createUser);

// function editData(item) {
//   // console.log(item, "item==>");
//   createBtn.style.display = "none";
//   updateBtn.style.display = "block";
//   const name = document.getElementById("name");
//   const contact = document.getElementById("contact");
//   name.value = item.name;
//   contact.value = item.contact;
//   console.log({ n: name.value, c: contact.value, id: item.id }, "main");
//   updateBtn.addEventListener("click", (event) => updateData(event, item.id));
// }

// function updateData(event, id) {
//   event.preventDefault();
//   console.log(id, "id===>");
//   const name = document.getElementById("name");
//   const contact = document.getElementById("contact");
//   for (let i = 0; i < list.length; i++) {
//     if (list[i].id == id) {
//       console.log("id found");
//       list.splice(i, 1, { id: id, name: name.value, contact: contact.value });
//     }
//   }
//   console.log(list);
//   saveToLocal();
//   showData();
//   form.reset();

//   // name.value = "";
//   // contact.value = "";
// }

const mainForm = document.getElementById("main-form");
const name = document.getElementById("name");
const contact = document.getElementById("contact");
const createBtn = document.getElementById("create-account");
const updateBtn = document.getElementById("edit-account");
const tbody = document.querySelector("tbody");

const list = JSON.parse(localStorage.getItem("user")) || [
  { id: 1, name: "Aditya", contact: 1234567890 },
];
// console.log(list);
function saveToLocal() {
  localStorage.setItem("user", JSON.stringify(list));
}
function showUser() {
  // console.log(typeof list, list);
  tbody.innerHTML = list
    .map((item) => {
      return `<tr>
    <td>${item.id}</td>
    <td>${item.name}</td>
    <td>${item.contact}</td>
    <td><button onclick='editUser(${JSON.stringify(item)})'>Edit</button>
    <button onclick='deleteUser(${item.id})'>Delete</button></td>
    </tr>`;
    })
    .join("");
}

showUser();

function createUser(event) {
  event.preventDefault();
  const obj = {};
  const id = list.length + 1;
  if (name.value.trim() !== "" && contact.value.trim() !== "") {
    obj.id = id;
    obj.name = name.value;
    obj.contact = contact.value;
    list.push(obj);
    saveToLocal();
    showUser();
    name.value = "";
    contact.value = "";
  }
  // console.log(list);
}

let editingId = null;

function editUser(item) {
  console.log(item);
  name.value = item.name;
  contact.value = item.contact;
  createBtn.style.display = "none";
  updateBtn.style.display = "block";
  editingId = item.id;
  // updateBtn.removeEventListener("click", () => {});

  // updateBtn.addEventListener("click", (event) => updateUser(event, item.id));
}

function updateUser(event) {
  event.preventDefault();
  console.log(editingId);
  for (let i = 0; i < list.length; i++) {
    if (list[i].id == editingId) {
      // console.log("id found", item.id);
      list.splice(i, 1, {
        id: editingId,
        name: name.value,
        contact: contact.value,
      });
    }
  }
  // saveToLocal();
  showUser();
  editingId = null;
}

createBtn.addEventListener("click", createUser);

function deleteUser(id) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id == id) {
      // console.log("id found", item.id);
      list.splice(i, 1);
    }
  }
  saveToLocal();
  showUser();
}
