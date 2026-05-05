'use strict';

var xmpp = require('node-xmpp');

function xmppAppender(layout, config, timezoneOffset) {
    var loggingEvents = [],
        client = new xmpp.Client(config.client);

    function send(body) {
        var stanza;

        if (body) {
            stanza = new xmpp.Element(
                'message',
                {
                    to: config.to,
                    type: 'chat'
                }
            ).c('body').t(body);

            client.send(stanza);
        }
    }

    client.addListener('online', function (data) {
        var body;

        console.log('XMPP client is connected as ' +
                data.jid.user + '@' + data.jid.domain +
                '/' + data.jid.resource);

        body = loggingEvents.map(function (evt) {
            return layout(evt, timezoneOffset);
        }).join('\n');
        loggingEvents = null;
        send(body);
    });

    client.addListener('error', function (e) {
        console.error('XMPP client encountered error, ' + e);
    });

    var appender = function (loggingEvent) {
        if (loggingEvents) {
            loggingEvents.push(loggingEvent);
        } else {
            send(layout(loggingEvent, timezoneOffset));
        }
    };

    appender.shutdown = function (done) {
        client.end();
        done();
    };

    return appender;
}

function configure(config, layouts) {
    var layout = layouts.colouredLayout;
    if (config.layout) {
        layout = layouts.layout(config.layout.type, config.layout);
    }

    return xmppAppender(layout, config, config.timezoneOffset);
}

exports.configure = configure;
// vim: ts=4 sw=4 sts=4 et:
