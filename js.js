`use strict`
let loc = document.getElementById('out');
//Initialize google map and update every 5 seconds with new location
function initMap() {

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    mapTypeId: "satellite"
  });

  var marker = new google.maps.Marker({
    map: map,
    title: "[1]",
    icon: {
      url: "http://www.i2clipart.com/cliparts/9/1/8/b/clipart-international-space-station-918b.png",
      scaledSize: {
        width: 80,
        height: 80
      },
      anchor: {
        x: 64 / 4,
        y: 64 / 4
      }
    }
  });

  updateMap(map, marker)
  setInterval(() => {
    updateMap(map, marker)
  }, 5000)

  // Get current location. Returns a promise
  function updateMap(map, marker) {
    getISSLocation(marker)
      .then((location) => {
        map.setCenter(location)
        marker.setPosition(location)

      })
  }
}

// For fetch implementation of Google Maps. Not used.
function fetchAPI() {
  const adress = "https://maps.googleapis.com/maps/api/js?key="
  // const apiKey = "AIzaSyBRamfMG3mZVAQ_dnzqj6adZxg5zn4Tfy4"
  // const apiKey = "AIzaSyAcHyOLl19OFu7om8g3R6mgFUWFl-T4OVw"
  const callbackToGoogle = "&callback=initMap"
  return adress + apiKey + callbackToGoogle
}


// Get location of International space station
function getISSLocation(marker) {

  return new Promise((resolve, reject) => {
    let XHR = new XMLHttpRequest()

    XHR.open('GET', 'https://api.wheretheiss.at/v1/satellites/25544')
    XHR.onload = function () {
      let location = {}

      if (XHR.readyState === 4 && XHR.status === 200) {

       let latitude = JSON.parse(XHR.responseText).latitude.toFixed(3)
       let longitude = JSON.parse(XHR.responseText).longitude.toFixed(3)
  //     let latitude= 1
  //  let longitude= 1
        loc.innerHTML = "ISS is now located at: latitude: " + latitude + ", " + "longitude: " + longitude;
        marker.title = `ISS is now located at: latitude: ${latitude}, longitude: ${longitude}`


        location = {
          lat: Number(latitude),
          lng: Number(longitude)
        }
        resolve(location)
      } else {
        reject(XHR.statusText)
      }
    }
    XHR.send()
  })
}

// $.getJSON('http://api.open-notify.org/astros.json', function (data) {
//   $(".people").text("Total amount: " + data['number'] + " people!");

//   // $(".name_0").text(data.people[0].name);
//   // $(".name_1").text(data.people[1].name);
//   // $(".name_2").text(data.people[2].name);
//   $.each(data.people, function () {
//     // $('.name').append(this.name + " " + this.craft + " <br> ");
//     // console.log(this.name)
//     // console.log(this.craft)
//     // $('<div class="name">' + this.name + '</div>')
//     $('.name').append('<div class="person">' + this.name + " " + '<span>' + this.craft + '</span>' + '</div>');
//   })
// });
function initHtml()
{
  $.ajax
    (
      {
        url: "http://api.open-notify.org/astros.json",
        context: document.body,
        success: function (data)
        {
          let countIssPeople = 0
          let parentdiv = document.querySelector(`.name`)
          
          $.each(data.people, function ()
          {
            // if (this.craft === 'ISS')
            // {
              let newdiv = document.createElement(`div`)
              newdiv.className = `person person${++countIssPeople}`
              if (parentdiv !== null) {
              parentdiv.append(newdiv)
            }
              // $('.name').append(`<div class="person person${++countIssPeople}"></div>`)
            // }
          })
        }
      }
    )
}

function totalCrew() {
  $.ajax({
    url: "http://api.open-notify.org/astros.json",
    context: document.body,
    success: function (data) {
      let countIssPeople = 0

      $.each(data.people, function () {
        
        // if (this.craft === 'ISS'){
        $(".people").text("Total amount: " + ++countIssPeople + " people!")
          let element = document.querySelector(`.person${countIssPeople}`)
          console.log(element);
          if (element !== null) {
            element.innerHTML = `${this.name} <span> ${this.craft} </span>`
          }
        // }
      }) 
    }
  });
}
initHtml()
totalCrew();

setInterval("totalCrew();", 3000);  
// был еще 1 вариант с перезаписью данных в существующие блоки, но мне показалось с динамически создаваемыми будет лучше,так как их создание зависит от количества экипажа.
