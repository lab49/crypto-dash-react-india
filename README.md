# crypto-dashboard-ui-
crypto-dashboard-ui 


Crypto currency app, we can build screen like -   


	
Name of the currency
	
 Its price - we will do streaming for price not static one.
	
Movement from yesterday - Dynamic as price is moving.
	
Graph showing that currency's performance over time -  We need Api that provide this data
	
Buy Button
	
Last list of confirmed trades. Blotter that showing real time status of trade lifecycle. We can mock this.


# Getting Started

First, install all the dependencies and then run the development server:

```bash
npm i
npm run dev
```

Open [http://localhost:3000/](http://localhost:3000/) in the web browser to see the result

# Openfin Integaration

Install openfin-cli
```bash
npm install -g openfin-cli
```

Docs:

* Openfin cli: https://developers.openfin.co/of-docs/docs/openfin-cli-tool
* Openfin JS API Doc: https://cdn.openfin.co/docs/javascript/stable/index.html
* Openfin Docs: https://developers.openfin.co/of-docs/docs/what-is-openfin
* Openfin Notification: https://developers.openfin.co/of-docs/docs/overview-notifications

To launch an application via command line use below command:
```bash
openfin --launch --url http://localhost:3000
```

npm script to run the application
```bash
npm run openfin
```


----

## How to use local mock APIs

1. APIMocker is used to mock APIs. API response is served as a static file stored. 
2. Static files are present at location apiMocker/mocks.json. 
3. First install api mocker using below npm command
```
sudo npm install -g apimocker
```
4. Change location of mock files at apiMocker/config.json line number 3 like this -
```
   "mockDirectory": "~/project/ReactConf/crypto-dashboard-ui/apiMocker/mocks",
```
5. Run api mocker - make sure path to apiMocker is correct.

```
cd <crypto-dashboard-ui>
node /usr/local/lib/node_modules/apimocker/bin/apimocker -c ./apiMocker/config.json
```
Expected console logs like 
```
crypto-dashboard-ui % node /usr/local/lib/node_modules/apimocker/bin/apimocker -c ./apiMocker/config.json
[apimocker] Loading config file: /Users/amandeeprehal/project/ReactConf/crypto-dashboard-ui/apiMocker/config.json
[apimocker] Set route: GET assets : allCurrencies.json 5 ms
[apimocker] Set route: GET assets/:currencyName/ : <no mockFile> 20 ms
[apimocker]  with switch on param: currencyName
[apimocker] Set route: GET assets/:currencyName/history : <no mockFile> 20 ms
[apimocker]  with switch on param: currencyName
[apimocker] Mock server listening on port 7878

```

6. Comment coincap api and uncomment local api in file config.js - 
```

 COINCAP_URL: 'https://api.coincap.io/v2'
 //COINCAP_URL: 'http://localhost:7878'

```
6. Finally run 
```
npm run dev
```