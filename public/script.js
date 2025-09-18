// Switching between Morning and Evening Adhkar
const tabMorning = document.getElementById("tab-morning");
const tabEvening = document.getElementById("tab-evening");
const morningSection = document.getElementById("morning-section");
const eveningSection = document.getElementById("evening-section");

// لما تضغط على زر الصباح
tabMorning.addEventListener("click", () => {
  tabMorning.classList.add("btn-turq");   // زر الصبح يكون ملوّن
  tabMorning.classList.remove("btn-ghost");
  tabEvening.classList.add("btn-ghost");  // زر المساء يرجع باهت
  tabEvening.classList.remove("btn-turq");

  morningSection.style.display = "block"; // إظهار الصبح
  eveningSection.style.display = "none";  // إخفاء المساء
});

// لما تضغط على زر المساء
tabEvening.addEventListener("click", () => {
  tabEvening.classList.add("btn-turq");
  tabEvening.classList.remove("btn-ghost");
  tabMorning.classList.add("btn-ghost");
  tabMorning.classList.remove("btn-turq");

  eveningSection.style.display = "block"; // إظهار المساء
  morningSection.style.display = "none";  // إخفاء الصبح
});
