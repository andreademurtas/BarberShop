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
