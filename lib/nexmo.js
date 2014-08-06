var request = require('request');

var nexmo = function(key, secret, protocol){
    this.key      = key;
    this.secret   = secret;
    this.protocol = protocol || 'http';
};

nexmo.prototype = {
    sendTextMessage : function(from, to, message){
        if (! from || ! to || ! message) {
            return console.error('At least one of the required parameters is missing.');
        }
        if (process.env.SMS) {
            var opts = {
                url : this.protocol + '://rest.nexmo.com/sms/json',
                qs : {
                    api_key: this.key,
                    api_secret: this.secret,
                    from: from,
                    to: to,
                    text: message
                },
                method : 'GET'
            };
            request(opts, function(error, response, body){
                if (error) {
                    return console.error(error);
                }
                var result = JSON.parse(body);
                return console.info(result);
            });
        }
        return console.info('Sending SMS Message: ' + message + ' from '  + from + ' to ' + to + '.');
    }
};

module.exports = exports = nexmo;