import { exec } from 'child_process';
import fs from 'fs';

// PostgreSQL connection details
const user = 'eldrige';
const password = 'kendrick7';
const dbName = 'easygo';
const host = 'localhost';
const port = '5432';

// Path where you want to save the backup file
const backupPath = './backup';
const fileName = `${backupPath}/easygo_backup_$(date +\%Y\%m\%d\%H\%M\%S).sql`;

// Ensure the backup directory exists
if (!fs.existsSync(backupPath)) {
  fs.mkdirSync(backupPath);
}

// Backup command using pg_dump
const dumpCommand = `PGPASSWORD=${password} pg_dump -h ${host} -p ${port} -U ${user} -F c -b -v -f ${fileName} ${dbName}`;

// Execute the command
exec(dumpCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing backup command: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`Backup completed successfully: ${stdout}`);
});
