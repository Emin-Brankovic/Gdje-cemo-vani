let data;
let clickedRowData;

const PrikaziKategoriju=(dropdownItem)=>{
    let dugme=document.getElementById("kategorija");
    dugme.textContent=dropdownItem.textContent;
}
 const PrikaziDaljinu=(dropdownItem)=>{
    let dugme=document.getElementById("daljina");
    dugme.textContent=dropdownItem.textContent;
}
const PrikaziDaljinuModal=(dropdownItem)=>{
    let dugme=document.getElementById("daljina-modal");
    dugme.textContent=dropdownItem.textContent;
}
const PrikaziKategorijuModal=(dropdownItem)=>{
    let dugme=document.getElementById("kategorija-modal");
    dugme.textContent=dropdownItem.textContent;
}

const PrikaziRatingModal=(dropdownItem)=>{
    let dugme=document.getElementById("rating");
    dugme.textContent=dropdownItem.textContent;
}


const UcitajMjesta=async()=>{
    let url=`http://localhost:3001/mjesto?daljina=&kategorija=`;
    let tabela=document.getElementById("tabela-mjesta");
    let result=[];
    try {
        result=await fetch(url);
        data=await result.json();
        tabela.innerHTML=" ";
        for(let i=0;i<data.length;i++){
            tabela.innerHTML+=`
            <tr class="table-active" onclick="UcitajMail(this)">
            <th id="redni-br" scope="col">${i+1}</th>
            <td>${data[i].naziv}</td>
            <td>${data[i].kategorija}</td>   
            <td>${data[i].daljina}</td>
            <td>${AverageRating(data[i].rating)}</td>
            <td><button id="edit-button-${i+1}" type="button" class="btn btn-warning" data-toggle="modal" data-target="#editModal" onclick="UcitajPodatkeZaEdit(this)">Edit</button></td>
            <td><button id="delete-button-${i+1}" type="button" class="btn btn-danger"  data-toggle="modal" data-target=".provjera-brisanja-modal" onclick="SpremiPodatkeZaDelete(this)">Delete</button></td>
            </tr>
            `
        }
    } catch (error) {
        console.error(error);
    }
}

const UcitajMail=(red)=>{
    let emailBody=document.getElementById("email-body");
    let podaci=red.children;
    clickedRowData=red.children;
    let email=`Gdje=${podaci[1].textContent},
    Kategorija=${podaci[2].textContent},
    Daljina=${podaci[3].textContent},
    Koliko valja=${podaci[4].textContent}
    `;
    emailBody.value+=email;
}

const DodajDatum=()=>{
    let datum=document.getElementById("dan-izlaska").value;
    let tekst=`Kada: ${datum}`;
    let emailBody=document.getElementById("email-body");
    emailBody.value+=tekst;
}

const UcitajPodatkeZaEdit=async(dugme)=>{
    let td=document.getElementById(dugme.id).parentElement;
    let red=td.parentElement;
    clickedRowData=td.parentElement;
    let redniBroj=red.children[0].innerHTML-1
    document.querySelector(".input-naziva-modal").value=data[redniBroj].naziv;
    document.getElementById("daljina-modal").textContent=data[redniBroj].daljina;
    document.getElementById("kategorija-modal").textContent=data[redniBroj].kategorija;
}

const DodajMjesto=async ()=>{
    const rating=parseInt(document.getElementById("rating").textContent);
    let nizRatinga=[rating];
    const daljina=document.getElementById("daljina-modal");
    const kategorija=document.getElementById("kategorija-modal");
    const naziv=document.querySelector(".input-naziva-modal").value;
    console.log(naziv);
    const mjestoToSave={
        naziv:naziv,
        kategorija:kategorija.textContent,
        daljina:daljina.textContent,
        rating:nizRatinga
    };
    const mjestoJSON = JSON.stringify(mjestoToSave);
    const url=`http://localhost:3001/mjesto/create`;
    const config={
        method:'POST',
        body: mjestoJSON,
        headers: {
            "Content-Type": "application/json",
        }
    }
    try {
        const response=await fetch(url,config);
        const data=await response.json();
        console.log(data);
    } catch (error) {
        console.log(error)
    }
}

const UpdateMjesto=async(dugme)=>{
   // let td=document.getElementById(dugme.id).parentElement;
    //let red=td.parentElement;
    let redniBroj=clickedRowData[0].innerHTML-1;
    const naziv=document.querySelector(".input-naziva-modal").value
    const daljina=document.getElementById("daljina-modal").textContent
    const kategorija=document.getElementById("kategorija-modal").textContent
    let mjesto=data[redniBroj];
    console.log(mjesto);
}


const DeleteMjesto=async ()=>{ 
    console.log(clickedRowData[0].innerHTML);
    let redniBroj=clickedRowData[0].innerHTML-1;
    let IDMjesta=data[redniBroj]._id;
    
    const url=`http://localhost:3001/mjesto/delete/${IDMjesta}`;
    const config={
        method:'DELETE',
        headers: {
            "Content-Type": "application/json",
        }
    }
    try {
        const response=await fetch(url,config)
        const data=await response.json();
        console.log(data);
        UcitajMjesta();
    } catch (error) {
        console.log(error);
    }
}

const AverageRating=(niz)=>{
    let zbir=0;
    let prosjek;
    for (let index = 0; index < niz.length; index++) {
        zbir += niz[index];
    }
    prosjek=zbir/ niz.length
    return prosjek.toFixed(1);
}

const Pretrazi=async ()=>{
    let tabela=document.getElementById("tabela-mjesta");
    let kategorija=document.getElementById("kategorija");
    let daljina=document.getElementById("daljina");
    let result=[];
    const url=`http://localhost:3001/mjesto?daljina=${daljina.innerHTML}&kategorija=${kategorija.innerHTML}`;
    try {
        result=await fetch(url);
        data=await result.json();
        tabela.innerHTML=" ";
        for(let i=0;i<data.length;i++){
            tabela.innerHTML+=`
            <tr class="table-active" onclick="UcitajMail(this)">
                <th id="redni-br" scope="col">${i+1}</th>
                <td>${data[i].naziv}</td>
                <td>${data[i].kategorija}</td>   
                <td>${data[i].daljina}</td>
                <td>${AverageRating(data[i].rating)}</td>
                <td><button id="edit-button-${i+1}" type="button" class="btn btn-warning" data-toggle="modal" data-target="#editModal" onclick="UcitajPodatkeZaEdit(this)">Edit</button></td>
                <td><button id="delete-button-${i+1}" type="button" class="btn btn-danger" onclick="DeleteMjesto(this)">Delete</button></td>
             </tr>
            `
        }
    } catch (error) {
        console.error(error);
    }
}

const UcitajFiltere=()=>{
    let kategorije=["Jedemo","Pijemo","Mix","Šetnja"," 'Kafa' "]
    let daljina=["Daleko","Srednja žalost","Blizu"]
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


const PretraziPoNazivu=async (naziv)=>{
    let tabela=document.getElementById("tabela-mjesta");
    const url=`http://localhost:3001/mjesto/${naziv}`;
    let result;
    try {
        result=await fetch(url);
        const data=await result.json();
        tabela.innerHTML=" ";
        tabela.innerHTML+=`
        <tr class="table-active">
        <th scope="col">${1}</th>
        <td>${data.naziv}</td>
        <td>${data.kategorija}</td>   
        <td>${data.daljina}</td>
        <td><button type="button" class="btn btn-warning">Edit</button></td>
        <td><button type="button" class="btn btn-danger">Delete</button></td>
        </tr>
        `
    } catch (error) {
        console.error(error);
    }
}

const Ucitavanje=()=>{UcitajFiltere(),UcitajMjesta()};
const Pretraga=()=>{
    let naziv=document.getElementById("naziv-filter").value;
    if(naziv.length===0)
        Pretrazi();
    else
        PretraziPoNazivu(naziv);
}

const OcistiModal=()=>{
    document.querySelector(".input-naziva-modal").value="";
    document.getElementById("daljina-modal").textContent="Daljina";
    document.getElementById("kategorija-modal").textContent="Kategorija";
}

const SpremiPodatkeZaDelete=(dugme)=>{
    let td=document.getElementById(dugme.id).parentElement; 
    clickedRowData=td.parentElement;
}