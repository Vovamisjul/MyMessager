class BDDAO {
    mysql = require('mysql');
    connection = this.mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'my_messager'
    });
    constructor() {
        this.connection.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
        })
    }
    async perform(sql, ...params) {
        console.log(params);
        return new Promise(((resolve, reject) => {
            this.connection.query(sql, params, function (err, result) {
                if (err)
                    reject(err);
                resolve(result);
            });
        }))
    }
}
let bdDAO = new BDDAO();
module.exports = bdDAO;