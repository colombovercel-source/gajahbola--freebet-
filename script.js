const claimBtn = document.getElementById("claimBtn");
const userIdInput = document.getElementById("userId");
const historyList = document.getElementById("historyList");

const popup = document.getElementById("popup");
const popupUser = document.getElementById("popupUser");
const popupPrize = document.getElementById("popupPrize");
const popupTime = document.getElementById("popupTime");

function maskUser(id) {
  if (!id) return "USER***";
  return id.slice(0, 2) + "***" + id.slice(-2);
}

function randomPrize() {
  const prizes = [50000, 100000, 150000, 200000, 300000];
  return "Rp " + prizes[Math.floor(Math.random() * prizes.length)].toLocaleString("id-ID");
}

/* Generate dummy history */
for (let i = 0; i < 15; i++) {
  const div = document.createElement("div");
  div.className = "history-item";
  div.innerText = `${maskUser("MBR" + (100 + i))} mendapatkan ${randomPrize()}`;
  historyList.appendChild(div);
}

claimBtn.addEventListener("click", () => {
  const userId = userIdInput.value.trim();
  if (!userId) {
    alert("User ID wajib diisi");
    return;
  }

  claimBtn.disabled = true;
  claimBtn.innerText = "Memproses...";

  setTimeout(() => {
    popupUser.innerText = maskUser(userId);
    popupPrize.innerText = randomPrize();
    popupTime.innerText = "Waktu klaim: " + new Date().toLocaleString("id-ID");
    popup.style.display = "flex";

    claimBtn.disabled = false;
    claimBtn.innerText = "Cek Bonus";
  }, 1200);
});

function closePopup() {
  popup.style.display = "none";
}
