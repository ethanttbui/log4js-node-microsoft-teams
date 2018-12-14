# log4js-node-microsoft-teams

This package contains an appender that allows [log4js-node](https://github.com/log4js-node/log4js-node) to send logs to Microsoft Teams.

You can install it with npm:
```
npm install log4js-node-microsoft-teams [--save / --save-dev]
```

The appender handles 4 configuration arguments:
1. `type`: 'log4js-node-microsoft-teams'
2. `webhook`: The webhook for your Microsoft Teams channel (please check the configured connector of the channel that you would like to use for logging)
3. `layout`: Any laypout accepted by log4js-node
4. `errorHandler`: An error handler that accepts one argument containing the body (details) of the error

**Example usage:**
```javascript
log4js.configure({
    appenders: {
        microsoftTeams: {
            type: 'log4js-node-microsoft-teams',
            webhook: microsoftTeamsLogWebhook,
            layout: {
                type: 'pattern',
                pattern: ' [%d{yyyy-MM-dd hh:mm:ss}][%p] %m '
            },
            errorHandler: (info) => {
                console.log(info);
            }
        }
    },
    categories: {
        default: {
            appenders: ['microsoftTeams'],
            level: 'all'
        }
    }
})

const logger = log4js.getLogger();
```
