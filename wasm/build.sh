#!/bin/bash

set -e

(
  cd node_modules/zxing/wrappers/wasm
  SOURCE_BASEDIR=$(dirname "$0")

  echo "============================================="
  echo "Compiling zxing"
  echo "============================================="
  "$EMSCRIPTEN/emconfigure" cmake -ENABLE_ENCODERS=0 -s ERROR_ON_UNDEFINED_SYMBOLS=0 -G "Unix Makefiles" -DCMAKE_BUILD_TYPE=Release -DCMAKE_TOOLCHAIN_FILE="$SOURCE_BASEDIR/Toolchain-Emscripten.cmake" -DEMSCRIPTEN_ROOT_PATH="$EMSCRIPTEN" "$SOURCE_BASEDIR"

  echo "============================================="
  echo "Compiling wasm module"
  echo "============================================="
  "$EMSCRIPTEN/emmake" make

  mv zxing.js ../../../../zxing.js
  mv zxing.wasm ../../../../zxing.wasm
)
echo "============================================="
echo "Compiling wasm module done"
echo "============================================="

echo "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
echo "Did you update your docker image?"
echo "Run \`docker pull trzeci/emscripten\`"
echo "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
