// config.js
const env = process.env.NODE_ENV; // 'dev' or 'test'
const dev = {
    app: {
        port: 3000,
        provider: 'inmemory'
    }
};
const prod = {
    app: {
        port: 3000,
        provider: 'file'
    }
};
const azureprod = {
    app: {
        port: 80,
        provider: 'mongo'
    },
};
const config = {
    dev,
    prod,
    azureprod
};
function getConfig() {
    var current = config[env];
    if (current === undefined) {
        console.error('envionrment not set. please set NODE_ENV with one of (dev/prod/azureprod)');
        process.exit(-99);
    }
    return current;
}
module.exports = getConfig();
