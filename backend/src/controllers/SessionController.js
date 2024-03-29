const connection = require('../database/connection')

module.exports = {
  async create(req, res){
    const {id} = req.body;
    
    const ong = await connection('ongs')
    .where('id', id)
    .select('name')
    .first(); //Vai retornar o valor do id da ong. Não retorna array.

    if(!ong){ //Se a ong não existir retornar erro
      return res.status(400).json({error: 'No ONG found with this ID'});
    }

    return res.json(ong);
  }
};