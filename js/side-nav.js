
document.addEventListener('DOMContentLoaded', function() {
    // Get the hamburger menu icon
    const menuIcon = document.querySelector('.fa-bars');
    
    // Add click event listener to open the sidebar when hamburger icon is clicked
    if (menuIcon) {
      menuIcon.addEventListener('click', function() {
        openNav();
      });
    }
    

  });


function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }