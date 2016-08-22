var mongoose = require('mongoose');
var Model = mongoose.model('Page');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.pages = function (req, res) {
    Model.find()
        .exec(function (err, page) {
            if (!page) {
                sendJsonResponse(res, 404, {"message": "pages not found"});
                return;
            }
            else if (err) {
                sendJsonResponse(res, 404, err);
                return;
            }
            sendJsonResponse(res, 200, page);
        });
};

module.exports.getPage = function (req, res) {
    if (req.params && req.params.pageId) {
        Model.findOne({pagename: req.params.pageId})
            .exec(function (err, page) {
                if (!page) {
                    sendJsonResponse(res, 404, {"message": "page not found"});
                    return;
                }
                else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                    sendJsonResponse(res, 200, page);
            });
    } else {
        sendJsonResponse(res, 404, {
            "message": "No pageid in request"
        });
    }
};

module.exports.addPage = function (req, res) {

    Model.create({
        pagename: req.body.pagename,
        title: req.body.title,
        notes: req.body.notes,
        code: req.body.code,
}, function(err, location) {
        if (err) {
            sendJsonResponse(res, 400, err);
        } else {
            sendJsonResponse(res, 201, location);
        }
    });

};

