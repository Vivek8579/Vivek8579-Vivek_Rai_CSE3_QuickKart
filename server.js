const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const upload = multer({
    storage: multer.diskStorage({
        destination: 'uploads/',
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    }),
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// Email configuration
const transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 587,
    secure: false,
    auth: {
        user: 'your-email@example.com',
        pass: 'your-password'
    }
});

app.post('/api/contact', upload.array('attachment', 5), async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;
        const files = req.files;

        // Send email
        await transporter.sendMail({
            from: 'your-email@example.com',
            to: 'recipient@example.com',
            subject: `New Contact Form Submission: ${subject}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
            attachments: files ? files.map(file => ({
                filename: file.originalname,
                path: file.path
            })) : []
        });

        // Store in database (optional)
        // await storeContactSubmission(req.body, files);

        res.json({ success: true });
    } catch (error) {
        console.error('Error processing contact form:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to process your request'
        });
    }
});

// WebSocket setup for live chat
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('message', async (data) => {
        // Handle chat messages
        // Store in database
        // Notify agents
        io.emit('message', {
            type: 'user',
            content: data.message,
            timestamp: new Date()
        });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 