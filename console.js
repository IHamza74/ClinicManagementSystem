import chalk from 'chalk';

const log = console.log;
chalk.level = 1; // Use colours in the VS Code Debug Window
log(chalk.yellow('Welcome to the app!'));
for (var i = 0; i <= 10; i++) {
    log(chalk.white('Attempting to connect to endpoint, attempt ' + i));
}

log(chalk.green('Connection established! Sending statistics'));
log(chalk.red('Not all statistics are available...'));
log(chalk.redBright('Endpoint disconnected before all results were received'));
log(chalk.magenta('All finished'));