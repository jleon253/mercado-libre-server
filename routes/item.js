const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const extractData = ({id,title,price,currency_id,pictures,condition,shipping,available_quantity,sold_quantity}, {plain_text}) => {
  return (
    {
      id,
      title,
      'price': {
        'amount': price,
        'currency': currency_id
      },
      'pictures': pictures.map(picture => ({'id': picture.id, 'secure_url': picture.secure_url})),
      'condition': (condition === 'new') ? 'Nuevo' : 'Usado',
      'free_shipping': shipping.free_shipping,
      available_quantity,
      sold_quantity,
      'description': plain_text
    }
  );
};


router.get('/:id', async (req, res) => {
  let paramID;

  for (const key in req.params) {
    console.log('Parametro [id] de Producto:', req.params[key]);
    paramID = req.params[key];
  }

  if(paramID === undefined) {
    const err = {
      msg: 'Falta el parametro identificador para buscar el detalle del item',
      status: 400
    };
    console.error(err.msg);
    res.status(400).json(err);
  } else {
    const url1 = `https://api.mercadolibre.com/items/${paramID}`;
    const url2 = `https://api.mercadolibre.com/items/${paramID}/description`;
    console.log('Consultando EndPoint\'s para detalle de producto...');
    try {
      const promises = [fetch(url1), fetch(url2)];
      const [resDetail, resDescription] = await Promise.all(promises);
      const dataDetail = await resDetail.json();
      const dataDescription = await resDescription.json();
      if(resDetail.ok && resDescription.ok) {
        console.log('Detalle y Descripción del Producto Encontrados!');
        res.status(200).json(extractData(dataDetail,dataDescription));
        return;
      }
      process.exitCode = 1;
      throw [
        {'status Detail': resDetail.status, 'text Detail': resDetail.statusText},
        {'status Description': resDescription.status, 'text Description': resDescription.statusText}
      ];
    } catch(error) {
      res.status(500).json({msg:'Ha ocurrido un error mostrando detalles del producto',detail:error});
      console.error('Ha ocurrido un error mostrando detalles del producto', error);
    }
  }
});

module.exports = router;