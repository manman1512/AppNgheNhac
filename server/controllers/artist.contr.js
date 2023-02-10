const artist = require('../data/artist.json')

module.exports = {
    getArtist : (req, res) =>{
        const {name} = req.params;
        try {
            const data = artist.;
            res.status(200).json(data);
          } catch (error) {
            console.log(error);
          }
    }
}
