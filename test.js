const dao = require('./controllers/urlDao')
// dao.persistUrl('http://youtube.com')
const savedUrl = dao.getByIndex(1);
savedUrl.then(d => console.log(JSON.stringify(d)))