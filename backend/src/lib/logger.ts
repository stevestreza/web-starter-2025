import pino from 'pino'

const logLevel = process.env.LOG_LEVEL || `info`
const isDevelopment = process.env.NODE_ENV !== `production`

export const logger = pino({
	level: logLevel,
	transport: isDevelopment
		? {
			target: `pino-pretty`,
			options: {
				colorize: true,
				translateTime: `SYS:standard`,
				ignore: `pid,hostname`
			}
		}
		: undefined,
	redact: {
		paths: [`password`, `*.password`, `passwordHash`, `*.passwordHash`],
		remove: true
	}
})

export const dbLogger = logger.child({ context: `database` })
export const authLogger = logger.child({ context: `auth` })
