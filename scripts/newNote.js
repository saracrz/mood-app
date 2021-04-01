const saveButton = document.getElementById("Save");
const textarea = document.getElementById("text-area");

const getSentiment = (classifications) => {
  let confidence = classifications[0].classifications[0].tag_name;
  return confidence;
}

const chooseColor = (emotion) => {
  switch(emotion){
    case 'Positive' : return '#6aedb2';
    case 'Neutral' : return '#0000ff';
    case 'Negative' : return '#ff0000';
  }
}

saveButton.addEventListener("click", (e) => {
  e.preventDefault();
  const payload = {
    "data": [textarea.value]
  }
  fetch('https://api.monkeylearn.com/v3/classifiers/cl_pi3C7JiL/classify/', {
    method: 'POST', body: JSON.stringify(payload),
    headers: { Authorization: 'Token 82286876434f802e702da22ea9b886352bd4a071',
    "Content-Type": "application/json" }
  })
  .then(res => res.json())
  .then(res =>  {
    console.log(res);
    const eventList = localStorage.getItem("events");
    const date = new Date().toISOString();
    const sentiments = getSentiment(res);
  
    if (eventList){
      const list = JSON.parse(eventList);
      const data = {
        title: textarea.value,
        start: date,
        sentiment: sentiments,
        display: 'background',
        allDay: true,
        backgroundColor: chooseColor(sentiments),
      }
      list.push(data);
      localStorage.setItem("events", JSON.stringify(list));
    } else {
      const data = [{
        title: textarea.value,
        start: date,
        sentiment: sentiments,
        display: 'background',
        allDay: true,
        backgroundColor: chooseColor(sentiments),
      }]
      localStorage.setItem("events", JSON.stringify(data));
    }
    window.location.assign('/html/calendar.html');
  })
});



