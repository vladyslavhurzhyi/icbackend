const { ctrlWrapper } = require('../../utils');
const getContact = require('./getContact');
const postContact = require('./postContact');
const updateStatusContact = require('./updateStatusContact');
const getById = require('./getById');
const deleteContactById = require('./deleteContactById');
const changeContactById = require('./changeContactById');

module.exports = {
    getContact: ctrlWrapper(getContact),
    postContact: ctrlWrapper(postContact),
    updateStatusContact: ctrlWrapper(updateStatusContact),
    getById: ctrlWrapper(getById),
    deleteContactById: ctrlWrapper(deleteContactById),
    changeContactById: ctrlWrapper(changeContactById),
};
