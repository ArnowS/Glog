const express = require('express');
const app = express();

const hostname = 'localhost';
const port = 8000;
const url_app = 'visuprot'


app.use(express.static(__dirname));
app.get(`/${url_app}`, function(req, res) {
    res.sendFile(__dirname + '/Vizzal.html');
});
app.listen(port, () => {
    console.log(`app is running at http://${hostname}:${port}/${url_app}`);
});
