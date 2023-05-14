

function declareBtns(){
  let burger_btn = document.querySelector("#burger_btn");
  let nav_open = document.querySelector("#nav_open");
  let close_btn = document.querySelector("#close_btn");

  burger_btn.addEventListener("click",function(){
    //
    nav_open.style.display = "block";//opens the menu
    close_btn.style.display = "block";//opens the close
    burger_btn.style.display = "none";//closes the burger
    document.querySelector("#id_parent").style.marginTop="100px";
    document.querySelector("#id_header").style.minHeight="300px";
  })

  close_btn.addEventListener("click", function(){
      nav_open.style.display = "none";
       burger_btn.style.display = "block";
       close_btn.style.display = "none";
       document.querySelector("#id_parent").style.marginTop="8px";
       document.querySelector("#id_header").style.minHeight="81.98px";

      })
}

declareBtns();