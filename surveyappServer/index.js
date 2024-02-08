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
    const spawn = require('child_process').spawn
    const py = spawn('python3', ['testing.py'])
    const data = {
        msg: "Hello"
    }

    py.stdin.write(JSON.stringify(data)) //we have to send data as a string, so we are using JSON.stringify
    py.stdin.end()
    py.stdout.on('data', function(res){
        let data = JSON.parse(res.toString())
        console.log('done testing');
     })
    res.send('Data received');
});