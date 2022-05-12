$(document).ready(function(){
    

    //Homepage
    $("#homepage_navbar").hide();
    $("#homepage_titolo").hide();
    $("#homepage_bottone").hide();

    $("#homepage_navbar").slideDown("slow");
    $("#homepage_titolo").fadeIn(2000);
    $("#homepage_bottone").fadeIn(4000);

    //Chi siamo
    $("#chisiamo_titolo").hide();
    $("#chisiamo_p1").hide();
    $("#chisiamo_p2").hide();
    $("#chisiamo_p3").hide();


    $("#chisiamo_titolo").slideDown("slow");
    $("#chisiamo_p1").fadeIn(1000);
    $("#chisiamo_p2").fadeIn(2000);
    $("#chisiamo_p3").fadeIn(3000);
    
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


