

async function response_api(url){
    const base_proxy = "http://localhost:3000/proxy?url=";
    
    const response = await fetch(base_proxy + encodeURIComponent(url));
    const text = await response.text();
    return text;
}




function scrap(html, f){
   let parser = new DOMParser()

   let doc = parser.parseFromString(html, "text/html")
   
   let clients = [...doc.querySelectorAll("#client h3")]

   let sum_clients = clients.reduce((acc, el) => acc + f(el), 0 )

   return sum_clients
}

function scrap_console_log(html, f){
   let parser = new DOMParser()

   let doc = parser.parseFromString(html, "text/html")
   
   let clients = [...doc.querySelectorAll("#client h3")]
   let sum_clients = clients.reduce((acc, el) => acc + f(el), 0 )
   
   clients.forEach( c => console.log(c))
   console.log("Quantidade de clientes de meta sistemas e igual a: " + sum_clients)
}

function insert_html(any, f, target = document.body){
    // transforma valor recebido (numero, array, objeto, string em algo palpavel no HTML)  
    const html = f(any)

    const div = document.createElement("div")
    div.innerHTML = html


    //insere no body atual
    target.appendChild(div)
    
}



async function main (){
    const html = await response_api("https://www.metasistemas.com.br/")
    scrap_console_log(html, f = el => 1)
    return_scrapping = scrap(html, f = el => 1)
    insert_html(return_scrapping, x => `<p> ${x}<p>` )
}


main();
