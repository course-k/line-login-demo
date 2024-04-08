import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const PORT = 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','login.html'));
});

app.get('/login', (req,res)=>{
    res.send('login');
});

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});
