// Konfiguracja uploada
// multer - is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
const multer = require('multer');
const moment = require('moment');

// conf misce dla zapysu img i filenames
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        const date = moment().format('DDMMYYYY-HHmmss_SSS');
        cb(null, `${date}-${file.originalname}`);
    }
});

// filtrujemo only img/png i jpeg
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// limit na filesize
const limits = {
    fileSize:  1024 * 1024 * 5
};

module.exports = multer({
    storage,
    fileFilter,
    limits
})