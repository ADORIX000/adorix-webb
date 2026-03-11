const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaign.controller');
const authMiddleware = require('../middlewares/auth.middleware');

/**
 * Campaign Routes
 * All routes are protected by authMiddleware
 */
router.use(authMiddleware);

router.post('/', campaignController.createCampaign);
router.get('/', campaignController.getCampaigns);
router.get('/:id', campaignController.getCampaignById);
router.put('/:id', campaignController.updateCampaign);
router.post('/:id/submit', campaignController.submitCampaign);

module.exports = router;
