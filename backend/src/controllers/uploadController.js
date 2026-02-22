import path from "path";
import multer from "multer";

// Set storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|mp4/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb("Error: JPG, PNG, or MP4 Only!");
    }
}

// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
}).single("media");

// @desc    Upload media
// @route   POST /api/uploads
// @access  Private
export const uploadMedia = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!req.file) {
            return res.status(400).json({ success: false, error: "Please upload a file" });
        }
        res.status(200).json({
            success: true,
            data: req.file.filename,
        });
    });
};
