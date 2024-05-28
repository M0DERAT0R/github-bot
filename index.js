const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');
const FILE_PATH = './data.json';


const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const makeCommit = async (n) => {
    if (n <= 0) return; 

    const x = getRandomInt(0, 54);
    const y = getRandomInt(0, 6);
    const DATE = moment().subtract(1, 'y').add(1, 'd')
                         .add(x, 'w').add(y, 'd').format(); 

    const data = {
        date: DATE
    };

    try {
       
        await jsonfile.writeFile(FILE_PATH, data);

        
        const git = simpleGit();
        await git.add([FILE_PATH]);
        await git.commit(DATE, { '--date': DATE });
        await git.push();

        console.log('File committed and pushed successfully with date:', DATE);
        await makeCommit(n - 1); 
    } catch (err) {
        console.error('Error:', err);
    }
};


makeCommit(500);
