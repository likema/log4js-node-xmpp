"use strict";

var layouts = require('log4js').layouts,
    xmpp = require('node-xmpp');

function xmppAppender(config, layout) {
    var loggingEvents = [],
        client = new xmpp.Client(config.client);

    layout = layout || layouts.messagePassThroughLayout;

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
        var i,
            body = '';

        console.log('XMPP client is connected as ' + data.jid.user + '@' +
                    data.jid.domain + '/' + data.jid.resource);

        for (i = 0; i < loggingEvents.length; i += 1) {
            body += layout(loggingEvents[i]) + '\n';
        }
        loggingEvents = null;

        send(body);
    });

    client.addListener('error', function (e) {
        console.error('XMPP client encountered error, ' + e);
    });

    return function (loggingEvent) {
        if (loggingEvents) {
            loggingEvents.push(loggingEvent);
        } else {
            send(layout(loggingEvent));
        }
    };
}

function configure(config) {
    var layout;
    if (config.layout) {
        layout = layouts.layout(config.layout.type, config.layout);
    }

    return xmppAppender(config, layout);
}

exports.appender = xmppAppender;
exports.configure = configure;
// vim: ts=4 sw=4 sts=4 et:
