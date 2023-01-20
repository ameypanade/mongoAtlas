
exports = async function(input) {
  const request = context.services.get('mongodb-atlas').db('Digital').collection('policy');
  
  const key=Object.keys(input);
  var value=input[key[0]];
  console.log(key);
  
 
  
  var key1=null;
  var key2=null;
  var value1=null;
  var value2=null;
  var pipeline=[null];
  
 console.log("@@@@@@");
  console.log(key.indexOf("agentId"));
  
   if(key.includes("agentId")){
     var index=key.indexOf("agentId");
    key2=key[index];
    key.splice(index,1);
  }
  
   key1=key[0];
   console.log(key);
   console.log("********");
  console.log(key1);
  console.log(key2);
  if(key1!=null){
    
      if(key1=='contactId'){
       value1=input[key1];
       console.log(value1);
      }

      else if(key1=='contactNumber'){
       value1=input[key1];
       console.log(value1);
      }
  }
  
    if(key2=="agentId"){
   value2=input[key2];
   
    if(key1=='contactId'){
   console.log("% contactId agentId %");
  pipeline = [{
    '$match': {
      'policyHolder.contactId': value1,
       "agentId":value2,
      'status.description': "Policy"
    }
  }];
}
else if(key1=='contactNumber'){
  console.log("% contactNumber agentId %");
  pipeline = [{
    '$match': {
      'policyHolder.contactNumber': value1,
      "agentId":value2,
      'status.description': "Policy"
    }
  }];
}
  }

  
 if(key1=='contactId' & key2==null){
   console.log("% contactId %");
  pipeline = [{
    '$match': {
      'policyHolder.contactId': value1,
      'status.description': "Policy"
    }
  }];
}
else if(key1=='contactNumber' & key2==null){
  console.log("% contactNumber %");
  pipeline = [{
    '$match': {
      'policyHolder.contactNumber': value1,
      'status.description': "Policy"
    }
  }];
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
