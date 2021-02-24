const https = require('https')
const express = require('express')
const fetch = require('node-fetch')
const node_ipinfo = require('node-ipinfo')

const config = require("./config.json")
const app = express()
const ipinfo = new node_ipinfo(config.ipinfo_key)

app.get('/', (req, res) => {
    res.send(`[${(new Date()).toLocaleString()}] Web watchdog listening on http://localhost:${config.port}`)
})

app.get('/whois/:domain', (req, res) => {
    const domain = req.params.domain
    const query = `http://api.whoxy.com/?key=${config.whoxy_key}&whois=${domain}&format=json`
    fetch(query)
        .then(res => res.text())
        .then(body => {
            let raw = JSON.parse(body)
            delete raw["raw_whois"]
            delete raw["registry_data"]
            res.send(raw)
        })
})

app.get('/whoisbalance', (req, res) => {
    const domain = req.params.domain
    const query = `http://api.whoxy.com/?key=${config.whoxy_key}&account=balance`
    fetch(query)
        .then(res => res.text())
        .then(body => {
            let raw = JSON.parse(body)
            res.send(raw)
        })
})

app.get('/ipinfo/:ip', (req, res) => {
    ipinfo.lookupIp(req.params.ip).then((response) => {
        res.send(response)
    });
})

app.get('/ssl/:domain', (req, res) => {
    const domain = req.params.domain
    https.get(`https:\/\/${domain}`, (response) => {
        let raw = response.socket.getPeerCertificate()
        delete raw["modulus"]
        delete raw["pubkey"]
        delete raw["infoAccess"]
        delete raw["fingerprint"]
        delete raw["fingerprint256"]
        delete raw["ext_key_usage"]
        delete raw["raw"]
        delete raw["subject"]
        delete raw["bits"]
        delete raw["exponent"]
        delete raw["issuer"]
        raw["valid_from"] = new Date(raw["valid_from"]).getTime()/1000
        raw["valid_to"] = new Date(raw["valid_to"]).getTime()/1000
        res.send(raw)
    });
})

app.listen(config.port, () => {
    console.log(`[${(new Date()).toLocaleString()}] Web watchdog listening on http://localhost:${config.port}`)
})
