$(document).ready(function(){
    

    //Homepage
    $("#navbar_barber").hide();
    $("#homepage_titolo").hide();
    $("#homepage_bottone").hide();

    $("#navbar_barber").slideDown("slow");
    $("#homepage_titolo").fadeIn(2000);
    $("#homepage_bottone").fadeIn(4000);
    
    
    /*$(window).scroll(function() {
        if ($(document).scrollTop() > 200) {
          $("#homepage_elem1").fadeIn(1000).delay(500);
          $("#homepage_elem2").fadeIn(1000).delay(500);
          $("#homepage_elem3").fadeIn(1000);
          
        }
    });*/

    
 




    //Opacità bottoni
    $("#homepage_bottone").mouseenter(function(){
        $(this).css("opacity","100%");
    });
    $("#homepage_bottone").mouseleave(function(){
        $(this).css("opacity","80%");
    });
    $(".bottone_generico").mouseenter(function(){
        $(this).css("opacity","100%");
    });
    $(".bottone_generico").mouseleave(function(){
        $(this).css("opacity","80%");
    });
    $(".bottone_login").mouseenter(function(){
        $(this).css("opacity","100%");
    });
    $(".bottone_login").mouseleave(function(){
        $(this).css("opacity","80%");
    });
});


