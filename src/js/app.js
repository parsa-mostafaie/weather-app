let $ = document;
let container = $.querySelector("#container > .grid");
let lang_inp = $.getElementById("lang");
let city_inp = $.getElementById("city");
let wday_inp = $.getElementById("wday");

let city = "";
let lang = "en";

lang_inp.addEventListener("change", () => {
  lang = lang_inp.value;
});

city_inp.addEventListener("change", () => {
  city = city_inp.value;
});

let data = null;

let item_classlist = "witem";

function fetchData() {
  data = fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?lang=${lang}&unitGroup=metric&include=events%2Cdays%2Chours%2Ccurrent%2Calerts&key=JR22YSC6YC3BTNV8C9CMJAR99&contentType=json`,
    {
      method: "GET",
      headers: {},
    }
  )
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      renderAday(
        json.days[wday_inp.value],
        json.currentConditions,
        +wday_inp.value == 0
      );
      $.querySelector("#city_name").textContent = json.resolvedAddress;
    })
    .catch((err) => {
      console.error(err);
    });
}

function renderAhour(prev, hour, isnow = false) {
  return (
    prev +
    `<div class="${item_classlist}">
    <span class="border-b-[#333] border-b-2">${
      isnow === true ? `<i class='text-[#a0f]'>NOW</i>` : hour.datetime
    }</span>
    <span class='border-b-[#333] border-b-2'>${hour.temp}&deg;C</span>
    <span class='select-all'>${hour.conditions}</span>
  </div>`
  );
}

function renderAday(day, currentConditions, CurrentTime) {
  container.innerHTML =
    `<b class='${item_classlist} spec-text'>Sunrise: ${day.sunrise}</b>` +
    `<b class='${item_classlist} spec-text'>Sunset: ${day.sunset}</b>` +
    (CurrentTime
      ? `<b class='${item_classlist} spec-text'>Current Time Zone: ${currentConditions.datetime}</b>` +
        renderAhour("", currentConditions, true)
      : "") +
    day.hours.reduce(renderAhour, "");
}
