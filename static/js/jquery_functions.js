$(document).ready(function(){
    
    $(".grafica_titolo").hide().fadeIn("slow");

    //Homepage
    $("#homepage_navbar").hide();
    $("#homepage_titolo").hide();
    $("#homepage_bottone").hide();

    $("#homepage_navbar").slideDown("slow");
    $("#homepage_titolo").fadeIn(2000);
    $("#homepage_bottone").fadeIn(4000);

    //Chi siamo
    $("#chisiamo_p1").hide();
    $("#chisiamo_p2").hide();
    $("#chisiamo_p3").hide();

    $("#chisiamo_p1").fadeIn(1000);
    $("#chisiamo_p2").fadeIn(2000);
    $("#chisiamo_p3").fadeIn(3000);
    
    //Prenota Appuntamento
    $(".prenota_altro").hide();
    $("#prenota_taglio1").hide();
    $("#prenota_taglio2").hide();
    $("#prenota_taglio3").hide();

    $(".prenota_altro").fadeIn("slow");
    $("#prenota_taglio1").slideDown(1000);
    $("#prenota_taglio2").slideDown(2000);
    $("#prenota_taglio3").slideDown(3000);

 




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


