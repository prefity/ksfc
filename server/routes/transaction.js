var express = require('express');
var fs = require('fs');
var cors = require('cors');
let corsOptions = {
  origin: "*", // 출처 허용 옵션
  credential: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
};
var flow = require('./flow');
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

/* POST get transaction list. */
router.post('/', function(req, res, next) {
  console.log('key', req.body.key);
  var size = req.body.size;
  var from = (req.body.from * size)
  var key = req.body.key;
  async function run () {
    // Let's search!
    let query;
    if ( req.body.key === '' ) {
      query = {
        index: 'cpm_transaction',
        size: size,
        from: from,
        query: {
          match_all: {}
        }
      }
    } else {
      console.log('else', req.body.key);
      query = {
        index: 'cpm_transaction',
        size: size,
        from: from,
        query: {
          term: {
            key: {
              value: req.body.key
            }
          }
        }
      }
    }
    console.log(query);
    const result = await client.search(query);
    console.log('key:', req.body.key);
    var total = result.hits.total.value;
    var took = result.took;
    var final = result.hits.hits.map((row) => { 
      return { 
        id: row._id, 
        key: row._source.key,
        status: "OK",
        type: "All",
        created: row._source["@timestamp"],
        finished: row._source["@timestamp"],
        took: 1,
      } 
    });
    var rr = {
      data: final,
      total: total,
      took: took,
    }
    // console.log(final);
    console.log('total', total);
    console.log('took', took);
    console.log('size', size);
    console.log('from', from);
    console.log('data', rr);
    res.send(rr);
  }
  run().catch(console.log);
});

/* GET get a trancation detail (list, node, edge). */
router.get('/:id', function(req, res, next) {
  async function run () {
    // Let's search!
    const result = await client.search({
      index: 'cpm_ksfc',
      sort: [
        { "@timestamp" : "asc" }
      ],
      size: 50,
      query: {
        term: {
          "tx.trid": {
            value: req.params.id
          }
        }
      }
    })
    var ksfc = result.hits.hits.map((row) => {
      var type = row._source.tx.type;
      var subtype = "";
      subtype = (type === "_FLOW_LOG.log" ? row._source.tx.mci.flow.pg : "" ); 
      return { 
        id: row._id, 
        datetime: row._source["@timestamp"],
        trid: row._source.tx.trid_fep,
        ortrid: row._source.tx.trid,
        program: row._source.tx.subtype,
        system: row._source.tx.system,
        type: row._source.tx.type,
        subtype: subtype,
        tx: row._source.tx,
      } 
    });
    // console.log('ksfc:', ksfc);
    var flow_rr = flow.flow(ksfc);
    // console.log(flow_rr.node, flow_rr.edge);
    var rr = {
      ksfc: ksfc,
      node: flow_rr.node,
      edge: flow_rr.edge,
    }
    res.send(rr);
  }
  run().catch(console.log);
  // res.send('transaction get router parameters : ' + req.params.id);
});

module.exports = router;
