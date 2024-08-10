
function flow(source) {

  var flow_objects = source.filter((e, i) => e.type === '_FLOW_LOG.log' && e.tx.mci.flow.qid_name === 'QID' );
  var tpclient_objects = source.filter((e, i) => e.type === 'scs_if_tpclient.log' );
  var tcpgw_objects = source.filter((e, i) => e.type === 'tcpgw' );
  var eai_objects = source.filter((e, i) => e.system === 'eai' );

  // --- Node

  // MCI

  var tx_trid = '';
  var node_objects = flow_objects.map((row) => {
    console.log('flow:', row.tx.trid);
    tx_trid = row.tx.trid;
    return row.subtype;
  })

  

  var objects = node_objects.filter((e, i) => e !== '' );

  const set = new Set(objects);
  const uq_objects = [...set];

  var nodes = uq_objects.map((node) => {
    var r = calcPosition(node);
    // console.log('r:', r);
    return {
      id: node,
      type: 'cpmnode',
      data: {
        label: node
      },
      position: {
        x: r.pos.x,
        y: r.pos.y,
      },
      parentId: 'mci-group',
      extent: 'parent',
    }
  })

  if (tx_trid.length === 27) {
    var chnl_name = tx_trid.substring(0,3);
    console.log(chnl_name);
    nodes.push({
      id: chnl_name,
      type: 'cpmnode',
      data: {
        label: chnl_name
      },
      position: {
        x: -200,
        y: 50,
      },
    })
  }

  nodes.push({
    id: 'mci-group',
    type: 'group',
    data: {
      label: 'MCI'
    },
    position: {
      x: 0,
      y: 0,
    },
    style: {
      width: 570,
      height: 350,
    }
  })

  nodes.push({
    id: 'mci-annotation1',
    type: 'annotation',
    draggable: false,
    selectable: false,
    data: {
      level: 2,
      label: 'MCI',
      arrowStyle: {
        left: 0,
        bottom: 0,
        transform: 'translate(5px, 25px) scale(1, -1) rotate(100deg)',
      },
    },
    position: { x: 210, y: -50 },
  })

  // CORE

  nodes.push({
    id: 'core-group',
    type: 'group',
    data: {
      label: 'CORE'
    },
    position: {
      x: 610,
      y: 0,
    },
    style: {
      width: 570,
      height: 350,
    }
  })

  nodes.push({
    id: 'core-annotation1',
    type: 'annotation',
    draggable: false,
    selectable: false,
    data: {
      level: 2,
      label: 'CORE',
      arrowStyle: {
        left: 0,
        bottom: 0,
        transform: 'translate(5px, 25px) scale(1, -1) rotate(100deg)',
      },
    },
    position: { x: 810, y: -50 },
  })

  

  

  // nodes.push({
  //   id: 'act',
  //   type: 'cpmnode',
  //   data: {
  //     label: 'act'
  //   },
  //   position: {
  //     x: 1020,
  //     y: 50,
  //   },
  // })

  // nodes.push({
  //   id: 'rts',
  //   type: 'cpmnode',
  //   data: {
  //     label: 'rts'
  //   },
  //   position: {
  //     x: 1020,
  //     y: 150,
  //   },
  // })

  // nodes.push({
  //   id: 'sis',
  //   type: 'cpmnode',
  //   data: {
  //     label: 'sis'
  //   },
  //   position: {
  //     x: 1020,
  //     y: 250,
  //   },
  // })

  // FEP

  nodes.push({
    id: 'fep-group',
    type: 'group',
    data: {
      label: 'FEP'
    },
    position: {
      x: 1220,
      y: 0,
    },
    style: {
      width: 570,
      height: 350,
    }
  })

  

  nodes.push({
    id: 'fep-annotation1',
    type: 'annotation',
    draggable: false,
    selectable: false,
    data: {
      level: 2,
      label: 'FEP',
      arrowStyle: {
        left: 0,
        bottom: 0,
        transform: 'translate(5px, 25px) scale(1, -1) rotate(100deg)',
      },
    },
    position: { x: 1430, y: -50 },
  })

  // nodes.push({
  //   id: 'fep-ACT',
  //   type: 'cpmnode',
  //   data: {
  //     label: 'ACT'
  //   },
  //   position: {
  //     x: 1260,
  //     y: 50,
  //   },
  // })

  // nodes.push({
  //   id: 'fep-RTS',
  //   type: 'cpmnode',
  //   data: {
  //     label: 'RTS'
  //   },
  //   position: {
  //     x: 1260,
  //     y: 150,
  //   },
  // })

  // nodes.push({
  //   id: 'fep-SIS',
  //   type: 'cpmnode',
  //   data: {
  //     label: 'SIS'
  //   },
  //   position: {
  //     x: 1260,
  //     y: 250,
  //   },
  // })

  // nodes.push({
  //   id: 'fep-OBP2',
  //   type: 'cpmnode',
  //   data: {
  //     label: 'OBP2'
  //   },
  //   position: {
  //     x: 1630,
  //     y: 50,
  //   },
  // })

  // nodes.push({
  //   id: 'fep-OAB1',
  //   type: 'cpmnode',
  //   data: {
  //     label: 'OAB1'
  //   },
  //   position: {
  //     x: 1630,
  //     y: 150,
  //   },
  // })

  // nodes.push({
  //   id: 'fep-BBC3',
  //   type: 'cpmnode',
  //   data: {
  //     label: 'BBC3'
  //   },
  //   position: {
  //     x: 1630,
  //     y: 250,
  //   },
  // })

  // nodes.push({
  //   id: 'OBP2',
  //   type: 'cpmnode',
  //   data: {
  //     label: 'OBP2'
  //   },
  //   position: {
  //     x: 1870,
  //     y: 50,
  //   },
  // })

  // nodes.push({
  //   id: 'OAB1',
  //   type: 'cpmnode',
  //   data: {
  //     label: 'OAB1'
  //   },
  //   position: {
  //     x: 1870,
  //     y: 150,
  //   },
  // })

  // nodes.push({
  //   id: 'BBC3',
  //   type: 'cpmnode',
  //   data: {
  //     label: 'BBC3'
  //   },
  //   position: {
  //     x: 1870,
  //     y: 250,
  //   },
  // })

  // EAI

  nodes.push({
    id: 'eai-group',
    type: 'group',
    data: {
      label: 'EAI'
    },
    position: {
      x: 610,
      y: 390,
    },
    style: {
      width: 570,
      height: 350,
    }
  })

  nodes.push({
    id: 'eai-annotation1',
    type: 'annotation',
    draggable: false,
    selectable: false,
    data: {
      level: 2,
      label: 'Internal',
      arrowStyle: {
        left: 0,
        bottom: 0,
        transform: 'translate(5px, 25px) scale(1, -1) rotate(100deg)',
      },
    },
    position: { x: 810, y: 750 },
  })

  // --- Edge 

  var edges = [];
  var ei = 1;
  var sHandle, tHandle = '';

  // _FLOW_LOG.log (mci)

  var push = false;

  if (flow_objects.length > 0) {
    edges.push({
      id: ei++,
      type: 'smoothstep',
      label: 'call',
      labelShowBg: false,
      labelStyle: {
        fill: 'white'
      },
      source: chnl_name,
      sourceHandle: 'rs',
      target: 'scs_dm_pcinetd',
      targetHandle: 'lt',
      animated: true,
      markerEnd: {
        type: 'arrow'
      }
    })
    edges.push({
      id: ei++,
      type: 'smoothstep',
      label: 'call',
      labelShowBg: false,
      labelStyle: {
        fill: 'white'
      },
      source: 'scs_dm_pcinetd',
      sourceHandle: 'ls',
      target: chnl_name,
      targetHandle: 'rt',
      animated: true,
      markerEnd: {
        type: 'arrow'
      }
    })
  }

  for (var i=0; i<flow_objects.length; i++) {
    var type = flow_objects[i].tx.mci.flow.type;
    var qid = flow_objects[i].tx.mci.flow.qid;
    var pg = flow_objects[i].tx.mci.flow.pg;
    push = flow_objects[i].tx.mci.flow.pg === 'scs_if_push_send' ? true : false;
    for (var j=0; j<flow_objects.length; j++) {
      var type2 = flow_objects[j].tx.mci.flow.type;
      var qid2 = flow_objects[j].tx.mci.flow.qid;
      var pg2 = flow_objects[j].tx.mci.flow.pg;
      if (qid === qid2 && pg !== pg2 && type === 'SEND' && type2 === 'RECV') {
        console.log(qid, type, pg, qid2, type2,  pg2);
        if (pg === 'scs_dm_pcinetd' && pg2 === 'scs_if_tprouter')     { sHandle = 'rs'; tHandle = 'lt'; }
        if (pg === 'scs_dm_pcinetd' && pg2 === 'scs_dm_pcstatistic')  { sHandle = 'rs'; tHandle = 'lt'; }
        if (pg === 'scs_if_tprouter' && pg2 === 'scs_if_tpclient')    { sHandle = 'rs'; tHandle = 'lt'; }
        if (pg === 'scs_if_tpclient' && pg2 === 'scs_dm_pcinetd')     { sHandle = 'ts'; tHandle = 'tt'; }
        if (pg === 'scs_if_push_send' && pg2 === 'scs_dm_transpush')  { sHandle = 'ls'; tHandle = 'rt'; }
        if (pg === 'scs_dm_transpush' && pg2 === 'scs_dm_pcxpush')    { sHandle = 'ls'; tHandle = 'rt'; }
        if (pg === 'scs_dm_pcxpush' && pg2 === 'scs_dm_pcinetd')      { sHandle = 'ts'; tHandle = 'bt'; }
        if (pg === 'scs_dm_transpush' && pg2 === 'scs_if_push_send')  { sHandle = 'bs'; tHandle = 'bt'; }

        edges.push({
          id: ei++,
          type: 'smoothstep',
          label: qid,
          labelShowBg: false,
          labelStyle: {
            fill: 'white'
          },
          source: pg,
          sourceHandle: sHandle,
          target: pg2,
          targetHandle: tHandle,
          animated: true,
          markerEnd: {
            type: 'arrow'
          }
        })
      }
    }
  }

  // scs_if_tpclient.log (mci - tmax)

  if (tpclient_objects.length > 0) {
    nodes.push({
      id: 'tmax',
      type: 'tmaxnode',
      data: {
        label: 'TMAX'
      },
      position: {
        x: 650,
        y: 50,
      },
    })
    for (var i=0; i<tpclient_objects.length; i++) {
      console.log(tpclient_objects[i].tx.mci);
      if (tpclient_objects[i].tx.mci.tpclient.status === 'RESP_SUCCESS') {
        edges.push({
          id: ei++,
          type: 'smoothstep',
          label: 'req',
          labelShowBg: false,
          labelStyle: {
            fill: 'white'
          },
          source: 'scs_if_tpclient',
          sourceHandle: 'rs',
          target: 'tmax',
          targetHandle: 'ltup',
          animated: true,
          markerEnd: {
            type: 'arrow'
          }
        })
        edges.push({
          id: ei++,
          type: 'smoothstep',
          label: push ? 'ack(no data)' : 'res(with data)',
          labelShowBg: false,
          labelStyle: {
            fill: 'white'
          },
          source: 'tmax',
          sourceHandle: 'lsup',
          target: 'scs_if_tpclient',
          targetHandle: 'rt',
          animated: true,
          markerEnd: {
            type: 'arrow'
          }
        })
      }
    }
  }

  if (push) {
    edges.push({
      id: ei++,
      type: 'smoothstep',
      label: 'data',
      labelShowBg: false,
      labelStyle: {
        fill: 'white'
      },
      source: 'tmax',
      sourceHandle: 'lsdown',
      target: 'scs_if_push_send',
      targetHandle: 'rt',
      animated: true,
      markerEnd: {
        type: 'arrow'
      }
    })
  }

  // eai (tmax - act)

  if (eai_objects.length > 0) {
    nodes.push({
      id: 'eai',
      type: 'tmaxnode',
      data: {
        label: 'EAI'
      },
      position: {
        x: 835,
        y: 50,
      },
    })
    for (var i=0; i<eai_objects.length; i++) {
      var req = eai_objects[i].tx.header.system.tr_rqs_chnl_cd;
      var res = eai_objects[i].tx.type;
      var req_pos = req === 'ACT' ? 50 : req === 'RTS' ? 150 : 250;
      var res_pos = res === 'ACT' ? 50 : res === 'RTS' ? 150 : 250;
      var req_src = res === 'ACT' ? 'rsup' : res === 'RTS' ? 'rsmid' : 'rsdown';
      var res_src = res === 'ACT' ? 'rsup' : res === 'RTS' ? 'rsmid' : 'rsdown';
      var req_tgt = res === 'ACT' ? 'rtup' : res === 'RTS' ? 'rtmid' : 'rtdown';
      var res_tgt = res === 'ACT' ? 'rtup' : res === 'RTS' ? 'rtmid' : 'rtdown';
      console.log(eai_objects[i].program, req, res);
      if (eai_objects[i].program === 'mq_get' || eai_objects[i].program === 'mq_put') {
        edges.push({
          id: ei++,
          type: 'smoothstep',
          label: 'req',
          labelShowBg: false,
          labelStyle: {
            fill: 'white'
          },
          source: 'tmax',
          sourceHandle: 'rsmid',
          target: 'eai',
          targetHandle: 'ltmid',
          animated: true,
          markerEnd: {
            type: 'arrow'
          }
        })
        edges.push({
          id: ei++,
          type: 'smoothstep',
          label: 'res',
          labelShowBg: false,
          labelStyle: {
            fill: 'white'
          },
          source: 'eai',
          sourceHandle: 'lsmid',
          target: 'tmax',
          targetHandle: 'rtmid',
          animated: true,
          markerEnd: {
            type: 'arrow'
          }
        })
        nodes.push({
          id: res,
          type: 'cpmnode',
          data: {
            label: res
          },
          position: {
            x: 1020,
            y: res_pos,
          },
        })
        // nodes.push({
        //   id: req,
        //   type: 'cpmnode',
        //   data: {
        //     label: req
        //   },
        //   position: {
        //     x: 1020,
        //     y: req_pos,
        //   },
        // })
        edges.push({
          id: ei++,
          type: 'smoothstep',
          label: 'req',
          labelShowBg: false,
          labelStyle: {
            fill: 'white'
          },
          source: 'eai',
          sourceHandle: res_src,
          target: res,
          targetHandle: 'lt',
          animated: true,
          markerEnd: {
            type: 'arrow'
          }
        })
        edges.push({
          id: ei++,
          type: 'smoothstep',
          label: 'res',
          labelShowBg: false,
          labelStyle: {
            fill: 'white'
          },
          source: res,
          sourceHandle: 'ls',
          target: 'eai',
          targetHandle: res_tgt,
          animated: true,
          markerEnd: {
            type: 'arrow'
          }
        })
        // edges.push({
        //   id: ei++,
        //   type: 'smoothstep',
        //   label: 'req',
        //   labelShowBg: false,
        //   labelStyle: {
        //     fill: 'white'
        //   },
        //   source: 'eai',
        //   sourceHandle: req_src,
        //   target: req,
        //   targetHandle: 'lt',
        //   animated: true,
        //   markerEnd: {
        //     type: 'arrow'
        //   }
        // })
        // edges.push({
        //   id: ei++,
        //   type: 'smoothstep',
        //   label: 'req',
        //   labelShowBg: false,
        //   labelStyle: {
        //     fill: 'white'
        //   },
        //   source: req,
        //   sourceHandle: 'ls',
        //   target: 'eai',
        //   targetHandle: req_tgt,
        //   animated: true,
        //   markerEnd: {
        //     type: 'arrow'
        //   }
        // })
      }
    }
  }

  // fep (tcpgw)

  if (tcpgw_objects.length > 0) {
    nodes.push({
      id: 'fep-engine-group',
      type: 'group',
      data: {
        label: 'engine'
      },
      position: {
        x: 1430,
        y: 50,
      },
      style: {
        width: 150,
        height: 250,
        border: 0,
      }
    })
    nodes.push({
      id: 'eai',
      type: 'tmaxnode',
      data: {
        label: 'EAI'
      },
      position: {
        x: 835,
        y: 50,
      },
    })
    if (tpclient_objects.length > 0) {
      edges.push({
        id: ei++,
        type: 'smoothstep',
        label: 'req',
        labelShowBg: false,
        labelStyle: {
          fill: 'white'
        },
        source: 'tmax',
        sourceHandle: 'rsmid',
        target: 'eai',
        targetHandle: 'ltmid',
        animated: true,
        markerEnd: {
          type: 'arrow'
        }
      })
      edges.push({
        id: ei++,
        type: 'smoothstep',
        label: 'res',
        labelShowBg: false,
        labelStyle: {
          fill: 'white'
        },
        source: 'eai',
        sourceHandle: 'lsmid',
        target: 'tmax',
        targetHandle: 'rtmid',
        animated: true,
        markerEnd: {
          type: 'arrow'
        }
      })
    }
    for (var i=0; i<tcpgw_objects.length; i++) {
      console.log(tcpgw_objects[i].tx.type, tcpgw_objects[i].tx.subtype, tcpgw_objects[i].tx.fep.tcpgw.from, tcpgw_objects[i].tx.fep.tcpgw.to);
      var fep_chl = tcpgw_objects[i].tx.header.system.osd_rqs_chni_cd;
      var fep_org = tcpgw_objects[i].tx.header.system.osd_incd;
      console.log(fep_chl, fep_org);
      nodes.push({
        id: 'fep-' + fep_org,
        type: 'cpmnode',
        data: {
          label: 'fep-' + fep_org
        },
        position: {
          x: 1630,
          y: 50,
        },
      })
      nodes.push({
        id: fep_org,
        type: 'cpmnode',
        data: {
          label: fep_org
        },
        position: {
          x: 1870,
          y: 50,
        },
      })
      if (tcpgw_objects[i].tx.subtype === 'ACT') {
        nodes.push({
          id: 'ACT',
          type: 'cpmnode',
          data: {
            label: 'ACT'
          },
          position: {
            x: 1020,
            y: 50,
          },
        })
        nodes.push({
          id: 'fep-ACT',
          type: 'cpmnode',
          data: {
            label: 'fep-ACT'
          },
          position: {
            x: 1260,
            y: 50,
          },
        })
        // if (tcpgw_objects[i].tx.fep.tcpgw.from === 'FrameWork' && tcpgw_objects[i].tx.fep.tcpgw.to === 'FEP') {
          edges.push({
            id: ei++,
            type: 'smoothstep',
            label: 'req',
            labelShowBg: false,
            labelStyle: {
              fill: 'white'
            },
            source: 'ACT',
            sourceHandle: 'rs',
            target: 'fep-ACT',
            targetHandle: 'lt',
            animated: true,
            markerEnd: {
              type: 'arrow'
            }
          })
        // }
        // if (tcpgw_objects[i].tx.fep.tcpgw.from === 'FEP' && tcpgw_objects[i].tx.fep.tcpgw.to === 'FrameWork') {
          edges.push({
            id: ei++,
            type: 'smoothstep',
            label: 'req',
            labelShowBg: false,
            labelStyle: {
              fill: 'white'
            },
            source: 'fep-ACT',
            sourceHandle: 'ls',
            target: 'ACT',
            targetHandle: 'rt',
            animated: true,
            markerEnd: {
              type: 'arrow'
            }
          })
        // }
        edges.push({
          id: ei++,
          type: 'smoothstep',
          label: 'req',
          labelShowBg: false,
          labelStyle: {
            fill: 'white'
          },
          source: 'eai',
          sourceHandle: 'rsup',
          target: 'ACT',
          targetHandle: 'lt',
          animated: true,
          markerEnd: {
            type: 'arrow'
          }
        })
        edges.push({
          id: ei++,
          type: 'smoothstep',
          label: 'res',
          labelShowBg: false,
          labelStyle: {
            fill: 'white'
          },
          source: 'ACT',
          sourceHandle: 'ls',
          target: 'eai',
          targetHandle: 'rtup',
          animated: true,
          markerEnd: {
            type: 'arrow'
          }
        })
      }
      if (tcpgw_objects[i].tx.subtype === 'RTS') {
        nodes.push({
          id: 'RTS',
          type: 'cpmnode',
          data: {
            label: 'RTS'
          },
          position: {
            x: 1020,
            y: 150,
          },
        })
        nodes.push({
          id: 'fep-RTS',
          type: 'cpmnode',
          data: {
            label: 'fep-RTS'
          },
          position: {
            x: 1260,
            y: 150,
          },
        })
        // if (tcpgw_objects[i].tx.fep.tcpgw.from === 'FrameWork' && tcpgw_objects[i].tx.fep.tcpgw.to === 'FEP') {
          edges.push({
            id: ei++,
            type: 'smoothstep',
            label: 'req',
            labelShowBg: false,
            labelStyle: {
              fill: 'white'
            },
            source: 'RTS',
            sourceHandle: 'rs',
            target: 'fep-RTS',
            targetHandle: 'lt',
            animated: true,
            markerEnd: {
              type: 'arrow'
            }
          })
        // }
        // if (tcpgw_objects[i].tx.fep.tcpgw.from === 'FEP' && tcpgw_objects[i].tx.fep.tcpgw.to === 'FrameWork') {
          edges.push({
            id: ei++,
            type: 'smoothstep',
            label: 'req',
            labelShowBg: false,
            labelStyle: {
              fill: 'white'
            },
            source: 'fep-RTS',
            sourceHandle: 'ls',
            target: 'RTS',
            targetHandle: 'rt',
            animated: true,
            markerEnd: {
              type: 'arrow'
            }
          })
        // }
        edges.push({
          id: ei++,
          type: 'smoothstep',
          label: 'req',
          labelShowBg: false,
          labelStyle: {
            fill: 'white'
          },
          source: 'eai',
          sourceHandle: 'rsmid',
          target: 'RTS',
          targetHandle: 'lt',
          animated: true,
          markerEnd: {
            type: 'arrow'
          }
        })
        edges.push({
          id: ei++,
          type: 'smoothstep',
          label: 'res',
          labelShowBg: false,
          labelStyle: {
            fill: 'white'
          },
          source: 'RTS',
          sourceHandle: 'ls',
          target: 'eai',
          targetHandle: 'rtmid',
          animated: true,
          markerEnd: {
            type: 'arrow'
          }
        })
      }
      if (tcpgw_objects[i].tx.subtype === 'SIS') {
        nodes.push({
          id: 'SIS',
          type: 'cpmnode',
          data: {
            label: 'SIS'
          },
          position: {
            x: 1020,
            y: 250,
          },
        })
        nodes.push({
          id: 'fep-SIS',
          type: 'cpmnode',
          data: {
            label: 'fep-SIS'
          },
          position: {
            x: 1260,
            y: 250,
          },
        })
        // if (tcpgw_objects[i].tx.fep.tcpgw.from === 'FrameWork' && tcpgw_objects[i].tx.fep.tcpgw.to === 'FEP') {
          edges.push({
            id: ei++,
            type: 'smoothstep',
            label: 'req',
            labelShowBg: false,
            labelStyle: {
              fill: 'white'
            },
            source: 'SIS',
            sourceHandle: 'rs',
            target: 'fep-SIS',
            targetHandle: 'lt',
            animated: true,
            markerEnd: {
              type: 'arrow'
            }
          })
        // }
        // if (tcpgw_objects[i].tx.fep.tcpgw.from === 'FEP' && tcpgw_objects[i].tx.fep.tcpgw.to === 'FrameWork') {
          edges.push({
            id: ei++,
            type: 'smoothstep',
            label: 'req',
            labelShowBg: false,
            labelStyle: {
              fill: 'white'
            },
            source: 'fep-SIS',
            sourceHandle: 'ls',
            target: 'SIS',
            targetHandle: 'rt',
            animated: true,
            markerEnd: {
              type: 'arrow'
            }
          })
        // }
        edges.push({
          id: ei++,
          type: 'smoothstep',
          label: 'req',
          labelShowBg: false,
          labelStyle: {
            fill: 'white'
          },
          source: 'eai',
          sourceHandle: 'rsdown',
          target: 'SIS',
          targetHandle: 'lt',
          animated: true,
          markerEnd: {
            type: 'arrow'
          }
        })
        edges.push({
          id: ei++,
          type: 'smoothstep',
          label: 'res',
          labelShowBg: false,
          labelStyle: {
            fill: 'white'
          },
          source: 'SIS',
          sourceHandle: 'ls',
          target: 'eai',
          targetHandle: 'rtdown',
          animated: true,
          markerEnd: {
            type: 'arrow'
          }
        })
      }
      // if (tcpgw_objects[i].tx.fep.tcpgw.from === 'FEP' && tcpgw_objects[i].tx.fep.tcpgw.to === 'FrameWork') {
        edges.push({
          id: ei++,
          type: 'bezier',
          label: 'req',
          labelShowBg: false,
          labelStyle: {
            fill: 'white'
          },
          source: 'fep-' + tcpgw_objects[i].tx.header.system.osd_incd,
          sourceHandle: 'ls',
          target: 'fep-' + tcpgw_objects[i].tx.header.system.osd_rqs_chni_cd,
          targetHandle: 'rt',
          animated: true,
          markerEnd: {
            type: 'arrow'
          }
        })
        edges.push({
          id: ei++,
          type: 'smoothstep',
          label: 'req',
          labelShowBg: false,
          labelStyle: {
            fill: 'white'
          },
          source: tcpgw_objects[i].tx.header.system.osd_incd,
          sourceHandle: 'ls',
          target: 'fep-' + tcpgw_objects[i].tx.header.system.osd_incd,
          targetHandle: 'rt',
          animated: true,
          markerEnd: {
            type: 'arrow'
          }
        })
      // }
      // if (tcpgw_objects[i].tx.fep.tcpgw.from === 'FrameWork' && tcpgw_objects[i].tx.fep.tcpgw.to === 'FEP') {
        edges.push({
          id: ei++,
          type: 'bezier',
          label: 'req',
          labelShowBg: false,
          labelStyle: {
            fill: 'white'
          },
          source: 'fep-' + tcpgw_objects[i].tx.header.system.osd_rqs_chni_cd,
          sourceHandle: 'rs',
          target: 'fep-' + tcpgw_objects[i].tx.header.system.osd_incd,
          targetHandle: 'lt',
          animated: true,
          markerEnd: {
            type: 'arrow'
          }
        })
        edges.push({
          id: ei++,
          type: 'smoothstep',
          label: 'req',
          labelShowBg: false,
          labelStyle: {
            fill: 'white'
          },
          source: 'fep-' + tcpgw_objects[i].tx.header.system.osd_incd,
          sourceHandle: 'rs',
          target: tcpgw_objects[i].tx.header.system.osd_incd,
          targetHandle: 'lt',
          animated: true,
          markerEnd: {
            type: 'arrow'
          }
        })
      // }
    }
  }

  // console.log('edge :', edges);

  return {
    node: nodes,
    edge: edges,
  }
}

function calcPosition(node) {
  var pos = {};
  var sPos = '';
  var tPos = '';
  if (node === 'scs_dm_pcinetd') {          pos = { x: 40, y: 50 }; sPos = 'right'; tPos = 'bottom'; } 
  else if (node === 'scs_if_tprouter') {    pos = { x: 225, y: 50 }; sPos = 'right'; tPos = 'left'; } 
  else if (node === 'scs_dm_pcstatistic') { pos = { x: 225, y: 150 }; sPos = 'right'; tPos = 'left'; } 
  else if (node === 'scs_if_tpclient') {    pos = { x: 410, y: 50 }; sPos = 'right'; tPos = 'left'; } 
  else if (node === 'scs_if_push_send') {   pos = { x: 410, y: 250 }; sPos = 'left'; tPos = 'bottom'; } 
  else if (node === 'scs_dm_transpush') {   pos = { x: 225, y: 250 }; sPos = 'left'; tPos = 'right'; } 
  else if (node === 'scs_dm_pcxpush') {     pos = { x: 40, y: 250 }; sPos = 'top'; tPos = 'right'; }
  else { pos = {x: 0, y: 0}; sPos = 'right'; tPos = 'left'; }
  return { pos: pos, sPos: sPos, tPos: tPos };
}

module.exports = {flow};