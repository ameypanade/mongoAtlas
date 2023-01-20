
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
  //console.log(key.indexOf("agentId"));
  
   if(key.includes("paymentType")){
     var index=key.indexOf("paymentType");
    key2=key[index];
    value2=input[key2];
    key.splice(index,1);
  }
  
   key1=key[0];
   value1=input[key1];
   console.log(key);
   console.log("***keys*****");
  console.log(key1);
  console.log(key2);
    console.log("***values*****");
  console.log(value1);
  console.log(value2);
  
    if(key2=="paymentType" & value2 == "payment"){
   console.log("% with paymentType - Payment %");
  pipeline = [
    {
    '$search': {
      'index': 'cust360', 
      'phrase': {
        'query': value1, 
        'path': key1
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
        'toatalClaimedAmount': {
          '$ifNull': [
            '$toatalClaimedAmount', null
          ]
        }, 
        'contactAddress': {
          '$ifNull': [
            {
              'addressLine1': {
                '$ifNull': [
                  '$addresses.addressLine1', null
                ]
              }, 
              'addressLine2': {
                '$ifNull': [
                  '$addresses.addressLine2', null
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
              'zipCode': {
                '$ifNull': [
                  '$addresses.zipCode', null
                ]
              }
            }, null
          ]
        }, 
        'totalClaimsCount': {
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
              'input': '$policy', 
              'as': 'policy', 
              'in': {
                'paymentScheduler': {
                  '$filter': {
					'input': '$$policy.paymentScheduler',
					'as': 'item',
					'cond': { '$ne': [ '$$item.status', 'Paid' ] }
					}
                },
                'lobId': {
                  '$ifNull': [
                    { '$arrayElemAt': ['$$policy.lobId',0]}, null
                  ]
                }, 
                'lobDescription': {
                  '$ifNull': [
                    { '$arrayElemAt': ['$$policy.lobDescription',0]}, null
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
      }
    }
  }, {
    '$addFields': {
      'policies': {
        '$filter': {
          'input': '$policies', 
          'as': 'item', 
          'cond': {
            '$gt': [
              {
                '$size': {
                  '$ifNull': [
                    '$$item.paymentScheduler', []
                  ]
                }
              }, 0
            ]
          }
        }
      }
    }
  },  {
    '$group': {
      '_id': null, 
      'contacts': {
        '$push': '$contacts'
      }, 
      'policies': {
        '$push': '$policies'
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
      }
    }
  }
];
  }

 if(key2=="paymentType" & value2 == "invoice"){
   console.log("% with paymentType - Invoice %");
  pipeline = [
    {
    '$search': {
      'index': 'cust360', 
      'phrase': {
        'query': value1, 
        'path': key1
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
        'toatalClaimedAmount': {
          '$ifNull': [
            '$toatalClaimedAmount', null
          ]
        }, 
        'contactAddress': {
          '$ifNull': [
            {
              'addressLine1': {
                '$ifNull': [
                  '$addresses.addressLine1', null
                ]
              }, 
              'addressLine2': {
                '$ifNull': [
                  '$addresses.addressLine2', null
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
              'zipCode': {
                '$ifNull': [
                  '$addresses.zipCode', null
                ]
              }
            }, null
          ]
        }, 
        'totalClaimsCount': {
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
              'input': '$policy', 
              'as': 'policy', 
              'in': {
                'paymentScheduler': {
                  '$filter': {
					'input': '$$policy.paymentScheduler',
					'as': 'item',
					'cond': { '$or': [
						{'$eq': [ '$$item.status', 'Paid' ]},
						{'$eq': [ '$$item.status', 'Partially Paid' ]} 	
						]						
					  }
					}
                },
                'lobId': {
                  '$ifNull': [
                    { '$arrayElemAt': ['$$policy.lobId',0]}, null
                  ]
                }, 
                'lobDescription': {
                  '$ifNull': [
                    { '$arrayElemAt': ['$$policy.lobDescription',0]}, null
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
      }
    }
  }, {
    '$addFields': {
      'policies': {
        '$filter': {
          'input': '$policies', 
          'as': 'item', 
          'cond': {
            '$gt': [
              {
                '$size': {
                  '$ifNull': [
                    '$$item.paymentScheduler', []
                  ]
                }
              }, 0
            ]
          }
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
      }
    }
  }
];
  }
  
 if(key1!=null & value2==null){
   console.log("% without paymentType %");
   pipeline = [
  {
    '$search': {
      'index': 'cust360', 
      'phrase': {
        'query': value1, 
        'path': key1
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
            {
              'addressLine1': {
                '$ifNull': [
                  '$addresses.addressLine1', null
                ]
              }, 
              'addressLine2': {
                '$ifNull': [
                  '$addresses.addressLine2', null
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
              'zipCode': {
                '$ifNull': [
                  '$addresses.zipCode', null
                ]
              }
            }, null
          ]
        }, 
        'totalClaimsCount': {
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
              'input': '$policy', 
              'as': 'policy', 
              'in': {
                'lobId': {
                  '$ifNull': [
                    { '$arrayElemAt': ['$$policy.lobId',0]}, null
                  ]
                }, 
                'lobDescription': {
                  '$ifNull': [
                    { '$arrayElemAt': ['$$policy.lobDescription',0]}, null
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
