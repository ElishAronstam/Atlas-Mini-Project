export const declareEvents = (doApi) => {
    let id_input = document.querySelector("#id_input")
    let btnSearch = document.querySelector("#btnSearch");
 

    for (let i = 1; i < 6; i++) {
        let country = document.querySelector(`#id_${i}`);
        if(i==4){
    
            country.addEventListener("click", () => {
                doApi("United Kingdom");
            })
        }
        else{
            country.addEventListener("click", () => {
                doApi(country.innerHTML);
            })
        }
    }

    btnSearch.addEventListener("click", () => {
        doApi(id_input.value);
    })

    id_input.addEventListener("keydown", (e) => {
        if (e.key == 'Enter')
            doApi(id_input.value);
    })
  

}
