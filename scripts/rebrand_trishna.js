const fs = require('fs');
const path = require('path');

const replacements = [
  // Emails & Domains
  ['concierge@omorautocorner.com', 'concierge@omorautocorner.com'],
  ['support@omorautocorner.com', 'support@omorautocorner.com'],
  ['info@omorautocorner.com', 'info@omorautocorner.com'],
  ['OmorAutoCorner.com', 'OmorAutoCorner.com'],
  ['omorautocorner.com', 'omorautocorner.com'],
  
  // Specific case-sensitive matches
  ['Omor Auto Corner', 'Omor Auto Corner'],
  ['omor auto corner', 'omor auto corner'],
  ['OmorAutoCorner', 'OmorAutoCorner'],
  ['OMOR AUTO CORNER', 'OMOR AUTO CORNER'],
  ['omorautocorner-app', 'omorautocorner-app'],
  ['omor-auto-corner', 'omor-auto-corner'],
  ['omorautocorner', 'omorautocorner'],
];

const extensions = ['.ts', '.tsx', '.js', '.jsx', '.json', '.yml', '.yaml', '.md', '.css', '.html', '.env', '.local', '.dockerignore'];
const fileNames = ['Dockerfile', 'docker-compose.yml', '.env.local'];

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    let stat;
    try {
      stat = fs.statSync(fullPath);
    } catch (e) {
      return; // ignore broken symlinks or errors
    }
    
    // Skip version control and build folders
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== '.git' && file !== '.agents') {
        walkDir(fullPath);
      }
    } else if (stat.isFile()) {
      const ext = path.extname(file);
      const isTargetFile = extensions.includes(ext) || fileNames.includes(file);
      
      // Specifically skip bd-locations.ts to avoid renaming geographic "Ruma"
      if (file === 'bd-locations.ts') {
        return;
      }
      
      // Skip binary/lock files
      if (file === 'package-lock.json') {
        return;
      }
      
      if (isTargetFile) {
        let content;
        try {
          content = fs.readFileSync(fullPath, 'utf8');
        } catch (e) {
          return;
        }
        let original = content;
        for (const [from, to] of replacements) {
          content = content.split(from).join(to);
        }
        if (content !== original) {
          fs.writeFileSync(fullPath, content, 'utf8');
          console.log('Updated:', fullPath.replace(process.cwd() + path.sep, ''));
        }
      }
    }
  });
}

console.log('Starting rebranding to Omor Auto Corner...');
walkDir(process.cwd());
console.log('\nDone! All branding updated.');
