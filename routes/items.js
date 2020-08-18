const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const extractData = ({query, filters, results}, limit) => {
  console.log('Query Response API:', query);
  let categories = (filters.length > 0) ? filters[0].values[0].path_from_root : [];
  let items = results.slice(0,limit).map(result => {
    return {
      'id': result.id,
      'title': result.title,
      'price': {
        'amount': result.price,
        'currency': result.currency_id
      },
      'picture': result.thumbnail,
      'condition': (result.condition === 'new') ? 'Nuevo' : 'Usado',
      'free_shipping': result.shipping.free_shipping,
      'seller_city': result.seller_address.state.name
    };
  });
  return {query, categories, items};
};


router.get('/', async (req, res) => {
  const query = Object.values(req.query)[0];
  const limit = (!Object.values(req.query)[1] || isNaN(parseInt(Object.values(req.query)[1]))) ? 5 : Object.values(req.query)[1];

  if(query === undefined) {
    const err = {
      msg: 'Falta la cadena de consulta para buscar los items',
      status: 400
    };
    console.error(err.msg);
    res.status(400).send(err);
  } else {
    const url = `https://api.mercadolibre.com/sites/MLA/search?q=${query}`;
    console.log('Consultando EndPoint para listar productos...');
    try {
      const fetchResult = await fetch(url);
      const result = await fetchResult.json();
      if(fetchResult.ok) {
        console.log('Productos Encontrados!');
        res.status(200).json(extractData(result, limit));
        res.end();
        return;
      }
      process.exitCode = 1;
      throw {'status': fetchResult.status, 'text': fetchResult.statusText};
    } catch(error) {
      res.status(500).json({msg:'Ha ocurrido un error listando productos',detail:error});
      console.error('Ha ocurrido un error listando productos', error);
    }
  }
});

module.exports = router;