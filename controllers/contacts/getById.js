const Contact = require('../../models/contact');
const { HttpError } = require('../../utils');

const getById = async (req, res) => {
    const id = req.params.contactId;
    console.log('req.params.contactId', req.params.contactId);
    const result = await Contact.findOne({ _id: id });
    if (!result) {
        throw HttpError(404, 'Not found');
    }
    res.json(result);
};

module.exports = getById;
