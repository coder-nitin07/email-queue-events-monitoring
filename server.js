const express = require('express');
const { emailQueue } = require('./queue/emailQueue');
const app = express();
require('./queue/emailWorker');
require('./queue/queueEvents');  


app.use(express.json());

// post api to add job
app.post('/send-email', async (req, res)=>{
    const { email } = req.body;

    const job = await emailQueue.add('send-email', {
        email: email || 'text@example.com'
    });

    res.json({
        message: 'Email job added to queue',
        jobId: job.id
    });
});

app.listen(3000, ()=>{
    console.log(`Server running on PORT 3000`);
});