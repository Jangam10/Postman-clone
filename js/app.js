console.log("We are creating post master app");

function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

let parametersBox = document.getElementById("parametersBox");
parametersBox.style.display = "none";
let jsonBox = document.getElementById("jsonBox");

//In order to display the clicked radio
let jsonRadio = document.getElementById("jsonRadio");
let paramRadio = document.getElementById("paramRadio");

jsonRadio.addEventListener("click", () => {
    jsonBox.style.display = "block";
    parametersBox.style.display = "none";
})

paramRadio.addEventListener("click", () => {
    jsonBox.style.display = "none";
    parametersBox.style.display = "block";
})

let paramCount = 0;
//Adding functionality in the + button 
let addParams = document.getElementById("addParams");
addParams.addEventListener("click", () => {
    // console.log("The add button has been clicked");
    let params = document.getElementById("params");
    let string = `<div class="form-group row my-3">
    <label for="params" class="col-sm-2 col-form-label">Parameter ${paramCount + 2}</label>
    <div class="col-md-4 ">
    <input type="text" class="form-control" placeholder="Enter the key ${paramCount + 2}" id="key${paramCount + 2}">
    </div>
    <div class="col-md-4 ">
    <input type="text" class="form-control" placeholder="Enter the value ${paramCount + 2}" id="value${paramCount + 2}">
    </div>
    <button class="btn btn-primary deleteParam mx-3">-</button>
  </div>`;

    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);
    
    //Adding the functionality in the - button
    let deleteParam = document.getElementsByClassName("deleteParam");
    
    for (item of deleteParam) {
        item.addEventListener("click",(e)=>{
            e.target.parentElement.remove();
        });
    }
    paramCount++;

})

//While clicking the submit button
let submit = document.getElementById("submit");
submit.addEventListener("click",()=>{
    
    // let responseText = document.getElementById("responseText");
    document.getElementById("responsePrism").innerHTML = "Please wait....You will get to it";

    let url=document.getElementById("url").value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    console.log(url,requestType,contentType);

    if (contentType=="PARAM") {
        data={};

        for(let i = 0; i<paramCount+1 ; i++)
        {
            if (document.getElementById(`key${i+1}`) != undefined) {
                let key = document.getElementById(`key${i+1}`).value;
                let value = document.getElementById(`value${i+1}`).value;
                data[key]=value;  
            }
        }
        data= JSON.stringify(data);
    }
    else{
        data = document.getElementById("requestJSON").value;
    }

   
    if (requestType == "GET" ) {
        params = {
                 method : "GET"
        }
        fetch(url,params).then((response)=>response.text()).then((data)=>{
            document.getElementById("responsePrism").innerHTML = data;
            Prism.highlightAll();
        });
    }
    else{

        params = {
            method: 'POST',
            body: data,
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
                     }
            }

        fetch(url,params).then((response)=>response.text()).then((data)=>{    
            document.getElementById("responsePrism").innerHTML = data;
            Prism.highlightAll();
        });
    }

}); 


