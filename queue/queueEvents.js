const { QueueEvents } = require('bullmq');
const { emailQueue } = require('./emailQueue');

// Setup QueueEvents for listen events
const queueEvents = new QueueEvents('emailQueue', {
    connection: emailQueue.client
});

// job add to queue
queueEvents.on('waiting', ({ jobId })=>{
    console.log(`Job ${ jobId } is waiting in the queue`);
});


// job picked by worker
queueEvents.on('active', ({ jobId, prev })=>{
    console.log(`Job ${ jobId } is now active. Previous state: ${ prev }`);
});

// Event: Job progress update
queueEvents.on('progress', ({ jobId, data }) => {
  console.log(`Job ${jobId} progress: ${data}%`);
});

// job completed successfully
queueEvents.on('completed', ({ jobId, returnvalue }) => {
  console.log(`Job ${ jobId } completed! Result: ${ returnvalue }`);
});

// job failed
queueEvents.on('failed', ({ jobId, failedReason }) => {
  console.log(`Job ${ jobId } failed. Reason: ${ failedReason }`);
});

// job stalled (worker did not finish)
queueEvents.on('stalled', ({ jobId }) => {
  console.log(`Job ${ jobId } stalled`);
});

// event: queue emptied
queueEvents.on('drained', () => {
  console.log('Queue is empty');
});

// Event: Job removed
queueEvents.on('removed', ({ jobId }) => {
  console.log(`Job ${ jobId } was removed from the queue`);
});