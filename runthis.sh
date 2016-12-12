#!/bin/bash

ORIGINAL_WD=$(pwd)
PATH=$PATH:"$ORIGINAL_WD/target/node/":"$ORIGINAL_WD/target/node/node_modules/npm/bin/"
JS_WD="$ORIGINAL_WD/src/main/js/my-app"
echo "switching to js directory $JS_WD"
cd $JS_WD
npm run build
echo "switching to original directory $ORIGINAL_WD"
cd $ORIGINAL_WD
$ORIGINAL_WD/mvnw spring-boot:run
