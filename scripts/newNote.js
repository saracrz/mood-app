const saveButton = document.getElementById("Save");
const textarea = document.getElementById("text-area");

const getSentiment = (classifications) => {
  let words = classifications.text.split(' ');
  let largerClassification = 0;

  for(let i = 0; i < words.length; i++) {
    if (words[i].length > largerClassification) {
      largerClassification = words[i].length
    }
  }
  return largerClassification;
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
  .then(res => {
    console.log(res);
    const eventList = localStorage.getItem("events");
    const date = new Date().toISOString();
  
    if (eventList){
      const list = JSON.parse(eventList);
      const data = {
        title: textarea.value,
        start: date,
        sentiment: getSentiment(),
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
  })
});



