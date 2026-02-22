import Campaign from "../models/Campaign.js";

// @desc    Create new campaign draft
// @route   POST /api/campaigns
// @access  Private
export const createCampaign = async (req, res, next) => {
    try {
        // Add user to req.body
        req.body.advertiser = req.user.id;

        const campaign = await Campaign.create(req.body);

        res.status(201).json({
            success: true,
            data: campaign,
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Get all campaigns
// @route   GET /api/campaigns
// @access  Private
export const getCampaigns = async (req, res, next) => {
    try {
        let query;

        // If admin, show all, otherwise only advertiser's campaigns
        if (req.user.role === "admin") {
            query = Campaign.find().populate("advertiser", "username email");
        } else {
            query = Campaign.find({ advertiser: req.user.id });
        }

        const campaigns = await query;

        res.status(200).json({
            success: true,
            count: campaigns.length,
            data: campaigns,
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Submit campaign for review
// @route   PUT /api/campaigns/:id/submit
// @access  Private
export const submitCampaign = async (req, res, next) => {
    try {
        let campaign = await Campaign.findById(req.params.id);

        if (!campaign) {
            return res.status(404).json({ success: false, error: "Campaign not found" });
        }

        // Make sure user is campaign owner
        if (campaign.advertiser.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(401).json({ success: false, error: "Not authorized to update this campaign" });
        }

        campaign = await Campaign.findByIdAndUpdate(
            req.params.id,
            { status: "PENDING_REVIEW" },
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            success: true,
            data: campaign,
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
