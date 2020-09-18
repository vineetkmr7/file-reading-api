const express = require('express');
const fs = require('fs');

const app = express();

const port = 3000;

app.get('/get_meta_data/:module_name/:page_name', async (req, res) => {
    const { module_name, page_name } = req.params;

    // if present as path variables
    if (module_name && page_name) {
        fs.readFile(`${__dirname}/ui-config/specification/${module_name}/${page_name}.json`, (err, data) => {
            if (err) {
                res.status(404).json({
                    error: err.code,
                    message: err.message
                });
            } else
                res.json(JSON.parse(data));
        });
    } else {
        res.status(400).json({ erro: `${!module_name ? ' module_name required; ' : ''} ${!page_name ? ' page_name required; ' : ''}` })
    }
});

app.get('/get_meta_data', async (req, res) => {
    const { module_name, page_name } = req.query;

    // if parameters present as query parameters
    if (module_name && page_name) {
        fs.readFile(`${__dirname}/ui-config/specification/${module_name}/${page_name}.json`, (err, data) => {
            if (err) {
                res.status(404).json({
                    error: err.code,
                    message: err.message
                });
            } else
                res.json(JSON.parse(data));
        });
    } else {
        res.status(400).json({ erro: `${!module_name ? ' module_name required; ' : ''} ${!page_name ? ' page_name required; ' : ''}` })
    }
});

app.listen(port, () => {
    console.log(`listening at localhost:${port}`);
});