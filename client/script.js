let data=[];
let clickedRowData=null;
let datum=null;

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
            <td><button id="edit-button-${i+1}" type="button" class="btn edit-dugme" data-toggle="modal" data-target="#editModal" onclick="UcitajPodatkeZaEdit(this)">Edit</button></td>
            <td><button id="delete-button-${i+1}" type="button" class="btn delete-dugme"  data-toggle="modal" data-target=".provjera-brisanja-modal" onclick="SpremiPodatkeZaDelete(this)">Delete</button></td>
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
    let email=
`Gdje=${podaci[1].textContent},
Kategorija=${podaci[2].textContent},
Daljina=${podaci[3].textContent}\n`;
    emailBody.value+=email;
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


const DodajMjesto=async ()=>{
    const daljina=document.querySelector(".daljina-modal");
    const kategorija=document.querySelector(".kategorija-modal");
    const naziv=document.querySelector(".input-naziva-modal").value;
    const mjestoToSave={
        naziv:naziv,
        kategorija:kategorija.textContent,
        daljina:daljina.textContent
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

const UcitajPodatkeZaEdit=async(dugme)=>{
    let td=document.getElementById(dugme.id).parentElement;
    clickedRowData=td.parentElement;
    let redniBroj=clickedRowData.children[0].innerHTML-1
    document.querySelector(".input-naziva-modal").value=data[redniBroj].naziv;
    document.querySelector(".daljina-modal").textContent=data[redniBroj].daljina;
    document.querySelector(".kategorija-modal").textContent=data[redniBroj].kategorija;
}

const closeModal=()=> {
    let modal = document.getElementById('editModal');
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('style', 'display: none');
    let modalBackdrop = document.getElementsByClassName('modal-backdrop');

    // Remove the backdrop
    document.body.removeChild(modalBackdrop[0]);
    
    UcitajMjesta();
}



const UpdateMjesto=async()=>{
    let redniBroj=clickedRowData.children[0].innerHTML-1;
    let mjesto=data[redniBroj];
    let emailBody=document.getElementById("email-body");

    const naziv=document.querySelector(".input-naziva-modal").value
    const daljina=document.querySelector(".daljina-modal").textContent
    const kategorija=document.querySelector(".kategorija-modal").textContent

    const mjestoZaUpdate={
        _id:mjesto._id,
        naziv: naziv,
        kategorija: kategorija,
        daljina: daljina,
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
    let redniBroj=clickedRowData.children[0].innerHTML-1;
    console.log(clickedRowData.children[0].innerHTML);
    console.log(typeof data);
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
            <td><button id="edit-button-${i+1}" type="button" class="btn edit-dugme" data-toggle="modal" data-target="#editModal" onclick="UcitajPodatkeZaEdit(this)">Edit</button></td>
            <td><button id="delete-button-${i+1}" type="button" class="btn delete-dugme"  data-toggle="modal" data-target=".provjera-brisanja-modal" onclick="SpremiPodatkeZaDelete(this)">Delete</button></td>
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
        console.log(data);
        tabela.innerHTML=" ";
        for(let i=0;i<data.length;i++){
            tabela.innerHTML+=`
            <tr id="red-tabele" class="table-active" onclick="UcitajMail(this)">
            <th id="redni-br" scope="col">${i+1}</th>
            <td>${data[i].naziv}</td>
            <td>${data[i].kategorija}</td>   
            <td>${data[i].daljina}</td>
            <td><button id="edit-button-${i+1}" type="button" class="btn edit-dugme" data-toggle="modal" data-target="#editModal" onclick="UcitajPodatkeZaEdit(this)">Edit</button></td>
            <td><button id="delete-button-${i+1}" type="button" class="btn delete-dugme"  data-toggle="modal" data-target=".provjera-brisanja-modal" onclick="SpremiPodatkeZaDelete(this)">Delete</button></td>
            </tr>
            `
        }
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


const SpremiPodatkeZaDelete=(dugme)=>{
    let td=document.getElementById(dugme.id).parentElement; 
    clickedRowData=td.parentElement;
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

const ValidacijaEmail=()=>{
    let ErrorBackgroundColor="#FE7D7D";
    let OkBackgroundColor="#DFF6D8";
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com(?=,|$)/g;
    let email=document.getElementById("to-email")
    
    if(!gmailRegex.test(email.value)){
        email.style.backgroundColor=ErrorBackgroundColor ;
        return false;
    }
    else{
        email.style.backgroundColor=OkBackgroundColor;
        return true;
    }
}