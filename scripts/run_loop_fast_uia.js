#import "./detect_externally_generated_alerts.js";
#import "./logger.js";

if (typeof JSON !== 'object') {
    JSON = {};
}
(function () {
    'use strict';
    function f(n) {
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {
        Date.prototype.toJSON = function (key) {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' +
                f(this.getUTCMonth() + 1) + '-' +
                f(this.getUTCDate()) + 'T' +
                f(this.getUTCHours()) + ':' +
                f(this.getUTCMinutes()) + ':' +
                f(this.getUTCSeconds()) + 'Z' : null;
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (key) {
            return this.valueOf();
        };
    }
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {'\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"': '\\"', '\\': '\\\\'}, rep;

    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }

    function str(key, holder) {
        var i, k, v, length, mind = gap, partial, value = holder[key];
        if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }
        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }
        switch (typeof value) {
            case'string':
                return quote(value);
            case'number':
                return isFinite(value) ? String(value) : 'null';
            case'boolean':
            case'null':
                return String(value);
            case'object':
                if (!value) {
                    return'null';
                }
                gap += indent;
                partial = [];
                if (Object.prototype.toString.apply(value) === '[object Array]') {
                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || 'null';
                    }
                    v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
                    gap = mind;
                    return v;
                }
                if (rep && typeof rep === 'object') {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        if (typeof rep[i] === 'string') {
                            k = rep[i];
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                } else {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                }
                v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
                gap = mind;
                return v;
        }
    }

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {
            var i;
            gap = '';
            indent = '';
            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }
            } else if (typeof space === 'string') {
                indent = space;
            }
            rep = replacer;
            if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }
            return str('', {'': value});
        };
    }
    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {
            var j;

            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return'\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                j = eval('(' + text + ')');
                return typeof reviver === 'function' ? walk({'': j}, '') : j;
            }
            throw new SyntaxError('JSON.parse');
        };
    }
}());


_RUN_LOOP_MAX_RETRY_AFTER_HANDLER = 10;
var _expectedIndex = 0,//expected index of next command
    _actualIndex=0,//actual index of next command by reading commandPath
    _exp,//expression to be eval'ed
    _result,
    _lastResponse=null;

UIATarget.onAlert = function (alert) {
    var target = UIATarget.localTarget(),
        app = target.frontMostApp(),
        req = null,
        rsp = null,
        actualIndex = null;
    target.pushTimeout(10);
    function attemptTouchDefaultAlertButton(retry_count) {
        retry_count = retry_count || 0;
        if (retry_count >= 5) {
            Log.output("Maxed out retry (5) - unable to dismiss location dialog.");
            return;
        }
        try {
            var answer = isExternallyGeneratedAlert(alert);
            if (answer) {
                alert.buttons()[answer].tap();
            }
        }
        catch (e) {
            Log.output("Exception while trying to touch alert dialog. Retrying...");
            if (e && typeof e.toString == 'function') {
                Log.output(e.toString());
            }
            target.delay(1);
            attemptTouchDefaultAlertButton(retry_count + 1);
        }
    }

    attemptTouchDefaultAlertButton(0);
    target.popTimeout();
    for (var i=0;i<_RUN_LOOP_MAX_RETRY_AFTER_HANDLER;i++) {
        req = app.preferencesValueForKey(__calabashRequest);
        rsp = app.preferencesValueForKey(__calabashResponse);
        actualIndex = req && req['index'];
        if (req && !isNaN(actualIndex) && actualIndex <= _lastResponse['index']) {
            UIALogger.logMessage("Deleting previous response: "+(rsp && rsp['index']));
            app.setPreferencesValueForKey(0, __calabashRequest);
            app.setPreferencesValueForKey(null, __calabashRequest);
        }
        if (_lastResponse) {
            UIALogger.logMessage("Re-Writing response: "+_lastResponse['value']);
            _response(_lastResponse);
        }
    }
    return true;
};

var target = null,
    failureMessage = null,
    preferences = null,
    __calabashRequest = "__calabashRequest",
    __calabashResponse = "__calabashResponse",
    _sanitize = function(val) {
        if (typeof val === 'undefined' || val === null || val instanceof UIAElementNil) {
            return ":nil";
        }
        if (typeof val === 'string' || val instanceof String) {
            return val;
        }
        var arrVal = null, i, N;
        if (val instanceof Array || val instanceof UIAElementArray) {
            arrVal = [];
            for (i=0,N=val.length;i<N;i++) {
                arrVal[i] = _sanitize(val[i]);
            }
            return arrVal;
        }
        if (val instanceof UIAElement) {
            return val.toString();
        }
        var objVal = null, p;
        if (typeof val == 'object') {
            objVal = {};
            for (p in val) {
                objVal[p] = _sanitize(val[p]);
            }
            return objVal;
        }
        return val;
    },
    _response = function(response) {
        var sanitized = _sanitize(response),
            i = 0,
            MAX_TRIES=120,
            res,
            tmp;

        for (i=0; i<MAX_TRIES; i+=1) {
            tmp = target.frontMostApp().preferencesValueForKey(__calabashResponse);
            UIALogger.logMessage("Last response..."+(tmp && tmp['index']+"->"+tmp['value']));
            target.frontMostApp().setPreferencesValueForKey(sanitized, __calabashResponse);
            res = target.frontMostApp().preferencesValueForKey(__calabashRequest);
            res = target.frontMostApp().preferencesValueForKey(__calabashResponse);
            UIALogger.logMessage("Next response..."+(res && res['value']));
            target.delay(0.1);
            res = target.frontMostApp().preferencesValueForKey(__calabashResponse);
            UIALogger.logMessage("Post delay response..."+(res && res['value']));
            if (res && res['index'] == sanitized['index']) {
                UIALogger.logMessage("Storage succeeded: "+ res['index']);
                return;
            } else {
                UIALogger.logMessage("Storage failed: "+ res + " Retrying...");
                target.delay(0.2);
            }
        }
        throw new Error("Unable to write to preferences");
    },
    _success = function(result,index) {
        _lastResponse = {"status":'success', "value":result, "index": index};
        _response(_lastResponse);

    },
    _failure = function(err, index) {
        _lastResponse = {"status":'error',
                         "value":err.toString(),
                         "backtrace":(err.stack ? err.stack.toString() : ""),
                         "index":index};
        _response(_lastResponse);
    },
    _resetCalabashPreferences = function () {
        //Implementation is weird but reading pref values seems to have side effects
        //also deleting a key seemed to require writing 0 and then null :)
        var app = UIATarget.localTarget().frontMostApp();
        app.preferencesValueForKey(__calabashRequest);
        app.preferencesValueForKey(__calabashResponse);
        app.setPreferencesValueForKey(0, __calabashResponse);
        app.setPreferencesValueForKey(null, __calabashResponse);
        app.setPreferencesValueForKey(0, __calabashRequest);
        app.setPreferencesValueForKey(null, __calabashRequest);
    };

_resetCalabashPreferences();
Log.result('success',true,true);
target = UIATarget.localTarget();
while (true) {
    try {
        preferences = target.frontMostApp().preferencesValueForKey(__calabashRequest);
    } catch (e) {
        Log.output("Unable to read preferences..."+ e.toString());
        target.delay(0.5);
        continue;
    }

    if (!preferences) {
        target.delay(0.2);
        continue;
    }

    _actualIndex = preferences['index'];
    if (!isNaN(_actualIndex) && _actualIndex >= _expectedIndex) {
        UIATarget.localTarget().frontMostApp().setPreferencesValueForKey(null, __calabashResponse);
        _exp = preferences['command'];
        UIALogger.logMessage("index " + _actualIndex + " is command: "+ _exp);
        try {
            if (_exp == 'break;') {
                _success("OK", _actualIndex);
                break;
            }
            _result = eval(_exp);
            UIALogger.logMessage("Success: "+ _result);
            _success(_result, _actualIndex);
        }
        catch(err) {
            failureMessage = "Failure: "+ err.toString() + "  " + (err.stack ? err.stack.toString() : "");
            Log.output({"output":failureMessage}, true);
            _failure(err, _actualIndex);
        }
    }
    else {//likely old command is lingering...
        continue;
    }
    _expectedIndex = Math.max(_actualIndex+1, _expectedIndex+1);
    target.delay(0.2);
}
