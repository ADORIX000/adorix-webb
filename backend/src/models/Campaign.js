import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add a campaign name"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Please add a description"],
        },
        advertiser: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
        targetGender: {
            type: String,
            enum: ["Male", "Female", "Both", "All"],
            default: "All",
        },
        ageRange: {
            type: String,
            required: [true, "Please specify target age range"],
        },
        mediaUrl: {
            type: String,
            required: [true, "Please add media URL"],
        },
        mediaType: {
            type: String,
            enum: ["image", "video"],
            required: true,
        },
        status: {
            type: String,
            enum: ["DRAFT", "PENDING_REVIEW", "APPROVED", "REJECTED", "CHANGES_REQUESTED", "ACTIVE"],
            default: "DRAFT",
        },
        paymentStatus: {
            type: String,
            enum: ["UNPAID", "PAID"],
            default: "UNPAID",
        },
        scheduleRequest: {
            mall: String,
            kiosk: String,
            timeSlot: String,
        },
        isPublished: {
            type: Boolean,
            default: false,
        },
        modificationsApplied: [
            {
                type: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Campaign", campaignSchema);
