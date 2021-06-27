# VirtualHockey

VirtualHockey is a React Native app to take Ice Hockey lessons and earn points.

## Disclaimer

Feel free to use this repository however you want, but if you find it useful and will use it in production or present it inside your own project, please ask for my permission first.

## VirtualHockey API

This is the Virtual Hockey API. It consists of two main endpoints:

### Email
https://us-central1-virtualhockey.cloudfunctions.net/app/api/email is the endpoint responsible for sending welcome emails to new users when they first sign up for the mobile app.

### Payments
https://us-central1-virtualhockey.cloudfunctions.net/app/api/pay is the endpoint responsible for executing the payment with the data set from the front-end by connecting with the Stripe API.
