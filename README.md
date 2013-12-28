# log4js-node-xmpp

A log4js-node log appender to send logging events using XMPP protocol.

# Installation

	npm install log4js-node-xmpp

# Usage

Please use it as other log4js-node appenders. It needs `host`, `jid` and `password` at least.

```js
var log4js = require('log4js'),
    xmpp = require('log4js-node-xmpp'),
    logger = log4js.getLogger('hello');

log4js.addAppender(xmpp.configure({
    client: {
        host: 'talk.google.com',
        jid: '<username>',
        password: '<password>'
    },

    to: '<to address>'
}), 'hello');

logger.info('Hello World');
```

Or you can use the configure method.

```js
var log4js = require('log4js'),
    logger = log4js.getLogger('hello');

log4js.configure({
    appenders: [
        {
            type: 'console'
        },

        {
            "type": "xmpp",
			"category": "hello",

			"client": {
				"host": "talk.google.com",
				"jid": "<username>",
				"password": "<password>"
			},

			"to": "<to address>"
        }
    ]
});
logger.info('Hello World');
```
