//const PRODUCTS_URL = "https://api.myjson.com/bins/eijkr";

const ORDER_ASC_BY_PROD_COST = "ZA";
const ORDER_DESC_BY_PROD_COST = "Cant.";
var currentCategoriesArray = [];
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PROD_COST){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.cost); //parseInt(string, base); 
            let bCount = parseInt(b.cost); //Convierte (parsea) un argumento de tipo cadena y devuelve un entero de la base especificada.

            if ( aCount < bCount ){ return -1; }
            if ( aCount > bCount ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PROD_COST){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.cost); 
            let bCount = parseInt(b.cost); 

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;

}
//ordena la lista de productos

function showProductsList(array){
    
    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let category = currentProductsArray[i];

        if (((minCost == undefined) || (minCost != undefined && parseInt(category.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(category.cost) <= maxCost))){

            htmlContentToAppend += `
            <div class="col-xs-12 col-sm-6 col-md-4">
                <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
                    <img src="` + category.imgSrc + `" alt="" class="bd-placeholder-img card-img-top">
                    <h3 class="m-3">`+ category.name +`</h3>
                    <div class="card-body">
                    <small class="text-muted">` + category.soldCount + ` artículos</small>
                    <p class="card-text">` + category.description + `</p>
                    <p>`+ category.cost + `&nbsp` + category.currency + `</p>
                    </div>
                </a>
            </div>
            `
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }

}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    showProductsList();
}
//Muestra la lista de productos

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_PROD_COST, resultObj.data);
        }
    });

    document.getElementById("sortByCostAscender").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PROD_COST);
    });

    document.getElementById("sortByCostDescender").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PROD_COST);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCost") .addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
            minCost = parseInt(minCost);
        }
        else{
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
            maxCost = parseInt(maxCost);
        }
        else{
            maxCost = undefined;
        }

        showProductsList();
    });
});
