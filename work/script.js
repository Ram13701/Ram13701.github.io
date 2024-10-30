const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const otpStorage = {}; // In-memory storage for simplicity

app.use(bodyParser.json());

app.post('/send-otp', (req, res) => {
    const { mobileNumber } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
    otpStorage[mobileNumber] = otp; // Store OTP (consider using a database in production)
    
    // Here, integrate with an SMS API to send the OTP
    console.log(`OTP for ${mobileNumber} is ${otp}`);
    
    res.send({ message: 'OTP sent successfully' });
});

app.post('/verify-otp', (req, res) => {
    const { mobileNumber, otp } = req.body;
    const storedOtp = otpStorage[mobileNumber];

    if (storedOtp === otp) {
        res.send({ message: 'OTP verified successfully' });
        delete otpStorage[mobileNumber]; // Optionally delete OTP after verification
    } else {
        res.status(400).send({ message: 'Invalid OTP' });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));