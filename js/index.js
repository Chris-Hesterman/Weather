$(document).ready(function() {
  
  //get location data 
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lats = position.coords.latitude;
      var long = position.coords.longitude;

      $.getJSON(
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
          lats +
          "&lon=" +
          long +
          "&units=metric&appid=44f43fc29ce6e6e51f04621e20830d3b"
      ).done(function(myJSON) {
        
        var tempC = Math.floor(myJSON.main.temp);
        var tempF = Math.floor((tempC * 9/5) +32);
        var tempCe = tempC + " °C";
        var tempFa = tempF + " °F";
        
  //assign data to corresponding divs     
        
        $(".city").html(myJSON.name);
        $(".city").css("text-decoration" , "underline");
        $(".weather").html(myJSON.weather[0].main + " (" + myJSON.weather[0].description + ")");
        $(".temp").html("Temperature: " + tempCe);
        $(".temp2").html("Temperature: " + tempFa);
        $(".temp2").hide();
        $(".humidity").html(
          "Rel. Humidity: " + myJSON.main.humidity + " %");
        
//button converts Fahrenheit/Celsius    
        
        $("<button class = 'convert btn btn-large'><em>Click to Switch °F/°C</em></button>").appendTo(".tempunits");
        
        $(".convert").click(function() {
          $(".temp,.temp2").toggle();
          $(".convert").mouseup(function() {
            $(this).blur();
          });
        });
       
       
        
   //display correct background for weather condition, display correct svg icon for weather condition
        
        var weathId = myJSON.weather[0];
        
        if (weathId.icon == "01d") {
          $("<img class = 'svg' src = 'https://chris-hesterman.github.io/ch-images//svg icons/animated/day.svg?raw=true'/>").appendTo(".city");
          
        } else if (weathId.icon == "01n") {
          $("body")
            .removeClass("sunny")
            .addClass("clearNight");
          $("<img class = 'svg' src = 'https://chris-hesterman.github.io/ch-images//svg icons/animated/night.svg?raw=true'/>").appendTo(".city");
          
        } else if (weathId.icon == "02n") {
          $("body")
            .removeClass("sunny")
            .addClass("cloudynight");
          $("<img class = 'svg' src = 'https://chris-hesterman.github.io/ch-images//svg icons/animated/cloudy-night-1.svg?raw=true'/>").appendTo(".city");
          
        } else if (weathId.icon == "02d") {
          $("body")
            .removeClass("sunny")
            .addClass("cloudy");
          $("<img class = 'svg' src = 'https://chris-hesterman.github.io/ch-images//svg icons/animated/cloudy-day-1.svg?raw=true'/>").appendTo(".city");
          
        }else if (weathId.icon == "50d" || weathId.icon == "50n") {
          $("body")
            .removeClass("sunny")
            .addClass("foggy");
          $("<img class = 'svg' src = 'http://openweathermap.org/img/w/50d.png'/>").appendTo(".city");
          
        } else if (
          weathId.icon == "09d" ||
          weathId.icon == "10d" ||
          weathId.icon == "09n" ||
          weathId.icon == "10n") {
          $("body")
            .removeClass("sunny")
            .addClass("rainy");
          $("<img class = 'svg' src = 'https://chris-hesterman.github.io/ch-images//svg icons/animated/rainy-7.svg?raw=true'/>").appendTo(".city");
          
        } else if (weathId.icon == "11d" || weathId.icon == "11n") {
          $("body")
            .removeClass("sunny")
            .addClass("stormy");
          $("<img class = 'svg' src = 'https://chris-hesterman.github.io/ch-images//svg icons/animated/thunder.svg?raw=true'/>").appendTo(".city");
          
        } else if (weathId.id > 801 && weathId.id < 810) {
          $("body")
            .removeClass("sunny")
            .addClass("cloudy");
          $("<img class = 'svg' src = 'https://chris-hesterman.github.io/ch-images//svg icons/animated/cloudy.svg?raw=true'/>").appendTo(".city");
          
        } else if (weathId.icon == "13d") {
          $("body")
            .removeClass("sunny")
            .addClass("snow");
          $("<img class = 'svg' src = 'https://chris-hesterman.github.io/ch-images//svg icons/animated/snowy-6.svg?raw=true'/>").appendTo(".city");
        }
        
      });
    });
  }
});