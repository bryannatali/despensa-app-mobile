if you get an error running expo on windows

do this:

1 - go to node_modules/metro-config/src/defaults/blacklist.js

2 - change var sharedBlacklist to:

var sharedBlacklist = [
  /node_modules[\/\\]react[\/\\]dist[\/\\].*/,
  /website\/node_modules\/.*/,
  /heapCapture\/bundle\.js/,
  /.*\/__tests__\/.*/
];

3 - done.