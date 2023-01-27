exports = function({ query, headers, body}, response) {
    const {arg1, arg2} = query;
    return  arg1 +" "+ arg2;
};
