"use strict";
console.log("index.js is connected");

// variables

const selectOptions = document.getElementById("group-select");

const loginBullet = document.getElementById("login-bullet");
const groupBullet = document.getElementById("group-bullet");
const avatarBullet = document.getElementById("avatar-bullet");
const submitBullet = document.getElementById("submit-bullet");

const loginDiv = document.getElementById("login-form");
const groupDiv = document.getElementById("group-form");
const avatarDiv = document.getElementById("avatar-form");
const submitDiv = document.getElementById("submit-form");

const loginNext = document.getElementById("btn-login-next");
const groupNext = document.getElementById("btn-group-next");
const avatarNext = document.getElementById("btn-avatar-next");
const submitNext = document.getElementById("btn-submit-next");

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnShowModal = document.querySelector(".show-modal");

const btnsCancel = document.querySelectorAll(".btn-cancel");

let userEmail;
let pw;
let pwVerify;

let userGroup = document.getElementById("group-select").value;

// initialize state
function init() {
  loginDiv.classList.remove("hidden");
  loginBullet.classList.add("bullet");
  groupDiv.classList.add("hidden");
  groupBullet.classList.remove("bullet");
  avatarDiv.classList.add("hidden");
  avatarBullet.classList.remove("bullet");
  submitDiv.classList.add("hidden");
  submitBullet.classList.remove("bullet");
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

init();

getSelectObject();

// create options for group select
async function getSelectObject(event) {
  const res = await fetch("../mock.json");
  const resJson = await res.json();
  let optionsArray = resJson;
  console.log("optionsArray", optionsArray);
  for (let i = 0; i < optionsArray.length; i++) {
    console.log(optionsArray[i].name);
    const option = document.createElement("option");
    option.value = optionsArray[i].name;
    option.innerHTML = optionsArray[i].name;
    selectOptions.appendChild(option);
  }
}

// event listeners/handlers on next buttons
loginNext.addEventListener("click", function (e) {
  e.preventDefault();
  userEmail = document.getElementById("input-email").value;
  pw = document.getElementById("input-password").value;
  pwVerify = document.getElementById("input-verify-password").value;
  if (!userEmail || !pw || !pwVerify) {
    alert("Entries are required in all three fields.");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
    alert("Your email entry seems to be improperly formatted.");
  } else if (pw !== pwVerify) {
    alert('Entries in "PASSWORD" and "VERIFY PASSORD" must match.');
  } else {
    groupDiv.classList.remove("hidden");
    loginDiv.classList.add("hidden");
    groupBullet.classList.add("bullet");
    loginBullet.classList.remove("bullet");
  }
});

groupNext.addEventListener("click", function (e) {
  e.preventDefault();
  userGroup = document.getElementById("group-select").value;
  if (userGroup == "None") {
    alert("A User Group must be selected.");
  } else {
    avatarDiv.classList.remove("hidden");
    groupDiv.classList.add("hidden");
    avatarBullet.classList.add("bullet");
    groupBullet.classList.remove("bullet");
  }
});

avatarNext.addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("email-display").value = userEmail;
  document.getElementById("group-display").value = userGroup;
  submitDiv.classList.remove("hidden");
  avatarDiv.classList.add("hidden");
  submitBullet.classList.add("bullet");
  avatarBullet.classList.remove("bullet");
});

// event listener/handler for cancel buttons
for (let i = 0; i < btnsCancel.length; i++) {
  btnsCancel[i].addEventListener("click", init);
}

// event listener/handlers for modal
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function (e) {
  e.preventDefault();
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

function overlayCloseModal(e) {
  e.preventDefault();
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

btnShowModal.addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);

overlay.addEventListener("click", overlayCloseModal);

document.addEventListener("keydown", function (e) {
  if (e.key == "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
