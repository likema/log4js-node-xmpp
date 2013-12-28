'use strict';

var log4js = require('log4js'),
    xmpp = require('../xmpp'),
    logger = log4js.getLogger('root'),
    xmppLogger = log4js.getLogger('hello');

log4js.addAppender(xmpp.configure({
    client: {
        host: 'talk.google.com',
        jid: '<username>',
        password: '<password>'
    },

    to: '<to address>'
}), 'hello');

logger.info('Hello World');
xmppLogger.warn('XMPP hello');
// vim: ts=4 sw=4 sts=4 et:
