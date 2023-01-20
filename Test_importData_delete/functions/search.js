
exports = async function(input) {
   const key=Object.keys(input);
    console.log(key);
    
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
  console.log("****key****");
  console.log(key1);
  console.log(key2);
  
  if(key1!=null){
       value1=input[key1];
       console.log("value1");
       console.log(value1);
  }
  
  const request = context.services.get('mongodb-atlas').db('Digital').collection('cust360');
  if(key2=='agentId'){
    console.log("%%%%agentId%");
   pipeline = [
  {
    '$search': {
      'index': 'cust360', 
      'phrase': {
        'query': value1, 
        'path': [
          'contactNumber', 'fullName', 'policyNumber', 'telephoneNumber', 'email', 'policy._id','policy.externalPolicyNr','policy.externalProposalNr', 'claim.claimNumber', 'quote.proposalNumber', 'quote.quoteNumber'
        ]
      }
    }
  }, {
    '$project': {
      '_id': 0, 
      'contacts': {
        'contactName': {
          '$ifNull': [
            '$fullName', null
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
        'language': {
          '$ifNull': [
            '$language', null
          ]
        }, 
        'contactStatus': {
          '$ifNull': [
            '$contactStatus', null
          ]
        }, 
        'contactAddress': {
          '$ifNull': [
            {
              'house': {
                '$ifNull': [
                  '$addresses.house', null
                ]
              }, 
              'street': {
                '$ifNull': [
                  '$addresses.street', null
                ]
              }, 
              'city': {
                '$ifNull': [
                  '$addresses.city', null
                ]
              }, 
              'state': {
                '$ifNull': [
                  '$addresses.state', null
                ]
              }, 
              'postalCode': {
                '$ifNull': [
                  '$addresses.postalCode', null
                ]
              }
            }, null
          ]
        }, 
        'activeClaims': {
          '$ifNull': [
            '$noOfClaims', null
          ]
        }, 
        'totalPolicyCount': {
          '$ifNull': [
            '$noOfPolicies', null
          ]
        }
      }, 
      'policies': {
        '$cond': {
          'if': {
            '$gte': [
              '$policy', null
            ]
          }, 
          'then': {
            '$map': {
              'input': {
                '$filter': {
                  'input': '$policy', 
                  'cond': {
                    '$eq': [
                      '$$item.agentId', value2
                    ]
                  }, 
                  'as': 'item'
                }
              }, 
              'as': 'policy', 
              'in': {
                'lobId': {
                  '$ifNull': [
                    '$$policy.lineOfBusiness.id', null
                  ]
                }, 
                'lobDescription': {
                  '$ifNull': [
                    '$$policy.lineOfBusiness.Description', null
                  ]
                }, 
                'agentId': {
                  '$ifNull': [
                    '$$policy.agentId', null
                  ]
                }, 
                'policyNumber': {
                  '$ifNull': [
                    '$$policy.policyNumber', null
                  ]
                }, 
                'policyHeaderId': {
                  '$ifNull': [
                    '$$policy.policyHeaderId', null
                  ]
                }, 
                'policyHeaderNumber': {
                  '$ifNull': [
                    '$$policy.policyHeaderNumber', null
                  ]
                }, 
                '_id': {
                  '$ifNull': [
                    '$$policy._id', null
                  ]
                }, 
                'externalPolicyNr': {
                  '$ifNull': [
                    '$$policy.externalPolicyNr', null
                  ]
                }, 
                'externalProposalNr': {
                  '$ifNull': [
                    '$$policy.externalProposalNr', null
                  ]
                }, 
                'policyStatus': {
                  '$ifNull': [
                    '$$policy.policyStatus', null
                  ]
                }, 
                'policyStartDate': {
                  '$ifNull': [
                    '$$policy.startDate', null
                  ]
                }, 
                'policyId': {
                  '$ifNull': [
                    '$$policy.policyId', null
                  ]
                }, 
                'policyEndDate': {
                  '$ifNull': [
                    '$$policy.endDate', null
                  ]
                }, 
                'yearlyPremium': {
                  '$ifNull': [
                    '$$policy.policyPremium', null
                  ]
                }, 
                'policyHolderName': {
                  '$ifNull': [
                    '$$policy.policyHolderName', null
                  ]
                }, 
                'paymentScheduler': {
                  '$ifNull': [
                    '$$policy.paymentScheduler', null
                  ]
                }, 
                'risk': {
                  '$ifNull': [
                    '$$policy.risk', null
                  ]
                }, 
                'assetDetails': {
                  'assetDescription': {
                    '$ifNull': [
                      '$$policy.assetDetails.assetDescription', null
                    ]
                  }, 
                  'plateNumber': {
                    '$ifNull': [
                      '$$policy.assetDetails.plateNumber', null
                    ]
                  }
                }
              }
            }
          }, 
          'else': []
        }
      }, 
      'claims': {
        '$cond': {
          'if': {
            '$gte': [
              '$claim', null
            ]
          }, 
          'then': {
            '$map': {
              'input': {
                '$filter': {
                  'input': '$claim', 
                  'cond': {
                    '$eq': [
                      '$$item.agentId', value2
                    ]
                  }, 
                  'as': 'item'
                }
              }, 
              'as': 'claim', 
              'in': {
                'claimNumber': {
                  '$ifNull': [
                    '$$claim.claimNumber', null
                  ]
                }, 
                'policyNumber': {
                  '$ifNull': [
                    '$$claim.policyNumber', null
                  ]
                }, 
                'claimStatus': {
                  '$ifNull': [
                    '$$claim.claimStatus', null
                  ]
                }, 
                'claimDate': {
                  '$ifNull': [
                    '$$claim.eventDate', null
                  ]
                }, 
                'claimAmount': {
                  '$ifNull': [
                    '$$claim.claimAmount', null
                  ]
                }, 
                'claimDescription': {
                  '$ifNull': [
                    '$$claim.claimEventDescription', null
                  ]
                }, 
                'lobDescription': {
                  '$ifNull': [
                    '$$claim.lobDescription', null
                  ]
                }, 
                'policyHolderName': {
                  '$ifNull': [
                    '$$claim.policyHolderName', null
                  ]
                }, 
                'assetDetails': {
                  'assetDescription': {
                    '$ifNull': [
                      '$$claim.assetDetails.assetDescription', null
                    ]
                  }, 
                  'plateNumber': {
                    '$ifNull': [
                      '$$claim.assetDetails.plateNumber', null
                    ]
                  }
                }
              }
            }
          }, 
          'else': []
        }
      },
	  'quotes': {
        '$cond': {
          'if': {
            '$gte': [
              '$quote', null
            ]
          }, 
          'then': {
            '$map': {
              'input':'$quote',  
              'as': 'quote', 
              'in': {
                'quoteNumber': {
                  '$ifNull': [
                    '$$quote.quoteNumber', null
                  ]
                }, 
                'quoteId': {
                  '$ifNull': [
                    '$$quote.quoteId', null
                  ]
                }, 
                'proposalNumber': {
                  '$ifNull': [
                    '$$quote.proposalNumber', null
                  ]
                }, 
                'validTillDate': {
                  '$ifNull': [
                    '$$quote.validTillDate', null
                  ]
                }, 
                'creationDate': {
                  '$ifNull': [
                    '$$quote.creationDate', null
                  ]
                }, 
                'AUD_SRC_SYS_ID': {
                  '$ifNull': [
                    '$$quote.AUD_SRC_SYS_ID', null
                  ]
                }, 
                'coverage': {
                  '$ifNull': [
                    '$$quote.coverage', null
                  ]
                }, 
                'AUD_SRC_SYS_NM': {
                  '$ifNull': [
                    '$$quote.AUD_SRC_SYS_NM', null
                  ]
                }, 
                'totalPremium': {
                  '$ifNull': [
                    '$$quote.totalPremium', null
                  ]
                }, 
                'reason': {
                  '$ifNull': [
                    '$$quote.reason', null
                  ]
                }, 
                'endDate': {
                  '$ifNull': [
                    '$$quote.endDate', null
                  ]
                }, 
                'startDate': {
                  '$ifNull': [
                    '$$quote.product.startDate', null
                  ]
                }, 
                'policyHolderName': {
                  '$ifNull': [
                    '$$quote.policyHolderName', null
                  ]
                }, 
                'product': {
                  '$ifNull': [
                    '$$quote.product', null
                  ]
                }, 
                'status': {
                  '$ifNull': [
                    '$$quote.status', null
                  ]
                }
              }
            }
          }, 
          'else': []
        }
      }
    }
  }, {
    '$group': {
      '_id': null, 
      'contacts': {
        '$push': '$contacts'
      }, 
      'policies': {
        '$push': '$policies'
      }, 
      'claims': {
        '$push': '$claims'
      }, 
      'quotes': {
        '$push': '$quotes'
      }
    }
  }, {
    '$project': {
      '_id': 0, 
      'contacts': '$contacts', 
      'policies': {
        '$reduce': {
          'input': '$policies', 
          'initialValue': [], 
          'in': {
            '$concatArrays': [
              '$$value', '$$this'
            ]
          }
        }
      }, 
      'claims': {
        '$reduce': {
          'input': '$claims', 
          'initialValue': [], 
          'in': {
            '$concatArrays': [
              '$$value', '$$this'
            ]
          }
        }
      }, 
      'quotes': {
        '$reduce': {
          'input': '$quotes', 
          'initialValue': [], 
          'in': {
            '$concatArrays': [
              '$$value', '$$this'
            ]
          }
        }
      }
    }
  }
];
}

else{
  pipeline = [
  {
    '$search': {
      'index': 'cust360', 
      'phrase': {
        'query': value1, 
        'path': [
          'contactNumber', 'fullName', 'policyNumber', 'telephoneNumber', 'email', 'policy._id','policy.externalPolicyNr','policy.externalProposalNr', 'claim.claimNumber', 'quote.proposalNumber', 'quote.quoteNumber'
        ]
      }
    }
  }, {
    '$project': {
      '_id': 0, 
      'contacts': {
        'contactName': {
          '$ifNull': [
            '$fullName', null
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
        'gender': {
          '$ifNull': [
            '$gender', null
          ]
        }, 
        'totalPremium': {
          '$ifNull': [
            '$totalPremium', null
          ]
        }, 
        'nextBestProduct': {
          '$ifNull': [
            '$nextBestProduct', null
          ]
        }, 
        'probabilitySaleNextBestProduct': {
          '$ifNull': [
            '$probabilitySaleNextBestProduct', null
          ]
        }, 
        'language': {
          '$ifNull': [
            '$language', null
          ]
        }, 
        'contactStatus': {
          '$ifNull': [
            '$contactStatus', null
          ]
        }, 
        'toatalClaimedAmount': {
          '$ifNull': [
            '$toatalClaimedAmount', null
          ]
        }, 
        'contactAddress': {
          '$ifNull': [
            '$addresses', null
          ]
        }, 
        'activeClaims': {
          '$ifNull': [
            '$noOfClaims', null
          ]
        }, 
        'totalPolicyCount': {
          '$ifNull': [
            '$noOfPolicies', null
          ]
        }
      }, 
      'policies': {
        '$cond': {
          'if': {
            '$gte': [
              '$policy', null
            ]
          }, 
          'then': {
            '$map': {
              'input':'$policy',
              'as': 'policy', 
              'in': {
                'lobId': {
                  '$ifNull': [
                    '$$policy.lineOfBusiness.id', null
                  ]
                }, 
                'lobDescription': {
                  '$ifNull': [
                    '$$policy.lineOfBusiness.Description', null
                  ]
                }, 
                'agentId': {
                  '$ifNull': [
                    '$$policy.agentId', null
                  ]
                }, 
                'proposalNumber': {
                  '$ifNull': [
                    '$$policy.proposalNumber', null
                  ]
                },
                'policyNumber': {
                  '$ifNull': [
                    '$$policy.policyNumber', null
                  ]
                }, 
                'policyHeaderId': {
                  '$ifNull': [
                    '$$policy.policyHeaderId', null
                  ]
                }, 
                'policyHeaderNumber': {
                  '$ifNull': [
                    '$$policy.policyHeaderNumber', null
                  ]
                }, 
                '_id': {
                  '$ifNull': [
                    '$$policy._id', null
                  ]
                }, 
                'externalPolicyNr': {
                  '$ifNull': [
                    '$$policy.externalPolicyNr', null
                  ]
                }, 
                'product': {
                  '$ifNull': [
                    '$$policy.product.description', null
                  ]
                }, 
                'externalProposalNr': {
                  '$ifNull': [
                    '$$policy.externalProposalNr', null
                  ]
                }, 
                'policyStatus': {
                  '$ifNull': [
                    '$$policy.policyStatus', null
                  ]
                }, 
                'policyStartDate': {
                  '$ifNull': [
                    '$$policy.startDate', null
                  ]
                }, 
                'policyId': {
                  '$ifNull': [
                    '$$policy.policyId', null
                  ]
                }, 
                'policyEndDate': {
                  '$ifNull': [
                    '$$policy.endDate', null
                  ]
                }, 
                'yearlyPremium': {
                  '$ifNull': [
                    '$$policy.policyPremium', null
                  ]
                }, 
                'policyHolderName': {
                  '$ifNull': [
                    '$$policy.policyHolderName', null
                  ]
                }, 
                'paymentScheduler': {
                  '$ifNull': [
                    '$$policy.paymentScheduler', null
                  ]
                }, 
                'risk': {
                  '$ifNull': [
                    '$$policy.risk', null
                  ]
                }, 
                'assetDetails': {
                  'assetDescription': {
                    '$ifNull': [
                      '$$policy.assetDetails.assetDescription', null
                    ]
                  }, 
                  'plateNumber': {
                    '$ifNull': [
                      '$$policy.assetDetails.plateNumber', null
                    ]
                  }
                }
              }
            }
          }, 
          'else': []
        }
      }, 
      'claims': {
        '$cond': {
          'if': {
            '$gte': [
              '$claim', null
            ]
          }, 
          'then': {
            '$map': {
              'input':'$claim', 
              'as': 'claim', 
              'in': {
                'claimNumber': {
                  '$ifNull': [
                    '$$claim.claimNumber', null
                  ]
                }, 
                'claimId': {
                  '$ifNull': [
                    '$$claim.claimId', null
                  ]
                }, 
                'policyNumber': {
                  '$ifNull': [
                    '$$claim.policyNumber', null
                  ]
                }, 
                'claimStatus': {
                  '$ifNull': [
                    '$$claim.claimStatus', null
                  ]
                }, 
                'productName': {
                  '$ifNull': [
                    '$$claim.productName', null
                  ]
                },  
                'notificationDate': {
                  '$ifNull': [
                    '$$claim.notificationDate', null
                  ]
                }, 
                'eventDate': {
                  '$ifNull': [
                    '$$claim.eventDate', null
                  ]
                }, 
                'updateDate': {
                  '$ifNull': [
                    '$$claim.updateDate', null
                  ]
                }, 
                'claimDate': {
                  '$ifNull': [
                    '$$claim.claimDate', null
                  ]
                }, 
                'uploadedFileCount': {
                  '$ifNull': [
                    '$$claim.uploadedFileCount', null
                  ]
                }, 
                'causeOfLoss': {
                  '$ifNull': [
                    '$$claim.causeOfLoss.description', null
                  ]
                }, 
                'claimAmount': {
                  '$ifNull': [
                    '$$claim.claimAmount', null
                  ]
                }, 
                'claimDescription': {
                  '$ifNull': [
                    '$$claim.claimEventDescription', null
                  ]
                }, 
                'policyInfo': {
                  '$ifNull': [
                    '$$claim.policyInfo', null
                  ]
                }, 
                'lobDescription': {
                  '$ifNull': [
                    '$$claim.lobDescription', null
                  ]
                }, 
                'policyHolderName': {
                  '$ifNull': [
                    '$$claim.policyHolderName', null
                  ]
                }, 
                'assetDetails': {
                  'assetDescription': {
                    '$ifNull': [
                      '$$claim.assetDetails.assetDescription', null
                    ]
                  }, 
                  'plateNumber': {
                    '$ifNull': [
                      '$$claim.assetDetails.plateNumber', null
                    ]
                  }
                }
              }
            }
          }, 
          'else': []
        }
      }, 
      'quotes': {
        '$cond': {
          'if': {
            '$gte': [
              '$quote', null
            ]
          }, 
          'then': {
            '$map': {
              'input':'$quote',  
              'as': 'quote', 
              'in': {
                'quoteNumber': {
                  '$ifNull': [
                    '$$quote.quoteNumber', null
                  ]
                }, 
                'quoteId': {
                  '$ifNull': [
                    '$$quote.quoteId', null
                  ]
                }, 
                'proposalNumber': {
                  '$ifNull': [
                    '$$quote.proposalNumber', null
                  ]
                }, 
                'validTillDate': {
                  '$ifNull': [
                    '$$quote.validTillDate', null
                  ]
                }, 
                'creationDate': {
                  '$ifNull': [
                    '$$quote.creationDate', null
                  ]
                }, 
                'AUD_SRC_SYS_ID': {
                  '$ifNull': [
                    '$$quote.AUD_SRC_SYS_ID', null
                  ]
                }, 
                'coverage': {
                  '$ifNull': [
                    '$$quote.coverage', null
                  ]
                }, 
                'AUD_SRC_SYS_NM': {
                  '$ifNull': [
                    '$$quote.AUD_SRC_SYS_NM', null
                  ]
                }, 
                'totalPremium': {
                  '$ifNull': [
                    '$$quote.totalPremium', null
                  ]
                }, 
                'reason': {
                  '$ifNull': [
                    '$$quote.reason', null
                  ]
                }, 
                'endDate': {
                  '$ifNull': [
                    '$$quote.endDate', null
                  ]
                }, 
                'startDate': {
                  '$ifNull': [
                    '$$quote.product.startDate', null
                  ]
                }, 
                'policyHolderName': {
                  '$ifNull': [
                    '$$quote.policyHolderName', null
                  ]
                }, 
                'product': {
                  '$ifNull': [
                    '$$quote.product', null
                  ]
                }, 
                'status': {
                  '$ifNull': [
                    '$$quote.status', null
                  ]
                }
              }
            }
          }, 
          'else': []
        }
      }
    }
  }, {
    '$group': {
      '_id': null, 
      'contacts': {
        '$push': '$contacts'
      }, 
      'policies': {
        '$push': '$policies'
      }, 
      'claims': {
        '$push': '$claims'
      }, 
      'quotes': {
        '$push': '$quotes'
      }
    }
  }, {
    '$project':{
      '_id': 0, 
      'contacts': '$contacts', 
      'policies': {
        '$reduce': {
          'input': '$policies', 
          'initialValue': [], 
          'in': {
            '$concatArrays': [
              '$$value', '$$this'
            ]
          }
        }
      }, 
      'claims': {
        '$reduce': {
          'input': '$claims', 
          'initialValue': [], 
          'in': {
            '$concatArrays': [
              '$$value', '$$this'
            ]
          }
        }
      }, 
      'quotes': {
        '$reduce': {
          'input': '$quotes', 
          'initialValue': [], 
          'in': {
            '$concatArrays': [
              '$$value', '$$this'
            ]
          }
        }
      }
    }
  }
];
}

  return await request.aggregate(pipeline).toArray()
  .then(data => {
    console.log(data.length);
    return data;
  })
  .catch(err => {
    console.log(err.toString());
    return err.toString();
  });
};