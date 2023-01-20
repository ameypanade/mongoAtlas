
exports =async function(input) {
  console.log('input- ',input);
  const cust360 = context.services.get('mongodb-atlas').db('Digital').collection('cust360');
  const policy = context.services.get('mongodb-atlas').db('Digital').collection('policy');
  const claim = context.services.get('mongodb-atlas').db('Digital').collection('claim');
  
	let list1 = new Array();

let limit=10;


   const key=Object.keys(input);
  var value=Object.values(input);
  console.log('key- ',key);
  console.log('value- ',value);
  
var key1=null;
  var key2=null;
  var value1=null;
  var value2=null;
  var pipeline=[];
  
     if(key.includes("agentId")){
     let index=key.indexOf("agentId");
    key2=key[index];
    value2=input[key2];
    key.splice(index,1);
  }
  
     key1=key[0];
    console.log(key);
    console.log("****key****");
    console.log(key1);
    console.log(key2);
  
  if(key1!=null){
       value1=input[key1];
      // console.log(value1);
  }
   console.log("*****value***");
  console.log(value1);
  console.log(value2);
  
const mySet1 = new Set();
//mySet1.add("aaaaaaa")  ;         // Set [ 1 ]
  const cust360pipeline1 = [
  {
    '$search': {
      'index': 'cust360', 
      'compound': {
        'should': [
          {
            'autocomplete': {
              'query': value1, 
              'path': 'contactNumber',
			  'tokenOrder': 'sequential'
            }
          }, {
            'autocomplete': {
              'query': value1, 
              'path': 'fullName',
			  'tokenOrder': 'sequential'
            }
          }
        ]
      }
    }
  }, {
    '$limit': 10
  }, {
    '$project': {
      '_id': 0, 
      'fullName': 1, 
      'contactNumber': 1, 
      'score': {
        '$meta': 'searchScore'
      }
    }
  }, {
    '$sort': {
      'score': -1
    }
  }
];
const cust360pipeline2 = [
  {
    '$search': {
      'index': 'cust360', 
      'compound': {
        'should': [
          {
            'autocomplete': {
              'query': value1, 
              'path': 'telephoneNumber',
			  'tokenOrder': 'sequential'
            }
          }, {
            'autocomplete': {
              'query': value1, 
              'path': 'email',
      		  'tokenOrder': 'sequential',
      			  'fuzzy': {
      			     'maxEdits': 1,
      			   }
            }
          }
        ]
      }
    }
  }, {
    '$limit': 10
  }, {
    '$project': {
      '_id': 0, 
      'telephoneNumber': 1, 
      'email': 1, 
      'score': {
        '$meta': 'searchScore'
      }
    }
  }, {
    '$sort': {
      'score': -1
    }
  }
];
const policypipeline = [
  {
    '$search': {
      'index': 'policy', 
            'autocomplete': {
              'query': value1, 
              'path': '_id',
			  'tokenOrder': 'sequential'
            }
    }
  },{
    '$match': {
      'agentId': value2
    }
  }, {
    '$limit': 10
  }, {
    '$project': {
      '_id': 1,
      'score': {
        '$meta': 'searchScore'
      }
    }
  }, {
    '$sort': {
      'score': -1
    }
  }
];
const policyExternalPolicyNr = [
  {
    '$search': {
      'index': 'policy', 
            'autocomplete': {
              'query': value1, 
              'path': 'externalPolicyNr',
      			  'tokenOrder': 'sequential',
      			  'fuzzy': {
      			     'maxEdits': 1,
      			    }
            }
    }
  },{
    '$match': {
      'agentId': value2
    }
  }, {
    '$limit': 10
  }, {
    '$project': {
      'externalPolicyNr': 1,
      'score': {
        '$meta': 'searchScore'
      }
    }
  }, {
    '$sort': {
      'score': -1
    }
  }
];
const policyQuoteProposalNumber = [
  {
    '$search': {
      'index': 'policy', 
            'autocomplete': {
              'query': value1, 
              'path': 'proposalNumber',
      			  'tokenOrder': 'sequential',
      			  'fuzzy': {
      			     'maxEdits': 1,
      			   }
            }
    }
  },{
    '$addFields': {
      'expiry': {
        '$lt': [
          {
            '$dateDiff': {
              'startDate': '$$NOW', 
              'endDate': {
                '$toDate': '$validTillDate'
              }, 
              'unit': 'day'
            }
          }, 0
        ]
      }
    }
  },{
    '$match': {
	  'expiry': false,
      'agentId': value2
	  
    }
  }, {
    '$limit': 10
  }, {
    '$project': {
      'proposalNumber': 1,
      'score': {
        '$meta': 'searchScore'
      }
    }
  }, {
    '$sort': {
      'score': -1
    }
  }
];
const policyQuoteQuoteNumber = [
  {
    '$search': {
      'index': 'policy', 
            'autocomplete': {
              'query': value1, 
              'path': 'quoteNumber',
			  'tokenOrder': 'sequential'
            }
    }
  },{
    '$addFields': {
      'expiry': {
        '$lt': [
          {
            '$dateDiff': {
              'startDate': '$$NOW', 
              'endDate': {
                '$toDate': '$validTillDate'
              }, 
              'unit': 'day'
            }
          }, 0
        ]
      }
    }
  },{
    '$match': {
	  'expiry': false,
      'agentId': value2
    }
  }, {
    '$limit': 10
  }, {
    '$project': {
      'quoteNumber': 1,
      'score': {
        '$meta': 'searchScore'
      }
    }
  }, {
    '$sort': {
      'score': -1
    }
  }
];
const claimpipeline = [
  {
    '$search': {
      'index': 'claim', 
            'autocomplete': {
              'query': value1, 
              'path': 'claimNumber',
			  'tokenOrder': 'sequential'
            }
    }
  },{
    '$match': {
      'agentId': value2
    }
  }, {
    '$limit': 10
  }, {
    '$project': {
      '_id': 0, 
      'claimNumber': 1,
      'score': {
        '$meta': 'searchScore'
      }
    }
  }, {
    '$sort': {
      'score': -1
    }
  }
];


  const cust360Result1= await cust360.aggregate(cust360pipeline1).toArray()
  .then(data => {
   
    if(!(/[a-zA-Z]/g.test(value1))){
      
    for (i=0; i<data.length; i++){
      mySet1.add(data[i].contactNumber);
      
    }
  }
  else if(!(value1.includes('@'))){
    
    for (i=0; i<data.length; i++){
      mySet1.add(data[i].fullName);
    }
  }
  })
  .catch(err => {
    console.log(err.toString());
    return err.toString();
  });
  
    const policyQuoteProposalNumberResult=await policy.aggregate(policyQuoteProposalNumber).toArray()
  .then(data => {
    for (i=0; i<data.length; i++){
      mySet1.add(data[i].proposalNumber);
    }
  })
  .catch(err => {
    console.log(err.toString());
    return err.toString();
  });
  
  const policyQuoteQuoteNumberResult=await policy.aggregate(policyQuoteQuoteNumber).toArray()
  .then(data => {
    for (i=0; i<data.length; i++){
      mySet1.add(data[i].quoteNumber);
    }
  })
  .catch(err => {
    console.log(err.toString());
    return err.toString();
  });
  
  
  const cust360Result2=await cust360.aggregate(cust360pipeline2).toArray()
  .then(data => {
    if(!(/[a-zA-Z]/g.test(value1))){
  //     console.log("telephoneNumber");
    for (i=0; i<data.length; i++){
      mySet1.add(data[i].telephoneNumber);
    }
  }
  else {
  //     console.log("email");
    for (i=0; i<data.length; i++){
      mySet1.add(data[i].email);
    }
  }
  })
  .catch(err => {
    console.log(err.toString());
    return err.toString();
  });
  
    const policyResult=await policy.aggregate(policypipeline).toArray()
  .then(data => {
    for (i=0; i<data.length; i++){
      mySet1.add(data[i]._id);
    }
  })
  .catch(err => {
    console.log(err.toString());
    return err.toString();
  });
  
      const policyExternalPolicyNrResult=await policy.aggregate(policyExternalPolicyNr).toArray()
  .then(data => {
    for (i=0; i<data.length; i++){
      mySet1.add(data[i].externalPolicyNr);
    }
  })
  .catch(err => {
    console.log(err.toString());
    return err.toString();
  });
  

const claimResult=await claim.aggregate(claimpipeline).toArray()
  .then(data => {
 //   console.log("claimNumber");
    for (i=0; i<data.length; i++){
      mySet1.add(data[i].claimNumber);
    }
  })
  .catch(err => {
    console.log(err.toString());
    return err.toString();
  });
  
mySet1.forEach((value) => {
  list1.push(value);
});

  return list1;
};
