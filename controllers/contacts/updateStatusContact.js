const Contact = require('../../models/contact');
const { HttpError } = require('../../utils');

const updateStatusContact = async (req, res) => {
    const id = req.params.contactId;
    const body = req.body;
    if (!body) {
        throw HttpError(400, 'missing field favorite');
    }
    const result = await Contact.findByIdAndUpdate(id, body, { new: true });
    if (!result) {
        throw HttpError(404, 'Not found');
    }
    res.json(result);
};

module.exports = updateStatusContact;
