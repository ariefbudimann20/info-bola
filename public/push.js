let webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BAZSWTYLA_jVXgVUpGYXm9f_WC-iTtIhJsIcIvR8zFg1B76OZbz9VWFURL0POsMKapi_J5ho5Ulj1pdsbBtz514",
   "privateKey": "Ixr22SRa-UW9N-4Z_C1OZIT63tSz6P6NbkbLsRZ_twQ"
};
 
 
webPush.setVapidDetails(
   'mailto:ariefbudimann20@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
let pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/exPOeARHuWw:APA91bGu72aUqstftfUro384-HTOFrUjRE51ndgjDjd-2VfVjKnj11d-j8RdNLAWpozNw9wcybDaD4AuPPUSzNiip9ZA4IO5-N30Xeegb2P_31Qa5TQTPPMAxXQ4v0tUS7V3Z_vV40G3",
   "keys": {
       "p256dh": "BOS3XlA/usA+L8Lo5da8lsfq/bOYSRcFgHKVL8nlNIVYzSIfzeKoENHCfyZ5o1ecV5FNrZUBmpTGihvyVQW1oRU=",
       "auth": "Zjx5jYfdlLoWTZNB1sPnTw=="
   }
};
let payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
let options = {
   gcmAPIKey: '817538190259',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);