const Contact = require('../../models/contact');
const { HttpError } = require('../../utils');

const deleteContactById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
        throw HttpError(404, 'Not found');
    }
    res.status(200).json({ message: 'contact deleted' });
};

module.exports = deleteContactById;
