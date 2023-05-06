const Contact = require('../../models/contact');
const { HttpError } = require('../../utils');
const { updateScema } = require('../../utils/contactAddScema');

const changeContactById = async (req, res) => {
    const { contactId } = req.params;
    const body = req.body;
    if (!body) {
        throw HttpError(400, 'missing fields');
    }

    const { error } = updateScema.validate(body);
    if (error) {
        throw HttpError(400, 'error in the fields');
    }
    const result = await Contact.findOneAndUpdate(contactId, body, {
        new: true,
    });
    if (!result) {
        throw HttpError(404, 'Not found');
    }
    res.status(200).json({ result });
};

module.exports = changeContactById;
