const fs = require('fs');
const path = require('path');

const replacements = [
  ['x Apparels Atelier', 'Omor Auto Corner Atelier'],
  ['x Apparels Boutique', 'Omor Auto Corner Boutique'],
  ['x Apparels Curators', 'Omor Auto Corner Curators'],
  ['x Apparels Intelligence', 'Omor Auto Corner Intelligence'],
  ['x Apparels Editorial', 'Omor Auto Corner Editorial'],
  ['x Apparels Assistant', 'Omor Auto Corner Assistant'],
  ['x Apparels CO.', 'Omor Auto Corner CO.'],
  ['x Apparels Team', 'Omor Auto Corner Team'],
  ['x Apparels AI', 'Omor Auto Corner AI'],
  ['x Apparelsr', 'Omor Auto Corner'],  // typo fix in manifest.ts
  ['x Apparels', 'Omor Auto Corner'],
  ['xApparels', 'OmorAutoCorner'],
  ['xapparels.com', 'omorautocorner.com'],
  ['xapparels', 'omorautocorner'],
];

const extensions = ['.ts', '.tsx', '.js', '.jsx'];

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory() && file !== 'node_modules' && file !== '.next') {
      walkDir(fullPath);
    } else if (stat.isFile() && extensions.includes(path.extname(file))) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let original = content;
      for (const [from, to] of replacements) {
        content = content.split(from).join(to);
      }
      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Updated:', fullPath.replace(process.cwd() + path.sep, ''));
      }
    }
  });
}

walkDir(path.join(process.cwd(), 'src'));
console.log('\nDone! All branding updated.');
