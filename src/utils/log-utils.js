import DateUtils from './date-utils';
const log4js = require('log4js');

class LogUtils {

    static debug(uuid, filename, endPoint, requestOrResponse, msg) {
        log4js.configure(this.getConfigureInfoFile())
        const logger = log4js.getLogger(filename)
        logger.debug(this.getMessage(uuid, endPoint, requestOrResponse, msg))
    }

    static info(uuid, filename, endPoint, requestOrResponse, msg) {
        log4js.configure(this.getConfigureInfoFile())
        const logger = log4js.getLogger(filename)
        logger.info(this.getMessage(uuid, endPoint, requestOrResponse, msg))
    }

    static error(uuid, filename, endPoint, requestOrResponse, msg) {
        log4js.configure(this.getConfigureErrorFile())
        const logger = log4js.getLogger(filename)
        logger.error(this.getMessage(uuid, endPoint, requestOrResponse, msg))
    }

    static getConfigureInfoFile() {
        //  ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK < OFF
        const config = {
            appenders: {
                dashboard: {
                    type: 'file',
                    layout: {
                        type: 'pattern',
                        pattern: '| %d{yyyy-MM-dd hh:mm:ss} | %p | %c | %m',
                    },
                    filename: `${__dirname}/../log/` + this.getFileName() + '-info.log',
                    maxLogSize: 10485760,
                }
            },
            categories: {
                default: {
                    appenders: ['dashboard'],
                    level: 'debug'
                }
            }
        }
        return config
    }

    static getConfigureErrorFile() {
        //  ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK < OFF
        const config = {
            appenders: {
                dashboard: {
                    type: 'file',
                    layout: {
                        type: 'pattern',
                        pattern: '| %d{yyyy-MM-dd hh:mm:ss} | %p | %c | %m',
                    },
                    filename: `${__dirname}/../log/` + this.getFileName() + '-error.log',
                    maxLogSize: 10485760,
                }
            },
            categories: {
                default: {
                    appenders: ['dashboard'],
                    level: 'debug'
                }
            }
        }
        return config
    }

    static getFileName() {
        return DateUtils.getDataToISOString( new Date(), 'ddmmyyyy')
    }

    static getMessage(uuid, endPoint, request, msg) {
        return " uuid = " + uuid + " | " + endPoint + " | " + request + " | " + msg
    }

}

export default LogUtils;
