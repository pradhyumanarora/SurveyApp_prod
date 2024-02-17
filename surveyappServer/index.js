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

app.get('/', (req, res) => {
    res.send({ message: 'Welcome to SurveyyApp!' });
});


app.post('/data', (req, res) => {
    console.log(req.body);

    // const spawn = require("child_process").spawn;
    // const pythonProcess = spawn('python', ["testing.py", JSON.stringify(req.body)]);
    // pythonProcess.stdout.on('data', (data) => {
    //     console.log(data.toString());
    //     res.send({message: data})
    // });
    res.send({message: 'Data Received'});
});


app.post('/upload', multipartMiddleware, async (req, res) => {
    // console.log(req.files['targetImage']);
    // don't forget to delete all req.files when 
    try {

        const targetImage = req.files['targetImage'];
        let queryImage1 = req.files['inputFiles1'];
        // console.log(targetImage);
        const spawn = require("child_process").spawn;
        const pythonProcess = spawn('python', ["owl_vit_detect.py", JSON.stringify(targetImage), JSON.stringify(queryImage1)]);
        pythonProcess.stdout.on('data', (data) => {
            console.log(data.toString());
        });

        //     const targetPath = `uploads/${targetImage.originalFilename}`;

        //     // Check if the target image exists and has an allowed extension (optional)
        //     if (!allowedFile(targetPath)) {
        //         return res.status(400).json({ error: 'Invalid target image' });
        //     }

        //     await promisify(fs.rename)(targetImage.path, targetPath);

        //     const queryImages = req.files['queryImage'] || [];
        //     const queryPaths = [];

        //     for (let i = 0; i < queryImages.length; i++) {
        //         const queryImage = queryImages[i];
        //         if (allowedFile(queryImage.originalFilename)) {
        //             const queryPath = `uploads/${queryImage.originalFilename}`;
        //             await promisify(fs.rename)(queryImage.path, queryPath);
        //             queryPaths.push(queryPath);
        //         }
        //     }

        //     const resultImage = await objectDetection(); // Assuming object_detection is a function in owl_vit_detect.py

        //     const imgBase64 = base64.fromByteArray(resultImage.getData());

        //     // Cleanup uploaded files
        //     await promisify(fs.rmdir)('uploads', { recursive: true });

        //     res.json({ image: `data:image/jpeg;base64,${imgBase64}` });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
