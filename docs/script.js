const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const dietLogPath = path.resolve(process.env.HOME, 'workspaces/bri/DIET_LOG.csv');
const outputPath = './public/data.json';

const today = new Date().toISOString().slice(0, 10);
let total = 0;
const target = 1880;

fs.createReadStream(dietLogPath)
  .pipe(csv())
  .on('data', (row) => {
    if (row.Date === today) total += parseInt(row.Calories, 10) || 0;
  })
  .on('end', () => {
    const remaining = Math.max(0, target - total);
    const percent = Math.min(100, Math.round((total / target) * 100));
    
    // Generate the Emoji Bar for WhatsApp
    const blocks = 10;
    const filled = Math.round((percent / 100) * blocks);
    const emojiBar = "🟩".repeat(filled) + "⬜".repeat(blocks - filled);

    const data = {
      meta: { date: today, syncTime: new Date().toLocaleTimeString() },
      stats: { total, target, remaining, percent, emojiBar },
      shareString: `*📊 DAILY FUEL*\n${today}\n---\n*${total}* / ${target} kcal\n${emojiBar}\n---\n*Rem:* ${remaining} kcal`
    };

    if (!fs.existsSync('./public')) fs.mkdirSync('./public');
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
    console.log('✅ Manifest Updated.');
  });
