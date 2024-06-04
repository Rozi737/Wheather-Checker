const button = document.getElementById("btn");

button.addEventListener("click", function (e) {
  e.preventDefault();
  const city = document.querySelector(".searchbar").value;
  func(city);
});
async function func(city) {
  const API = "3fb1e05911f24de488f233128242905";
  const spinner = document.getElementById("spinner");
  try {
    spinner.classList.remove("hidden");
    const res = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${API}&q=${city}&aqi=no`
    );
    const data = await res.json();
    if (data.error) {
      document.querySelector(".searchbar").value = "";
      document.querySelector(".nocity").style.display = "block";
      document.querySelector(".nocity").innerHTML = "No such city found";
      document.getElementById("c").style.display = "none";
      spinner.classList.add("hidden");
      return;
    }
    document.querySelector(".nocity").style.display = "none";
    document.getElementById("c").style.display = "block";
    document.querySelector(".city").innerHTML =
      "Weather in " + data.location.name;
    document.querySelector(".temp").innerHTML = data.current.temp_c + "°C";
    document.querySelector(".description").innerHTML =
      data.current.condition.text;
    document.querySelector(".humidity").innerHTML =
      "Humidity: " + data.current.humidity + "%";
    document.querySelector(".icon").src = data.current.condition.icon;
    document.querySelector(".wind").innerHTML =
      "Wind speed: " + data.current.wind_kph + "km/h";
    // console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    spinner.classList.add("hidden");
  }
}
