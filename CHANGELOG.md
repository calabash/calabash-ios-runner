## Change Log

### 2.0.3

* Hotfix for: Unable to find file: run\_loop\_fast\_uia.js #361
  - @NickLaMuro, @kyleect and everyone else who reported

### 2.0.2

* OnAlert: divide regexes by language #358
* HostCache can be used by `console_attach` for all strategies #357
* Xcode 7.2 support #355
* Add Gitlab as a supported CI #353
* \*\_ci? methods should return true/false #355
* Extract Logger and onAlert to a single JavaScript file using erb
  templates #261 @svevang

### 2.0.1

* Add Danish missing localization for Location alert #346
* Dutch APNS dialog is not automatically dismissed #337

### 2.0.0

* Core: prevent double launching of simulator #341 @fmuzf
* CoreSim: expose :wait_for_state_timeout option #340
* CoreSimulator can erase a simulator #339
* Core: prepare simulator responds to :reset launch arg #338
* Fix 'simctl manage processes' #336
* Increase simctl and sim stable timeouts in CI environments and expose
  options to users #334
* Find window with hitpoint #333 @krukow
* Improve Directory.directory_digest response to File.read errors #331
* Increase simctl install/launch app and simulator stable timeouts in CI
  environments #329
* Auto dismiss "nearby bluetooth devices" alert #326
* Simplify the detection of iOS Simulator #323
* Remove Retriable dependency #322
* Remove CAL_SIM_POST_LAUNCH_WAIT env var #321
* Remove XCTools #319
* Expose important timeouts as constant mutable hashes #315
* CoreSimulator#launch launches simulator even if app is installed #313
* Send KILL to lldb directly and don't wait as long for lldb to die #312
* Improve dylib injection for simulators #311 @MortenGregersen
* Standup Jenkins jobs #309
* Set minimum ruby version to 2.0 #308

The following have been removed from RunLoop in 2.0:

* RunLoop::XCTools; replaced with Xcode and Instruments
* RunLoop::Environment.sim_post_launch_wait; no replacement.
  Additionally, run-loop no longer responds to CAL_SIM_POST_LAUNCH_WAIT

### 1.5.6

Many thanks to everyone who filed issues for this release.

* Rotate /Library/Cache/com.app.dt.instruments directories #304
* By default, run-loop writes results to ~/.run-loop/results and manages
  these directories #299
* Fix CLI simctl install/uninstall: CoreSim manages stdio.pipe and
  'remembers' that it already launched the simulator #297
* Improve Directory.directory\_digest and
  Device#simulator\_wait\_for\_stable\_state interaction #296
* Xcode 7: command line tools that use Simctl::Bridge are broken
  (blocking) #289
* Device#simulator\_data\_dir\_size is timing out #287 @carmbruster
* Xcode 7.1 beta 2: instruments and simctl need to filter out Apple TV
  from known simulators #283
* Running out of disk space because of cached instruments files #276
  - @nfrydenholm, @TeresaP, @mholtman
* Expand APP (and APP\_BUNDLE\_PATH) path before launching instruments
  #255 @ark-konopacki

### 1.5.5

Many thanks to everyone who filed issues.  We really appreciate it.  If
I missed an attribution, let me know. -jjm

* Simulator: should manage the 'iproxy' process #279 @cryophobia
* Gem: ruby\_files glob should catch only ruby files #274 @svevang
* Fix blocking reads in Xcrun when consuming large output of commands #270
  - @kennethjiang, @kamstrup
* Instruments#version extracts version from Instruments.app Info.plist #269 @gdknutel
* Increase the default timeout for Xcrun.exec #268 @gdknutel
* Manage assetsd process #267
* Improve integration examples: part 1 #266
* Core.simulator\_target? should match simulators created by users #262

### 1.5.4

* Xcode 7: launch instruments with simulator UDID to avoid ambiguous
  matches #253 @sapieneptus
* Remove CoreSimulator LaunchServices csstore before during simulator
  preparation #252 @sapieneptus
* iOS9: dismiss Motion/Activity and Twitter permissions alerts #251
  @sapieneptus
* HOTFIX: backward compatibility for Calabash < 0.16.1 #248
  @ark-konopacki

### 1.5.3

* HOTFIX: backward compatibility for Calabash < 0.16.1 @ark-konopacki

### 1.5.2

* Use CoreSimulator to ensure target app is the same as installed app #244
* Core.prepare_simulator raises an error if app does not exist #236
* Fixup Core#simulator_target? for Xcode 7 #232
* Force UTF-8 encoding when reading the output of `instruments` Thanks to Magnús Magnússon
* Xcode 7.1 beta support
* CLI: simctl doctor [--device=DEVICE] - tool to prepare CoreSimulator environment EXPERIMENTAL
* CoreSimulator#launch_simulator waits for the simulator to install
* CoreSimulator App Life Cycle with direct file IO vs simctl
* Simulator devices can update their state
* Xcrun class for safely executing 'xcrun' commands

### 1.5.1

* Core.simulator\_target? - fixup for Xcode 7 #216
* JS: can dismiss iOS 9 APNS privacy alerts #214

### 1.5.0

* Deprecate optional argument in Device#instruments\_identifier
* Changes to prepare Calabash for Xcode 7/iOS 9 testing.
* Default sim for Xcode 7 is 'iPhone 5s (9.0)' #205
* Xcode 7 instruments support #204
* Expand the Instruments class behaviors
* Add L10N class
* Add Xcode class
* Deprecate XCTools class
* Add more privacy alert auto-dismiss regular expressions #199
* UIKit localization lookups in runloop #197 @svevang

### 1.4.1

* Fixed typo in Xcode 7 check #195 @krukow

### 1.4.0

* Add support for inspecting ipa app bundles #192
* Managing the CoreSimulator daemon #191
* Expect {} raise\_error should specify the error #190
* Xcode 7 beta support #189
* Prevent simulator from stealing focus between scenarios #188
  @michaelkirk
* Search for and validate gem version #187
* Add a generic file cache for hashes #185
* Move host cache from /tmp to ~/.run-loop #184

### 1.3.3

* Add Device.device\_with\_identifer method #181
* Simctl::Bridge should manage Xamarin's csproxy #180
* Remove LOAD\_PATH shifting; it is unnecessary #179

### 1.3.2

* 'run-loop simctl install' command line interface #175
* Retriable patch needs to retriable/version #173
* Xcode 6.4b support #172

### 1.3.1

This is a patch release for Xcode 6.3 + iOS 8.3 simulators.

##### Xcode 6.3 instruments cannot launch installed app on iOS 8.3 Simulator [calabash/#744](https://github.com/calabash/calabash-ios/issues/744)

* Refine accessibility and software keyboard enabling #168
* Implement fix for Xcode 6.3 + iOS 8.3 simulators #165
* Make simctl bridge production ready #164
* simctl bridge can UIAninstall an app #163

### 1.3.0

* Add command-line tool #157
* Avoid permission collision of parent temp folder when running multiple instances from different user accounts on the same machine #156 @benshan
* Support 1.3.3.1 <= Retriable < 2.1 #154
* Detect Xcode-beta.app (new in Xcode 6.3 beta 3) #153

### 1.2.9

* Can use simulator UDID for DEVICE\_TARGET #150
* SimControl should filter unavailable devices #148

### 1.2.8

* Support for providing a logger in the options parameter to most methods
* Non-blocking writes prevent occasional hang in run app

### 1.2.7

* Support raw JavaScript calls to UIPickerView classes #134
* Install and launch an app with simctl #132
* Xcode 6.3 beta support #127
* Better instruments process spawn/termination #123, #128, #129
* In multi-user environments, `/tmp/run_loop_host_cache` causes permissions issues #121 @onfoot

### 1.2.6

* #118 rollback awesome print dependency to match android

### 1.2.4

* Fix performance regression on :host strategy [calabash #670](https://github.com/calabash/calabash-ios/issues/670)

### 1.2.3

* #111 stable and pre-release comparison @spedepekka
* #109 Change Xcode 6 default simulator to iPhone 5s
* #107 enable host strategy caching for console attach

### 1.2.2

* #105 update awesome print to 1.6

### 1.2.1

* #101 Escape binary path in argument to lipo. @gredman

### 1.2.0

* Improved :host strategy.
* Improved :preferences strategy.
* Improved escaping across all strategies.
* Experimental support for Xcode 6.2 beta.
* #94 Round coordinates in uia
* #93 Allow dismissal of Location accuracy when bluetooth is disabled
* #91 Add updated CalabashScript to retry key entry if there is a failure
* #90 Updated Calabash Script to support swipe via drag
* #87 instruments process are becoming orphaned because the parent is killed before the child
* #84 Fix bad ref to logger
* #81 UITest: Fix querying Symbols and bump run loop prerelease version
* #80 Ensure compatible arch before launching on device
* #79 UIA strategy shared element
* #78 Default simulator for xcode 6.2 beta
* #76 Device class can provide instruments ready simulator names

### 1.1.0

* #69 Stability uia timeout/lost write/read
* #68 Raise an error with a helpful message when Instruments.app is open
* #61 After killing instruments, try Process.wait

### 1.0.9

* #57 Enable Xcode 6 simulator keyboards by default thanks @gwynantj
* #56 Default simulator for Xcode 6.1 GM seed 2 should be iPhone 5 iOS 8.1
* #55 Enabling accessibility on simulators can skip CoreSimulator directories
* #54 Fix default_tracetemplate for Xcode 6.1 GM seed 2

### 1.0.8

* #48 Fixes 'No such process (Errno::ESRCH)' error when terminating instruments
* #47 Yosemite support for Xcode 6.1 beta automation template

### 1.0.7

* #46 Handling "notifications" related dialogs which appear particularly on iOS 8 devices

### 1.0.6

* #41 Send 'QUIT' instead of `kill -9` or 'TERM' to halt instruments processes

### 1.0.5

* #42 Prelim. support for different privacy dialogs on iOS 8

### 1.0.4

* #38 Adds two missing DEBUG == '1' guards
* #39 SimControl can erase individual Xcode 6 simulators
