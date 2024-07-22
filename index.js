// show users

let list = JSON.parse(localStorage.getItem("users")) || [
  { id: 1, name: "Aditya", contact: 1234567890 },
];

function showTable() {
  const tbody = document.querySelector("tbody");
  // console.log(tbody);
  const tableData = list
    .map((item) => {
      return `<tr>
    <td>${item.id}</td>
    <td>${item.name}</td>
    <td>${item.contact}</td>
      <button onclick='editData(${JSON.stringify(item)})'>Edit</button>
      <button onclick='deleteData(${JSON.stringify(item.id)})'>Delete</button>
    </tr>`;
    })
    .join("");
  // console.log(tableData);
  tbody.innerHTML = tableData;
  //   console.log(tbody);
}

function saveToLocal() {
  localStorage.setItem("users", JSON.stringify(list));
}
showTable();

// create user

const createBtn = document.querySelector(".create-account-btn");

function createUser(event) {
  event.preventDefault();
  // console.log(list.length + 1);
  const name = document.querySelector("#name");
  const contact = document.querySelector("#contact");
  const id = list.length + 1;
  const obj = {};
  if (name.value !== "" && contact.value !== "") {
    obj.name = name.value;
    obj.contact = contact.value;
    obj.id = id;
    console.log(obj);
    list.push(obj);
    showTable();
    name.value = "";
    contact.value = "";
    saveToLocal();
  }
}

createBtn.addEventListener("click", createUser);

// edit
function editData(data) {
  // console.log(data);
  const createForm = document.getElementById("create-account");
  const editform = document.getElementById("edit-account");
  createForm.style.display = "none";
  editform.style.display = "block";
  const name = document.querySelector("#name");
  const contact = document.querySelector("#contact");
  name.value = data.name;
  contact.value = data.contact;
  editform.addEventListener("click", (event) => updateData(event, data.id));
}

function updateData(event, id) {
  event.preventDefault();
  const editform = document.getElementById("edit-account");
  const name = document.querySelector("#name");
  const contact = document.querySelector("#contact");
  console.log(name.value, contact.value, id);
  console.log(list);
  for (let i = 0; i < list.length; i++) {
    if (list[i].id == id) {
      console.log("id found");
      list.splice(i, 1, { id: id, name: name.value, contact: contact.value });
    }
  }
  console.log(list);
  saveToLocal();

  showTable();
}

// delete
function deleteData(id) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id == id) {
      list.splice(i, 1);
    }
  }
  saveToLocal();
  showTable();
}
