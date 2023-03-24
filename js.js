let loc = document.getElementById('out');
//Initialize google map and update every 5 seconds with new location
function initMap() {

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    mapTypeId: "satellite"
  });

  var marker = new google.maps.Marker({
    map: map,
    title: "Международная Космическая Станция (МКС)\nдвижется по земной орбите со скоростью 27700 км/ч.\nТочное расположение находится в верхнем левом блоке на станице,\nэкипаж в правом нижнем блоке.\nОбновление положения МКС и экипажа каждые 5 секунд.",
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
    getISSLocation()
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
  const apiKey = "AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao"
  const callbackToGoogle = "&callback=initMap"
  return adress + apiKey + callbackToGoogle
}


// Get location of International space station
function getISSLocation() {

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
let countIssPeople = 0
let a
let b
function totalCrew() {
  $.ajax({
    url: "http://api.open-notify.org/astros.json",
    context: document.body,
    success: function (data) {
      $.each(data.people, function () {
        
        if (this.craft === 'ISS'){
          
        // $(".people").text("Total amount: " + data['number'] + " people!")
        a = $(".people").text("Total amount: " + countIssPeople++ + " people!")
        b = $('.name').append('<div class="person">' + this.name + " " + '<span>' + this.craft + '</span>' + '</div>') 
        }
      }) 

  //       updatePeople(peopleISS, marker)
  // setInterval(() => {
  //   updatePeople(peopleISS, marker)
  // }, 5000)
      
      
      // setInterval(function(){
      //   $(".person").remove()
      // }, 3000);   
      // setInterval("totalCrew();", 3000)
    }
  });
}
 totalCrew();

setInterval("totalCrew();", 3000);
// был еще 1 вариант с перезаписью данных в существующие блоки, но мне показалось с динамически создаваемыми будет лучше,так как их создание зависит от количества экипажа.
