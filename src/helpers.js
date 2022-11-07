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

const postTalkers = async (talkerObj) => {
  try {
    const talkers = await fs.readFile(talkerPath, 'utf-8');
    const talkersArray = JSON.parse(talkers);    
    const lastId = talkersArray[talkersArray.length - 1].id;
    const talkerToSave = { id: +lastId + 1, ...talkerObj };   
    talkersArray.push(talkerToSave);
    await fs.writeFile(talkerPath, JSON.stringify(talkersArray, null, 2));
    return talkerToSave;
  } catch (err) {
    console.error(`Erro ao ler o arquivo: ${err.message}`);
  }  
};

const updateTalkersById = async (id, newTalker) => {
  const { name, age, talk } = newTalker;  
  try {
    const talkers = await fs.readFile(talkerPath, 'utf-8');
    const talkersArray = JSON.parse(talkers);
    const newArrayTalkers = talkersArray.map((talker) => {
      if (talker.id === +id) {
        return { id: talker.id, name, age, talk };
      }
      return talker;
    });
    await fs.writeFile(talkerPath, JSON.stringify(newArrayTalkers, null, 2));
    return getTalkersById(id);
  } catch (err) {
    console.error(`Erro ao ler o arquivo: ${err.message}`);
  }
};

module.exports = {
  getAllTalkers,
  getTalkersById,
  postTalkers,
  updateTalkersById,
};
