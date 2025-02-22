const studentColorMap = new Map();

function getColorForStudent(student) {
  if (studentColorMap.has(student)) {
    return studentColorMap.get(student);
  } else {
    const colors = ["#000080", "#006400", "#333333", "#8B0000"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    studentColorMap.set(student, randomColor);
    return randomColor;
  }
}

async function updateSchedule() {
  try {
    const response = await fetch("data.json");
    const data = await response.json();

    data.data.session.forEach((session) => {
      const day = session.day.toLowerCase();
      const time = session.time;
      const student = session.student;

      const id = `${day}-${time.replace(/ /g, "-").toLowerCase()}`;
      const div = document.getElementById(id);

      if (div) {
        const color = getColorForStudent(student);

        div.style.backgroundColor = color;
        div.style.color = "white";
        div.style.border = "none";
        div.textContent = student;

        if (time.includes("-")) {
          const [startTime, endTime] = time.split("-");
          const start = startTime.trim();
          const end = endTime.trim();

          if (start !== end) {
            const nextId = `${day}-${end.replace(/ /g, "-").toLowerCase()}`;
            const nextDiv = document.getElementById(nextId);

            if (nextDiv) {
              nextDiv.style.backgroundColor = color;
              nextDiv.style.color = "white";
              nextDiv.textContent = student;
            }
          }
        }
      }
    });
  } catch (error) {
    console.error("Error fetching or processing JSON data:", error);
  }
}

updateSchedule();
