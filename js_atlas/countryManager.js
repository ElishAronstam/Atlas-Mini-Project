
export const errorMsg=()=>{
    document.querySelector("#id_parent").innerHTML =
    `<div class="container err">
        <div class="col-12 row align-items-center text-center ">
          <h1 class="display-4  mt-5">Oops,</h1>
          <h1 class="display-4 ">Couldnt find the country you are looking for</h1>
          <h2 class="display-5 ">Please try again</h2>
        </div>
    </div>
    `
}

export const homePage=()=>{
    document.querySelector("#id_parent").innerHTML =
    `<div class="container home">
        <div class="col-12 row align-items-center text-center ">
          <h1 class="display-4  mt-5 ">Welcome to <span> My Atlas</span>,</h1>
          <h1 class="display-5 ">The place where you can search and learn about any country in the world</h1>
          <h2 class="display-5 mb-5">Enjoy!</h2>
        </div>
    </div>
    `
}
