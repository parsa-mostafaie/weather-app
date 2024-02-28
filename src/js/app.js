let $ = document;
let container = $.querySelector("#container > .grid");
let lang_inp = $.getElementById("lang");
let city_inp = $.getElementById("city");

let city = "";
let lang = "en";

lang_inp.addEventListener("change", () => {
  lang = lang_inp.value;
});

city_inp.addEventListener("change", () => {
  city = city_inp.value;
});

let data = null;

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
      container.innerHTML =
        renderAhour("", json.currentConditions, true) +
        json.days[0].hours.reduce(renderAhour, "");
    })
    .catch((err) => {
      console.error(err);
    });
}

function renderAhour(prev, hour, isnow = false) {
  return (
    prev +
    `<div class="bg-gray-700 rounded-md p-5 flex flex-col text-center">
    <span class="border-b-[#333] border-b-2">${
      isnow === true ? "<i class='text-[#a0f]'>NOW</i>" : hour.datetime
    }</span>
    <span>${hour.temp}&deg;C</span>
  </div>`
  );
}
