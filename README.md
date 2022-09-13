# Accessibility
This sample app shows how to get the value of accessibility settings.
Note that to make your app support audio guidance, you should set the [supportsAudioGuidance](https://webostv.developer.lge.com/develop/references/appinfo-json#accessibility) property in appinfo.json to true, even if the value of audio guidance setting is true.

## Subscribing settings service
Here is the sample code for how to get the value of settings service using webOSTV.js library. If you set the `subscribe` value as `true`, you get an event when the value of the specified settings is changed.
```javascript
function monitorSettingsChange(category, keys, handleFunc) {
  return webOS.service.request("luna://com.webos.settingsservice", {
    method: "getSystemSettings",
    parameters: {
      category: category,
      keys: keys,
      subscribe: true,
    },
    onSuccess: function (inResponse) {
      if (typeof inResponse.subscribed != "undefined") {
        if (!inResponse.subscribed) {
          console.log("Failed to subscribe settings' value");
          return;
        }
      }
      console.log("Result: " + JSON.stringify(inResponse));
      handleFunc(inResponse);
    },
    onFailure: function (inError) {
      console.log("Failed to get settings' value");
      console.log("[" + inError.errorCode + "]: " + inError.errorText);
      // To-Do something
      return;
    },
  });
}
```

## Do's and Don'ts
- **Do** test this sample app on the webOS TV devices.
- **Don't** test this sample app on the webOS TV Emulator or webOS TV Simulator because they do not support accessibility functions.