// import app from './server/app';

import http from 'http';

// let app = require('./server/app').default;
const server = http.createServer();
// server.on('request', app);

// console.log(app);

listen(server);

server.listen(process.env.PORT || 7000);

// app.listen(3000);
// setInterval(() => {
//     console.log('ABCD4');
// }, 1000);

if (module.hot) {
    // console.log('HOT');

    module.hot.decline('./server.js', () => {
        console.log('DECLINE');
    });

    module.hot.accept('./server/app.js', () => {
        console.log('APP changes');
        listen(server);
        // app = require('./server/app').default;
        // server.removeAllListeners();
        // server.on('request', app);
    });
    // module.hot.dispose(() => app.close());
}

function listen(server) {
    try {
        const app = require('./server/app').default;
        server.removeAllListeners('request');
        server.on('request', app);
    } catch (error) {
        console.error(error);
    }
}
