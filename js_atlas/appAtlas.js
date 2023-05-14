import { declareEvents } from "./viewEvents.js"
import Country from "./countryClass.js"
import { errorMsg, homePage } from "./countryManager.js"

const init = () => {
    doApi()
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
const doApi = async (country = "home") => {
    if (country == "home") {
        hideLoading()
        console.log("home")
        homePage()
    } else {
        showLoading()
        let url = (`https://restcountries.com/v3.1/name/${country}`)
        try {
            let resp = await fetch(url)
            console.log(resp)
            let data = await resp.json()
            console.log("data" + data);
            displayCountry(data)
        } catch (e) {
            console.log(e);
            errorMsg()

        }
    }


}

const displayCountry = (countryData) => {
    console.log(countryData)
    hideLoading();
    document.querySelector("#id_parent").innerHTML = ""
    if (countryData.length > 1) {
        console.log("more than one country")
        dispalyOptions(countryData)
    } else {
        let country = new Country(countryData[0], "#id_parent", doApi, fullName)
        country.render(fullName, doApi);
    }

}

const dispalyOptions = (allCountries_ar) => {
    let select = document.querySelector("#id_select_country");
    select.style.display="block";
    allCountries_ar.forEach((item) => {
        select.innerHTML += `
          <option value="${item.name.official}">${item.name.common}</option>`;
    });

}
const fullName = async (code) => {
    let url = `https://restcountries.com/v3.1/alpha/${code}`;
    let resp = await fetch(url);
    let data = await resp.json();
    return data[0].name.common;
}


init()