const claimBtn = document.getElementById("claimBtn");
const userIdInput = document.getElementById("userId");
const historyList = document.getElementById("historyList");

const popup = document.getElementById("popup");
const popupUser = document.getElementById("popupUser");
const popupPrize = document.getElementById("popupPrize");
const popupTime = document.getElementById("popupTime");
const popupText = document.getElementById("popupText");
const popupBadge = document.getElementById("popupBadge");

/* =========================
   LOCAL STORAGE KEY
========================= */
const STORAGE_KEY = "gajahbola_claimed_ids";

/* =========================
   GET CLAIMED IDS
========================= */
function getClaimedIds() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveClaimedId(id) {
  const claimed = getClaimedIds();
  claimed.push(id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(claimed));
}

/* =========================
   MASK USER
========================= */
function maskUser(id) {
  if (!id) return "USER***";
  return id.slice(0, 2) + "***" + id.slice(-2);
}

function randomPrize() {
  const prizes = [50000, 100000, 150000, 200000, 300000];
  return "Rp " + prizes[Math.floor(Math.random() * prizes.length)].toLocaleString("id-ID");
}

/* =========================
   DUMMY HISTORY
========================= */
for (let i = 0; i < 15; i++) {
  const div = document.createElement("div");
  div.className = "history-item";
  div.innerText = `${maskUser("MBR" + (100 + i))} mendapatkan ${randomPrize()}`;
  historyList.appendChild(div);
}

/* =========================
   CLAIM BUTTON
========================= */
claimBtn.addEventListener("click", () => {
  const userId = userIdInput.value.trim();

  if (!userId) {
    alert("User ID wajib diisi");
    return;
  }

  const claimedIds = getClaimedIds();

  /* ===== CEK SUDAH PERNAH CLAIM ===== */
  if (claimedIds.includes(userId)) {
    popupBadge.innerText = "SUDAH PERNAH CLAIM";
    popupBadge.style.background = "#444";

    popupUser.innerText = maskUser(userId);
    popupText.innerText = "User ID ini sudah pernah mengklaim bonus.";
    popupPrize.innerText = "-";
    popupTime.innerText = "Setiap ID hanya bisa 1x klaim.";

    popup.style.display = "flex";
    return;
  }

  /* ===== PROSES CLAIM ===== */
  claimBtn.disabled = true;
  claimBtn.innerText = "Memproses...";

  setTimeout(() => {
    const prize = randomPrize();

    popupBadge.innerText = "SELAMAT";
    popupBadge.style.background = "#c00000";

    popupUser.innerText = maskUser(userId);
    popupText.innerText = "Anda mendapatkan bonus:";
    popupPrize.innerText = prize;
    popupTime.innerText = "Waktu klaim: " + new Date().toLocaleString("id-ID");

    popup.style.display = "flex";

    /* SIMPAN ID KE LOCAL STORAGE */
    saveClaimedId(userId);

    claimBtn.disabled = false;
    claimBtn.innerText = "Cek Bonus";

  }, 1200);
});

function closePopup() {
  popup.style.display = "none";
}
