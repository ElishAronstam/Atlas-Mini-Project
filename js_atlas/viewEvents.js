export const declareEvents = (doApi) => {
    let id_input = document.querySelector("#id_input");
    let btnSearch = document.querySelector("#btnSearch");
    let select_box = document.querySelector("#id_select_country")
    let parent = document.querySelector("#id_parent")
    
    for (let i = 1; i < 6; i++) {
        let country = document.querySelector(`#id_${i}`);
        if(i==4){
    
            country.addEventListener("click", () => {
                doApi("United Kingdom");
                select_box.style.display="none";
            })
        }
        else{
            country.addEventListener("click", () => {
                doApi(country.innerHTML);
                select_box.style.display="none";
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
    id_input.addEventListener("change",()=>{
        select_box.style.display="none";
    })
    select_box.addEventListener("click", () => {
        if (select_box.value != "0") {

            parent.innerHTML = "";
            console.log("selected: "+select_box.value)
            doApi(select_box.value);
        }
    })

}
