export default class Country {
    constructor(item, parent, doApi, fullName) {
        this.parent = parent;
        this.name = item.name.common;
        this.pop = item.population.toLocaleString();
        this.region = item.region;
        this.languages = Object.keys(item.languages);//arr of the name of parameter in api 
        this.coinCountry = Object.keys(item.currencies);
        this.coinName = Object.values(item.currencies)[0].name;
        this.capital = item.capital;
        this.latlng = item.latlng;
        this.borders = item.borders;
        this.flag = item.flags.svg;
        this.doApi = doApi;
        this.fullName = fullName;

    }
    render(fullName, doApi) {
        let div = document.createElement("div");
        div.className = "singleCont col-md-8 mx-auto p-4 overflow-hidden bg-white";
        document.querySelector(this.parent).append(div);
        div.innerHTML = `
        <img src="${this.flag}" alt="${this.name}" class="col-6 float-end ms-4" height="250">
        <h2>${this.name}</h2>
        <div>POP: ${this.pop} </div>
        <div>Region: ${this.region}</div>
        <div>Languages: ${this.languages}</div>
        <div>Coin:  ${this.coinCountry}, ${this.coinName}</div>
        <div>Capital: ${this.capital}</div>
        <div class="mt-3"><strong>States with borders:</strong><br>
        <div class="borders"></div>
        <div class="container my-5 " id="map"></div>
        </div>`
        console.log(this.latlng)
    
        let mymap = L.map('map').setView([this.latlng[0], this.latlng[1]], 6);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            preferCanvas: true,
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(mymap);
        L.marker([this.latlng[0], this.latlng[1]]).addTo(mymap)
        .bindPopup(this.name.toLocaleString())
        .openPopup();
        

        let borders_div = div.querySelector(".borders");
        this.borders.forEach(async (item, i) => {
            let span = document.createElement("span");
            let comma = document.createElement("span");
            span.innerHTML = await (fullName(item));
            console.log(span.innerHTML)
            comma.innerHTML = "  "
            span.style = "color: blue; cursor: pointer; text-decoration: underline;"
            borders_div.append(span);
            borders_div.append(comma);

            span.addEventListener("click", () => {//presses on country that borders so diaplay that country
                doApi(span.innerHTML);
            })
        })

    }
}