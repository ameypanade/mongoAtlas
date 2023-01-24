// This function is the endpoint's request handler.
exports = function({ query, headers, body}, response) {
    const {contactId} = query;
    return  contactId;
};
