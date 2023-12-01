const Message = require('../models/MessageSchema');

module.exports.addMessage = async (req, res) => {
    try {
        const { from, to, message } = req.body;
        const data = await Message.create({
            message: { text: message },
            users: [from, to],
            sender: from
        })
        if (data)
            return res.json({ msg: "Message added successfully." });
        return res.json({ msg: "Failed to add message to the database" });
    }
    catch (err) {
        console.log(err);
    }
}

module.exports.getAllMessage = async (req, res) => {
    try {
        const { from, to } = req.body;
        console.log(from, to);
        const data = await Message.find({
            users: {
                $all: [from, to]
            },
        }).sort({ updatedAt: 1 });

        console.log(data);
        const projectedMessages = data.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message
            }
        })
        return res.json({ projectedMessages });
    }
    catch (err) {
        console.log(err);
    }
}