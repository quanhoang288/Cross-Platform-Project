const cron = require("cron");
const deletePosts = require("./deletePosts");

module.exports = () => {
  const job = new cron.CronJob({
    cronTime: "* * * * *",
    onTick: function () {
      console.log("Cron jub runing...");
      deletePosts();
    },
    start: true,
    timeZone: "Asia/Ho_Chi_Minh", // Lưu ý set lại time zone cho đúng
  });
  job.start();
};
