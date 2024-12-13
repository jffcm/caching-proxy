#!/usr/bin/env node

import { Command } from 'commander';
import { startProxyServer } from '../lib/server.js';
import * as cache from '../lib/cache.js';

const program = new Command();

program
    .version('1.0.0')
    .description('Caching Proxy Server CLI')
    .option('-p --port <port>', 'Port to run the server on')
    .option('-o, --origin <origin>', 'Origin server URL')
    .option('--clear-cache', 'Clear the cache')
    .action(async ({ port, origin, clearCache }) => {
        if (clearCache) {
            return await cache.clearCache();
        }
        
        if (port && origin) {
            startProxyServer(port, origin);
        }
        
    });
program.parse(process.argv);
