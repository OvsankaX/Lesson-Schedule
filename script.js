const schedules = {
  "понедельник": ["Разговоры о какашках", "История", "Физкультура", "Алгебра", "География", "Обществознание", "Иностранный язык"],
  "вторник": ["Литература", "Русский язык", "ОБЖ", "Алгебра", "Физика", "Иностранный язык", "История"],
  "среда": ["Русский язык", "Литература", "География", "Химия", "Информатика", "Физкультура", "Труд"],
  "четверг": ["Говно фуууу", "Алгебра", "Геометрия", "Физика", "Биология", "Русский язык", "Литература"],
  "пятница": ["Вероятность и статистика", "Геометрия", "Алгебра", "Химия", "Биология", "Физика", "Иностранный язык"]
};

const times = [
  "8:30–9:15", "9:35–10:20", "10:40–11:25",
  "11:50–12:35", "12:55–13:40", "13:50–14:35", "14:40–15:25"
];

const days = Object.keys(schedules);
let currentDayIndex = new Date().getDay() - 1;
if (currentDayIndex < 0 || currentDayIndex > 4) currentDayIndex = 0;

let showAll = false;

function render() {
  const container = document.getElementById("content");
  container.innerHTML = "";

  if (!showAll) {
    const day = days[currentDayIndex];
    document.getElementById("dayTitle").innerText = capitalize(day);

    renderDay(container, day);
  } else {
    document.getElementById("dayTitle").innerText = "Все дни";

    days.forEach(day => {
      const title = document.createElement("div");
      title.className = "day-title";
      title.innerText = capitalize(day);
      container.appendChild(title);

      renderDay(container, day);
    });
  }

  document.getElementById("toggleButton").innerText = showAll ? "Сегодня" : "Все дни";
}

function renderDay(container, day) {
  const subjects = schedules[day];

  subjects.forEach((subj, i) => {
    const c = document.createElement("div");
    c.className = "card";
    c.innerHTML = `
      <div class="time">${times[i]}</div>
      <div class="subject">${subj}</div>
    `;
    container.appendChild(c);
  });

  const table = document.createElement("table");
  table.innerHTML = `<tr><th>#</th><th>Время</th><th>Предмет</th></tr>`;

  subjects.forEach((subj, i) => {
    table.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${times[i]}</td>
        <td>${subj}</td>
      </tr>
    `;
  });

  container.appendChild(table);
}

function prevDay() {
  currentDayIndex = (currentDayIndex - 1 + days.length) % days.length;
  showAll = false;
  render();
}

function nextDay() {
  currentDayIndex = (currentDayIndex + 1) % days.length;
  showAll = false;
  render();
}

function toggleAll() {
  showAll = !showAll;
  render();
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

window.onload = render;
