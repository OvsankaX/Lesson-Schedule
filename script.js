var schedules = {
  "понедельник": ["Разговоры о какашках", "История", "Физкультура", "Алгебра", "География", "Обществознание", "Иностранный язык"],
  "вторник": ["Литература", "Русский язык", "ОБЖ", "Алгебра", "Физика", "Иностранный язык", "История"],
  "среда": ["Русский язык", "Литература", "География", "Химия", "Информатика", "Физкультура", "Труд"],
  "четверг": ["Говно фуууу", "Алгебра", "Геометрия", "Физика", "Биология", "Русский язык", "Литература"],
  "пятница": ["Вероятность и статистика", "Геометрия", "Алгебра", "Химия", "Биология", "Физика", "Иностранный язык"]
};

var times = [
  "8:30–9:15",
  "9:35–10:20",
  "10:40–11:25",
  "11:50–12:35",
  "12:55–13:40",
  "13:50–14:35",
  "14:40–15:25"
];

var days = Object.keys(schedules);
var currentDayIndex = new Date().getDay() - 1;
if (currentDayIndex < 0 || currentDayIndex > 4) currentDayIndex = 0;

var showAll = false;


function render() {
  var container = document.getElementById("content");
  container.innerHTML = "";

  if (!showAll) {
    var day = days[currentDayIndex];
    document.getElementById("dayTitle").innerHTML = capitalize(day);

    renderDay(container, day);
  } else {
    document.getElementById("dayTitle").innerHTML = "Все дни";

    for (var i = 0; i < days.length; i++) {
      var d = days[i];

      var title = document.createElement("div");
      title.className = "day-title";
      title.textContent = capitalize(d);
      container.appendChild(title);

      renderDay(container, d);
    }
  }

  document.getElementById("toggleButton").textContent = showAll ? "Сегодня" : "Все дни";
}


function renderDay(container, day) {
  var subs = schedules[day];

  for (var i = 0; i < subs.length; i++) {
    var card = document.createElement("div");
    card.className = "card";

    var t = document.createElement("div");
    t.className = "time";
    t.textContent = times[i];

    var s = document.createElement("div");
    s.className = "subject";
    s.textContent = subs[i];

    card.appendChild(t);
    card.appendChild(s);

    container.appendChild(card);
  }

  var table = document.createElement("table");

  var head = document.createElement("tr");
  addCell(head, "#", true);
  addCell(head, "Время", true);
  addCell(head, "Предмет", true);
  table.appendChild(head);

  for (var i = 0; i < subs.length; i++) {
    var row = document.createElement("tr");
    addCell(row, String(i + 1), false);
    addCell(row, times[i], false);
    addCell(row, subs[i], false);
    table.appendChild(row);
  }

  container.appendChild(table);
}


function addCell(row, text, isHead) {
  var cell = document.createElement(isHead ? "th" : "td");
  cell.textContent = text;
  row.appendChild(cell);
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

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

document.getElementById("prevBtn").onclick = prevDay;
document.getElementById("toggleButton").onclick = toggleAll;
document.getElementById("nextBtn").onclick = nextDay;

render();
