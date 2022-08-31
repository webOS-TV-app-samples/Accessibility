(function () {
  var subscriptionHandle = [];

  window.addEventListener("load", function (event) {
    console.log("OnLoad");
    subscriptionHandle[0] = monitorSettingsChange(
      "option",
      ["audioGuidance", "highContrast"],
      handleSettingsChange
    );
    subscriptionHandle[1] = monitorSettingsChange(
      "caption",
      ["captionEnable"],
      handleSettingsChange
    );
  });

  window.addEventListener("unload", function (event) {
    console.log("OnUnload");
    subscriptionHandle.forEach(function (elm) {
      elm.cancel();
    });
  });

  function handleSettingsChange(res) {
    function audioGuidanceChange(flag) {
      console.log("audioGuidance: " + flag);
      document.getElementById("audioGuidance").innerHTML = "" + flag;
    }

    function highContrastChange(flag) {
      console.log("highContrast: " + flag);
      document.getElementById("highContrast").innerHTML = "" + flag;
      if (flag === "on") {
        document.getElementById("hc_div").classList.add("highContrast");
        var elms = document.querySelectorAll("#hc_div *");
        for (var i = 0; i < elms.length; i++) {
          elms[i].classList.add("highContrast");
        }
      } else {
        document.getElementById("hc_div").classList.remove("highContrast");
        var elms = document.querySelectorAll("#hc_div *");
        for (var i = 0; i < elms.length; i++) {
          elms[i].classList.remove("highContrast");
        }
      }
    }

    function captionChange(flag) {
      console.log("captionEnable: " + flag);
      document.getElementById("captionEnable").innerHTML = "" + flag;
    }

    switch (res.category) {
      case "option":
        if (res.settings.audioGuidance) {
          audioGuidanceChange(res.settings.audioGuidance);
        }
        if (res.settings.highContrast) {
          highContrastChange(res.settings.highContrast);
        }
        break;
      case "caption":
        if (res.settings.captionEnable) {
          captionChange(res.settings.captionEnable);
        }
        break;
    }
  }
})();
