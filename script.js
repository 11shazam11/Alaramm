//Display clock

function displayClock() {
  let curr = new Date();
  let hrs = curr.getHours();
  let mins = curr.getMinutes();
  let secs = curr.getSeconds();
  let day = curr.getDay();
  let date = curr.getDate();
  let month = curr.getMonth();
  let year = curr.getFullYear();
  let session = "AM";

  // Setting time 

  if (hrs == 12) {
    session = "PM";
  }

  if (hrs == 0) {
    hrs = 12;
  }

  if (hrs > 12) {
    hrs = hrs - 12;
    session = "PM";
  }
  hrs = hrs < 10 ? "0" + hrs : hrs;
  mins = mins < 10 ? "0" + mins : mins;
  secs = secs < 10 ? "0" + secs : secs;

  //Display Time

  document.getElementById("clock").innerHTML = `${hrs} <span class="dot" >:</span> ${mins} <span class="dot" >:</span> ${secs}  ${session}`;

  //Setting Date

  let dayList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday"];
  let monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

  let currDay = dayList[day];
  let currMonth = monthList[month];
  let currDate = date < 10 ? "0" + date : date;

  let dateCon = document.getElementById('tarik');
  dateCon.innerText = currDay + ", " + currDate + " " + currMonth + " " + year;



  //Event Listner for Set Alaram button

  document.getElementById('set').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'block';
    setDefault(hrs, mins, session);
  });

}
setInterval(displayClock, 1000);


//Display Alaram List
function makeAppear() {
  let btn = document.getElementById('apply');
  btn.addEventListener('click', () => {
    let con = document.getElementById('appear');
    con.style.height = "auto";
    con.style.width = "800px";
    document.getElementById('modal').style.display = 'none';
  });
}
makeAppear();

// Adding SELECT box Options
function addOption(id, start, end) {
  let selcon = document.getElementById(id);
  for (let i = start; i <= end; i++) {
    let opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = i;
    selcon.appendChild(opt);
  }
}

addOption('hours', 1, 12);
addOption('minutes', 0, 60);


//Default time 
function setDefault(hrs, mins, sess) {
  let hours = document.getElementById('hours');
  let minutes = document.getElementById('minutes');
  let session = document.getElementById('ses');

  let s = 0;
  if (sess == 'PM') {
    s = 1;
  }

  hours.selectedIndex = hrs - 1;
  minutes.selectedIndex = mins;
  session.selectedIndex = s;
}

//setting Alaram 
document.getElementById('apply').addEventListener('click', () => {
  let ghanta = document.getElementById('hours').value;
  let ghantamin = document.getElementById('minutes').value;
  let ghantasess = document.getElementById('ses').value;
  setAlaram(ghanta, ghantamin, ghantasess);
});


var alaramInterval = [];
var alaramId = 0;

//Alaram Algorithm
function setAlaram(hrs, mins, sess) {

  //check if exist 
  let check = alaramInterval.some(alaram => alaram.hrs == hrs && alaram.mins == mins && alaram.sess == sess);
  if (check) {
    alert('Already Exist');
    return;
  }
  //create Alaram Object
  alaramId += 1;

  let a = setInterval(function() {
    let curr = new Date;
    let currHrs = curr.getHours();
    let currMin = curr.getMinutes();
    let currSess = "AM";
    if (currHrs > 12) {
      currHrs = currHrs - 12;
      currSess = "PM";
    }
    if (currHrs == 0) {
      currHrs = 12;
    }
    if (currHrs == 12) {
      currSess = "PM";
    }

    if (currHrs == hrs && currMin == mins && currSess == sess) {
      let audio = new Audio('pedro-song.mp3');
      audio.play();
      setTimeout(function() {
        let danceCon = document.querySelector('.dance');
        danceCon.style.zIndex = 999;
        danceCon.style.opacity = 1;
        setTimeout(function() {
          danceCon.style.opacity = 0;
          danceCon.style.zIndex = -999;
          removeAlaram(alaramId);
        }, 12 * 1000);
      }, 1000);

      clearInterval(a);

    }

  }, 1000);

  displayAlaram(hrs, mins, sess, alaramId);

  alaramInterval.push({ alaramId, interval: a, hrs, mins, sess });


}

//displaying Alaram List

function displayAlaram(hrs, mins, sess, id) {
  let licon = document.getElementById('appear');
  let item = document.createElement('div');
  item.className = 'litem';
  item.id = id;
  item.innerHTML = `<h3>${hrs} : ${mins} ${sess}</h3>
      <button class="w3-button w3-round-xxlarge w3-red del" onClick = "removeAlaram(${id})">-</button>`;
  licon.appendChild(item);

  setTimeout(function() {
    item.classList.add('show');
  }, 1000);
}

//deletig Alaram
function removeAlaram(id) {
  for (let i = 0; i < alaramInterval.length; i++) {
    if (alaramInterval[i].alaramId == id) {
      clearInterval(alaramInterval[i].interval);
      alaramInterval.splice(i, 1);
      break;
    }
  }
  document.getElementById(id).style.opacity = 0;
  setTimeout(function() {
    document.getElementById(id).remove();
  }, 2000);
}
