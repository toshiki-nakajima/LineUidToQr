// build.js
const fs = require('fs');
const path = require('path');

// テンプレートファイルを読み込む
let html = fs.readFileSync('index.html', 'utf8');

// 環境変数で置換
html = html.replace('__LIFF_ID__', process.env.LIFF_ID || '');

// 出力ディレクトリを作成
if (!fs.existsSync('public')) {
    fs.mkdirSync('public');
}

// 最終的なHTMLを書き出し
fs.writeFileSync(path.join('public', 'index.html'), html);
console.log('ビルド完了');