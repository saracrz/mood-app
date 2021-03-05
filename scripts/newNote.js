const saveButton = document.getElementById("Save");
const textarea = document.getElementById("text-area");

saveButton.addEventListener("click", (e) => {
  const eventList = localStorage.getItem("events");
  const date = new Date().toISOString();

  if (eventList){
    const list = JSON.parse(eventList);
    const data = {
      title: textarea.value,
      start: date,
    }
    list.push(data);
    localStorage.setItem("events", JSON.stringify(list));
  } else {
    const data = [{
      title: textarea.value,
      start: date,
    }]
    localStorage.setItem("events", JSON.stringify(data));
  }
});

