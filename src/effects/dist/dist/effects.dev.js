"use strict";

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var SoundManager =
/** @class */
function () {
  function SoundManager(musicPath) {
    var _this = this;

    this.backgroundMusic = new Audio(musicPath);
    this.backgroundMusic.loop = true;
    this.backgroundMusic.preload = "auto";
    this.backgroundMusic.addEventListener("ended", function () {
      _this.backgroundMusic.currentTime = 0;

      _this.backgroundMusic.play()["catch"](function () {});
    });
    this.backgroundMusic.addEventListener("stalled", function () {
      _this.backgroundMusic.load();

      _this.backgroundMusic.play()["catch"](function () {});
    });
  }

  SoundManager.prototype.setVolume = function (volume) {
    this.backgroundMusic.volume = Math.max(0, Math.min(1, volume));
  };

  SoundManager.prototype.getVolume = function () {
    return this.backgroundMusic.volume;
  };

  SoundManager.prototype.playBackground = function () {
    return __awaiter(this, void 0, void 0, function () {
      var err_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2,, 3]);

            return [4
            /*yield*/
            , this.backgroundMusic.play()];

          case 1:
            _a.sent();

            return [3
            /*break*/
            , 3];

          case 2:
            err_1 = _a.sent();
            console.warn("Play failed:", err_1);
            return [3
            /*break*/
            , 3];

          case 3:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  SoundManager.prototype.stopBackground = function () {
    this.backgroundMusic.pause();
    this.backgroundMusic.currentTime = 0;
  };

  SoundManager.prototype.playEffect = function (effectPath) {
    var effect = new Audio(effectPath);
    effect.play()["catch"](function () {});
  };

  SoundManager.prototype.toggleMute = function () {
    this.backgroundMusic.muted = !this.backgroundMusic.muted;
    return this.backgroundMusic.muted;
  };

  SoundManager.prototype.isMuted = function () {
    return this.backgroundMusic.muted;
  };

  return SoundManager;
}(); // יצירת מופע יחיד


var sound = new SoundManager("../assets/backmusic.mp3");
sound.setVolume(0.3); // הגדרת עוצמת השמע ל-50%
// הפעלה על אינטראקציה ראשונה: עכבר/טאצ' או חיצים/Enter/Space

var started = false;

var startOnce = function startOnce() {
  if (started) return;
  started = true;
  sound.playBackground();
  document.removeEventListener("pointerdown", startOnce);
};

document.addEventListener("pointerdown", startOnce, {
  once: false
});
document.addEventListener("keydown", startOnce); // כפתור השתקה

document.addEventListener("DOMContentLoaded", function () {
  var btn = document.getElementById("muteBtn");

  if (!btn) {
    console.warn("Mute button not found!");
    return;
  }

  btn.innerHTML = sound.isMuted() ? "<i class=\"fa fa-volume-off fa-lg\" aria-hidden=\"true\"></i>" : "<i class=\"fa fa-volume-up fa-lg\" aria-hidden=\"true\"></i>";
  btn.addEventListener("click", function () {
    var muted = sound.toggleMute();
    btn.innerHTML = muted ? "<i class=\"fa fa-volume-off fa-lg\" aria-hidden=\"true\"></i>" : "<i class=\"fa fa-volume-up fa-lg\" aria-hidden=\"true\"></i>";
  });
});