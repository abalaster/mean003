node buildScripts\startMessage.js
node buildScripts\srcServer.js
npm-run-all --parallel open:src
npm audit
npm audit --audit-level high
npm audit fix

npm start
npm run share
babel-node buildScripts\startMessage
