const fs = require('fs');
const pdf = require('pdf-parse/lib/pdf-parse.js');

const dataBuffer = fs.readFileSync('./教材/考试分析.pdf');

pdf(dataBuffer).then(function(data) {
    // 输出前50000字符（约前几章内容）
    const text = data.text;
    console.log('=== PDF总页数:', data.numpages, '===');
    console.log('=== 总字符数:', text.length, '===');
    console.log('\n=== 目录/前50000字符内容 ===\n');
    console.log(text.substring(0, 50000));
}).catch(err => {
    console.error('解析失败:', err);
});
