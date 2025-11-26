
async function response_api(url){
    const base_proxy = "http://localhost:3000/proxy?url=";
    
    const response = await fetch(base_proxy + encodeURIComponent(url));
    const text = await response.text();
    return text;
}




function scrap_sum_clientes(html, f){
   let parser = new DOMParser()

   let doc = parser.parseFromString(html, "text/html")
   
   let clients = [...doc.querySelectorAll("#client h3")]

   let sum_clients = clients.reduce((acc, el) => acc + f(el), 0 )

   return sum_clients
}

function scrap_each_client(html) {
let parser = new DOMParser()

let doc = parser.parseFromString(html, "text/html")

let elems = doc.querySelectorAll("#client h3")

    if(elems.length == 0){
        console.warn("Nenhum <h3> dentro do #client foi encontrado")
        return []
    }

    return [...elems].map(e => e.textContent.trim())

}

// função que insere elementos html com base no tipo
function insert_html(any, f, target = document.body){
    const div = document.createElement("div")

    if (typeof any === 'function'){
        any = any()
    }

    //se vier como html, já coloca diretamente
    if (any instanceof HTMLElement){
        div.appendChild(any)
        target.appendChild(div)
        return;
    }


    //se vier como nodeList, spread, insere na div
    if (any instanceof NodeList){
        [...any].forEach(el => div.appendChild(el))
        target.appendChild(div)
        return;
    }


    if (Array.isArray(any)){
        any.forEach(item => {
            const html_element = f(item)
            const p = document.createElement("div")
            p.innerHTML = html_element
            div.appendChild(p)
        })
    

        target.appendChild(div)
        return;
    }

    //se for object
    if (typeof any === 'object' && any != null){
        const html_element = f(any)
        div.innerHTML = html_element
        target.appendChild(div)
        return
    }
    

    //se for o restante de typeof (number, string, boolean)
    const html = f(any)
    div.innerHTML = html
    target.appendChild(div)
    
    
}



async function main (){
    const html = await response_api("https://www.metasistemas.com.br/")
    return_sum = scrap_sum_clientes(html, f = el => 1)
    return_clients = scrap_each_client(html)
    insert_html("Clientes Meta Sistemas", text => `<h1> ${text} </h1>`)
    insert_html (return_clients, client => `<p> ${client} <p>` )
    insert_html(return_sum, sum => `<p>A Quantidade de clientes é: ${sum}<p>` )
}


main();
