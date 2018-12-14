'use strict';
let request = require('request');

function colorByLevel(level) {
    switch (level) {
        case 'ERROR':
            return 'ff0000';
        case 'WARN':
            return 'fffa00';
        default:
            return '00e5ff';
    }
}

function appender (config, layout) {
    let appender = (loggingEvent) => {
        let level = loggingEvent.level.toString();
        let color = colorByLevel(level);
        
        request.post(
            config.webhook,
            {   
                json: {
                    title: level,
                    text: layout(loggingEvent),
                    themeColor : color
                }
            },
            function (error, response, body) {
                if (error || response.statusCode !== 200) {
                    config.errorHandler(body);
                }
            }
        )
    }
     
    appender.shutdown = (done) => {
        process.stdout.write('', done);
    };
    
    return appender;
}

function configure(config, layouts) {
    let layout = layouts.messagePassThroughLayout;
    
    if (config.layout) {
        layout = layouts.layout(config.layout.type, config.layout);
    }
            
    return appender(config, layout);
}

exports.configure = configure;
