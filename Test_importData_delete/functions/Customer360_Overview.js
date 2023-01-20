
exports = async function(input) {
  const request = context.services.get('mongodb-atlas').db('Digital').collection('cust360');
  
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
   console.log(value1);
  console.log(value2);
  pipeline = [
  {
    '$match': {
      'contactId': value1
    }
  }, {
    '$project': {
      'contact': {
        'contactName': {
          '$ifNull': [
            '$fullName', null
          ]
        }, 
        'title': {
          '$ifNull': [
            '$title', null
          ]
        }, 
        'firstName': {
          '$ifNull': [
            '$firstName', null
          ]
        }, 
        'middleName': {
          '$ifNull': [
            '$middleName', null
          ]
        }, 
        'lastName': {
          '$ifNull': [
            '$lastName', null
          ]
        }, 
        'gender': {
          '$ifNull': [
            '$gender', null
          ]
        }, 
        'nationality': {
          '$ifNull': [
            '$nationality', null
          ]
        }, 
        'contactNumber': {
          '$ifNull': [
            '$contactNumber', null
          ]
        }, 
        'email': {
          '$ifNull': [
            '$email', null
          ]
        }, 
        'contactId': {
          '$ifNull': [
            '$contactId', null
          ]
        }, 
        'dateOfBirth': {
          '$ifNull': [
            '$dateOfBirth', null
          ]
        }, 
        'telephoneNumber': {
          '$ifNull': [
            '$telephoneNumber', null
          ]
        }, 
        'maritalStatus': {
          '$ifNull': [
            '$maritalStatus', null
          ]
        }, 
        'numberOfFamilyMembers': {
          '$ifNull': [
            '$numberOfFamilyMembers', null
          ]
        }, 
        'language': {
          '$ifNull': [
            '$language', null
          ]
        }, 
        'birthCountry': {
          '$ifNull': [
            '$birthCountry', null
          ]
        }, 
        'contactAddress': {
          '$ifNull': [
            {
              'city': {
                '$ifNull': [
                  '$addresses.city', null
                ]
              }, 
              'house': {
                '$ifNull': [
                  '$addresses.house', null
                ]
              }, 
              'postalCode': {
                '$ifNull': [
                  '$addresses.postalCode', null
                ]
              }, 
              'state': {
                '$ifNull': [
                  '$addresses.state', null
                ]
              }, 
              'street': {
                '$ifNull': [
                  '$addresses.street', null
                ]
              }
            }, null
          ]
        }, 
        'activeClaims': {
          '$ifNull': [
            '$noOfClaims', null
          ]
        }
      }, 
      'account': {
        'toatalClaimedAmount': {
          '$ifNull': [
            '$toatalClaimedAmount', null
          ]
        }, 
        'totalPolicyCount': {
          '$ifNull': [
            '$noOfPolicies', null
          ]
        }, 
        'activeClaims': {
          '$ifNull': [
            '$noOfClaims', null
          ]
        }, 
        'totalPremium': {
          '$ifNull': [
            '$totalPremium', null
          ]
        }
      }, 
      'insights': {
        'nextBestProduct': {
          '$ifNull': [
            '$nextBestProduct', null
          ]
        }, 
        'probabilitySaleNextBestProduct': {
          '$ifNull': [
            '$probabilitySaleNextBestProduct', null
          ]
        }
      }
    }
  }
];
}
else if(key1=='contactNumber'){
  console.log("% contactNumber agentId %");
  console.log(value1);
  console.log(value2);
  pipeline = [
  {
    '$match': {
      'contactNumber': value1
    }
  }, {
    '$project': {
      'contact': {
        'contactName': {
          '$ifNull': [
            '$fullName', null
          ]
        }, 
        'title': {
          '$ifNull': [
            '$title', null
          ]
        }, 
        'firstName': {
          '$ifNull': [
            '$firstName', null
          ]
        }, 
        'middleName': {
          '$ifNull': [
            '$middleName', null
          ]
        }, 
        'lastName': {
          '$ifNull': [
            '$lastName', null
          ]
        }, 
        'gender': {
          '$ifNull': [
            '$gender', null
          ]
        }, 
        'nationality': {
          '$ifNull': [
            '$nationality', null
          ]
        }, 
        'contactNumber': {
          '$ifNull': [
            '$contactNumber', null
          ]
        }, 
        'email': {
          '$ifNull': [
            '$email', null
          ]
        }, 
        'contactId': {
          '$ifNull': [
            '$contactId', null
          ]
        }, 
        'dateOfBirth': {
          '$ifNull': [
            '$dateOfBirth', null
          ]
        }, 
        'telephoneNumber': {
          '$ifNull': [
            '$telephoneNumber', null
          ]
        }, 
        'maritalStatus': {
          '$ifNull': [
            '$maritalStatus', null
          ]
        }, 
        'numberOfFamilyMembers': {
          '$ifNull': [
            '$numberOfFamilyMembers', null
          ]
        }, 
        'language': {
          '$ifNull': [
            '$language', null
          ]
        }, 
        'birthCountry': {
          '$ifNull': [
            '$birthCountry', null
          ]
        }, 
        'contactAddress': {
          '$ifNull': [
            {
              'city': {
                '$ifNull': [
                  '$addresses.city', null
                ]
              }, 
              'house': {
                '$ifNull': [
                  '$addresses.house', null
                ]
              }, 
              'postalCode': {
                '$ifNull': [
                  '$addresses.postalCode', null
                ]
              }, 
              'state': {
                '$ifNull': [
                  '$addresses.state', null
                ]
              }, 
              'street': {
                '$ifNull': [
                  '$addresses.street', null
                ]
              }
            }, null
          ]
        }, 
        'activeClaims': {
          '$ifNull': [
            '$noOfClaims', null
          ]
        }
      }, 
      'account': {
        'toatalClaimedAmount': {
          '$ifNull': [
            '$toatalClaimedAmount', null
          ]
        }, 
        'totalPolicyCount': {
          '$ifNull': [
            '$noOfPolicies', null
          ]
        }, 
        'activeClaims': {
          '$ifNull': [
            '$noOfClaims', null
          ]
        }, 
        'totalPremium': {
          '$ifNull': [
            '$totalPremium', null
          ]
        }
      }, 
      'insights': {
        'nextBestProduct': {
          '$ifNull': [
            '$nextBestProduct', null
          ]
        }, 
        'probabilitySaleNextBestProduct': {
          '$ifNull': [
            '$probabilitySaleNextBestProduct', null
          ]
        }
      }
    }
  }
];
}
  }

  
 if(key1=='contactId' & key2==null){
   console.log("% contactId %");
   pipeline = [
  {
    '$match': {
      'contactId': value1
    }
  }, {
    '$project': {
      'contact': {
        'contactName': {
          '$ifNull': [
            '$fullName', null
          ]
        }, 
        'title': {
          '$ifNull': [
            '$title', null
          ]
        }, 
        'firstName': {
          '$ifNull': [
            '$firstName', null
          ]
        }, 
        'middleName': {
          '$ifNull': [
            '$middleName', null
          ]
        }, 
        'lastName': {
          '$ifNull': [
            '$lastName', null
          ]
        }, 
        'gender': {
          '$ifNull': [
            '$gender', null
          ]
        }, 
        'nationality': {
          '$ifNull': [
            '$nationality', null
          ]
        }, 
        'contactNumber': {
          '$ifNull': [
            '$contactNumber', null
          ]
        }, 
        'email': {
          '$ifNull': [
            '$email', null
          ]
        }, 
        'contactId': {
          '$ifNull': [
            '$contactId', null
          ]
        }, 
        'dateOfBirth': {
          '$ifNull': [
            '$dateOfBirth', null
          ]
        }, 
        'telephoneNumber': {
          '$ifNull': [
            '$telephoneNumber', null
          ]
        }, 
        'maritalStatus': {
          '$ifNull': [
            '$maritalStatus', null
          ]
        }, 
        'numberOfFamilyMembers': {
          '$ifNull': [
            '$numberOfFamilyMembers', null
          ]
        }, 
        'language': {
          '$ifNull': [
            '$language', null
          ]
        }, 
        'birthCountry': {
          '$ifNull': [
            '$birthCountry', null
          ]
        }, 
        'contactAddress': {
          '$ifNull': [
            {
              'city': {
                '$ifNull': [
                  '$addresses.city', null
                ]
              }, 
              'house': {
                '$ifNull': [
                  '$addresses.house', null
                ]
              }, 
              'postalCode': {
                '$ifNull': [
                  '$addresses.postalCode', null
                ]
              }, 
              'state': {
                '$ifNull': [
                  '$addresses.state', null
                ]
              }, 
              'street': {
                '$ifNull': [
                  '$addresses.street', null
                ]
              }
            }, null
          ]
        }, 
        'activeClaims': {
          '$ifNull': [
            '$noOfClaims', null
          ]
        }
      }, 
      'account': {
        'toatalClaimedAmount': {
          '$ifNull': [
            '$toatalClaimedAmount', null
          ]
        }, 
        'totalPolicyCount': {
          '$ifNull': [
            '$noOfPolicies', null
          ]
        }, 
        'activeClaims': {
          '$ifNull': [
            '$noOfClaims', null
          ]
        }, 
        'totalPremium': {
          '$ifNull': [
            '$totalPremium', null
          ]
        }
      }, 
      'insights': {
        'nextBestProduct': {
          '$ifNull': [
            '$nextBestProduct', null
          ]
        }, 
        'probabilitySaleNextBestProduct': {
          '$ifNull': [
            '$probabilitySaleNextBestProduct', null
          ]
        }
      }
    }
  }
];
}
else if(key1=='contactNumber' & key2==null){
  console.log("% contactNumber %");
  pipeline = [
  {
    '$match': {
      'contactNumber': value1
    }
  }, {
    '$project': {
      'contact': {
        'contactName': {
          '$ifNull': [
            '$fullName', null
          ]
        }, 
        'title': {
          '$ifNull': [
            '$title', null
          ]
        }, 
        'firstName': {
          '$ifNull': [
            '$firstName', null
          ]
        }, 
        'middleName': {
          '$ifNull': [
            '$middleName', null
          ]
        }, 
        'lastName': {
          '$ifNull': [
            '$lastName', null
          ]
        }, 
        'gender': {
          '$ifNull': [
            '$gender', null
          ]
        }, 
        'nationality': {
          '$ifNull': [
            '$nationality', null
          ]
        }, 
        'contactNumber': {
          '$ifNull': [
            '$contactNumber', null
          ]
        }, 
        'email': {
          '$ifNull': [
            '$email', null
          ]
        }, 
        'contactId': {
          '$ifNull': [
            '$contactId', null
          ]
        }, 
        'dateOfBirth': {
          '$ifNull': [
            '$dateOfBirth', null
          ]
        }, 
        'telephoneNumber': {
          '$ifNull': [
            '$telephoneNumber', null
          ]
        }, 
        'maritalStatus': {
          '$ifNull': [
            '$maritalStatus', null
          ]
        }, 
        'numberOfFamilyMembers': {
          '$ifNull': [
            '$numberOfFamilyMembers', null
          ]
        }, 
        'language': {
          '$ifNull': [
            '$language', null
          ]
        }, 
        'birthCountry': {
          '$ifNull': [
            '$birthCountry', null
          ]
        }, 
        'contactAddress': {
          '$ifNull': [
            {
              'city': {
                '$ifNull': [
                  '$addresses.city', null
                ]
              }, 
              'house': {
                '$ifNull': [
                  '$addresses.house', null
                ]
              }, 
              'postalCode': {
                '$ifNull': [
                  '$addresses.postalCode', null
                ]
              }, 
              'state': {
                '$ifNull': [
                  '$addresses.state', null
                ]
              }, 
              'street': {
                '$ifNull': [
                  '$addresses.street', null
                ]
              }
            }, null
          ]
        }, 
        'activeClaims': {
          '$ifNull': [
            '$noOfClaims', null
          ]
        }
      }, 
      'account': {
        'toatalClaimedAmount': {
          '$ifNull': [
            '$toatalClaimedAmount', null
          ]
        }, 
        'totalPolicyCount': {
          '$ifNull': [
            '$noOfPolicies', null
          ]
        }, 
        'activeClaims': {
          '$ifNull': [
            '$noOfClaims', null
          ]
        }, 
        'totalPremium': {
          '$ifNull': [
            '$totalPremium', null
          ]
        }
      }, 
      'insights': {
        'nextBestProduct': {
          '$ifNull': [
            '$nextBestProduct', null
          ]
        }, 
        'probabilitySaleNextBestProduct': {
          '$ifNull': [
            '$probabilitySaleNextBestProduct', null
          ]
        }
      }
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
