
exports = async function(input) {
  const request = context.services.get('mongodb-atlas').db('Digital').collection('policy');
   const key=Object.keys(input);
  var value=input[key[0]];
  console.log(key);
  
  var key1=null;
  var key2=null;
  var value1=null;
  var value2=null;
  var pipeline=[];
  
  console.log(key.indexOf("agentId"));
  
   if(key.includes("agentId")){
     let index=key.indexOf("agentId");
    key2=key[index];
    value2=input[key2];
    key.splice(index,1);
  }
  
   key1=key[0];
   value1=input[key1];
   console.log(key);
   console.log("****keys****");
   console.log(key1);
   console.log(key2);

  console.log("*****values***");
  console.log(value1);
  console.log(value2);

if(key2=='agentId'){
   console.log("agentId support pipline defined");
  pipeline =[
  {
    '$search': {
      'index': 'policy', 
      'phrase': {
        'query': value1, 
        'path': key
      }
    }
  }, {
    '$match': {
      'agentId': value2,
      'status.description': "Proposal"
    }
  }, {
    '$lookup': {
      'from': 'contact', 
      'localField': 'policyHolder.contactId', 
      'foreignField': 'contactId', 
      'as': 'contact'
    }
  }, {
    '$unwind': {
      'path': '$contact'
    }
  }
];
}
else{
  pipeline = [
  {
    '$search': {
      'index': 'policy', 
      'phrase': {
        'query': value, 
        'path': key
      }
    }
  }, {
    '$match': {
      'status.description': "Proposal"
    }
    },
    {
    '$lookup': {
      'from': 'contact', 
      'localField': 'policyHolder.contactId', 
      'foreignField': 'contactId', 
      'as': 'contact'
    }
  }, {
    '$unwind': {
      'path': '$contact'
    }
  }
];
  }
  return await request.aggregate(pipeline).toArray()
  .then(data => {
     return data;
  })
  .catch(err => {
    console.log(err.toString());
    return err.toString();
  });
};
