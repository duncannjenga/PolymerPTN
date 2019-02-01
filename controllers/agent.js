// first we import our dependencies…
const express = require('express');
const Agent = require('../models/agent');

// and create our instances
const router = express.Router();

router.get('/read', (req, res) => {
    Agent.find((err, agent) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: agent });
    }).sort({ createdAt: -1 });
});
router.get('/readall/:skip', (req, res) => {
    Agent.find({}, (err, agents) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: agents });
    }).sort({ _id: -1 }).skip(parseInt(req.params.skip)).limit(10);
});
router.get('/search/:searchstring', (req, res) => {
    Agent.find({ name: { $regex: req.params.searchstring, $options: "i" } }, (error, namesearch) => {
        if (error) return res.json({ success: false, error: error });
        return res.json({ success: true, data: namesearch });
    });
});
router.get('/readMe/:editKey', (req, res) => {
    const editKey = req.params.editKey;
    Agent.findById({ _id: editKey }, (error, agentId) => {
        if (error) return res.json({ success: false, error });
        return res.json({ success: true, data: agentId });
    });
});
router.post('/add', (req, res) => {
    const agentdata = new Agent();
    // body parser lets us use the req.body
    const { code, name, accessgroup } = req.body;
    if (!code && !name) {
        return res.json({
            success: false,
            error: 'Not Found'
        });
    }
    agentdata.code = code;
    agentdata.name = name;
    agentdata.accessgroup = accessgroup;
    agentdata.save(err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});
router.put('/update/:editKey', (req, res) => {
    const { editKey } = req.params;
    Agent.findById(editKey, (error, agentsup) => {
        if (error) return res.json({ success: false, error });
        const { code, name, accessgroup } = req.body;
        agentsup.code = code;
        agentsup.name = name;
        agentsup.accessgroup = accessgroup;
        agentsup.save(error => {
            if (error) return res.json({ success: false, error });
            return res.json({ success: true });
        });
    });
});
router.delete('/delete/:editKey', (req, res) => {
    const { editKey } = req.params;
    // console.log(editKey);
    if (!editKey) {
        return res.json({ success: false, error: 'No comment id provided' });
    }
    Agent.remove({ _id: editKey }, (error, hotel) => {
        if (error) return res.json({ success: false, error });
        return res.json({ success: true });
    });
});
router.get('/filter/:agent', (req, res) => {
    Agent.findOne({ code: req.params.agent }, (error, agent) => {
        if (error) return res.json({ success: false, error });
        return res.json({ success: true, data: agent });
    });
});
module.exports = router;