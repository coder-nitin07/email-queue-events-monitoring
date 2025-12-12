const { Queue, QueueScheduler } = require('bullmq');
const IORedis = require('ioredis');

// redis connection
const connection = new IORedis();

// QueueScheduler for delayed jobs and retrics
const emailQueueScheduler = new QueueScheduler('emailQueue', { connection });

// initialize the queue
const emailQueue = new Queue('emailQueue', {
    connection,
    defaultJobOptions: {
        attempts: 3,
        backoff: {
            type: 'exponential',
            delay: 1000
        },
        removeOnComplete: true,
        removeOnFail: false
    }
});

module.exports = { emailQueue };