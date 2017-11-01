// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
var express = require('express');
var request =  require('request');
var bodyParser = require('body-parser');




module.exports = function (app) {

        app.use(bodyParser.json());

        app.post('/volunteerSubmit', function(req, res) {

            console.log("Sending Email");

            var volunteerData = JSON.stringify(req.body);

            console.log("INFO: ", req.body);

            var helper = require('sendgrid').mail;
            var fromEmail = new helper.Email('chuckb1789@gmail.com');
            var toEmail = new helper.Email('chuckb1789@gmail.com');
            var subject = 'New Volunteer Application';
            var content = new helper.Content('text/plain', volunteerData);
            var mail = new helper.Mail(fromEmail, subject, toEmail, content);

            var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

            console.log("Volunteer Data", volunteerData);

            var request = sg.emptyRequest({
              method: 'POST',
              path: '/v3/mail/send',
              body: mail.toJSON()
            });

            sg.API(request, function (error, response) {
              if (error) {
                console.log('Error response received');
              }
              console.log(response.statusCode);
              console.log(response.body);
              console.log(response.headers);
            });
        })


};
