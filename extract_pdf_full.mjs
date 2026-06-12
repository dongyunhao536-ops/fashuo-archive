import { readFile, writeFile } from 'fs/promises';
import { PDFParse } from 'pdf-parse';

const buffer = await readFile('./教材/考试分析.pdf');
const parser = new PDFParse({ data: buffer });

const result = await parser.getText();
const text = result.text;

// Save full text for reference
await writeFile('./教材/考试分析_文本.txt', text, 'utf8');

console.log('=== PDF总字符数:', text.length, '===');
console.log('文本已保存到 教材/考试分析_文本.txt');

// Print from 80000 to 160000
console.log('\n=== 第80000-160000字符（分论部分）===\n');
console.log(text.substring(80000, 160000));
