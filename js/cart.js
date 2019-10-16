//const CART_INFO_URL = "https://api.myjson.com/bins/aj865";


var product = {};
let canti = 0;

let productUnitCost = 0;
/*
let productCurrency = "";*/
let subtotal = 0;
let shippingPercentage = 0.15; // Porcentaje de envío 
let total = 0;
/*
let paymentTypeSelected = false;
const CREDIT_CARD_PAYMENT = "Tarjeta de crédito";
const BANKING_PAYMENT = "Transferencia bancaria";
let ERROR_MSG = "Ha habido un error :(, verifica qué pasó.";
*/


//Función que se utiliza para actualizar los costos de publicación

function totCostPerArticle() {
    let totalPerArticle = document.getElementById("total");
    productUnitCost = article.unitCost;
    canti = parseInt(document.getElementById("productCountInput").value);

    let totalCostToShow = productUnitCost * canti;
    
    totalPerArticle.innerHTML = totalCostToShow;
    return totalCostToShow;
}

/*function updateSubtotal(){ //Todavia no esta

    //while(totCostPerArticle() < array.length) {
        subtotal = totCostPerArticle(); 
    //}
    return subtotal;
     
}



function updateTotalCosts(){
    total = subtotal + (subtotal * shippingPercentage);
    return total;
    //shippingPercentage0,15 15%- x
    //1,00 100%- subtotal
}*/

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
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Imágen ilustrativa</th>
                    <th scope="col">Artículo</th>
                    <th scope="col">Precio unitario</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Costo total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <div class="col-lg-3 col-md-4 col-6">
                            <div class="d-block mb-4 h-100">
                                <img class="img-fluid img-thumbnail" src="` + article.src + `" alt="">
                            </div>
                        </div>
                    </td>
                    <td>` + article.name + `</td>
                    <td>` + article.currency + `&nbsp` + article.unitCost + `</td>
                    <td><input type="number" name="count" id="productCountInput" value="` + article.count + `" min="1"></td>
                    <td class="d-inline-block">` + article.currency + `&nbsp<div id="total" class="d-inline-block"></div></td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col">Subtotal</th>
                    <th scope="col"></th>
                </tr>
            </tfoot>
        </table>
            
        `
        document.getElementById("tableArticle").innerHTML = htmlContentToAppend;
    }
    
    
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === 'ok') {
            product = resultObj.data;
            showArticles(product.articles);
            
            document.getElementById("productCountInput").addEventListener("change", function(){
                canti = this.value;
                totCostPerArticle()
            });

            document.getElementById('total').innerHTML = totCostPerArticle();

            /*document.getElementById('productCostText').innerHTML = updateSubtotal();
            document.getElementById('totalCostText').innerHTML = updateTotalCosts();*/
        }
    });
    
    

});

