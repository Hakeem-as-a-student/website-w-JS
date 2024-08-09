/* --------------------------------------------------Functions for payement page----------------------------------------------------------*/
let validCount=6;

//EVENTLISTNERS
window.addEventListener('load',test);//to Save the finalCost to localStorage and display on payment page
window.addEventListener('load',unlock);//disabling fields if COD is selected

document.getElementById('credit').addEventListener("click",unlock);//radiotBtn eventListner
document.getElementById('debit').addEventListener("click",unlock);//radiotBtn eventListner
document.getElementById('cod').addEventListener("click",unlock);//radiotBtn eventListner

document.getElementById('pay').addEventListener('click',pay);

function unlock(){//function for unlocking fields to enter credit details
    
    if (document.getElementById('credit').checked==false && document.getElementById('debit').checked==false){
        
        document.getElementById("cardNum").disabled=true;
        document.getElementById("exp").disabled=true;
        document.getElementById("cvv").disabled=true;
        
        
    }
    else{
        
        document.getElementById("cardNum").disabled=false;
        document.getElementById("exp").disabled=false;
        document.getElementById("cvv").disabled=false;

        document.getElementById("cardNum").required=true;
        document.getElementById("exp").required=true;
        document.getElementById("cvv").required=true;

    }
}



function test(){//saving final Cost to display on page
    let finalCostDeSerial=JSON.parse(localStorage.getItem('finalCostString'));
    document.getElementById("price").innerHTML=`${finalCostDeSerial}`;

    let currentItemDS=JSON.parse(localStorage.getItem("currentTable"));
    // console.log(currentItemDS);

    let favCountDS=JSON.parse(localStorage.getItem("favCountString"));
    // console.log(localStorage.getItem("myFavList"));
    

    let table=`<table border="1" width="800px"><thead><tr><th>Name</th><th>Qty/Kgs</th><th>Price(Rs)</th></tr></thead><tbody><tr>`;

    let lineCount=0;
    for (item in currentItemDS){
        if(lineCount<3){
            
            table+=`<td>${currentItemDS[item]}</td>`;
            lineCount+=1;

        }
        else if(lineCount==3){
            
            table+=`</tr>`;
            table+=`<tr><td>${currentItemDS[item]}</td>`;
            lineCount=1;
        }
    }
    table+=`<tr>`;
    lineCount=0;
    if(favCountDS==1){
        let favListDS=JSON.parse(localStorage.getItem("myFavList"));
        console.log("yes");

        for (item in favListDS){//displaying items in the favouriteList
            if(favListDS[item]==currentItemDS[item]){
                continue;
            }
            else{
            if (lineCount<3){
                table+=`<td>${favListDS[item]}</td>`;
                lineCount+=1;
            }
            else if(lineCount==3){
                table+=`</tr>`;
                table+=`<tr><td>${favListDS[item]}</td>`;
                lineCount=1;
            }
            }
        }
    }
    table+=`</tbody><tfoot><tr><td colspan="3"><center>Final Cost: Rs.${finalCostDeSerial}</center></td></tr></tfoot></table>`;

    //displaying items
    document.getElementById("table-container").innerHTML=table;
}

function pay(){//valdating input fields
    let dateObj=new Date();
    let year=dateObj.getFullYear();
    let month=dateObj.getMonth();
    let date=dateObj.getDate();

    if (document.getElementById("name").value==''){//validating name

        alert("Pleae Fillout Your Name");
        validCount-=1;

    }
    else if(document.getElementById("address").value==''){//validating address

        alert("Pleae Fillout Your Address");
    }

    else if(document.getElementById('phone').value.length<10 || document.getElementById("phone").value.length>10){//validating phonenumber
        alert("Pleas Fillout the Phone Number Correctly");
    }
    else if(document.getElementById("credit").checked==true || document.getElementById('debit').checked==true){
        if(document.getElementById("cardNum").value.length<16 ||document.getElementById("cardNum").value.length>16){//validating cardNumber
            alert("Please Fillout the Credit Card Number Correctly");
        }
        else if(document.getElementById("exp").value==''){//validating exp date
            alert("Please Enter the Expirtaion Date");
        }
        else if(document.getElementById("cvv").value.length<3 || document.getElementById("cvv").value.length>3){//validating CVV
            alert("Please Fillout the CVV correctly");
        }
        else{
            alert(`Thanks for your purchase! Your Order will Arrive in ${date+1}/${month}/${year} around 2:00 PM`);// displaying thanks
            window.location="order1.html";
        }
    }
    
    else{
        alert(`Thanks for your purchase! Your Order will Arrive in ${date+1}/${month}/${year} around 2:00 PM`);//displaying thanks
        window.location="order1.html";
    }
}


