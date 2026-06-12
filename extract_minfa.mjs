import { readFile, writeFile } from 'fs/promises';
import { PDFParse } from 'pdf-parse';

const inputPath = './教材/2026法律（非法学）考试分析彩色标注版-民法学.pdf';
const outputPath = './教材/民法学_文本.txt';

const buffer = await readFile(inputPath);
const parser = new PDFParse({ data: buffer });

const result = await parser.getText();
const text = result.text;

await writeFile(outputPath, text, 'utf8');

console.log('=== 民法学PDF总字符数:', text.length, '===');
console.log('文本已保存到', outputPath);
