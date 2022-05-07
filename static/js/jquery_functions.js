$(document).ready(function(){

    //Animazioni comparsa delle sezioni della pagina
    $(".pos1").fadeIn().delay( 300 );  
    $(".pos2").fadeIn().delay( 300 );
    $(".pos3").fadeIn().delay( 300 );
    $(".pos4").fadeIn().delay( 300 );
    $(".jqNavbar").slideDown("slow");




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


