const app = require('express')();
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const cors = require('cors');
const busboy = require('connect-busboy');
var fs = require('fs');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(busboy());
app.listen(port, () => console.log(`server is live at http://localhost:${port}`));

app.post('/data', (req, res) => {
    const spawn = require('child_process').spawn
    const py = spawn('python3', ['testing.py'])
    const data = {
        msg: "Hello"
    }

    py.stdin.write(JSON.stringify(data)) //we have to send data as a string, so we are using JSON.stringify
    py.stdin.end()
    py.stdout.on('data', function (res) {
        let data = JSON.parse(res.toString())
        console.log('done testing');
    })
    res.send('Data received');
});

// app.post('/upload', (req, res) => {
//     console.log(req.body);
//     console.log(req.files);
//     var fstream;
//     req.pipe(req.busboy);
//     req.busboy.on('file', function (fieldname, file, filename) {
//         console.log("Uploading: " + filename); 
//         fstream = fs.createWriteStream(__dirname + '/files/' + filename);
//         file.pipe(fstream);
//         fstream.on('close', function () {
//             res.redirect('back');
//         });
//     });
//     res.send('Data received');
// });
app.post('/upload', multipartMiddleware, async (req, res)=> {
    console.log(req.files['targetImage']);
    // don't forget to delete all req.files when 
    try {
        const targetImage = req.files['targetImage'][0];
        const targetPath = `uploads/${targetImage.originalFilename}`;

        // Check if the target image exists and has an allowed extension (optional)
        if (!allowedFile(targetPath)) {
            return res.status(400).json({ error: 'Invalid target image' });
        }

        await promisify(fs.rename)(targetImage.path, targetPath);

        const queryImages = req.files['queryImage'] || [];
        const queryPaths = [];

        for (let i = 0; i < queryImages.length; i++) {
            const queryImage = queryImages[i];
            if (allowedFile(queryImage.originalFilename)) {
                const queryPath = `uploads/${queryImage.originalFilename}`;
                await promisify(fs.rename)(queryImage.path, queryPath);
                queryPaths.push(queryPath);
            }
        }

        const resultImage = await objectDetection(); // Assuming object_detection is a function in owl_vit_detect.py

        const imgBase64 = base64.fromByteArray(resultImage.getData());

        // Cleanup uploaded files
        await promisify(fs.rmdir)('uploads', { recursive: true });

        res.json({ image: `data:image/jpeg;base64,${imgBase64}` });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

