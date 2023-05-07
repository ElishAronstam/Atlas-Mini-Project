export default class Country{
    constructor(item,parent,doApi,fullName){
        this.parent=parent;
        this.name=item.name.common;
        this.pop=item.population.toLocalString();
        this.region=item.region;
        this.language=object.keys(item.languages);//arr of the name of parameter in api 
        this.coinCountry=object.keys(item.currencies);
        this.coinName=object.values(item.currencies)[0].name;
        this.capital=item.capital;
        this.latlng=item.latlng;
        this.borders=item.borders;
        this.flag=item.flag.svg;
        this.doApi=doApi;
        this.fullName=fullName;

    }
    render(){
        let div=document.createElement("div");
        div.className="col-md-8 mx-auto p-4 border shadow overflow-hidden";
        document.querySelector(this.parent).append(div);
        div.innerHTML = `
        <img src="${this.flag}" alt="${this.name}" class="w-50 float-end ms-4">
        <h2>${this.name}</h2>
        <div>POP: ${this.pop} </div>
        <div>Region: ${this.region}</div>
        <div>Languages: ${this.languages}</div>
        <div>Coin:  ${this.coinCountry}, ${this.coinName}</div>
        <div>Capital: ${this.capital}</div>
        <div class="mt-3"><strong>States with borders:</strong><br>
        <div class="borders"></div>
        <div height="400" id="map"></div>
        </div>`
        let map=document.querySelector("#map");
        map=L.map('map').setView([this.latlng[0], this.latlng[1]], 13);//maybe zoom out abit

        let borders_div = div.querySelector(".borders");
        this.borders.forEach(async (item, i) => {
            let span = document.createElement("span");
            let span1 = document.createElement("span");
            span.className = "neighbor"
            span.innerHTML = await fullName(item);
            span1.innerHTML = ", "
            if (i == (this.borders.length - 1)) {
                span1.innerHTML = " ";
            }
            span.style = "color: blue; cursor: pointer; text-decoration: underline;"
            borders_div.append(span);
            borders_div.append(span1);

            span.addEventListener("click", () => {//presses on country that borders so diaplay that country
                doApi(span.innerHTML);
            })
        })

    }
}