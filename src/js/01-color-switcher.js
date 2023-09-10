const startBtn = document.querySelector ("button[data-start]");
const stopBtn = document.querySelector("button[data-stop]");
const body = document.querySelector ("body");
let timerId = null;


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  };
 

startBtn.addEventListener('click', () => {
        timerId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
        startBtn.setAttribute("disabled","disabled");
      }, 1000);
    
  });
  stopBtn.addEventListener("click", () => {
    startBtn.removeAttribute("disabled")
    clearInterval(timerId);});



