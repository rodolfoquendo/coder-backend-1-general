const getProducts = async(url) => {
    try{
        let response = await fetch(url);
        response = await response.json();
        Object.entries(response).forEach(element => {
            element.seller = 'Luz';
            console.log(element);
        })   
    }catch(error){
        console.error("Error::", error);
    }
}
getProducts("httpss://fakestoreapi.com/products");
getProducts("https://fakestoreapi.com/products");