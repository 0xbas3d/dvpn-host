#!/bin/bash

mapfile_mac() {
  local _mapfile_var=$1
  local _mapfile_line
  local _mapfile_counter=0
  local _mapfile_input

  # Read from standard input if no input file is specified
  if [[ -n "$2" ]]; then
    _mapfile_input="$2"
  else
    _mapfile_input="/dev/stdin"
  fi

  # Clear the array variable
  eval "$_mapfile_var=()"

  while IFS= read -r _mapfile_line; do
    eval "$_mapfile_var[$_mapfile_counter]=\"\$_mapfile_line\""
    ((_mapfile_counter++))
  done < "$_mapfile_input"
}

# Usage example:
mapfile_mac PORTS < <(shuf -i 1024-65535 -n 2)
echo ${PORTS[@]}

# Print the elements of the array
for fruit in "${fruits[@]}"; do
  echo "$fruit"
done
