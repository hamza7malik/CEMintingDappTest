

function switch_styles(page_style, element_style){



  if(document.querySelector(".switch_div .toggle").checked == false){
    // document.querySelector(".banner_image").src = "assets/graphics_mode/avatar.png";
    document.querySelector(".page_styles").setAttribute('href', "css/gd_styles.css");
    document.querySelector(".element_styles").setAttribute('href', "css/gd_elements.css");
    document.getElementById("switch_text").innerHTML = "View Basic Mode";

    // icons sources changed
    document.getElementById("icon_ae").src = "assets/graphics_mode/after-effects.svg";
    document.getElementById("icon_ai").src = "assets/graphics_mode/illustrator.svg";
    document.getElementById("icon_ps").src = "assets/graphics_mode/photoshop.svg";
    document.getElementById("icon_sc").src = "assets/graphics_mode/web-security.svg";
    document.getElementById("icon_wp").src = "assets/graphics_mode/wordpress.svg";



  }
  else{
      // document.querySelector(".banner_image").src = "assets/dp.png";
      document.querySelector(".page_styles").setAttribute('href', "css/styles.css");
      document.querySelector(".element_styles").setAttribute('href', "css/elements.css");
      document.getElementById("switch_text").innerHTML = "View Graphics Designers Mode";

      // icons sources changed

      document.getElementById("icon_ae").src = "assets/after-effects.svg";
      document.getElementById("icon_ai").src = "assets/illustrator.svg";
      document.getElementById("icon_ps").src = "assets/photoshop.svg";
      document.getElementById("icon_sc").src = "assets/web-security.svg";
      document.getElementById("icon_wp").src = "assets/wordpress.svg";

  }


}
