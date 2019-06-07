const Datastore = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');

const adapter = new FileSync(path.join(__dirname, '/data.json'))

const db = Datastore(adapter);
db._.mixin(require('./lodashdb'));

db.defaults({ profiles: [], servers: [] }).write();

module.exports = {
    servers: {
        insert: (data) => {
            db.read().get('servers').insertServer(data).write();
        },
        get: {
            all: () => db.read().get('servers').value()
        }
    },
    profiles: {
        insert: (data) => {
            db.read().get('profiles').insertProfile(data).write();
        },
        get: {
            all: () => db.read().get('profiles').value(),
            byId: (id) => db.read().get('profiles').getById(id).value()
        }
    }
}
