// This function is the endpoint's request handler.
exports = function({ custId, headers, body}, response) {
    const {customerId} = custId;
    return  customerId;
};
