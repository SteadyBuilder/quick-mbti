const fs = require('fs');
const path = require('path');
const { mbtiData } = require('./mbti_database');

const indexPath = path.join(__dirname, '..', 'index.html');
console.log('index.html is ready at ' + indexPath);
