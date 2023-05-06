const express = require('express');
const {
    getContact,
    postContact,
    updateStatusContact,
    getById,
    deleteContactById,
    changeContactById,
} = require('../../controllers/contacts');
const { authenticate } = require('../../middlewares/authenticate');

const router = express.Router();

router.get('/', authenticate, getContact);

router.get('/:contactId', authenticate, getById);

router.post('/', authenticate, postContact);

router.patch('/:contactId/favorite', authenticate, updateStatusContact);

router.delete('/:contactId', authenticate, deleteContactById);

router.put('/:contactId', authenticate, changeContactById);

module.exports = router;
