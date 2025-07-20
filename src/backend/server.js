const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const winston = require('winston');
const { combine, timestamp, printf, errors } = winston.format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    errors({ stack: true }),
    logFormat
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ],
  exitOnError: false
});

// Load app with enhanced mobile support
const app = require('./app');

// Mobile-specific middleware
app.use((req, res, next) => {
  // 1. Force HTTPS on mobile
  if (req.headers['x-forwarded-proto'] === 'http') {
    return res.redirect(301, `https://${req.headers.host}${req.url}`);
  }
  
  // 2. Prevent aggressive mobile caching
  res.set({
    'Cache-Control': 'no-store, no-cache, must-revalidate, private',
    'Pragma': 'no-cache',
    'Expires': '0',
    'Vary': 'User-Agent, Accept-Encoding'
  });
  
  // 3. Log mobile requests
  const isMobile = /Mobile|Android|iPhone|iPad|iPod/i.test(req.headers['user-agent']);
  if (isMobile) {
    logger.info(`Mobile access: ${req.method} ${req.url} from ${req.ip}`);
  }
  
  next();
});

// Enhanced error handling
process.on('uncaughtException', (err) => {
  logger.error('UNCAUGHT EXCEPTION:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('UNHANDLED REJECTION at:', promise, 'reason:', reason);
});

// Start server with mobile support
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, '0.0.0.0', () => {
  logger.info(`Server running on all interfaces at port ${PORT}`);
  
  // Log network URLs for mobile testing
  const os = require('os');
  const networkInterfaces = os.networkInterfaces();
  
  Object.keys(networkInterfaces).forEach(iface => {
    networkInterfaces[iface].forEach(details => {
      if (details.family === 'IPv4' && !details.internal) {
        logger.info(`Accessible at: http://${details.address}:${PORT}`);
      }
    });
  });
});

// Handle server errors
server.on('error', (err) => {
  logger.error('SERVER ERROR:', err);
  if (err.code === 'EADDRINUSE') {
    logger.error(`Port ${PORT} is already in use`);
    process.exit(1);
  }
});

module.exports = logger;