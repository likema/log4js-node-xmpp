'use strict';

var log4js = require('log4js'),
    logger = log4js.getLogger('root'),
    xmppLogger = log4js.getLogger('hello');

log4js.configure('./logger.json');

logger.info('Hello World');
xmppLogger.warn('XMPP hello');
// vim: ts=4 sw=4 sts=4 et:
