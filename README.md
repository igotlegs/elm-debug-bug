# elm-debug-bug
Reproduce a bug in debug

Stack trace: Uncaught TypeError: Cannot read property 'nativeBinding' of undefined

To reproduce it:

yarn run bundle
yarn run prod

Or

elm-make --output dist/bundle.js --debug src/client/elm/Main.elm
