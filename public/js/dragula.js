! function(e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
        var f;
        "undefined" != typeof window ? f = window : "undefined" != typeof global ? f = global : "undefined" != typeof self && (f = self), f.dragula = e()
    }
}(function() {
    var define, module, exports;
    return (function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = typeof require == "function" && require;
                    if (!u && a) return a(o, !0);
                    if (i) return i(o, !0);
                    var f = new Error("Cannot find module '" + o + "'");
                    throw f.code = "MODULE_NOT_FOUND", f
                }
                var l = n[o] = {
                    exports: {}
                };
                t[o][0].call(l.exports, function(e) {
                    var n = t[o][1][e];
                    return s(n ? n : e)
                }, l, l.exports, e, t, n, r)
            }
            return n[o].exports
        }
        var i = typeof require == "function" && require;
        for (var o = 0; o < r.length; o++) s(r[o]);
        return s
    })({
        1: [function(require, module, exports) {
            'use strict';
            var emitter = require('contra.emitter');
            var crossvent = require('crossvent');
            var body = document.body;
            var documentElement = document.documentElement;

            function dragula(containers, options) {
                var _dragging;
                var _mirror;
                var _source;
                var _item;
                var _offsetX;
                var _offsetY;
                var _initialSibling;
                var _currentSibling;
                var _copy;
                var o = options || {};
                if (o.moves === void 0) {
                    o.moves = always;
                }
                if (o.accepts === void 0) {
                    o.accepts = always;
                }
                if (o.copy === void 0) {
                    o.copy = false;
                }
                if (o.revertOnSpill === void 0) {
                    o.revertOnSpill = false;
                }
                if (o.removeOnSpill === void 0) {
                    o.removeOnSpill = false;
                }
                if (o.direction === void 0) {
                    o.direction = 'vertical';
                }
                var api = emitter({
                    cancel: cancel,
                    remove: remove,
                    destroy: destroy
                });
                events();
                return api;

                function events(remove) {
                    var op = remove ? 'remove' : 'add';
                    crossvent[op](documentElement, 'mouseup', release);
                    crossvent[op](documentElement, 'touchend', release);
                    containers.forEach(track);

                    function track(container) {
                        crossvent[op](container, 'mousedown', grab);
                        crossvent[op](container, 'touchstart', grab);
                    }
                }

                function destroy() {
                    events(true);
                    release({});
                }

                function grab(e) {
                    if ((e.which !== 0 && e.which !== 1) || e.metaKey || e.ctrlKey) {
                        return;
                    }
                    if (_dragging) {
                        return;
                    }
                    var item = e.target;
                    if (containers.indexOf(item) !== -1) {
                        return;
                    }
                    while (containers.indexOf(item.parentElement) === -1) {
                        if (invalidTarget(item)) {
                            return;
                        }
                        item = item.parentElement;
                    }
                    if (invalidTarget(item)) {
                        return;
                    }
                    var container = item.parentElement;
                    var movable = o.moves(item, container);
                    if (!movable) {
                        return;
                    }
                    var offset = getOffset(item);
                    e.preventDefault();
                    if (o.copy) {
                        _copy = item.cloneNode(true);
                        addClass(_copy, 'gu-transit');
                    } else {
                        addClass(item, 'gu-transit');
                    }
                    _source = container;
                    _item = item;
                    _initialSibling = _currentSibling = nextEl(item);
                    _offsetX = getCoord('pageX', e) - offset.left;
                    _offsetY = getCoord('pageY', e) - offset.top;
                    api.emit('drag', _item, _source);
                    renderMirrorImage();
                    drag(e);
                }

                function invalidTarget(el) {
                    return el.tagName === 'A' || el.tagName === 'BUTTON';
                }

                function release(e) {
                    if (!_dragging) {
                        return;
                    }
                    var item = _copy || _item;
                    var clientX = getCoord('clientX', e);
                    var clientY = getCoord('clientY', e);
                    var elementBehindCursor = getElementBehindPoint(_mirror, clientX, clientY);
                    var dropTarget = findDropTarget(elementBehindCursor, clientX, clientY);
                    if (dropTarget && (o.copy === false || dropTarget !== _source)) {
                        drop();
                    } else if (o.removeOnSpill) {
                        remove();
                    } else {
                        cancel();
                    }

                    function drop() {
                        if (isInitialPlacement(dropTarget)) {
                            api.emit('cancel', item, _source);
                        } else {
                            api.emit('drop', item, dropTarget, _source);
                        }
                        cleanup();
                    }
                }

                function remove() {
                    if (!_dragging) {
                        return;
                    }
                    var item = _copy || _item;
                    var parent = item.parentElement;
                    if (parent) {
                        parent.removeChild(item);
                    }
                    api.emit(o.copy ? 'cancel' : 'remove', item, parent);
                    cleanup();
                }

                function cancel(revert) {
                    if (!_dragging) {
                        return;
                    }
                    var reverts = arguments.length > 0 ? revert : o.revertOnSpill;
                    var item = _copy || _item;
                    var parent = item.parentElement;
                    if (parent === _source && o.copy) {
                        parent.removeChild(_copy);
                    }
                    var initial = isInitialPlacement(parent);
                    if (initial === false && o.copy === false && reverts) {
                        _source.insertBefore(item, _initialSibling);
                    }
                    if (initial || reverts) {
                        api.emit('cancel', item, _source);
                    } else {
                        api.emit('drop', item, parent, _source);
                    }
                    cleanup();
                }

                function cleanup() {
                    var item = _copy || _item;
                    removeMirrorImage();
                    rmClass(item, 'gu-transit');
                    _source = _item = _copy = _initialSibling = _currentSibling = null;
                }

                function isInitialPlacement(target, s) {
                    var sibling = s !== void 0 ? s : _currentSibling;
                    return target === _source && sibling === _initialSibling;
                }

                function findDropTarget(elementBehindCursor, clientX, clientY) {
                    var target = elementBehindCursor;
                    while (target && !accepted()) {
                        target = target.parentElement;
                    }
                    return target;

                    function accepted() {
                        var droppable = containers.indexOf(target) !== -1;
                        if (droppable === false) {
                            return false;
                        }
                        var immediate = getImmediateChild(target, elementBehindCursor);
                        var reference = getReference(target, immediate, clientX, clientY);
                        var initial = isInitialPlacement(target, reference);
                        if (initial) {
                            return true;
                        }
                        return o.accepts(_item, target, _source);
                    }
                }

                function drag(e) {
                    var clientX = getCoord('clientX', e);
                    var clientY = getCoord('clientY', e);
                    var x = clientX - _offsetX;
                    var y = clientY - _offsetY;
                    _mirror.style.left = x + 'px';
                    _mirror.style.top = y + 'px';
                    var elementBehindCursor = getElementBehindPoint(_mirror, clientX, clientY);
                    var dropTarget = findDropTarget(elementBehindCursor, clientX, clientY);
                    if (dropTarget === _source && o.copy) {
                        return;
                    }
                    var item = _copy || _item;
                    var immediate = getImmediateChild(dropTarget, elementBehindCursor);
                    if (immediate === null) {
                        return;
                    }
                    var reference = getReference(dropTarget, immediate, clientX, clientY);
                    if (reference === null || reference !== item && reference !== nextEl(item)) {
                        _currentSibling = reference;
                        dropTarget.insertBefore(item, reference);
                        api.emit('shadow', item, dropTarget);
                    }
                }

                function renderMirrorImage() {
                    var rect = _item.getBoundingClientRect();
                    _dragging = true;
                    _mirror = _item.cloneNode(true);
                    _mirror.style.width = rect.width + 'px';
                    _mirror.style.height = rect.height + 'px';
                    rmClass(_mirror, 'gu-transit');
                    addClass(_mirror, ' gu-mirror');
                    body.appendChild(_mirror);
                    crossvent.add(documentElement, 'mousemove', drag);
                    crossvent.add(documentElement, 'touchmove', drag);
                    addClass(body, 'gu-unselectable');
                }

                function removeMirrorImage() {
                    if (_mirror) {
                        rmClass(body, 'gu-unselectable');
                        crossvent.remove(documentElement, 'mousemove', drag);
                        crossvent.remove(documentElement, 'touchmove', drag);
                        _mirror.parentElement.removeChild(_mirror);
                        _mirror = null;
                        _dragging = false;
                    }
                }

                function getImmediateChild(dropTarget, target) {
                    var immediate = target;
                    while (immediate !== dropTarget && immediate.parentElement !== dropTarget) {
                        immediate = immediate.parentElement;
                    }
                    if (immediate === documentElement) {
                        return null;
                    }
                    return immediate;
                }

                function getReference(dropTarget, target, x, y) {
                    var horizontal = o.direction === 'horizontal';
                    var reference = target !== dropTarget ? inside() : outside();
                    return reference;

                    function outside() {
                        var len = dropTarget.children.length;
                        var i;
                        var el;
                        var rect;
                        for (i = 0; i < len; i++) {
                            el = dropTarget.children[i];
                            rect = el.getBoundingClientRect();
                            if (horizontal && rect.left > x) {
                                return el;
                            }
                            if (!horizontal && rect.top > y) {
                                return el;
                            }
                        }
                        return null;
                    }

                    function inside() {
                        var rect = target.getBoundingClientRect();
                        if (horizontal) {
                            return resolve(x > rect.left + rect.width / 2);
                        }
                        return resolve(y > rect.top + rect.height / 2);
                    }

                    function resolve(after) {
                        return after ? nextEl(target) : target;
                    }
                }
            }

            function getOffset(el) {
                var rect = el.getBoundingClientRect();
                return {
                    left: rect.left + body.scrollLeft,
                    top: rect.top + body.scrollTop
                };
            }

            function getElementBehindPoint(behind, x, y) {
                if (!x && !y) {
                    return null;
                }
                var state = behind.className;
                behind.className += ' gu-hide';
                var el = document.elementFromPoint(x, y);
                behind.className = state;
                return el;
            }

            function always() {
                return true;
            }

            function nextEl(el) {
                return el.nextElementSibling || manually();

                function manually() {
                    var sibling = el;
                    do {
                        sibling = sibling.nextSibling;
                    } while (sibling && sibling.nodeType !== 1);
                    return sibling;
                }
            }

            function addClass(el, className) {
                if (el.className.indexOf(' ' + className) === -1) {
                    el.className += ' ' + className;
                }
            }

            function rmClass(el, className) {
                el.className = el.className.replace(new RegExp(' ' + className, 'g'), '');
            }

            function getCoord(coord, e) {
                if (typeof e.targetTouches === 'undefined') {
                    return e[coord];
                }
                return e.targetTouches && e.targetTouches.length && e.targetTouches[0][coord] || 0;
            }
            module.exports = dragula;
        }, {
            "contra.emitter": 3,
            "crossvent": 5
        }],
        2: [function(require, module, exports) {
            var process = module.exports = {};
            var queue = [];
            var draining = false;

            function drainQueue() {
                if (draining) {
                    return;
                }
                draining = true;
                var currentQueue;
                var len = queue.length;
                while (len) {
                    currentQueue = queue;
                    queue = [];
                    var i = -1;
                    while (++i < len) {
                        currentQueue[i]();
                    }
                    len = queue.length;
                }
                draining = false;
            }
            process.nextTick = function(fun) {
                queue.push(fun);
                if (!draining) {
                    setTimeout(drainQueue, 0);
                }
            };
            process.title = 'browser';
            process.browser = true;
            process.env = {};
            process.argv = [];
            process.version = '';
            process.versions = {};

            function noop() {}
            process.on = noop;
            process.addListener = noop;
            process.once = noop;
            process.off = noop;
            process.removeListener = noop;
            process.removeAllListeners = noop;
            process.emit = noop;
            process.binding = function(name) {
                throw new Error('process.binding is not supported');
            };
            process.cwd = function() {
                return '/'
            };
            process.chdir = function(dir) {
                throw new Error('process.chdir is not supported');
            };
            process.umask = function() {
                return 0;
            };
        }, {}],
        3: [function(require, module, exports) {
            module.exports = require('./src/contra.emitter.js');
        }, {
            "./src/contra.emitter.js": 4
        }],
        4: [function(require, module, exports) {
            (function(process) {
                (function(root, undefined) {
                    'use strict';
                    var undef = '' + undefined;

                    function atoa(a, n) {
                        return Array.prototype.slice.call(a, n);
                    }

                    function debounce(fn, args, ctx) {
                        if (!fn) {
                            return;
                        }
                        tick(function run() {
                            fn.apply(ctx || null, args || []);
                        });
                    }
                    var si = typeof setImmediate === 'function',
                        tick;
                    if (si) {
                        tick = function(fn) {
                            setImmediate(fn);
                        };
                    } else if (typeof process !== undef && process.nextTick) {
                        tick = process.nextTick;
                    } else {
                        tick = function(fn) {
                            setTimeout(fn, 0);
                        };
                    }

                    function _emitter(thing, options) {
                        var opts = options || {};
                        var evt = {};
                        if (thing === undefined) {
                            thing = {};
                        }
                        thing.on = function(type, fn) {
                            if (!evt[type]) {
                                evt[type] = [fn];
                            } else {
                                evt[type].push(fn);
                            }
                            return thing;
                        };
                        thing.once = function(type, fn) {
                            fn._once = true;
                            thing.on(type, fn);
                            return thing;
                        };
                        thing.off = function(type, fn) {
                            var c = arguments.length;
                            if (c === 1) {
                                delete evt[type];
                            } else if (c === 0) {
                                evt = {};
                            } else {
                                var et = evt[type];
                                if (!et) {
                                    return thing;
                                }
                                et.splice(et.indexOf(fn), 1);
                            }
                            return thing;
                        };
                        thing.emit = function() {
                            var args = atoa(arguments);
                            return thing.emitterSnapshot(args.shift()).apply(this, args);
                        };
                        thing.emitterSnapshot = function(type) {
                            var et = (evt[type] || []).slice(0);
                            return function() {
                                var args = atoa(arguments);
                                var ctx = this || thing;
                                if (type === 'error' && opts.throws !== false && !et.length) {
                                    throw args.length === 1 ? args[0] : args;
                                }
                                evt[type] = et.filter(function emitter(listen) {
                                    if (opts.async) {
                                        debounce(listen, args, ctx);
                                    } else {
                                        listen.apply(ctx, args);
                                    }
                                    return !listen._once;
                                });
                                return thing;
                            };
                        }
                        return thing;
                    }
                    if (typeof module !== undef && module.exports) {
                        module.exports = _emitter;
                    } else {
                        root.contra = root.contra || {};
                        root.contra.emitter = _emitter;
                    }
                })(this);
            }).call(this, require('_process'))
        }, {
            "_process": 2
        }],
        5: [function(require, module, exports) {
            (function(global) {
                'use strict';
                var doc = document;
                var addEvent = addEventEasy;
                var removeEvent = removeEventEasy;
                var hardCache = [];
                if (!global.addEventListener) {
                    addEvent = addEventHard;
                    removeEvent = removeEventHard;
                }

                function addEventEasy(el, type, fn, capturing) {
                    return el.addEventListener(type, fn, capturing);
                }

                function addEventHard(el, type, fn) {
                    return el.attachEvent('on' + type, wrap(el, type, fn));
                }

                function removeEventEasy(el, type, fn, capturing) {
                    return el.removeEventListener(type, fn, capturing);
                }

                function removeEventHard(el, type, fn) {
                    return el.detachEvent('on' + type, unwrap(el, type, fn));
                }

                function fabricateEvent(el, type) {
                    var e;
                    if (doc.createEvent) {
                        e = doc.createEvent('Event');
                        e.initEvent(type, true, true);
                        el.dispatchEvent(e);
                    } else if (doc.createEventObject) {
                        e = doc.createEventObject();
                        el.fireEvent('on' + type, e);
                    }
                }

                function wrapperFactory(el, type, fn) {
                    return function wrapper(originalEvent) {
                        var e = originalEvent || global.event;
                        e.target = e.target || e.srcElement;
                        e.preventDefault = e.preventDefault || function preventDefault() {
                            e.returnValue = false;
                        };
                        e.stopPropagation = e.stopPropagation || function stopPropagation() {
                            e.cancelBubble = true;
                        };
                        fn.call(el, e);
                    };
                }

                function wrap(el, type, fn) {
                    var wrapper = unwrap(el, type, fn) || wrapperFactory(el, type, fn);
                    hardCache.push({
                        wrapper: wrapper,
                        element: el,
                        type: type,
                        fn: fn
                    });
                    return wrapper;
                }

                function unwrap(el, type, fn) {
                    var i = find(el, type, fn);
                    if (i) {
                        var wrapper = hardCache[i].wrapper;
                        hardCache.splice(i, 1);
                        return wrapper;
                    }
                }

                function find(el, type, fn) {
                    var i, item;
                    for (i = 0; i < hardCache.length; i++) {
                        item = hardCache[i];
                        if (item.element === el && item.type === type && item.fn === fn) {
                            return i;
                        }
                    }
                }
                module.exports = {
                    add: addEvent,
                    remove: removeEvent,
                    fabricate: fabricateEvent
                };
            }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
        }, {}]
    }, {}, [1])(1)
});