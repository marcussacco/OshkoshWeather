$(document).ready(function(){
  var url="http://api.wunderground.com/api/ceb5d155ada684a6/forecast/geolookup/conditions/q/WI/Oshkosh.json";
  $.getJSON(url,function(response){
    var current = response.current_observation;
    var forecast = response.forecast.simpleforecast;
    var temp = current.feelslike_f;
    $("#city").html(current.display_location.city + ",");
    $("#state").html(current.display_location.state);
    $("#weather").html(current.weather);
    $("#temp").html(current.feelslike_f + "\u00B0");
    $("#lastUpdate").html(current.observation_time);
		
    $.each(forecast.forecastday, function(i){
      var foreshort = forecast.forecastday[i];
      $(".dayName").eq(i).text(foreshort.date.weekday);
      $(".cond").eq(i).text(foreshort.conditions);
      $(".hi").eq(i).text(foreshort.high.fahrenheit);
      $(".lo").eq(i).text(foreshort.low.fahrenheit);
    }); //end each
    
    if(current.feelslike_f > 80){
			$("#suggestion").text("Getting hot now.");
		}else if(temp < 80 && temp > 60){
			$("#suggestion").text("It's pretty much perfect.");
		}else if(temp < 60 && temp > 40){
			$("#suggestion").text("It's nice and cool.");
		}else if(temp > 20 && temp < 40){
			$("#suggestion").text("It's a little chilly.");
		}; //end if
  }); //end getJSON
}); //end ready
