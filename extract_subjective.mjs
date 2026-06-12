// 提取每份真题的主观题部分（简答、法条分析、案例分析、论述题），用于高频考点归纳
import { readFile, writeFile, readdir } from 'fs/promises';
import path from 'path';

const TEXT_DIR = './真题/_文本';
const files = (await readdir(TEXT_DIR)).filter(f => f.endsWith('.txt')).sort();

let output = '# 历年真题主观题汇总（简答+法条+案例+论述）\n\n';

for (const file of files) {
    const text = await readFile(path.join(TEXT_DIR, file), 'utf8');
    const year = file.match(/(\d{4})/)[1];
    const type = file.includes('综合') ? '综合(法理/宪法/法制史)' : '专业基础(刑法/民法)';

    output += `\n## ${year}年 ${type}\n`;

    // 抓取从"三、简答题"到"参考答案"之间的内容
    const startMatch = text.search(/三、\s*简答题/);
    const endMatch = text.search(/参考答案|【答案】1\./);

    if (startMatch !== -1 && endMatch !== -1) {
        const subjective = text.substring(startMatch, endMatch);
        output += subjective.trim() + '\n';
    } else if (startMatch !== -1) {
        // 截取从简答题开始到结尾
        const subjective = text.substring(startMatch, Math.min(text.length, startMatch + 8000));
        output += subjective.trim() + '\n';
    }
}

await writeFile('./真题分析/_主观题汇总.md', output, 'utf8');
console.log(`已生成主观题汇总：${output.length} 字符`);
