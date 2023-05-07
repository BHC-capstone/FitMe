const session = require('express-session');
const MemoryStore = session.MemoryStore;

const sessionStore = new MemoryStore();

module.exports = sessionStore;
