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
  async function run () {
    // Let's search!
    const result = await client.search({
      index: 'cpm-loggenerator',
      query: {
        match: {
          "key.key1": req.params.id
        }
      }
    })
    // console.log(req.params.id);
    // var final = result.hits.hits.map((row) => { 
    //   return { 
    //     id: row._id, 
    //     key: row._source.key,
    //     status: row._source.status,
    //     type: row._source.type,
    //     created: row._source.created,
    //     finished: row._source.finished,
    //     took: row._source.took,
    //   } 
    // });
    const nodes = result.hits.hits.filter((row) => row._source.common.type == 'node').map((row) => row._source.node);
    const edges = result.hits.hits.filter((row) => row._source.common.type == 'edge').map((row) => row._source.edge);
    console.log(nodes);
    console.log(edges);
    res.send({nodes: nodes, edges: edges});
  }
  run().catch(console.log);
  // res.send('transaction get router parameters : ' + req.params.id);
});

/* GET relation query paramters. */
router.get('/:id/company/:code', function(req, res, next) {
  res.send('transaction get query parameters : ' + req.params.id + " : code : " + req.params.code);
});

/* GET relation query string. */
router.get('/', function(req, res, next) {
  async function run () {
    // Let's search!
    const result = await client.search({
      index: 'cpm-loggenerator',
      query: {
        match_all: {}
      }
    })
    var final = result.hits.hits.map((row) => { 
      return { 
        id: row._id, 
        name: row._source.name,
        type: row._source.type,
        status: row._source.status,
        created: row._source.created,
        updated: row._source.updated,
      } 
    });
    console.log(final);
    res.send(final);
  }
  run().catch(console.log);
});

/* POST relation post. */
router.post('/', function(req, res, next) {
 
  async function run () {
    // Let's search!
    let query;
    if ( req.body.key === '' ) {
      query = {
        index: 'cpm-loggenerator',
        query: {
          match_all: {}
        }
      }
    } else {
      query = {
        index: 'cpm-loggenerator',
        query: {
          match: {
            name: req.body.key
          }
        }
      }
    }
    const result = await client.search(query);
    console.log(req.body.key);
    var final = result.hits.hits.map((row) => { 
      return { 
        id: row._id, 
        name: row._source.name,
        type: row._source.type,
        status: row._source.status,
        created: row._source.created,
        updated: row._source.updated,
      } 
    });
    console.log(final);
    res.send(final);
  }
  run().catch(console.log);
});

module.exports = router;
