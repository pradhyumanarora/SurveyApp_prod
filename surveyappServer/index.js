const app = require('express')();
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(port, () => console.log(`server is live at http://localhost:${port}`));

app.post('/data', (req, res) => {
    console.log(req.body)
    const spawn = require("child_process").spawn;
    const pythonProcess = spawn('python',["testing.py", JSON.stringify(req.body)]);
    pythonProcess.stdout.on('data', (data) => {
        console.log(data.toString());
       });
});