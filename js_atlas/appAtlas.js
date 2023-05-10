import { declareEvents } from "./viewEvents.js"
import Country from "./countryClass.js"
import {errorMsg,homePage}  from "./countryManager.js"

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
const doApi = async (country="home") => {
    if(country=="home"){
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
            console.log(data);
            displayCountry(data[0])
        } catch (e) {
            console.log(e);
            errorMsg()
           
        }
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