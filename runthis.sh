#!/bin/bash

ORIGINAL_WD=$(pwd)
PATH=$PATH:"$ORIGINAL_WD/target/node/":"$ORIGINAL_WD/target/node/node_modules/npm/bin/"
JS_WD="$ORIGINAL_WD"
echo "building client from $JS_WD"
cd $JS_WD
npm run build
echo "running server $ORIGINAL_WD"
cd $ORIGINAL_WD
$ORIGINAL_WD/mvnw spring-boot:run
