const Contact = require('../../models/contact');
const { HttpError } = require('../../utils');

const getContact = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 5 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({ owner }, '', {
        skip,
        limit: Number(limit),
    });
    if (!result) {
        throw HttpError(404, 'Not Found');
    }
    res.json(result);
};

module.exports = getContact;
