const app = require('express').Router();
const { Order, User } = require('../models/index')

app.post("/", (req, res) => {
    User.findOne({ where: { firstName: req.body.firstName, lastName: req.body.lastName } })
        .then(u => {
            if (u) {
                Order.findOne({ where: { status: "inprocess", UserId: u.id } })
                    .then(o => {
                        o.update({status:"completed"})
                            .then(newOrder => {
                                const mailgun = require("mailgun-js");
                                const DOMAIN = "sandbox0ce3a5455e7d4b008f2def0410c16125.mailgun.org";
                                const mg = mailgun({ apiKey: "bb6d8492541956f4a86ffd225c835bad-a83a87a9-15aa4945", domain: DOMAIN });
                                const data = {
                                    from: "E-GAMES <postmaster@sandbox0ce3a5455e7d4b008f2def0410c16125.mailgun.org>",
                                    to: u.email,
                                    subject: "Order Confirmed",
                                    text: "ORDER CONFIRMATION!\n\n\n" +"Congratulations " + u.firstName + " " + u.lastName + "!" + "\n\n" +  "Your order " + "#" + o.id  + " has been completed!"
                                };
                                mg.messages().send(data, function (error, body) {
                                    console.log(body);
                                });
                            })
                    })
                    .catch(e=>{
                        console.log(e)
                        res.status(500).send("Order not found")
                    })
            }
        })
        .catch(error=>{
            console.log(error)
            res.status(500).send(error);
        })
})





module.exports = app;