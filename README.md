# Wollok Mobile

A mobile IDE for [Wollok](https://www.wollok.org/)

## Local development

After [setting up your development environment](https://reactnative.dev/docs/environment-setup), in the project directory you can run:

### `yarn`

To install dependencies

### `yarn start`

To start metro

### `yarn android`

To run the app on your android devices (external devices should be connected by USB)

## Assembling APKs

All the generated files will be located in the following directory:
`android/app/build/outputs/apk/<release or debug>/`

### Debug APK

Run the following command in the project directory:

```
yarn publish-debug:android
```

### Release APK

For this you'll need to generate a keystore, it will prompt you to set a password, **save it**.

```
keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

Place the keystore file under the `android/app` folder

Then create the file `android/keystores/release.keystore.properties` with the following information:

```
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=<the password you saved before>
MYAPP_RELEASE_KEY_PASSWORD=<the password you saved before>
```

Then use the following command to assemble your release APK

```
yarn publish-release:android
```

note: The keystore generation is a one time only process, after that you can reuse the already generated one.
