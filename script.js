// ===== SELECT COUNTER ELEMENTS =====
const totalEl = document.getElementById("totalCount");
const interviewEl = document.getElementById("interviewCount");
const rejectedEl = document.getElementById("rejectedCount");
const jobNumberEl = document.getElementById("jobNumber");
// ===== FUNCTIONS =====
function getCards() {
  return document.querySelectorAll(".job-card");
}
function updateCounts() {
  const cards = getCards();

  let interview = 0;
  let rejected = 0;

  cards.forEach(card => {
    if (card.dataset.status === "interview") interview++;
    if (card.dataset.status === "rejected") rejected++;
  });

  totalEl.innerText = cards.length;
  interviewEl.innerText = interview;
  rejectedEl.innerText = rejected;

  if (jobNumberEl) {
    jobNumberEl.innerText = cards.length + " jobs";
  }
}

// ===== CARD ACTIONS =====
getCards().forEach(card => {
  const interviewBtn = card.querySelector(".interview");
  const rejectedBtn = card.querySelector(".rejected");
  const deleteBtn = card.querySelector(".delete");
  const badge = card.querySelector(".badge");

  // INTERVIEW
  interviewBtn.addEventListener("click", () => {
    card.dataset.status = "interview";
    badge.innerText = "INTERVIEW";
    updateCounts();
  });

  // REJECTED
  rejectedBtn.addEventListener("click", () => {
    card.dataset.status = "rejected";
    badge.innerText = "REJECTED";
    updateCounts();
  });

  // DELETE
  deleteBtn.addEventListener("click", () => {
    card.remove();
    updateCounts();
  });
});
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    const type = tab.dataset.tab;

    document.querySelectorAll(".tab").forEach(t =>
      t.classList.remove("active")
    );
    tab.classList.add("active");

    getCards().forEach(card => {
      if (type === "all" || card.dataset.status === type) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

updateCounts();