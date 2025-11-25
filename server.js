const express = require("express")
const fetch = require("node-fetch")

const app = express()

app.get('/proxy', async (req, resp) => {
    try {
        const url = req.query.url;
        const response = await fetch (url);
        const text = await response.text();

        resp.set("Access-Control-Allow-Origin", "*")
        resp.send(text)
    }
    catch (e){
        resp.status(500).send("Erro" + e.message)
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Proxy running port " + PORT));

