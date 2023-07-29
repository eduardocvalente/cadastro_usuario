const ValidaSequenciaColchetes = require('../models/ColcheteModel');

exports.index = (req, res) => {
    res.render('colchete');
}

exports.validColchete = (req, res)=>{
 const validador = new ValidaSequenciaColchetes(req.body.colchete);
 validador.isValid();

 if (validador.errors.length > 0) {
    req.flash('errors', validador.errors);
    req.session.save(function () {
        return res.redirect('/colchete/index');
    });
    return;
}
req.flash('success', 'Sequência válida: colchetes de fechamento correspondem aos colchetes de abertura.');
return res.redirect('/colchete/index');
}