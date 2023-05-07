import { declareViewEvents } from "./viewEvents.js"
import countryClass from "./countryClass.js"

const init = () => {
    doApi("israel")
    declareViewEvents(doApi)
}
const showLoading = () => {
    document.querySelector("#id_loading").style.display = "block";
    document.querySelector("#id_row").style.display = "none";
}

const hideLoading = () => {
    document.querySelector("#id_loading").style.display = "none";
    document.querySelector("#id_row").style.display = "flex";
}
const doApi = async (country) => {
    showLoading()
    let url = `https://restcountries.com/v3.1/name/${country}`
    let resp = await fetch(url)
    console.log(resp)
    let data = await resp.json()
    console.log(data);
    displayCountry(data[0])
}

const displayCountry = (countryData) => {
    hideLoading();
    document.querySelector("#id_parent").innerHTML = ""
    let country = new countryClass(countryData, "#id_parent", doApi, fullName)
    country.render();
}

const fullName = async (code) => {
    let url = `https://restcountries.com/v3.1/alpha/${code}`;
    let resp = await fetch(url);
    let data = await resp.json();
    let full = await fetch(data[0].name.common);
    return full;
}

init()