$(document).ready(function(){
  //ask for current user coordinates
  navigator.geolocation.getCurrentPosition(function(pos) {
    var latitude = pos.coords.latitude;
    var longitude = pos.coords.longitude;
    var autoGeo = "http://api.wunderground.com/api/ceb5d155ada684a6/geolookup/q/" + latitude + "," + longitude + ".json";
    //get data of user city & state based on coords
    $.getJSON(autoGeo,function(response){
      var myState = response.location.state;
      var myCity = response.location.city;
      var url = "http://api.wunderground.com/api/ceb5d155ada684a6/forecast/geolookup/conditions/q/" + myState + "/" + myCity + ".json";
      //display current location & weather data
      $.getJSON(url,function(response){
        var current = response.current_observation;
        var forecast = response.forecast.simpleforecast;
        var temp = current.feelslike_f;
        $("#city").html(current.display_location.city + ",");
        $("#state").html(current.display_location.state);
        $("#weather").html(current.weather);
        $("#temp").html(current.feelslike_f + "\u00B0");
        $("#lastUpdate").html(current.observation_time);
        //display four day forecast
        $.each(forecast.forecastday, function(i){
          var foreshort = forecast.forecastday[i];
          $(".dayName").eq(i).text(foreshort.date.weekday);
          $(".cond").eq(i).text(foreshort.conditions);
          $(".hi").eq(i).text(foreshort.high.fahrenheit);
          $(".lo").eq(i).text(foreshort.low.fahrenheit);
        });
        //display my typical reaction to current weather
        if(current.feelslike_f > 80){
          $("#suggestion").text("Getting hot now.");
        }else if(temp < 80 && temp > 60){
          $("#suggestion").text("It's pretty much perfect.");
        }else if(temp < 60 && temp > 40){
          $("#suggestion").text("It's nice and cool.");
        }else if(temp > 20 && temp < 40){
          $("#suggestion").text("It's a little chilly.");
        }; //end if
      }); //end getJSON weather
    }); //end getJSON location
  }); //end geolocation
}); //end ready
