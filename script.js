const play = document.querySelector(".play");
const pause = document.querySelector(".pause");
const stop = document.querySelector(".stop");
const clear = document.querySelector(".clear");
const archive = document.querySelector(".archive");
const stopwatch = document.querySelector(".stopwatch");
const time = document.querySelector(".time");
const info = document.querySelector(".info");
const timeList = document.querySelector(".time-list");
const shadow = document.querySelector(".modal-shadow");
const closeModal = document.querySelector(".modal-close");

let countTime;
let seconds = 0;
let minutes = 0;
let timesArray = []

const startStopwatch = () => {
    clearInterval(countTime)

	countTime = setInterval(() => {
		if (seconds < 9) {
			seconds++;
			stopwatch.textContent = `${minutes}:0${seconds}`;
		} else if (seconds >= 9 && seconds < 59) {
			seconds++;
			stopwatch.textContent = `${minutes}:${seconds}`;
		} else {
			minutes++;
			seconds = 0;
			stopwatch.textContent = `${minutes}:00`;
		}
	}, 1000);
};

const pauseStopwatch = () => {
    clearInterval(countTime)
}

const resetData = () => {
    clearInterval(countTime)
    stopwatch.textContent = "0:00"
    timeList.textContent = ''
    seconds = 0
    minutes = 0
}

const stopStopwatch = () => {
    if(stopwatch.textContent !== "0:00"){
        time.style.visibility = "visible"
        time.innerHTML = "Last time: " + stopwatch.textContent
        timesArray.push(stopwatch.textContent)
    }
    resetData()
}

const clearAll = () => {
    time.style.visibility = 'hidden'
    timesArray = []
    resetData()
}

const showArchive = () => {
    timeList.textContent = ''

    let counter = 1
    timesArray.forEach(time => {
        const newTime = document.createElement('li')
        newTime.innerHTML = `Measure nr ${counter}: <span>${time}</span>`

        timeList.appendChild(newTime)
        counter++
    })
}

const showModal = () => {
    if(!(shadow.style.display === 'block')){
        shadow.style.display = 'block'
    } else{
        shadow.style.display = 'none'
    }

    shadow.classList.toggle('animate-modal')
}

play.addEventListener("click", startStopwatch);
pause.addEventListener('click', pauseStopwatch)
stop.addEventListener('click', stopStopwatch)
clear.addEventListener('click', clearAll)
archive.addEventListener('click', showArchive)
info.addEventListener('click', showModal)
closeModal.addEventListener('click', showModal)
window.addEventListener('click', e => e.target === shadow ? showModal() : false)
