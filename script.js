
/* =========================
   CONFIG
========================= */
const API_URL = "https://script.google.com/macros/s/AKfycbye5X5MNr1IXNiPdT7ob21Uyn3P4GV3l68rCdFJe5E9-Nm0mnvak0IfxG3wAbmn_BSZ/exec";


/* =========================
   ELEMENT
========================= */
const loginForm = document.getElementById("loginForm");
const loginPage = document.getElementById("loginPage");
const resultPage = document.getElementById("resultPage");
const errorMsg = document.getElementById("errorMsg");

const namaEl = document.getElementById("nama");
const totalEl = document.getElementById("total");

const viewBtn = document.getElementById("viewBtn");
const downloadBtn = document.getElementById("downloadBtn");


/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", () => {
  loginPage.classList.remove("hidden");
  resultPage.classList.add("hidden");
});


/* =========================
   LOGIN
========================= */
loginForm.addEventListener("submit", async function(e) {
  e.preventDefault();

  const nik = document.getElementById("nik").value.trim();
  const dob = document.getElementById("dob").value.trim();

  if (!nik || !dob) {
    errorMsg.textContent = "Please fill all fields!";
    return;
  }

  errorMsg.textContent = "Checking...";

  try {
    const res = await fetch(`${API_URL}?nik=${nik}&dob=${dob}`);
    const data = await res.json();

    if (data.status === "error") {
      errorMsg.textContent = "Data not found!";
      return;
    }

    showResult(data);

  } catch (err) {
    errorMsg.textContent = "Connection error!";
  }
});


/* =========================
   SHOW RESULT
========================= */
function showResult(data) {
  loginPage.classList.add("hidden");
  resultPage.classList.remove("hidden");

  namaEl.textContent = data.nama;
  totalEl.textContent = data.total;

  viewBtn.href = data.pdf;
  downloadBtn.href = data.pdf;
}


/* =========================
   LOGOUT
========================= */
function logout() {
  resultPage.classList.add("hidden");
  loginPage.classList.remove("hidden");

  loginForm.reset();
  errorMsg.textContent = "";
}