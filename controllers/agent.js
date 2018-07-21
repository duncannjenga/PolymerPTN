// first we import our dependencies…
const express = require('express');
const Agent = require('../models/agent');

// and create our instances
const router = express.Router();

router.get('/read', (req, res) => {
    Agent.find((err, agent) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: agent });
    }).limit(20);
});

router.get('/edit/:editKey', (req, res) => {
    const editKey = req.params.editKey
    Agent.findById({ _id: editKey }, (error, agents) => {
        if (error) return res.json({ success: false, error });
        return res.json({ success: true, data: agents });
    });
});

router.post('/add', (req, res) => {
    const agentdata = new Agent();
    const { code, name } = req.body;
    if (!code && !name) {
        return res.json({
            success: false,
            error: 'Not Found'
        });
    }
    agentdata.code = code;
    agentdata.name = name;
    agentdata.save(err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});
router.put('/update/:editKey', (req, res) => {
    const { editKey } = req.params;
    Agent.findById(editKey, (error, agentsup) => {
        if (error) return res.json({ success: false, error });
        const { code, name } = req.body;
        agentsup.code = code;
        agentsup.name = name;
        agentsup.save(error => {
            if (error) return res.json({ success: false, error });
            return res.json({ success: true });
        });
    });
});
module.exports = router;