const fs = require('fs');
const path = require('path');

function staticMiddleware(rootDir) {
  return function (req, res, next) {
    const filePath = path.join(process.cwd(), rootDir, req.path);

    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        return next();
      }

      const stream = fs.createReadStream(filePath);

      stream.on('error', () => {
        if (!res.headersSent) {
          next();
        }
      });

      stream.pipe(res);
    });
  };
}

module.exports = staticMiddleware;
