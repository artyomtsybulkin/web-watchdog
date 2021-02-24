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
First `config.json` file must be created in service directory. Example content below.
```json
{
    "whoxy_key": "xxxx",
    "ipinfo_key": "xxxx",
    "port": 3500
}
```
### Example usage
---
#### Service status check: `curl 192.168.1.1:3500/`
```bash
[2/24/2021, 7:17:22 PM] Web watchdog listening on http://localhost:3500
```
#### IP Info request: `curl 192.168.1.1:3500/ipinfo/8.8.8.8`
```json
{"ip":"8.8.8.8","hostname":"dns.google","anycast":true,"city":"Mountain View","region":"California","country":"United States","loc":"37.4056,-122.0775","org":"AS15169 Google LLC","postal":"94043","timezone":"America/Los_Angeles","countryCode":"US"}
```
#### Whois balance request: `curl 192.168.1.1:3500/whoisbalance`
```json
{"status":1,"live_whois_balance":971,"whois_history_balance":0,"reverse_whois_balance":0}
```
#### Whois against domain: `curl 192.168.1.1:3500/whois/google.com`
```json
{"status":1,"domain_name":"google.com","query_time":"2021-02-24 16:23:00","whois_server":"whois.markmonitor.com","domain_registered":"yes","create_date":"1997-09-15","update_date":"2019-09-09","expiry_date":"2028-09-13","domain_registrar":{"iana_id":292,"registrar_name":"MarkMonitor, Inc.","whois_server":"whois.markmonitor.com","website_url":"http://www.markmonitor.com","email_address":"abusecomplaints@markmonitor.com","phone_number":"+1.2083895770"},"registrant_contact":{"full_name":"Google LLC","company_name":"Google LLC","state_name":"CA","country_name":"United States","country_code":"US"},"administrative_contact":{"full_name":"Google LLC","company_name":"Google LLC","state_name":"CA","country_name":"United States","country_code":"US"},"technical_contact":{"full_name":"Google LLC","company_name":"Google LLC","state_name":"CA","country_name":"United States","country_code":"US"},"name_servers":["ns1.google.com","ns2.google.com","ns3.google.com","ns4.google.com"],"domain_status":["clientDeleteProhibited","clientTransferProhibited","clientUpdateProhibited","serverDeleteProhibited","serverTransferProhibited","serverUpdateProhibited"],"query_stats":{"api_credits_charged":1,"whois_retrieval_time":4.08,"user_ip_address":"37.113.46.68"}}
```