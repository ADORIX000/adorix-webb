const fs = require('fs');
const path = 'components/layout/Sidebar.jsx';
let content = fs.readFileSync(path, 'utf8');
content = content.replace(/<div className="w-8 h-8 bg-adorix-dark rounded-lg flex items-center justify-center text-white font-bold group-hover:bg-adorix-primary transition-colors">[\s\S]*?A[\s\S]*?<\/div>/g, '<img src="/logo.png" alt="Adorix Logo" className="w-8 h-8 object-contain rounded-lg group-hover:scale-110 transition-transform shadow-lg shadow-adorix-primary/20" />');
fs.writeFileSync(path, content);
console.log('Logo replaced in ' + path);
