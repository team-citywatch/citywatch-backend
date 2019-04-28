import { ServerContext } from './server';
import * as program from "commander";
program
    .version('0.1.0');

program
    .command('serve')
    .action(async () => {
        const server = new ServerContext();
        await server.listen();
    });

program
    .parse(process.argv);
