const { defaultFunction } = require('./handler');
const routes = [

    {
        method: 'GET',
        path: '/test/{val}',
        handler: defaultFunction,
    },

];

module.exports = routes;