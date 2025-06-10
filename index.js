const express = require('express');
const app = express();
const port = 3000;

function parseNumbers(query) {
    if (!query) throw 'Chybí parametr "numbers"';
    const nums = query.split(',').map(n => {
        const parsed = parseFloat(n);
        if (isNaN(parsed)) throw 'Vstup musí být čísla oddělená čárkami';
        return parsed;
    });
    return nums;
}

app.get('/add', (req, res) => {
    try {
        const nums = parseNumbers(req.query.numbers);
        const result = nums.reduce((a, b) => a + b, 0);
        res.json({ result });
    } catch (err) {
        res.json({ error: err });
    }
});

app.get('/sub', (req, res) => {
    try {
        const nums = parseNumbers(req.query.numbers);
        const result = nums.reduce((a, b) => a - b);
        res.json({ result });
    } catch (err) {
        res.json({ error: err });
    }
});

app.get('/mult', (req, res) => {
    try {
        const nums = parseNumbers(req.query.numbers);
        const result = nums.reduce((a, b) => a * b, 1);
        res.json({ result });
    } catch (err) {
        res.json({ error: err });
    }
});

app.get('/div', (req, res) => {
    try {
        const nums = parseNumbers(req.query.numbers);
        const result = nums.reduce((a, b) => {
            if (b === 0) throw 'Dělení nulou není povoleno';
            return a / b;
        });
        res.json({ result });
    } catch (err) {
        res.json({ error: err });
    }
});

app.get('/pow', (req, res) => {
    try {
        const nums = parseNumbers(req.query.numbers);
        const result = nums.reduce((a, b) => Math.pow(a, b));
        res.json({ result });
    } catch (err) {
        res.json({ error: err });
    }
});

app.get('/root', (req, res) => {
    try {
        const nums = parseNumbers(req.query.numbers);
        if (nums.length !== 2) throw 'Operace odmocnění vyžaduje 2 čísla';
        const [n, x] = nums;
        if (n === 0) throw 'Základ odmocniny nemůže být 0';
        const result = Math.pow(x, 1 / n);
        res.json({ result });
    } catch (err) {
        res.json({ error: err });
    }
});

app.listen(port, () => {
    console.log(`✅ Server běží na http://localhost:${port}`);
});
