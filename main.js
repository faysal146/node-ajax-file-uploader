const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(cors());
express.static('public');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

app.use(express.static(`${__dirname}/public`));

app.post('/upload', upload.array('file'), (req, res) => {
    res.send('uploaded');
});

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => console.log('server is listen on port ' + PORT));
