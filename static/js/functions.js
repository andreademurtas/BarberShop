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

function checkPass(e){
    if(document.registrazione.password.value != document.registrazione.password2.value){
        alert("le password non coincidono");
    }
}

function controlloPW(){
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

    
}

function checkInfo(e){
    var name=new XMLHttpRequest();
    name.open("GET","/getUtente",false);
    name.send();
    name = name.response.slice(1,name.responseText.length-1);
    name = JSON.parse(name);
    if(e.nome.value=="")e.nome.value=name.nome;
    if(e.cognome.value=="")e.cognome.value=name.cognome;
    if(e.genere.value=="")e.genere.value=name.genere;
    if(e.telefono.value=="")e.telefono.value=name.telefono;
    if(e.email.value=="")e.email.value=name.email;
}

function logout(){
    var x = new XMLHttpRequest();
    x.open("GET","/logout",false);
    x.send();
    window.location.replace("/profilo");
}
