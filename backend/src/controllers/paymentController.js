import Campaign from "../models/Campaign.js";

// @desc    Confirm payment simulation
// @route   POST /api/payments/confirm
// @access  Private
export const confirmPayment = async (req, res, next) => {
    try {
        const { campaignId } = req.body;

        let campaign = await Campaign.findById(campaignId);

        if (!campaign) {
            return res.status(404).json({ success: false, error: "Campaign not found" });
        }

        // Simple simulation: always mark as PAID if requested
        campaign = await Campaign.findByIdAndUpdate(
            campaignId,
            { paymentStatus: "PAID" },
            { new: true }
        );

        // If already approved, mark as ACTIVE
        if (campaign.status === "APPROVED") {
            campaign = await Campaign.findByIdAndUpdate(
                campaignId,
                { status: "ACTIVE", isPublished: true },
                { new: true }
            );
        }

        res.status(200).json({
            success: true,
            data: campaign,
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
