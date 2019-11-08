//const CART_INFO_URL = "https://api.myjson.com/bins/aj865";
//const CART_BUY_URL = "https://api.myjson.com/bins/10ils5";


var product = {};
let canti = 0;

let productUnitCost = 0;
/*
let productCurrency = "";*/
let subtotal = 0;
let shippingPercentage = 0.15; // Porcentaje de envío 
let total = 0;
let totalCostToShow = 0;
/*
let paymentTypeSelected = false;
const CREDIT_CARD_PAYMENT = "Tarjeta de crédito";
const BANKING_PAYMENT = "Transferencia bancaria";*/
let ERROR_MSG = "Ha habido un error :(, verifica qué pasó.";



//Función que se utiliza para actualizar los costos de publicación

function totCostPerArticle() { ///*function updateSubtotal(){
    productUnitCost = article.unitCost;
    canti = parseInt(document.getElementById("productCountInput").value);

    totalCostToShow = productUnitCost * canti;

    document.getElementById('total').innerHTML = totalCostToShow;
    document.getElementById('productCostText').innerHTML = "UYU" + " " + totalCostToShow;
}



function updateTotalCosts(){
    /*let totalCostHTML = document.getElementById("totalCostText").innerHTML;*/

    let comissionToShow = Math.round(shippingPercentage * 100) + "%";
    let totCostToShow = Math.round(totalCostToShow + ((shippingPercentage * 100) * totalCostToShow) / 100);
    /*let totalCostToShow = (Math.round(productCost * shippingPercentage * 100) / 100);*/

    document.getElementById("comissionText").innerHTML = comissionToShow;
    document.getElementById("totalCostText").innerHTML = totCostToShow;
}

//hacer un arreglo de subtotales adentro del for


/*Mostrar tipo de pago no seleccionado*/
/*
function showPaymentTypeNotSelected(){

}

function hidePaymentTypeNotSelected(){

}
<td>` + article.unitCost + `&nbsp` + article.currency + `</td>
*/

function showArticles(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        article = array[i];
        
        htmlContentToAppend += `
        <tr>
            <td>
                <div class="col-lg-5">
                    <img class="img-thumbnail" src="` + article.src + `" alt="">
                </div>
            </td>
            <td>` + article.name + `</td>
            <td>` + article.currency + `&nbsp` + article.unitCost + `</td>
            <td><input type="number" name="count" id="productCountInput" value="` + article.count + `" min="1"></td>
            <td class="d-inline-block">` + article.currency + `&nbsp<div id="total" class="d-inline-block"></div></td>
        </tr>
        `
        document.getElementById("tableArticle").innerHTML = htmlContentToAppend;

        
        document.getElementById("productCountInput").addEventListener("change", function(){
            canti;
            totCostPerArticle();
            updateTotalCosts();
        });

        
    }
    totCostPerArticle();
    updateTotalCosts();
    
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === 'ok') {
            product = resultObj.data;
            showArticles(product.articles);
            
            /*document.getElementById('productCostText').innerHTML = updateSubtotal();
            document.getElementById('totalCostText').innerHTML = updateTotalCosts();*/
        }
    });
    
    document.getElementById("premiumradio").addEventListener("change", function(){
        shippingPercentage = 0.15;
        totCostPerArticle();
        updateTotalCosts();
    });

    document.getElementById("expressradio").addEventListener("change", function(){
        shippingPercentage = 0.07;
        totCostPerArticle();
        updateTotalCosts();
    });

    document.getElementById("standardradio").addEventListener("change", function(){
        shippingPercentage = 0.05;
        totCostPerArticle();
        updateTotalCosts();
    });
    
    
    //Se obtiene el formulario de dirección del cliente
    var sellForm = document.getElementById("buy-info");

    //Se agrega una escucha en el evento 'submit' que será
    //lanzado por el formulario cuando se seleccione 'Vender'.
    sellForm.addEventListener("submit", function(e){

        let streetInput = document.getElementById("streetE");
        let numberInput = document.getElementById("number");
        let cornerInput = document.getElementById("corner");
        let countrySelect = document.getElementById("country");
        let infoMissing = false;

        //Quito las clases que marcan como inválidos
        streetInput.classList.remove('is-invalid');
        numberInput.classList.remove('is-invalid');
        cornerInput.classList.remove('is-invalid');
        countrySelect.classList.remove('is-invalid');

        //Se realizan los controles necesarios,
        //En este caso se controla que se haya ingresado la dirección.
        //Consulto por el nombre del producto
        if (streetInput.value === "")
        {
            streetInput.classList.add('is-invalid');
            infoMissing = true;
        }
        
        //Consulto por la categoría del producto
        if (numberInput.value === "")
        {
            numberInput.classList.add('is-invalid');
            infoMissing = true;
        }

        //Consulto por el costo
        if (cornerInput.value === "")
        {
            cornerInput.classList.add('is-invalid');
            infoMissing = true;
        }

        //Consulto por el costo
        if (countrySelect.value === "")
        {
            countrySelect.classList.add('is-invalid');
            infoMissing = true;
        }
        
        if(!infoMissing)
        {
            //Aquí ingresa si pasó los controles, irá a enviar
            //la solicitud para crear la publicación.

            getJSONData(CART_BUY_URL).then(function(resultObj){
                let msgToShow = "";
    
                //Si la publicación fue exitosa, devolverá mensaje de éxito,
                //de lo contrario, devolverá mensaje de error.
                if (resultObj.status === 'ok')
                {
                    msgToShow = resultObj.data.msg;
                }
                else if (resultObj.status === 'error')
                {
                    msgToShow = ERROR_MSG;
                }

                bootbox.alert(msgToShow, null);
            });
        }

        //Esto se debe realizar para prevenir que el formulario se envíe (comportamiento por defecto del navegador)
        if (e.preventDefault) e.preventDefault();
            return false;
    }); 
      
    //Se obtiene el formulario de forma de pago
    var payForm = document.getElementById("pay-info");

    //Se agrega una escucha en el evento 'submit' que será
    //lanzado por el formulario cuando se seleccione 'Terminar'.
    payForm.addEventListener("submit", function(e){

        
        let cardNumberInput = document.getElementById("creditCardNumber");
        let cardSecurityInput = document.getElementById("creditCardSecurityCode");
        let dateInput = document.getElementById("dueDate");
        let bankInput = document.getElementById("bankAccountNumber");
        let infoMissing = false;

        //Quito las clases que marcan como inválidos
        cardNumberInput.classList.remove('is-invalid');
        cardSecurityInput.classList.remove('is-invalid');
        dateInput.classList.remove('is-invalid');
        bankInput.classList.remove('is-invalid');

        //Se realizan los controles necesarios,
        //En este caso se controla que se haya ingresado la dirección.
        //Consulto por el nombre del producto

        //Consulto por el costo
        if (cardNumberInput.value === "")
        {
            cardNumberInput.classList.add('is-invalid');
            infoMissing = true;
        }

        //Consulto por el costo
        if (cardSecurityInput.value === "")
        {
            cardSecurityInput.classList.add('is-invalid');
            infoMissing = true;
        }

        if (dateInput.value === "")
        {
            dateInput.classList.add('is-invalid');
            infoMissing = true;
        }

        if (bankInput.value === "")
        {
            bankInput.classList.add('is-invalid');
            infoMissing = true;
        }
        
        if(!infoMissing)
        {
            //Aquí ingresa si pasó los controles, irá a enviar
            //la solicitud para crear la publicación.
            
        }

        //Esto se debe realizar para prevenir que el formulario se envíe (comportamiento por defecto del navegador)
        if (e.preventDefault) e.preventDefault();
            return false;

    
    }); 

 
});