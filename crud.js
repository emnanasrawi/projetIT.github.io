const nameInput = document.getElementById("name-input");
const emailInput = document.getElementById("email-input");
const contactInput = document.getElementById("contact-input");
const skillsInput = document.getElementById("skills-input");

const addBtn = document.getElementById("add-btn");
const tableBody = document.getElementById("table-body");
const updateBtn = document.getElementById("update-btn");
const cancelBtn = document.getElementById("cancel-btn");
const validRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
let currentUserIndex = null;
let users = JSON.parse(localStorage.getItem("users")) || [];
getUsers();

function createUser() {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const contact = contactInput.value.trim();
  const skills = skillsInput.value.trim();

  let validUser = true;
  if (name.length < 3) {
    nameInput.style.borderColor = "red";
    validUser = false;
  }
  if (!validRegex.test(email)) {
    emailInput.style.borderColor = "red";
    validUser = false;
  }
  if (!contact.length > 8) {
    contactInput.style.borderColor = "red";
    validUser = false;
  }

  let id = findId();
  if (validUser) {
    const newUser = {
      name,
      email,
      id,
      contact,
      
    };
    users.push(newUser);
    resetForm();
    saveData();
  }
}
function findId() {
    let id = 1;
    val = users.map((user) => user.id).indexOf(id);
    while (val != -1) {
      id++;
      val = users.map((user) => user.id).indexOf(id);
    }
    return id;
  }
  
  function getUsers() {
    tableBody.innerHTML = "";
    
    users.forEach((user, index) => {
      console.log(index);
      const tr = document.createElement("tr");
      const idTd = document.createElement("td");
      const nameTd = document.createElement("td");
      const contactTd = document.createElement("td");
      const skillsTd = document.createElement("td");

      const emailTd = document.createElement("td");
      const actionTd = document.createElement("td");
      const editBtn = document.createElement("button");
      editBtn.className = "edit-btn";
      editBtn.innerText = " edit";
      editBtn.innerNumber = " edit";

      editBtn.innerText = " edit";

      
      editBtn.addEventListener("click", () => showUpdateUser(index));
     

  
      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      deleteBtn.innerText = " delete";
      deleteBtn.innerNumber = " delete";
      deleteBtn.innerText = " delete";

      
      deleteBtn.addEventListener("click", () => deleteUser(index));
      idTd.innerText = user.id;
      nameTd.innerText = user.name;
      emailTd.innerText = user.email;
      contactTd.innerText = user.contact;
      skillsTd.innerText = user.skills;

  
  
      actionTd.appendChild(editBtn);
      actionTd.appendChild(deleteBtn);
      tr.appendChild(idTd);
      tr.appendChild(nameTd);
      tr.appendChild(emailTd);
      tr.appendChild(contactTd);
      tr.appendChild(skillsTd);

      tr.appendChild(actionTd);
      tableBody.appendChild(tr);
      
    });
  }
  
  function updateUser() {
    users[currentUserIndex].name = nameInput.value;
    users[currentUserIndex].email = emailInput.value;
    users[currentUserIndex].contact = contactInput.value;
    users[currentUserIndex].skills = skillsInput.value;

    
    saveData();
    cancelUpdate();
  }
  
  function cancelUpdate() {
    resetForm();
    addBtn.style.display = " inline";
    updateBtn.style.display = "none";
    cancelBtn.style.display = "none";
  }
  
  function showUpdateUser(index) {
    currentUserIndex = index;
    nameInput.value = users[index].name;
    emailInput.value = users[index].email;
    contactInput.value = users[index].contact;
    skillsInput.value = users[index].skills;

    
    addBtn.style.display = " none";
    updateBtn.style.display = "inline";
    cancelBtn.style.display = "inline";
  }
  
  function saveData() {
    localStorage.setItem("users", JSON.stringify(users));
    getUsers();
  }
  
  function deleteUser(index) {
    users.splice(index, 1);
    saveData();
  }
  
  function resetForm() {
    emailInput.value = "";
    nameInput.value = "";
    contactInput.value = "";
    skillsInput.value = "";

  }
  addBtn.addEventListener("click", createUser);
  cancelBtn.addEventListener("click", cancelUpdate);
  updateBtn.addEventListener("click", updateUser);
  
  
