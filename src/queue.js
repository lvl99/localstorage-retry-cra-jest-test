const Queue = require("@segment/localstorage-retry");

function sendAsync(item, callback) {
  console.log("Pretending to send async...", item);

  if (Math.random() >= 0.5) {
    console.log("Success", item);
    resolve(item);
  } else {
    item.countRejected = (item.countRejected || 0) + 1;
    item.timeLastRejected = Date.now();
    console.log("Failed", item);
  }
  callback(new Error("Failed for testing purposes"), item);
}

const queue = new Queue("my_queue_name", (item, done) => {
  sendAsync(item, (err, res) => {
    if (err) {
      console.log("Queue: Error sending", item);
      return done(err);
    }
    console.log("Queue: Success sending", item);
    done(null, res);
  });
});

queue.on("processed", function(err, res, item) {
  if (err) return console.warn("processing %O failed with error %O", item, err);
  console.log("successfully sent %O with response %O", item, res);
});

queue.start();

export default queue;
