import { readFile } from 'fs/promises';
import { PDFParse } from 'pdf-parse';

const buffer = await readFile('./教材/考试分析.pdf');
const parser = new PDFParse({ data: buffer });

const result = await parser.getText();
const text = result.text;

console.log('=== 总字符数:', text.length, '===');
console.log('\n=== 内容（前80000字符）===\n');
console.log(text.substring(0, 80000));
