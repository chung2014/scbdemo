# React Native App Sample Project

Make sure you have Node 8.3 or later installed. To run the project iOS app in simulator, you need to have Xcode installed.

## Development Environment I am using is the following:

- Xcode 10.1
- node v8.12.0

The project is created with React Native CLI. Install it so that you can use the `react-native` command mentioned in the below How to run the project section.



## How to run the project

### iOS

- using the `react-native` command

```sh
$ npm i
$ react-native run-ios
```

- or open the Xcode project `scbdemo.xcodeproj` inside the ios/ directory and run it in Xcode.

### Android

- using the `react-native` command

Before you run the below `react-nativ` command to run the project in Android. Make sure you have an Android emulator opening first. Otherwise, you may encounter the following error message when you try to run the project. 
```sh
FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:installDebug'.
> com.android.builder.testing.api.DeviceException: No connected devices!
```

```sh
$ npm i
$ react-native run-android
```