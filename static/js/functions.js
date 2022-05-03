function ValidaForm(){
    if((document.registrazione.nome.value=="Nome")){
        alert("Nome non valido");
        return false;
    }
    if((document.registrazione.cognome.value=="Cognome")||(document.registrazione.cognome.value=="")){
        alert("Inserire cognome");
        return false;
    }
    if(document.registrazione.genere.value==""){
        alert("Inserire genere");
        return false;
    }
    if((document.registrazione.Telefono.value=="")||(document.registrazione.Telefono.value=="Telefono")||(document.registrazione.Telefono.value.length<10)){
        alert("Inserire numero di telefono")
        return false;
    }
    if(document.registrazione.email.value=""){
        alert("Inserire email valida");
        return false;
    }
    if(document.tipo.value==""){
        alert("Inserire tipo di appuntamento");
        return false;
    }
    
    alert("Prenotazione avvenuta con successo");
    return true;
}

function changeColor(e){
    e.style="border-radius: 20px; text-align: center ; background-color: #987654; padding-left: 6%; padding-right: 6%; padding-top: 2%; padding-bottom: 2%; color: white; box-shadow: 2px 2px 2px black";
    
}

function colorBack(e){
    e.style="border-radius: 20px; text-align: center ; background-color: #987654; padding-left: 6%; padding-right: 6%; padding-top: 2%; padding-bottom: 2%; color: white;";
}

function bigIcon(e){
    e.style.height="125px";
    e.style.width="125px" ;
    document.getElementById("space").style.height="25px";
}

function normIcon(e){
    e.style.height="100px";
    e.style.width="100px";
    document.getElementById("space").style.height="50px";
}

function controlloPW(){
    alert(document.reg.password.value);
    if(document.reg.password.value!=document.reg.password_rip.value){
        alert("le password non combaciano");
        return false;
    }
    return true;
}

function myF(){
    var name=new XMLHttpRequest();
    name.open("GET","/getUtente",false);
    name.send();
    name = name.response.slice(1,name.responseText.length-1);
    name = JSON.parse(name);
    document.getElementById("myText").innerHTML= name.nome+" "+name.cognome;
    document.getElementById("nome").innerHTML=name.nome;
    document.getElementById("cognome").innerHTML=name.cognome;
    document.getElementById("genere").innerHTML=name.genere;
    document.getElementById("telefono").innerHTML=name.telefono;
    document.getElementById("email").innerHTML=name.email;

    var pren=new XMLHttpRequest();
    pren.open("GET","/getPrenotazioni",false);
    pren.send();
    //pren = pren.response.slice(1,pren.responseText.length-1);
    pren = JSON.parse(pren.response);
    //document.getElementById("myPren").innerHTML=pren[0];
    for(i=0;i<pren.length;i++){
        document.getElementById("myPren").innerHTML=document.getElementById("myPren").innerHTML+" "+pren[i].giorno.slice(0,10)+"   "+pren[i].tipo+"   "+pren[i].ora.slice(0,5)+"   "+pren[i].sede+"<br>";
    }

}

