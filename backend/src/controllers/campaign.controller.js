const campaignService = require('../services/campaign.service');

/**
 * Campaign Controller
 */
const createCampaign = async (req, res) => {
    try {
        const userId = req.user.id;
        const campaign = await campaignService.createCampaign(userId, req.body);
        res.status(201).json({
            message: 'Campaign created successfully',
            campaign
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getCampaigns = async (req, res) => {
    try {
        const userId = req.user.id;
        const campaigns = await campaignService.getCampaignsByUser(userId);
        res.status(200).json({ campaigns });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getCampaignById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const campaign = await campaignService.getCampaignById(id, userId);

        if (!campaign) {
            return res.status(404).json({ error: 'Campaign not found' });
        }

        res.status(200).json({ campaign });
    } catch (error) {
        res.status(403).json({ error: error.message });
    }
};

const updateCampaign = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const updatedCampaign = await campaignService.updateCampaign(id, userId, req.body);

        if (!updatedCampaign) {
            return res.status(404).json({ error: 'Campaign not found' });
        }

        res.status(200).json({
            message: 'Campaign updated successfully',
            campaign: updatedCampaign
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const submitCampaign = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const submittedCampaign = await campaignService.submitCampaign(id, userId);

        if (!submittedCampaign) {
            return res.status(404).json({ error: 'Campaign not found' });
        }

        res.status(200).json({
            message: 'Campaign submitted successfully',
            campaign: submittedCampaign
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createCampaign,
    getCampaigns,
    getCampaignById,
    updateCampaign,
    submitCampaign
};
