const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { handleGetPoolRequest } = require('../../controllers/pools');

router.post(
    '/get',
    [
        check('token0', 'token0 is required').not().isEmpty(),
        check('token1', 'token1 is required').not().isEmpty(),
        check('fee', 'fee is required').not().isEmpty()
    ],
    handleGetPoolRequest
);

module.exports = router;
