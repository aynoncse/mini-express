const Router = require('./router');

function createRouter() {
    const router = new Router();

    function handler(req, res) {
        router.handle(req, res);
    }

    handler.get = function (path, handler) {
        router.register('GET', path, handler);
    };

    handler.post = function (path, handler) {
        router.register('POST', path, handler);
    };

    return handler;
}

module.exports = createRouter;