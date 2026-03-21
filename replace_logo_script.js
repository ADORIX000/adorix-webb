const fs = require('fs');
const path = 'components/layout/navbar.jsx';
let content = fs.readFileSync(path, 'utf8');
content = content.replace(/<span className="bg-adorix-dark text-white w-8 h-8 flex items-center justify-center rounded-lg group-hover:bg-adorix-primary transition-colors">A<\/span>/g, '<img src="/logo.png" alt="Adorix Logo" className="w-8 h-8 object-contain rounded-lg group-hover:scale-110 transition-transform" />');
fs.writeFileSync(path, content);
console.log('Logo replaced in ' + path);
