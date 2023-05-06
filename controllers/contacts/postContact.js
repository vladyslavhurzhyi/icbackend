const Contact = require('../../models/contact');
const { HttpError } = require('../../utils');
const { addScema } = require('../../utils/contactAddScema');

const postContact = async (req, res) => {
    const { _id: owner } = req.user;
    const body = req.body;
    const { error } = addScema.validate(body);
    if (error) {
        throw HttpError(400, 'error in the fields');
    }
    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
};

module.exports = postContact;
