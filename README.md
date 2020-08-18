# Mercado-Libre-Server

This project is a technical test for Job as Front End Developer in Mercado Libre Colombia.

This repository is Server Part of Main Project
> The Front End Part is located in: https://github.com/jleon253/mercado-libre-front

> This server was deploy in Heroku with public URL: https://mercado-libre-server.herokuapp.com/

### Dev tools used:
> - Express 4.17.1
> - Node-fetch 2.6.0
> - Cors 2.8.5
> - nodemon 2.0.4

### End Points:
> - **/** = Main
> - **/api/items?q=product** = Returns all products that match with the 'product' word.
> - **/api/items?q=product&limit=5** = Returns all products that match with the 'product' word. The limits products by default is 5 (if not entered), but is costumizable.
> - **/api/items/:id** = Return Detail and Description of product that match with the 'id-product' parameter.

### Response:
> - JSON Format

### Port:
> - Local: 4000 is defined (index.js file)

### API Resources For Mercado Libre Developers
http://developers.mercadolibre.com
