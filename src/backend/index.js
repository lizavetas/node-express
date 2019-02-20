const express = require('express');
const os = require('os');
const GoogleTrendsService = require('./services/GoogleTrendsService/GoogleTrendsService');
const app = express();

console.log('start');

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.get('/api/keyword/:keyword', (req, res) => {
  GoogleTrendsService.GoogleTrendsService(req.params.keyword)
    .then(result => {
      //console.log(result);
      return res.send(result)
  }).catch(error => res.send(error));

});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
