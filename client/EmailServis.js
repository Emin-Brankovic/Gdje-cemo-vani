const PosaljiEmail=()=>
{
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
        }
    )  
    .catch((err)=>console.log(err));
}