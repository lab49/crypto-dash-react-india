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