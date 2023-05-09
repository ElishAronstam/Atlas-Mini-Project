import { declareEvents } from "./viewEvents.js"
import Country from "./countryClass.js"

const init = () => {

    doApi("israel")
    declareEvents(doApi)
}
const showLoading = () => {
    document.querySelector("#id_loading").style.display = "block";
    document.querySelector("#id_parent").style.display = "none";
}

const hideLoading = () => {
    document.querySelector("#id_loading").style.display = "none";
    document.querySelector("#id_parent").style.display = "flex";
}
const doApi = async (country) => {
    showLoading()
    let url = (`https://restcountries.com/v3.1/name/${country}`)
    try {
        let resp = await fetch(url)
        console.log(resp)
        let data = await resp.json()
        console.log(data);
        displayCountry(data[0])
    } catch (e) {
        console.log(e);

        document.querySelector("#id_parent").innerHTML =
         `
        <div class="container err">
            <div class="col-12 row align-items-center text-center ">
            <h1 class="display-4  mt-5">Oops,</h1>
              <h1 class="display-4 ">Couldnt find the country you are looking for</h1>
              <h2 class="display-5 ">Please try again</h2>
            </div>
        </div>
        `
    }

}

const displayCountry = (countryData) => {
    console.log(countryData)//works till here
    hideLoading();
    document.querySelector("#id_parent").innerHTML = ""
    let country = new Country(countryData, "#id_parent", doApi, fullName)
    country.render(fullName, doApi);
}

const fullName = async (code) => {
    let url = `https://restcountries.com/v3.1/alpha/${code}`;
    let resp = await fetch(url);
    let data = await resp.json();
    let full = await (data[0].name.common);
    return full;
}

init()