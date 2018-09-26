const Queue = require("@segment/localstorage-retry");

function sendAsync(item, callback) {
  return new Promise((resolve, reject) => {
    console.log("Attempting to send async...", item);

    // @note have identified that the test fails when the promise is rejected
    // if (Math.random() >= 0.5) {
    //   console.log("Success", item);
    //   resolve(item);
    // } else {

    item.countRejected = (item.countRejected || 1) + 1;
    item.timeLastRejected = Date.now();
    console.log("Failed", item);
    reject(new Error("Failed"));

    // }
  });
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
