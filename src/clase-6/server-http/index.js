import HTTP from "http"
const METHOD_GET = 'get',
    METHOD_POST = 'post';
const routeList = {
    METHOD_GET : {
        "/" : "index",
        "/time" : "time",
    },
    METHOD_POST: {
        "/test" : "test",
    }
};
const setResponse = (response, code,content) => {
    response.writeHead(code, { "Content-Type" : "application/json" });
    response.end(JSON.stringify(content));
};
const server = HTTP.createServer((request, response) => {
    const reqMethod = request.method,
        url = request.url
    if(typeof routeList[reqMethod] !== typeof undefined && typeof routeList[reqMethod][url] !== typeof undefined){
        for(let [method, routes] of Object.entries(routeList)){
            for(let [route, method] of Object.entries(routes)){
                if(typeof routeList[method] !== typeof undefined && typeof routeList[method][url] !== typeof undefined){
                    return setResponse(response, 405,"not found");
                }
            }
        }
        return setResponse(response, 404,"not found");
    }
    return setResponse(response, 200,routeList[reqMethod][url]);
});
server.listen(8080, ()=>{
    console.log("server started");
});