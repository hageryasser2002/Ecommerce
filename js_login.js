
var inputname=document.getElementById("name");

inputname.addEventListener("focus",function(){

    inputname.style.border="orange 3px solid";
    inputname.style.transform="scale(1.1,1.1)"
    
})
var inputEmail=document.getElementById("email");

inputEmail.addEventListener("focus",function(){

    inputEmail.style.border="orange 3px solid";
    inputEmail.style.transform = "scale(1.1, 1.1)";

  
    
})
var inputpswd=document.getElementById("pswd");

inputpswd.addEventListener("focus",function(){

    inputpswd.style.border="orange 3px solid";
   inputpswd.style.transform="scale(1.1,1.1)"
    
})
var inputconfirmPswd=document.getElementById("pswd2");

inputconfirmPswd.addEventListener("focus",function(){

    inputconfirmPswd.style.border="orange 3px solid";
    inputconfirmPswd.style.transform="scale(1.1,1.1)"
    
})

var errorLength=document.getElementById("errorLength");
inputpswd.addEventListener("input",function(){
    if(inputpswd.value.length<3)
        {
            errorLength.style.display="block";
            return;
        }
        else{
            errorLength.style.display="none";

        }
})
function setCookie(name,value)
{

    var date=new Date();
    var expireDate=date.getTime()+3;
    document.cookie=name+"="+value+";expires="+expireDate+";";

}
function clicked(event)
{
    var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;


        if (!inputname.value || !isNaN(inputname.value)) {
            alert("Enter a valid name");
            return;
        }
     
     
    
        if (inputconfirmPswd.value !== inputpswd.value) {
            alert("Error on confirm");
            return;
        }
        if(inputpswd.value.length<3)
        {
            return;
        }
        if (!regex.test(inputEmail.value)) {
            alert("Enter a valid email");
            return;
        }
        setCookie('username', inputname.value); 

    document.getElementById("loginForm").submit();

    
}

  