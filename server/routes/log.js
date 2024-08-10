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

/* GET one log. */
router.get('/', function(req, res, next) {
  async function run () {
    // Let's search!
    const result = await client.search({
      index: 'cpm_ksfc',
      query: {
        match: {
          "_id": req.params.id
        }
      }
    })
    console.log(fianl);
    res.send(final);
  }
  run().catch(console.log);
});

module.exports = router;
