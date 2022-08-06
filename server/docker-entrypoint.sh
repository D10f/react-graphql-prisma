#!/bin/bash

echo "Generating Prisma client..."
prisma generate

echo "Creating database schema..."
prisma db push

env > environment.txt

exec "$@"

