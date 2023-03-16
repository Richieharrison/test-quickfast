const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


mongoose.connect("mongodb+srv://richie:12richharry12@quickfast.m5noh4r.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    dbName: 'Quickfast',
    useUnifiedTopology: true
}).then(()=>{
    console.log('The database has been connected')
}).catch((err)=>console.log(err))

app.use(bodyParser.json());

const orderSchema = new mongoose.Schema({
    currentLocation: { type: Object, required: true },
    destination: { type: Object, required: true },
    phoneNumber: { type: String, required: true },
    distance: { type: Number, required: true},
    amountPaid: { type: Number, required: true },
    status: {type: String, default: 'pending'}
});

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: {type: String, required: true},
    nationalId: { type: Number, required: true },
    phoneNumber: { type: Number, required: true },
});

const User = mongoose.model('User', UserSchema);
const Order = mongoose.model('Order', orderSchema);

app.get('/', (req, res)=>{
    res.send("Welcome here")
})

app.post("/new-order", (req, res)=>{
    const order = new Order({
        currentLocation: req.body.currentLocation,
        destination: req.body.destination,
        phoneNumber: req.body.phoneNumber,
        distance: req.body.distance,
        amountPaid: req.body.amountPaid,
        status: req.body.status,
    })
    const savedOrder = order.save()
    savedOrder.then((savedOrder)=>res.send(savedOrder)).catch((err)=> console.log(err))
})

app.listen(3000, ()=>{
    console.log("The server is runnning in port 3000")
})