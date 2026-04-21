/* =========================
   CONFIG
========================= */
const API_URL = "https://script.google.com/macros/s/AKfycbyJ6l8Usioosnb9Iidb2sepGzKJWGkyNT2owmcTqzkS1HMpZRVzf-Bnksmz_X4t96H_/exec";


/* =========================
   ELEMENT
========================= */
const loginForm = document.getElementById("loginForm");
const loginPage = document.getElementById("loginPage");
const resultPage = document.getElementById("resultPage");
const errorMsg = document.getElementById("errorMsg");

const namaEl = document.getElementById("nama");

const viewBtn = document.getElementById("viewBtn");
const downloadBtn = document.getElementById("downloadBtn");
const pdfFrame = document.getElementById("pdfFrame");


/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", () => {
  loginPage.classList.remove("hidden");
  resultPage.classList.add("hidden");

  // auto tahun footer (kalau ada)
  const y1 = document.getElementById("year");
  const y2 = document.getElementById("year2");

  if (y1) y1.textContent = new Date().getFullYear();
  if (y2) y2.textContent = new Date().getFullYear();
});


/* =========================
   LOGIN
========================= */
let isLoading = false;

loginForm.addEventListener("submit", async function(e) {
  e.preventDefault();

  if (isLoading) return; // 🔥 cegah klik spam
  isLoading = true;

  const nik = document.getElementById("nik").value.trim();
  const dob = document.getElementById("dob").value.trim();

  if (!nik || !dob) {
    errorMsg.textContent = "Please fill all fields!";
    isLoading = false;
    return;
  }

  errorMsg.style.color = "#333";
  errorMsg.textContent = "Checking...";

  try {
    const res = await fetch(`${API_URL}?nik=${nik}&dob=${dob}`);
    const data = await res.json();

    if (data.status === "error") {
      errorMsg.style.color = "red";
      errorMsg.textContent = "Data not found!";
      isLoading = false;
      return;
    }

    showResult(data);

  } catch (err) {
    errorMsg.style.color = "red";
    errorMsg.textContent = "Connection error!";
    console.error(err);
  }

  isLoading = false;
});


/* =========================
   SHOW RESULT
========================= */
function showResult(data) {
  loginPage.classList.add("hidden");
  resultPage.classList.remove("hidden");

  // isi data
  namaEl.textContent = data.nama;

  // tombol
  viewBtn.href = data.pdf;
  downloadBtn.href = data.pdf;

  // 🔥 PREVIEW PDF
  if (pdfFrame) {
    pdfFrame.style.opacity = "0.3";
    pdfFrame.style.transition = "opacity 0.3s ease";

    pdfFrame.src = data.pdf;

    pdfFrame.onload = () => {
      pdfFrame.style.opacity = "1";
    };
  }
}


/* =========================
   LOGOUT
========================= */
function logout() {
  resultPage.classList.add("hidden");
  loginPage.classList.remove("hidden");

  loginForm.reset();
  errorMsg.textContent = "";

  // reset PDF preview
  if (pdfFrame) {
    pdfFrame.src = "";
  }
}


/* =========================
   OPTIONAL: BLOCK ENTER DI RESULT
========================= */
document.addEventListener("keydown", function(e) {
  if (e.key === "Enter" && !resultPage.classList.contains("hidden")) {
    e.preventDefault();
  }
});