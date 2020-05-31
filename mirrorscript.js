  var pr1 = {
    Name: "New Year's Day",
    date: 1.01,
    day: 1,
    month: 1
  };
  var pr2 = {
    Name: "Valentine's Day",
    date: 2.14,
    day: 14,
    month: 2
  };
  var pr3 = {
    Name: "International Women's Day",
    date: 3.08,
    day: 8,
    month: 3
  };
  var pr4 = {
    Name: "April Fools' Day",
    date: 4.01,
    day: 1,
    month: 4
  };
  var pr5 = {
    Name: "May Day",
    date: 5.01,
    day: 1,
    month: 5
  };
  var pr6 = {
    Name: "International Workers' Day",
    date: 5.01,
    day: 1,
    month: 5 
  };
  var pr7 = {
    Name: "Star Wars Day",
    date: 5.04,
    day: 4,
    month: 5
  };
  var pr8 = {
    Name: "World Environment Day",
    date: 6.05,
    day: 5,
    month: 6
  };
  var pr9 = {
    Name: "World Humanist Day",
    date: 6.21,
    day: 21,
    month: 6
  };
  var pr10 = {
    Name: "International Friendship Day",
    date: 8.02,
    day: 2,
    month: 8
  };
  var pr11 = {
    Name: "International Day of Peace",
    date: 9.21,
    day: 21,
    month: 9
  };
  var pr12 = {
    Name: "Halloween",
    date: 10.31,
    day: 31,
    month: 10
  };
  var pr13 = {
    Name: "All Saints Day",
    date: 11.01,
    day: 1,
    month: 11
  };
  var pr14 = {
    Name: "Christmas Eve",
    date: 12.24,
    day: 24,
    month: 12
  };
  var pr15 = {
    Name: "Christmas Day",
    date: 12.25,
    day: 25,
    month: 12
  };
  var pr16 = {
    Name: "Boxing Day",
    date: 12.26,
    day: 26,
    month: 12
  };
  var pr17 = {
    Name: "New Year's Eve",
    date: 12.31,
    day: 31,
    month: 12
  };
alldays = [pr1, pr2, pr3, pr4, pr5, pr6, pr7, pr8, pr9, pr10, pr11, pr12, pr13, pr14, pr15, pr16, pr17];

welcomeMassage = ["You look Sexy", "Awesome", "Have a nice day","Be yourself"];

var massagePick = 0;
var currSec = 0;
var sixtySec = 0;

var changer = 0;

function startTime() {
  var today = new Date();
  var d = today.getDay();
  var e = today.getDate();
  var y = today.getYear();
  var z = today.getMonth();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  month = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
  day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  ampm = ["AM", "PM"];
  var pmam;
 
  var i = 0;
  var holidaycheck = z + 1 + ((e / 100));
  i = holidays(holidaycheck, i);

  var sport = document.getElementById("sport");
  var weather = document.getElementById("weather");
  if(changer == 0)
  {
    sport.style.display = "block";
    weather.style.display = "none";
  }
  if(changer == 1)
  {
    sport.style.display = "none";
    weather.style.display = "block";
  }
  if(changer == 2)
  {
    sport.style.display = "none";
    weather.style.display = "none";
  }
  
  if(currSec < s)
  {
    sixtySec ++;
    currSec = s;
    if(currSec == 59)
    {
      currSec = 0;
    }
  }
  if (sixtySec == 60)
  {
    newMassage(massagePick);
    massagePick++;
    sixtySec = 0;
    changer++;
    if(changer>2)
    {
      changer = 0;
    }
  }
  if (massagePick > 3)
  {
    massagePick = 0;
  }

  m = checkTime(m);
  s = checkTime(s);
  h = checkTime(h);
  y += 1900;
  pmam = amorpm(h, pmam);
  h = newhour(h);

  document.getElementById('txt').innerHTML =
  h + ":" + m;
  document.getElementById('sec').innerHTML =
  s + " " + ampm[pmam];
  document.getElementById('dat').innerHTML =
  day[d] + ", " + e + " " + month[z] +" " + y;

  document.getElementById('hol1').innerHTML = " " + alldays[i].Name;
  document.getElementById('hol2').innerHTML = " " + alldays[i + 1].Name;
  document.getElementById('hol3').innerHTML = " " + alldays[i + 2].Name;

  document.getElementById('left1').innerHTML = daysleft(e, z + 1, i);
  document.getElementById('left2').innerHTML = daysleft(e, z + 1, i + 1);
  document.getElementById('left3').innerHTML = daysleft(e, z + 1, i + 2);


  var t = setTimeout(startTime, 500);
}

function checkTime(i) {
  if (i < 10) {i = "0" + i};
  return i;
}

function amorpm(h, ampm)
{
      if(h > 12)
    {
      return 1;
    }
    return 0;
}
function newhour(h)
{
    if(h > 12)
    {
      h -= 12;
    }
    return h;
}

function holidays(holidaycheck, i)
{
  for(i = 0; i < 16; i++)
  {
    if(holidaycheck < alldays[i].date)
    {
        return i;
    }
  }
        return i;
}

function daysleft(d, m, i)
{
  if(m == alldays[i].month)
  {
    if(d == alldays[i].day)
    {
      return "Today";
    }else{
      return (alldays[i].day - d) + " " +  "days left";
    }
  }else{
    return (alldays[i].month - m) + " " + "months left";
  }
}

var songNumber = 0;
songs = ["Look at Me!", "Lovely", "MOONLIGHT", "Detstvo", "Prada",
 "Ride It","Oduvanchik", "Dance Monkey"];
function musicFunction() {
  if(songNumber == 0)
  {
    songs = shuffle(songs);
  }

  document.getElementById("mySong").src = "Music/" + songs[songNumber] + ".mp3";
  document.getElementById("myPic").src = "Music/" + songs[songNumber] + ".png";
  document.getElementById('songTitle').innerHTML = songs[songNumber];
  songNumber++;
  if(songNumber > 7)
  {
    songNumber = 0;
  }
}

function newMassage(massagePick)
{
  document.getElementById('changeTxt').innerHTML = welcomeMassage[massagePick];
  massagePick ++;
}
function shuffle(arra1) {
    var ctr = arra1.length, temp, index;

// While there are elements in the array
    while (ctr > 0) {
// Pick a random index
        index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
        ctr--;
// And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}
