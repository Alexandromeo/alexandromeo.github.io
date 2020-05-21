document.addEventListener("DOMContentLoaded", function() 
{
  // Activate sidebar nav
   const elems = document.querySelectorAll(".sidenav");
   M.Sidenav.init(elems);
   loadNav();
 
   function loadNav() 
   {
      let xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() 
      {
         if (this.readyState == 4) 
         {
            if (this.status != 200) return;
    
            // Muat daftar tautan menu
            document.querySelectorAll(".topnav, .sidenav").forEach((elm) => {
               elm.innerHTML = xhttp.responseText;
            });

            document.querySelector("#logo-container").addEventListener("click", () => {
              getDataBola('2001')
            })

            document.querySelectorAll(".sidenav a, .topnav a").forEach((elm) => {
               elm.addEventListener("click", (event) => {
                  // Tutup sidenav
                  let sidenav = document.querySelector(".sidenav");
                  M.Sidenav.getInstance(sidenav).close();
          
                  // Muat konten halaman yang dipanggil
                  page = elm.getAttribute("id")
                  loadPage(page);
               });
            });
         }
      };
       xhttp.open("GET", "nav.html", true);
       xhttp.send();
   }

   let loadPage = (page) => {
      let xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() 
      {   
         if (this.readyState == 4) 
         {
            let content = document.querySelector("#body-content");
            if (this.status == 200) 
            {
              content.innerHTML = this.responseText
              if(page!="saved")
                getDataBola(page)
              else
                getSaved().then(showSaved)
            }
            else if (this.status == 404)
              content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
            else 
              content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
         }
      };

      xhttp.open("GET", `pages/home.html`, true);
      xhttp.send();
   }


   //supaya data 3 klasemen dapat dimuat ke cache
   loadPage("2014");
   loadPage("2021");
   loadPage("2001");
});