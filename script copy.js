$(document).ready(function(){
  $("#submitForecast").click(function(){
      return getForecast();
  });
}); 

$(document).ready(function(){
  $("#submitForecast").click(function(){
      return getCurrent();
  });
}); 

// Current Weather Function
function getCurrent(){

  var city = $("#city").val();

  $.ajax({
  url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=imperial&APPID=c10bb3bd22f90d636baa008b1529ee25",
  type: "GET",
  dataType: "jsonp",
  success: function(response){
              
    var table = '';

    table += "<tr>";
    table += "<td><img src='http://openweathermap.org/img/w/"+response.weather[0].icon+".png'></td>";
    table += "<td>" + response.main.temp_max + "&deg;F</td>";
    table += "<td>" + response.main.humidity + "%</td>";
    table += "<td>" + response.wind.speed + " mph</td>";
    table += "</tr>";

    $("#currentWeather").html(table);
    }
  });
}

// Forecast Weather Function
function getForecast(){

  var city = $("#city").val();
  var days = 5

  $.ajax({
  url: 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + "&units=imperial" + "&cnt=" + days + "&APPID=c10bb3bd22f90d636baa008b1529ee25",
  type: "GET",
  dataType: "jsonp",
    success: function(response){
                
      var table = '';

      for(var i = 0; i < days; i++){
        table += "<tr>";
        // table += "<td>" + moment().add([i] + 1, 'days').calendar() + "</td>";
        table += "<td><img src='http://openweathermap.org/img/w/"+response.list[i].weather[0].icon+".png'></td>";
        table += "<td>" + response.list[i].temp.max + "&deg;F</td>";
        table += "<td>" + response.list[i].humidity + "%</td>";
        table += "</tr>";
      }
      $(document).ready(function() {
        $("#submitForecast").on("click", function() { 
          var city = response.city.name; 
          localStorage.setItem(city);
          console.log(city)
          $("#previous").text(localStorage.getItem(city)); 
        })
      });
        $("#forecastWeather").html(table);
    }
  });
}