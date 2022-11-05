const fs = require('fs').promises;

const { json } = require('body-parser');
const path = require('path');

const talkerPath = path.resolve(__dirname, 'talker.json');

const getAllTalkers = async () => {
  try {
    const talkers = await fs.readFile(talkerPath, 'utf-8');
    console.log(talkers);
    return JSON.parse(talkers);
  } catch (err) {
    console.error(`Erro ao ler o arquivo: ${err.message}`);
  }
};

getAllTalkers();

module.exports = getAllTalkers;
