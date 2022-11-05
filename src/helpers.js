const fs = require('fs').promises;

const path = require('path');

const talkerPath = path.resolve(__dirname, 'talker.json');

const getAllTalkers = async () => {
  try {
    const talkers = await fs.readFile(talkerPath, 'utf-8');
    return JSON.parse(talkers);
  } catch (err) {
    console.error(`Erro ao ler o arquivo: ${err.message}`);
  }
};

const getTalkersById = async (id) => {
  try {
    const talkers = await fs.readFile(talkerPath, 'utf-8');
    const talkersArray = JSON.parse(talkers);
    const talkerWanted = talkersArray.find((talker) => talker.id === +id);
    return talkerWanted;
  } catch (err) {
    console.error(`Erro ao ler o arquivo: ${err.message}`);
  }
};

module.exports = {
  getAllTalkers,
  getTalkersById,
};