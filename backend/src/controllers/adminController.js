import Campaign from "../models/Campaign.js";

// @desc    Admin review campaign
// @route   PUT /api/admin/campaigns/:id/review
// @access  Private/Admin
export const reviewCampaign = async (req, res, next) => {
    try {
        const { status, modificationsApplied } = req.body;

        let campaign = await Campaign.findById(req.params.id);

        if (!campaign) {
            return res.status(404).json({ success: false, error: "Campaign not found" });
        }

        campaign = await Campaign.findByIdAndUpdate(
            req.params.id,
            {
                status,
                modificationsApplied,
            },
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
