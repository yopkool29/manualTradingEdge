#!/bin/sh
PORT=3005 DATABASE_URL="file:$(pwd)/prisma/dev.db" sh -c 'node .output/server/index.mjs'
