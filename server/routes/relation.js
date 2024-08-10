var express = require('express');
var fs = require('fs');
var cors = require('cors');
let corsOptions = {
  origin: "*", // 출처 허용 옵션
  credential: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
};
var router = express.Router();
router.use(cors(corsOptions));

var { Client } = require('@elastic/elasticsearch');
var client = new Client ({
  node: 'https://localhost:9200',
  auth: {
    username: 'elastic',
    password: 'elastic'
  },
  tls: {
    ca: fs.readFileSync('/Users/dongkillee/Works/elastic/8.13.2/elasticsearch/node1/config/certs/http_ca.crt'),
    rejectUnauthorized: false
  }
})

/* GET relation router paramters. */
router.get('/:id', function(req, res, next) {
  res.send('relation get router parameters : ' + req.params.id);
});

/* GET relation query paramters. */
router.get('/:id/company/:code', function(req, res, next) {
  res.send('relation get query parameters : ' + req.params.id + " : code : " + req.params.code);
});

/* GET relation query string. */
router.get('/', function(req, res, next) {
  res.send('relation get query string : ' + req.query.guid);
});

/* POST relation post. */
router.post('/', function(req, res, next) {
  async function run () {
    // Let's search!
    const result = await client.search({
      index: 'express',
      query: {
        match: {
          name: req.body.guid
        }
      }
    })
    console.log(req.body.guid);
    console.log(result.hits.hits);
    res.send(result.hits.hits);
  }
  run().catch(console.log);
});

module.exports = router;
