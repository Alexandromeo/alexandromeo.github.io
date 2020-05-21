const webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BOe-pG06_4Y301Ez7bxbED3Wwp0kPF0APgbf8zpCbn8dZtbW6cjabXZS9km3YAL-9rhX1S-5N0ipxwt6uss22Eo",
   "privateKey": "df4Ch0ZtSfkCwoTfqZ0xqBK1dhR0wVxR40CupfbyTj0"
};
 
webPush.setVapidDetails(
   'mailto:alexandromeo123@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
const pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/eHMcgBAm4qM:APA91bE_rRB4W5csZbTfAryY8G6BZZGU2SnBmwhnNwdPbyEF44y1iYMIvd-R7ECOqw0Xwvb1VvOtK3YzIEcrKB3gVyibP7RZL9Zc_9yzXeLo3ab3VqYiQQVi-wcNP1WuFGlDSiG_NBeG",
   "keys": {
       "p256dh": "BBlQNlVJzL1ctxbd1PDvsSVTGqB2H6yGQTzGOilPVU+AOLQ/Aq1UBjURCs4KyKBPHHfiwarRTevk5e7OYQ8ylNg=",
       "auth": "+XKPd8JCnpj04e4oUCPPlw=="
   }
};
const payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
const options = {
   gcmAPIKey: '664791707664',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);