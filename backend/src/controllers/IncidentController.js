const connection = require('../database/connection')
//Profile controller pode ser feito aqui. Mas é recomendável ter apenas menos de 5 metódos
module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;

    const [count] = await connection('incidents').count();

    const incidents = await connection('incidents')
    .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
    .limit(5)
    .offset((page - 1) * 5)
    .select([
      'incidents.*', 
      'ongs.name', 
      'ongs.whatsapp',
      'ongs.city',
      'ongs.uf']);

    res.header('X-Total-Count', count['count(*)']); //Mostra na resposta do header da requição, o número total de ongs

    return res.json(incidents);
  },

  async create(req, res) {
    const {title, description, value} = req.body;
    const ong_id = req.headers.authorization;

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id
    }); 
    return res.json({id})
  },

  async delete(req, res){
    const {id}   = req.params;
    const ong_id = req.headers.authorization; //Verifica se o id realmente foi criado

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')//coluna ong_id
      .first();
    
    if (incident.ong_id != ong_id){
      return res.status(401).json({error: 'Operation not permitted.'});
    }

    await connection('incidents').where('id', id).delete();

    return res.status(204).send();
  }
};