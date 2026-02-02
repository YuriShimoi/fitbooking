const { PrismaClient } = require('@prisma/client');

// Enable logging in development
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error']
});

const testConnection = async () => {
  try {
    await prisma.$connect();
    console.log('Connected to MySQL via Prisma');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error.message);
    return false;
  }
};

module.exports = { prisma, testConnection };