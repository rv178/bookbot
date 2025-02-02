#!/bin/bash

eval $(fnm env)
fnm use
tsc
node dist/index.js
