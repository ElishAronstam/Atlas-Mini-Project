
export default class Country {
    constructor(item, parent, doApi, fullName) {
        this.parent = parent;
        this.name = item.name.common;
        this.pop = item.population.toLocaleString();
        this.region = item.region;
        this.languages = item.languages ? Object.values(item.languages).join(',') : "none";
        this.area=item.area;
        this.coinCountry = Object.keys(item.currencies);
        this.coinName = Object.values(item.currencies)[0].name;
        this.capital = item.capital;
        this.latlng = item.latlng;
        this.borders = item.borders?item.borders:"none";
        this.flag = item.flags.svg;
        this.doApi = doApi;
        this.fullName = fullName;
        

    }
    async render(fullName, doApi) {
        let div = document.createElement("div");
        div.className = "singleCont col-md-8 mx-auto p-4 overflow-hidden bg-white";
        document.querySelector(this.parent).append(div);
        div.innerHTML += `
        <div class="col-6 float-end ms-4" style="width:250;height:250">
          <img src="${this.flag}" alt="${this.name}" style="width:100%;height:100%">
        </div>
        <h2>${this.name}</h2>
        <div>Population: ${this.pop} </div>
        <div>Region: ${this.region}</div>
        <div>Languages: ${this.languages}</div>
        <div>Coin:  ${this.coinCountry}, ${this.coinName}</div>
        <div>Capital: ${this.capital}</div>
        <div class="mt-3"><strong>States with borders:</strong><br>
        <div class="borders"></div>
        <div class="container my-5 mx-auto" id="map"></div>
        </div>`
        console.log(this.latlng)
        let zoomLevel=0;
        if(this.area>30000){
            zoomLevel=4;
        } else{
            zoomLevel=6;
        }
      
        let mymap = L.map('map').setView([this.latlng[0], this.latlng[1]], zoomLevel);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            preferCanvas: true,
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(mymap);

        L.marker([this.latlng[0], this.latlng[1]]).addTo(mymap)
        .bindPopup(this.name.toLocaleString())
        .openPopup();


        let borders_div = div.querySelector(".borders");
        if(this.borders!="none"){
            this.borders.sort();
            console.log(this.borders)
            for(let i=0;i<this.borders.length;i++){
            let span = document.createElement("span");
            let space = document.createElement("span");
            let full = await (fullName(this.borders[i]));
        
            span.innerHTML=full;
            if(i<(this.borders.length-1)){
                space.innerHTML = ", "
            } else{
                space.innerHTML=".";
            }
           
            span.style = "color: blue; cursor: pointer; text-decoration: underline;"
            borders_div.append(span);
            borders_div.append(space);

            span.addEventListener("click", () => {//presses on country that borders so diaplay that country
                doApi(span.innerHTML);
            })
          }
      } else{
        borders_div.append("No borders")
      }

    }
}