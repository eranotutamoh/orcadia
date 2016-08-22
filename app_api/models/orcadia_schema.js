var mongoose = require( 'mongoose' );

var PagesSchema = new mongoose.Schema({
    pagename: {type: String, required: true},
    title: {type: String, required: true},
    notes: String,
    code: String
});

mongoose.model('Page', PagesSchema);