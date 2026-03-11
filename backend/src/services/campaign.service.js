/**
 * In-memory Mock Campaign Storage
 */
class CampaignService {
    constructor() {
        this.campaigns = [];
        this.currentId = 1;
        this.validStatuses = ['DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED'];
        this.validAgeRanges = ['10-15', '16-29', '30-39', '40-49', '50-59', '60-above'];
        this.validGenders = ['Male', 'Female', 'All'];
    }

    async createCampaign(userId, campaignData) {
        const { campaignName, gender, ageRange, description, mediaUrl, mediaType } = campaignData;

        // Validation
        if (!campaignName || !gender || !ageRange || !description) {
            throw new Error('Missing required fields');
        }

        if (!this.validGenders.includes(gender)) {
            throw new Error('Invalid gender value');
        }

        if (!this.validAgeRanges.includes(ageRange)) {
            throw new Error('Invalid age range value');
        }

        const campaign = {
            id: this.currentId++,
            userId,
            campaignName,
            gender,
            ageRange,
            description,
            mediaUrl: mediaUrl || '',
            mediaType: mediaType || 'IMAGE',
            status: 'DRAFT',
            rejectionReason: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.campaigns.push(campaign);
        return campaign;
    }

    async getCampaignsByUser(userId) {
        return this.campaigns.filter(c => c.userId === userId);
    }

    async getCampaignById(id, userId) {
        const campaign = this.campaigns.find(c => c.id === parseInt(id));
        if (!campaign) return null;
        if (campaign.userId !== userId) throw new Error('Unauthorized access to campaign');
        return campaign;
    }

    async updateCampaign(id, userId, updateData) {
        const campaignIndex = this.campaigns.findIndex(c => c.id === parseInt(id));
        if (campaignIndex === -1) return null;

        const campaign = this.campaigns[campaignIndex];
        if (campaign.userId !== userId) throw new Error('Unauthorized access to campaign');

        // Only allow updating in DRAFT status or specify logic if needed
        // For now, allow updates but filter fields

        const allowedFields = ['campaignName', 'gender', 'ageRange', 'description', 'mediaUrl', 'mediaType'];
        const updates = {};

        for (const key of allowedFields) {
            if (updateData[key] !== undefined) {
                if (key === 'gender' && !this.validGenders.includes(updateData[key])) throw new Error('Invalid gender value');
                if (key === 'ageRange' && !this.validAgeRanges.includes(updateData[key])) throw new Error('Invalid age range value');
                updates[key] = updateData[key];
            }
        }

        this.campaigns[campaignIndex] = {
            ...campaign,
            ...updates,
            updatedAt: new Date().toISOString()
        };

        return this.campaigns[campaignIndex];
    }

    async submitCampaign(id, userId) {
        const campaignIndex = this.campaigns.findIndex(c => c.id === parseInt(id));
        if (campaignIndex === -1) return null;

        const campaign = this.campaigns[campaignIndex];
        if (campaign.userId !== userId) throw new Error('Unauthorized access to campaign');

        if (campaign.status !== 'DRAFT') {
            throw new Error('Campaign can only be submitted from DRAFT status');
        }

        this.campaigns[campaignIndex].status = 'SUBMITTED';
        this.campaigns[campaignIndex].updatedAt = new Date().toISOString();

        return this.campaigns[campaignIndex];
    }
}

module.exports = new CampaignService();
