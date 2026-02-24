const fs = require('fs');
const csv = require('csv-parser');

const dietLogPath = require('path').resolve(process.env.HOME, '.openclaw/agents/bri/workspace/DIET_LOG.csv');
const outputPath = './public/data.json';

const today = new Date().toISOString().slice(0, 10);
let totalCalories = 0;
const targetCalories = 2000; // Assuming a target of 2000 calories

fs.createReadStream(dietLogPath)
  .pipe(csv())
  .on('data', (row) => {
    if (row.Date === today) {
      totalCalories += parseInt(row.Calories, 10);
    }
  })
  .on('end', () => {
    const data = {
      totalCalories,
      targetCalories,
    };

    if (!fs.existsSync('./public')) {
      fs.mkdirSync('./public');
    }

    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
    console.log(`Data updated successfully at ${outputPath}`);
  });
