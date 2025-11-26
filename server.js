const express = require("express")
const fetch = require("node-fetch")

const app = express()

app.use(express.static("public"))

app.get('/proxy', async (req, resp) => {
    try {
        const url = req.query.url;
        const response = await fetch(url, {
            headers: {
                "User-Agent":
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
                "Accept": "text/html"
            }
        });

        const text = await response.text();

        resp.set("Access-Control-Allow-Origin", "*")
        resp.send(text)
    }
    catch (e){
        resp.status(500).send("Erro: " + e.message)
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Proxy running port " + PORT));
