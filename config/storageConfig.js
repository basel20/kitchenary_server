const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'storage');
  },
  filename: function (req, file, cb) {
    // arabic file names
    file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
    cb(null, Date.now() + '_' + file.originalname.replace(' ', '_').replace(/["'(){}]/g, ''));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'video/mp4', 'application/pdf'];

  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });

module.exports = upload;