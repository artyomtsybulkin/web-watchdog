# web-watchdog
Whois and IP info low level REST API with JSON responses
### Attention! Commercial service in-use
---
This service uses commercial payable services.
1. [ipinfo.io](ipinfo.io) - On moment I created it's free for Less than 50000 requests per month.
2. [whoxy](whoxy.com) - I started on $2 per 1000 requests.
> I found no free and with capable restrictions whois service at this moment. If you know let me know about it :). Thanks.
### About
---
This simple service I created for monitoring purposes. I runing [Zabbix](https://www.zabbix.com/) as primary monitoring system. This service useful via HTTP checks and JSON preprocessing. I didn't Zabbix preprocessing there, but for discovery rules it required of course.
```javascript
output = JSON.parse(value).map(function(processed_json){
    return {
        "{#PROPERTY1}": processed_json.Property1,
        "{#PROPERTY2}": processed_json.Property2,
        "{#PROPERTY3}": processed_json.Property3
    }})
return JSON.stringify({"data": output})
```
For better understnding you can check default Zabbix Templates, for example "Template Module Windows network by Zabbix agent active".

### Configuration
---
Download and install using [GitHub CLI](https://cli.github.com/)
```bash
gh repo clone artyomtsybulkin/web-watchdog
cd web-watchdog/
npm update && npm install
```
First `config.json` file must be created in service directory. Example content below.
```json
{
    "whoxy_key": "xxxx",
    "ipinfo_key": "xxxx",
    "port": 3500
}
```
Run as service via pm2:
```bash
npm install pm2@latest -g
pm2 start index.js
```
### Example usage
---
Service status check: `curl 192.168.1.1:3500/`
```bash
[2/24/2021, 7:17:22 PM] Web watchdog listening on http://localhost:3500
```
IP Info request: `curl 192.168.1.1:3500/ipinfo/8.8.8.8`
```json
{"ip":"8.8.8.8","hostname":"dns.google","anycast":true,"city":"Mountain View","region":"California","country":"United States","loc":"37.4056,-122.0775","org":"AS15169 Google LLC","postal":"94043","timezone":"America/Los_Angeles","countryCode":"US"}
```
Whois balance request: `curl 192.168.1.1:3500/whoisbalance`
```json
{"status":1,"live_whois_balance":971,"whois_history_balance":0,"reverse_whois_balance":0}
```
Whois against domain: `curl 192.168.1.1:3500/whois/google.com`
```json
{"status":1,"domain_name":"google.com","query_time":"2021-02-24 16:23:00","whois_server":"whois.markmonitor.com","domain_registered":"yes","create_date":"1997-09-15","update_date":"2019-09-09","expiry_date":"2028-09-13","domain_registrar":{"iana_id":292,"registrar_name":"MarkMonitor, Inc.","whois_server":"whois.markmonitor.com","website_url":"http://www.markmonitor.com","email_address":"abusecomplaints@markmonitor.com","phone_number":"+1.2083895770"},"registrant_contact":{"full_name":"Google LLC","company_name":"Google LLC","state_name":"CA","country_name":"United States","country_code":"US"},"administrative_contact":{"full_name":"Google LLC","company_name":"Google LLC","state_name":"CA","country_name":"United States","country_code":"US"},"technical_contact":{"full_name":"Google LLC","company_name":"Google LLC","state_name":"CA","country_name":"United States","country_code":"US"},"name_servers":["ns1.google.com","ns2.google.com","ns3.google.com","ns4.google.com"],"domain_status":["clientDeleteProhibited","clientTransferProhibited","clientUpdateProhibited","serverDeleteProhibited","serverTransferProhibited","serverUpdateProhibited"],"query_stats":{"api_credits_charged":1,"whois_retrieval_time":4.08,"user_ip_address":"37.113.46.68"}}
```
SSL certificate info: `curl 172.16.8.5:3500/ssl/google.com`
```json
{"subjectaltname":"DNS:*.google.com, DNS:*.android.com, DNS:*.appengine.google.com, DNS:*.bdn.dev, DNS:*.cloud.google.com, DNS:*.crowdsource.google.com, DNS:*.datacompute.google.com, DNS:*.flash.android.com, DNS:*.g.co, DNS:*.gcp.gvt2.com, DNS:*.gcpcdn.gvt1.com, DNS:*.ggpht.cn, DNS:*.gkecnapps.cn, DNS:*.google-analytics.com, DNS:*.google.ca, DNS:*.google.cl, DNS:*.google.co.in, DNS:*.google.co.jp, DNS:*.google.co.uk, DNS:*.google.com.ar, DNS:*.google.com.au, DNS:*.google.com.br, DNS:*.google.com.co, DNS:*.google.com.mx, DNS:*.google.com.tr, DNS:*.google.com.vn, DNS:*.google.de, DNS:*.google.es, DNS:*.google.fr, DNS:*.google.hu, DNS:*.google.it, DNS:*.google.nl, DNS:*.google.pl, DNS:*.google.pt, DNS:*.googleadapis.com, DNS:*.googleapis.cn, DNS:*.googlecnapps.cn, DNS:*.googlecommerce.com, DNS:*.googlevideo.com, DNS:*.gstatic.cn, DNS:*.gstatic.com, DNS:*.gstaticcnapps.cn, DNS:*.gvt1.com, DNS:*.gvt2.com, DNS:*.metric.gstatic.com, DNS:*.urchin.com, DNS:*.url.google.com, DNS:*.wear.gkecnapps.cn, DNS:*.youtube-nocookie.com, DNS:*.youtube.com, DNS:*.youtubeeducation.com, DNS:*.youtubekids.com, DNS:*.yt.be, DNS:*.ytimg.com, DNS:android.clients.google.com, DNS:android.com, DNS:developer.android.google.cn, DNS:developers.android.google.cn, DNS:g.co, DNS:ggpht.cn, DNS:gkecnapps.cn, DNS:goo.gl, DNS:google-analytics.com, DNS:google.com, DNS:googlecnapps.cn, DNS:googlecommerce.com, DNS:source.android.google.cn, DNS:urchin.com, DNS:www.goo.gl, DNS:youtu.be, DNS:youtube.com, DNS:youtubeeducation.com, DNS:youtubekids.com, DNS:yt.be","asn1Curve":"prime256v1","nistCurve":"P-256","valid_from":1611651660,"valid_to":1618909259,"serialNumber":"9AA92508FA1B7FA90500000000874A26"}
```