// This function is the endpoint's request handler.
exports = async function({ query, headers, body}, response) {
    const {contactId} = query;
    const collectionContact = context.services.get('mongodb-atlas').db('Digital').collection('contact');
    
    
    return await collectionContact.findOne({"contactId":contactId}).toArray()
      .then(data => {
        return data;
  });
};
