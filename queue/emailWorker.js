const { Worker } = require('bullmq');
const { emailQueue } = require('./emailQueue');

// Setup worker
const worker = new Worker(
    'emailQueue',
    async (job) =>{
        console.log(`Processing Job ${ job.id }...`);

        for(let i=0; i<= 5; i++){
            await new Promise((resolve) => setTimeout(resolve, 400));

            await job.updateProgress(i * 20);
            console.log(`Job ${ job.id } progress: ${ i * 20 }`);
        }

        // Randomly fail 50% of the time
        if (Math.random() < 0.5) {
            throw new Error(`Job ${job.id} failed intentionally`);
        }

        return `Job ${job.id} completed successfully!`;
    },
    {
        connection: emailQueue.client,
    }
);

// worker errors
worker.on('failed', (job, err)=>{
    console.log(`Job ${job.id} failed with error: ${err.message}`);
});

worker.on('completed', (job)=>{
    console.log(`Job ${job.id} completed!`);
});