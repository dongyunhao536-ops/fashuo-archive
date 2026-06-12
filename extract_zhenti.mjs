import { readFile, writeFile, readdir, mkdir } from 'fs/promises';
import { PDFParse } from 'pdf-parse';
import path from 'path';

const SOURCE_DIR = './真题';
const OUTPUT_DIR = './真题/_文本';

await mkdir(OUTPUT_DIR, { recursive: true });

const files = (await readdir(SOURCE_DIR)).filter(f => f.endsWith('.pdf'));
console.log(`找到 ${files.length} 份真题PDF`);

let totalChars = 0;
const summary = [];

for (const file of files) {
    const inputPath = path.join(SOURCE_DIR, file);
    const outputPath = path.join(OUTPUT_DIR, file.replace('.pdf', '.txt'));
    try {
        const buffer = await readFile(inputPath);
        const parser = new PDFParse({ data: buffer });
        const result = await parser.getText();
        const text = result.text;
        await writeFile(outputPath, text, 'utf8');
        totalChars += text.length;
        summary.push({ file, chars: text.length });
        console.log(`✓ ${file} → ${text.length} 字符`);
    } catch (err) {
        console.error(`✗ ${file}: ${err.message}`);
    }
}

console.log(`\n=== 全部完成 ===`);
console.log(`总字符数: ${totalChars}`);
console.log(`平均每份: ${Math.round(totalChars / files.length)} 字符`);
