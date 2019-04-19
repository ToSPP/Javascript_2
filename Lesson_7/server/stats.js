const moment = require('moment');
const fs = require('fs');

const stats = {
  addAction(action, id_product) {
    fs.readFile('server/db/stats.json', 'utf-8', (err, data) => {
      if (err) {
        res.sendStatus(404);
      } else {
        const stats = JSON.parse(data);
        stats.push({
          action,
          id_product,
          timestamp: moment().format("DD.MM.YYYY HH:mm:ss"),
        });
        fs.writeFile('server/db/stats.json', JSON.stringify(stats, null, 4), (err) => {
          if (err) {
            res.sendStatus(404);
          }
        })
      }
    })
  },
};

module.exports = stats;