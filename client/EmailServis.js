const PosaljiEmail=()=>
{
    let datum=document.getElementById("dan-izlaska").value;
    let from=document.getElementById("from-ime").value
    let email=document.getElementById("email-body").value
    let to=document.getElementById("to-email").value;
    if(!datum || !from || !email || !to){
        alert("Nisu uneseni svi podaci za slanje email-a");
        return;
    }

    const params=
    {
        sendername:document.getElementById("from-ime").value,
        recipientemail:document.getElementById("to-email").value,
        message:document.getElementById("email-body").value
    };
    const serviceID="service_yyhkzwg";
    const templateID="template_rqhi87t"

    emailjs.send(serviceID,templateID,params)
    .then(
        res=>{
            document.getElementById("from-ime").value=" ";
            document.getElementById("to-email").value=" ";
            document.getElementById("email-body").value=" ";
            document.getElementById("dan-izlaska").value=" ";
            alert("Uspjeh")
            setTimeout(() => {
                location.reload();
            }, 2000);
        }
    )  
    .catch((err)=>console.log(err));
}