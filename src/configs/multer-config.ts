import multer, { StorageEngine } from 'multer';
import path from 'path';

const storage: StorageEngine = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/services/uploads/'); // Directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // File name will be original name + uniqueSuffix
  }
});

export default storage;
