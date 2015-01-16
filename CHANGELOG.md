## Change Log

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
