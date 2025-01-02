const getUser = new Promise((resolve,reject) => {
    if(true){
        resolve('Hola');
    }else{
        reject('Adios');
    }
});

getUser
    .then(response => console.log(response))
    .catch(error => console.error(error));


const getUserFunction = (url) => new Promise((resolve,reject) => {
    if(true){
        resolve(`url ${url}`);
    }else{
        reject('Adios');
    }
});
getUserFunction('asd')
    .then(response => console.log(response))
    .catch(error => console.error(error));


fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(data => data.map(element => {
        element.seller = "Luz";
        console.log(element)
    }))
    .catch(error => console.error(error))