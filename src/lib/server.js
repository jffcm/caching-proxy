
import * as http from 'node:http';
import { forwardRequest } from './proxy.js';

export function startProxyServer(port, origin) {
    const server = http.createServer((req, res) => {
        forwardRequest(req, res, origin);
    });

    server.listen(port, () => {
        console.log(`Server running on port: ${port}`);
    });
}

