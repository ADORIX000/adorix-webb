const fs = require('fs');
const path = 'src_legacy/components/layout/navbar.jsx';
if (fs.existsSync(path)) {
    let content = fs.readFileSync(path, 'utf8');
    content = content.replace(/<span className="bg-adorix-dark text-white w-8 h-8 flex items-center justify-center rounded-lg group-hover:bg-adorix-primary transition-colors">A<\/span>/g, '<img src="/logo.png" alt="Adorix Logo" className="w-8 h-8 object-contain rounded-lg group-hover:scale-110 transition-transform" />');
    // Also fix the sign up button if it still has bg color
    content = content.replace(/className="bg-adorix-dark text-white px-6 py-2 rounded-full hover:bg-adorix-primary transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"/g, 'className={`transition-colors hover:text-adorix-primary relative group ${location.pathname === \'/signup\' ? \'text-adorix-primary font-bold\' : \'\'}`}');
    fs.writeFileSync(path, content);
    console.log('Logo and Sign Up fixed in ' + path);
}
