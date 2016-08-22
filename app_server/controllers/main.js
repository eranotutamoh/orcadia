/* GET home page */
module.exports.index = function(req, res){
    res.render('index', { title: 'Expresso Mundo!' });
};

module.exports.orcadia_template = function(req, res){
    res.render('layout', { title: 'Orcadia' });
};