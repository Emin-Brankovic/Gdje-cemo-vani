const PrikaziKategoriju=(dropdownItem)=>{
    let dugme=document.getElementById("kategorija");
    dugme.textContent=dropdownItem.textContent;
}
 const PrikaziDaljinu=(dropdownItem)=>{
    let dugme=document.getElementById("daljina");
    dugme.textContent=dropdownItem.textContent;
}
const PrikaziDaljinuModal=(dropdownItem)=>{
    let dugme=document.querySelector(".daljina-modal");
    dugme.textContent=dropdownItem.textContent;
}
const PrikaziKategorijuModal=(dropdownItem)=>{
    let dugme=document.querySelector(".kategorija-modal");
    dugme.textContent=dropdownItem.textContent;
}


const UcitajFiltere=()=>{
    let kategorije=["Jedemo","Pijemo","Mix"]
    let daljina=["Daleko","Srednje","Blizu"]
    let menuKategorija=document.querySelectorAll(".dropdown-menu-kategorija");
    let menuDaljina=document.querySelectorAll(".dropdown-menu-daljina");
    let emptyString = "";
    menuKategorija.innerHTML=" ";
    for(let i=0;i<menuDaljina.length;i++){
        menuDaljina[i].innerHTML=" ";
    }
    for(let i=0;i<menuDaljina.length;i++){
        menuKategorija[i].innerHTML=" ";
    }

    for(let i=0;i<kategorije.length;i++){
        for (let j = 0; j < menuKategorija.length; j++) {
            if(j===0){
                menuKategorija[j].innerHTML+=`
                <li><a class="dropdown-item" href="#" onclick="PrikaziKategoriju(this)">${kategorije[i]}</a></li>
                `
            }
            else{
                menuKategorija[j].innerHTML+=`
                <li><a class="dropdown-item" href="#" onclick="PrikaziKategorijuModal(this)">${kategorije[i]}</a></li>
                `
            }
        }
    }
   

    daljina.forEach(element => {
        for(let i=0;i<menuDaljina.length;i++){
            if(i===0){
                menuDaljina[i].innerHTML+=`
                <li><a class="dropdown-item" href="#" onclick="PrikaziDaljinu(this)">${element}</a></li>
                `
            }
            else{
                menuDaljina[i].innerHTML+=`
                <li><a class="dropdown-item" href="#" onclick="PrikaziDaljinuModal(this)">${element}</a></li>
                `
            }
        }
    });
    menuKategorija[0].innerHTML+=`
    <li><a class="dropdown-item" href="#" onclick="PrikaziKategoriju(this)">${emptyString}</a></li>
    `
    menuDaljina[0].innerHTML+=`
        <li><a class="dropdown-item" href="#" onclick="PrikaziDaljinu(this)">${emptyString}</a></li>
        `
}

const CiscenjePoruke=()=>{
    let emailBody=document.getElementById("email-body");
    emailBody.value=" ";
}

const OcistiModal=()=>{
    document.querySelector(".input-naziva-modal").value="";
    document.querySelector(".daljina-modal").textContent="Daljina";
    document.querySelector(".kategorija-modal").textContent="Kategorija";
}