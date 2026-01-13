const { PrismaClient } = require('@prisma/client');
console.log('PrismaClient loaded');

try {
  console.log('Attempting new PrismaClient()...');
  new PrismaClient();
  console.log('Success: new PrismaClient()');
} catch (e) {
  console.log('Error empty:', e.message);
  if (e.constructor) console.log('Error type:', e.constructor.name);
}

try {
  console.log('Attempting new PrismaClient({ datasources: { db: { url: "test" } } })...');
  new PrismaClient({ datasources: { db: { url: "test" } } });
  console.log('Success: new PrismaClient({ datasources })');
} catch (e) {
  console.log('Error datasources:', e.message);
}
