#!/usr/bin/env bash

CACHEDIR=$(mktemp -d)

export NPX_UTILS="node lib/index.js"
export NPX_UTILS_CACHE="$CACHEDIR"

mkdir -p "$CACHEDIR/_npx/db114a050477a6be"
echo "{
  \"dependencies\": {
    \"ruy\": \"^1.0.0\"
  }
}" > "$CACHEDIR/_npx/db114a050477a6be/package.json"

list_res=$($NPX_UTILS list)

if [ "$list_res" != "db114a050477a6be ruy@^1.0.0" ]; then
  >&2 echo "Failed to list pkgs"
  exit 1
fi

# Removes the package and list again
$NPX_UTILS remove ruy
list_res=$($NPX_UTILS list)

if [ "$list_res" != "" ]; then
  >&2 echo "Failed to list pkgs after removing"
  exit 1
fi

echo "ok 1 - Works on my machine"
