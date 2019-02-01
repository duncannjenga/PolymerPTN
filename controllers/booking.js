// first we import our dependencies…
const express = require('express');
const Booking = require('../models/booking');
const router = express.Router();

// and create our instances
router.get('/refroom/:editKey', (req, res) => {
    const [reference, room] = req.params.editKey.split("_");
    Booking.find({
        $and: [
            { reference : reference },
            { room : room }
        ]
    }, (error, book) => {
        if (error) return res.json({ success: false, error });
        return res.json({ success: true, data: book });
    });
});

router.get('/readEdit/:editKey', (req, res) => {
    const editKey = req.params.editKey
    Booking.findById({ _id: editKey }, (error, book) => {
        if (error) return res.json({ success: false, error });
        return res.json({ success: true, data: book });
    });
});

router.get('/read/:skip', (req, res) => {
    Booking.find({}, (err, bookings) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: bookings });
    }).sort({ _id: -1 }).skip(parseInt(req.params.skip)).limit(10);
});
router.get('/search/:searchstring', (req, res) => {
    Booking.find({ reference: { $regex: req.params.searchstring, $options: "i" } }, (error, boksearch) => {
        if (error) return res.json({ success: false, error: error });
        return res.json({ success: true, data: boksearch });
    });
});

router.post('/add', (req, res) => {
    const booking = new Booking();
    const { group, reference, guest, agent, agentname, hotel, hotelname, room, roomname, checkin, checkout, numrooms, deduction, created, updated } = req.body;
    booking.group = group;
    booking.reference = reference;
    booking.guest = guest;
    booking.agent = agent;
    booking.agentname = agentname
    booking.hotel = hotel;
    booking.hotelname = hotelname;
    booking.room = room;
    booking.roomname = roomname;
    booking.checkin = checkin;
    booking.checkout = checkout;
    booking.numrooms = numrooms;
    booking.deduction = deduction;
    booking.created = created;
    booking.updated = updated;
    booking.save(err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

router.put('/update/:editKey', (req, res) => {
    const { editKey } = req.params;
    Booking.findById(editKey, (error, books) => {
        if (error) return res.json({ success: false, error });
        const { group, reference, guest, agent, agentname, hotel, hotelname, room, roomname, checkin, checkout, numrooms, deduction, created, updated } = req.body;
        books.group = group;
        books.reference = reference;
        books.guest = guest;
        books.agent = agent;
        books.agentname = agentname;
        books.hotel = hotel;
        books.hotelname = hotelname;
        books.room = room;
        books.roomname = roomname;
        books.checkin = checkin;
        books.checkout = checkout;
        books.numrooms = numrooms;
        books.deduction = deduction;
        books.created = created;
        books.updated = updated;
        books.save(error => {
            if (error) return res.json({ success: false, error });
            return res.json({ success: true });
        });
    });
});
router.delete('/delete/:editKey', (req, res) => {
    const { editKey } = req.params;
    if (!editKey) {
        return res.json({ success: false, error: 'no id Seleccted' });
    }
    Booking.remove({ _id: editKey }, (error, id) => {
        if (error) return res.json({ success: false, error });
        return res.json({ success: true });
    });
});
module.exports = router;