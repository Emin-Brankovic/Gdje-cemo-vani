
let data=[];
let clickedRowData=null;
let datum=null;

// SEARCH FUNCTIONS
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
            <tr id="red-tabele" class="table-active" onclick="UcitajMail(this)">
            <th id="redni-br" scope="col">${i+1}</th>
            <td>${data[i].naziv}</td>
            <td>${data[i].kategorija}</td>   
            <td>${data[i].daljina}</td>
            <td>${AverageRating(data[i].rating)}</td>
            <td>
            <div class="dropdown">
                <!-- Dropdown trigger button -->
                <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false" onclick="ClearMailBody()">
                </button>
                <!-- Dropdown menu -->
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <li>
                    <button class="dropdown-item btn btn-danger" type="button" data-toggle="modal" data-target="#modalRate" id="rate-button-${i+1}" onclick="UcitajModalZaRate(this)">Rate</button>
                  </li>
                  <li>
                    <button class="dropdown-item btn btn-light" type="button" data-toggle="modal" data-target="#editModal" id="edit-button-${i+1}" onclick="UcitajPodatkeZaEdit(this)">Edit</button>
                  </li>
                  <li>
                    <button class="dropdown-item btn btn-light" type="button"  data-toggle="modal" data-target=".provjera-brisanja-modal" id="delete-button-${i+1}" onclick="SpremiPodatkeZaDelete(this)">Delete</button>
                  </li>
                </ul>
              </div>
        </td>
            </tr>
            `
        }
    } catch (error) {
        console.error(error);
    }
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
            <tr id="red-tabele" class="table-active" onclick="UcitajMail(this)">
            <th id="redni-br" scope="col">${i+1}</th>
            <td>${data[i].naziv}</td>
            <td>${data[i].kategorija}</td>   
            <td>${data[i].daljina}</td>
            <td>${AverageRating(data[i].rating)}</td>
            <td>
            <div class="dropdown">
                <!-- Dropdown trigger button -->
                <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false" onclick="ClearMailBody()">
                </button>
                <!-- Dropdown menu -->
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <li>
                    <button class="dropdown-item btn btn-danger" type="button" data-toggle="modal" data-target="#modalRate" id="rate-button-${i+1}" onclick="UcitajModalZaRate(this)">Rate</button>
                  </li>
                  <li>
                    <button class="dropdown-item btn btn-light" type="button" data-toggle="modal" data-target="#editModal" id="edit-button-${i+1}" onclick="UcitajPodatkeZaEdit(this)">Edit</button>
                  </li>
                  <li>
                    <button class="dropdown-item btn btn-light" type="button"  data-toggle="modal" data-target=".provjera-brisanja-modal" id="delete-button-${i+1}" onclick="SpremiPodatkeZaDelete(this)">Delete</button>
                  </li>
                </ul>
              </div>
        </td>
            </tr>
            `
        }
    } catch (error) {
        console.error(error);
    }
}

const PretraziPoNazivu=async (naziv)=>{
    let tabela=document.getElementById("tabela-mjesta");
    const url=`http://localhost:3001/mjesto/${naziv}`;
    let result;
    try {
        result=await fetch(url);
        data=await result.json();
        tabela.innerHTML=" ";
        for(let i=0;i<data.length;i++){
            tabela.innerHTML+=`
            <tr id="red-tabele" class="table-active" onclick="UcitajMail(this)">
            <th id="redni-br" scope="col">${i+1}</th>
            <td>${data[i].naziv}</td>
            <td>${data[i].kategorija}</td>   
            <td>${data[i].daljina}</td>
            <td>${AverageRating(data[i].rating)}</td>
            <td>
            <div class="dropdown">
                <!-- Dropdown trigger button -->
                <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false" onclick="ClearMailBody()">
                </button>
                <!-- Dropdown menu -->
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <li>
                    <button class="dropdown-item btn btn-danger" type="button" data-toggle="modal" data-target="#modalRate" id="rate-button-${i+1}" onclick="UcitajModalZaRate(this)">Rate</button>
                  </li>
                  <li>
                    <button class="dropdown-item btn btn-light" type="button" data-toggle="modal" data-target="#editModal" id="edit-button-${i+1}" onclick="UcitajPodatkeZaEdit(this)">Edit</button>
                  </li>
                  <li>
                    <button class="dropdown-item btn btn-light" type="button"  data-toggle="modal" data-target=".provjera-brisanja-modal" id="delete-button-${i+1}" onclick="SpremiPodatkeZaDelete(this)">Delete</button>
                  </li>
                </ul>
              </div>
        </td>
            </tr>
            `
        }
    } catch (error) {
        console.error(error);
    }
}

// CRUD FUNCTIONS
const DodajMjesto=async ()=>{
    const daljina=document.querySelector(".daljina-modal");
    const kategorija=document.querySelector(".kategorija-modal");
    const naziv=document.querySelector(".input-naziva-modal").value;
    if(daljina.textContent=='Daljina' || kategorija.textContent=='Kategorija' || !naziv){
        alert("Nisu svi podaci popunjeni za mjesto")
        return;
    }
    const mjestoToSave={
        naziv:naziv,
        kategorija:kategorija.textContent,
        daljina:daljina.textContent,
        rating:0
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
    } catch (error) {
        console.log(error)
    }
    closeModal();
}

const UpdateMjesto=async()=>{
    let redniBroj=parseInt(clickedRowData)-1;
    let mjesto=data[redniBroj];
    let nizRatingaMjesta=mjesto.rating;
    let emailBody=document.getElementById("email-body");

    const naziv=document.querySelector(".input-naziva-modal").value
    const daljina=document.querySelector(".daljina-modal").textContent
    const kategorija=document.querySelector(".kategorija-modal").textContent

    if(!isNaN(rating))
        nizRatingaMjesta.push(rating);

    const mjestoZaUpdate={
        _id:mjesto._id,
        naziv: naziv,
        kategorija: kategorija,
        daljina: daljina,
        rating:nizRatingaMjesta
    };
    const url=`http://localhost:3001/mjesto/update`;
    const config={
        method:'PUT',
        body: JSON.stringify(mjestoZaUpdate),
        headers: {
            "Content-Type": "application/json",
        }
    }
    try {
        const res=await fetch(url,config);
        const responseData = await res.text();
        console.log(responseData);
        
    } catch (error) {
        console.log(error);
    }

    clickedRowData=null;
    closeModal();
    emailBody.value=" ";
}

const DeleteMjesto=async ()=>{ 
    let redniBroj=parseInt(clickedRowData)-1;
    let IDMjesta=data[redniBroj]._id;
    let emailBody=document.getElementById("email-body");


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
    clickedRowData=null;
    emailBody.value=" ";
}


const RateMjesto=async()=>{
    let redniBroj=parseInt(clickedRowData)-1;
    let mjesto=data[redniBroj];
    console.log(mjesto);
    let rating=parseInt(document.getElementById("rating").textContent);
    let nizRatingaMjesta=mjesto.rating;
    let emailBody=document.getElementById("email-body");
    
    if(isNaN(rating)){
        alert("Rating se mora unijeti");
        return;
    }
    
    if(nizRatingaMjesta[0]==0)
        nizRatingaMjesta.pop();
    
    nizRatingaMjesta.push(rating);
    
    const mjestoZaRate={
        _id:mjesto._id,
        rating:nizRatingaMjesta
    };
    const url=`http://localhost:3001/mjesto/rate`;
    const config={
        method:'PUT',
        body: JSON.stringify(mjestoZaRate),
        headers: {
            "Content-Type": "application/json",
        }
    }
    try {
        const res=await fetch(url,config);
        const responseData = await res.text();
        console.log(responseData);
        
    } catch (error) {
        console.log(error);
    }
    
    clickedRowData=null;
    closeModal();
    emailBody.value=" ";

}

//MODAL PREP FUNCTIONS
const UcitajPodatkeZaEdit=async(dugme)=>{
    let str = dugme.id;
    let redniBroj=parseInt(str.substring(str.lastIndexOf('-') + 1))-1;
    clickedRowData=str.substring(str.lastIndexOf('-') + 1);
    document.querySelector(".input-naziva-modal").value=data[redniBroj].naziv;
    document.querySelector(".daljina-modal").textContent=data[redniBroj].daljina;
    document.querySelector(".kategorija-modal").textContent=data[redniBroj].kategorija;
}

const UcitajModalZaRate=(dugme)=>{
    //let td=document.getElementById(dugme.id).parentElement;
    let str = dugme.id;
    clickedRowData=str.substring(str.lastIndexOf('-') + 1);
}

const SpremiPodatkeZaDelete=(dugme)=>{
    // let td=document.getElementById(dugme.id).parentElement; 
    // clickedRowData=td.parentElement;
    let str = dugme.id;
    clickedRowData=str.substring(str.lastIndexOf('-') + 1);
}


// HELPER FUNCTIONS

const closeModal=()=> {
    let modal = document.getElementById('editModal');
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('style', 'display: none');
    let modalBackdrop = document.getElementsByClassName('modal-backdrop');

    // Remove the backdrop
    document.body.removeChild(modalBackdrop[0]);
    
    let naziv=document.getElementById("naziv-filter").value
    let kategorija=document.getElementById("kategorija").textContent
    let daljina=document.getElementById("daljina").textContent
        
    if(daljina || kategorija)
        Pretrazi()
    else if(naziv)
        PretraziPoNazivu(naziv)
    else
    UcitajMjesta()
}


const AverageRating=(niz)=>{
    let zbir=0;
    let prosjek;
    for (let index = 0; index < niz.length; index++) {
        zbir += niz[index];
    }  
    prosjek=zbir/ niz.length;
    return prosjek.toFixed(1);
}


const Ucitavanje=()=>{UcitajFiltere(),UcitajMjesta()};

const Pretraga=()=>{
    let naziv=document.getElementById("naziv-filter").value;
    if(naziv.length===0)
        Pretrazi();
    else
        PretraziPoNazivu(naziv);
}


const Spasi=()=>
{
    if(clickedRowData===null){
        DodajMjesto();
        console.log("Dodaj mjesto");
        UcitajMjesta();
    }
    else{
       UpdateMjesto();
       console.log("Update mjesto");
       UcitajMjesta();
    }
}

// EMAIL FUNCTIONS

const UcitajMail=(red)=>{
    let emailBody=document.getElementById("email-body");
    let podaci=red.children;
    let email=
`Gdje=${podaci[1].textContent},
Kategorija=${podaci[2].textContent},
Daljina=${podaci[3].textContent},
Koliko valja=${podaci[4].textContent}\n`;
    emailBody.value+=email;

}

const ValidacijaEmail=()=>{
    let ErrorBackgroundColor="#FE7D7D";
    let OkBackgroundColor="#DFF6D8";
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com(?=,|$)/g;
    let email=document.getElementById("to-email")
    
    if(!gmailRegex.test(email.value)){
        email.style.backgroundColor=ErrorBackgroundColor ;
        if(email.value.length == 0){
           email.style.backgroundColor='white'
       }
        return false;
    }
    else{
        email.style.backgroundColor=OkBackgroundColor;
        return true;
    }
}

const ClearMailBody=()=>{
    let emailBody=document.getElementById("email-body");
    emailBody.value=" ";
}

const DodajDatum=()=>{
    let odabraniDatum=document.getElementById("dan-izlaska").value;
    if(!odabraniDatum)
        return
    else if(odabraniDatum===datum)
        return;
    let tekst=`Kada: ${odabraniDatum}\n`;
    let emailBody=document.getElementById("email-body");
    emailBody.value+=tekst;
    datum=odabraniDatum;
}
