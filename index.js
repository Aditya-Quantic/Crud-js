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
let users = JSON.parse(localStorage.getItem("api"));
let list = users;
console.log(list, "mapbkl");
const url = "http://localhost:4000/users";

let editFlag = false;
let editIndex = null;

async function getData() {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Add any other headers as needed
      },
    });
    console.log(response);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(JSON.stringify(json), "locak");
    localStorage.setItem("api", JSON.stringify(json));
  } catch (error) {
    console.error(error.message);
  }
}

getData();

function showData() {
  const tbody = document.querySelector("tbody");
  console.log(list, "list");

  const tableData = list.map((item, index) => {
    return `<tr>
    <td>${item.id}</td>
    <td>${
      editFlag && editIndex == index
        ? `<input class="input" id='ip-${editIndex}' />`
        : item.name
    }</td>
    <td>${
      editFlag && editIndex == index
        ? `<input class="input" id='mp-${editIndex}'/>`
        : item.contact
    }</td>
    <td>
    <button onclick='${
      editFlag && editIndex == index
        ? `updateData(${item.id},${index})`
        : `editData(${JSON.stringify(item)},${index})`
    }'>${editFlag && editIndex == index ? "Save" : "Edit"}</button>
    <button onclick='${
      editFlag && editIndex == index
        ? `cancelData()`
        : `deleteData(${JSON.stringify(item.id)})`
    }'>${editFlag && editIndex == index ? "Cancel" : "Delete"}</button></td>
    </tr>`;
  });
  console.log(tableData);
  tbody.innerHTML = tableData.join("");
}

showData();
async function saveData(obj) {
  console.log(obj);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Add any other headers as needed
    },
    body: JSON.stringify(obj),
  });
  console.log(response, "bc");
  getData();
}

const createButton = document.querySelector(".create-account-btn");
const nameError = document.querySelector("#name-error");
const contactError = document.querySelector("#contact-error");

function createUser(event) {
  event.preventDefault();
  const name = document.querySelector("#name");
  const contact = document.querySelector("#contact");
  const id = new Date().getTime();
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
  saveData(obj);
  showData();
  name.value = "";
  contact.value = "";
}

createButton.addEventListener("click", createUser);

function editData(item, index) {
  editFlag = true;
  editIndex = index;
  console.log(item, index);
  showData();
  const editName = document.getElementById(`ip-${index}`);
  const editContact = document.getElementById(`mp-${index}`);

  editName.value = item.name;
  editContact.value = item.contact;

  // const createBtn = document.querySelector("#create-account");
  // const updateBtn = document.querySelector("#edit-account");
  // createBtn.style.display = "none";
  // updateBtn.style.display = "block";
  // let name = document.querySelector("#name");
  // let contact = document.querySelector("#contact");
  // console.log(item, "data");
  // name.value = item.name;
  // contact.value = item.contact;

  // updateBtn.addEventListener("click", (event) =>
  //   updateData(event, item.id, index)
  // );
}

function updateData(id, index) {
  console.log("bojext", id, index);
  // event.preventDefault();
  // const name = document.querySelector("#name");
  // const contact = document.querySelector("#contact");
  const editName = document.getElementById(`ip-${index}`);
  const editContact = document.getElementById(`mp-${index}`);
  for (let i = 0; i < list.length; i++) {
    if (list[i].id == id) {
      console.log("id found");
      list.splice(i, 1, {
        id: id,
        name: editName.value,
        contact: editContact.value,
      });
    }
  }
  // const createBtn = document.querySelector("#create-account");
  // const updateBtn = document.querySelector("#edit-account");
  // createBtn.style.display = "block";
  // updateBtn.style.display = "none";
  name.value = "";
  contact.value = "";
  saveData();
  editFlag = false;
  editIndex = null;
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

function cancelData() {
  editFlag = false;
  editIndex = null;
  showData();
}
