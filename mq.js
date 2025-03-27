/**
* my query - JavaScript Library created and developed by Nelsen Niko.
*
* This library, named "my query," is designed to provide functionalities
* for web development, including DOM manipulation, web modification,
* and web development enhancements.
*
* Feel free to reach out to Nelsen Niko for any inquiries or assistance.
*/

'use strict';
/*
const version = "1.0.0"; */
const version = "1.0.1";
console.log("Welcome to mQ library! Version : " + version);

const $ = function (selector) {
    try {
        if (!(this instanceof $)) {
            return new $(selector);
        }

        if (!selector) {
            throw new Error("Selector is required.");
        }

        if (typeof selector === 'string') {
            if (selector.trim().charAt(0) === '<') {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = selector.trim();
                this.el = Array.from(tempDiv.childNodes);
            } else {
                this.el = Array.from(document.querySelectorAll(selector));
            }
        } else if (selector instanceof Element) {
            this.el = [selector];
        } else {
            throw new Error("Invalid selector type. Must be a string or DOM element.");
        }

        if (!this.el || this.el.length === 0) {
            console.warn("No elements matching the selector: " + selector);
        }
    } catch (error) {
        console.error("Error in $ function:", error.message);
        // You can also choose to throw the error further if needed
    }

    return this;
};

// Pastikan kode hanya dijalankan di browser
if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", function () {
        if (window.mqReadyQueue && Array.isArray(window.mqReadyQueue)) {
            window.mqReadyQueue.forEach(fn => fn());
            window.mqReadyQueue = [];
        }
    });
}

// Wrapper agar kode bisa dieksekusi setelah DOM siap
function mqReady(fn) {
    if (typeof document !== "undefined" && document.readyState !== "loading") {
        fn();
    } else {
        window.mqReadyQueue = window.mqReadyQueue || [];
        window.mqReadyQueue.push(fn);
    }
};


$.prototype = {
    // DOM manipulation
    html: function (content) {
        if (content === undefined) {
            return this.el[0].innerHTML;
        }

        this.el.forEach(function (element) {
            element.innerHTML = content;
        });

        return this;
    },
    append: function (content) {
        this.el.forEach(function (element) {
            element.insertAdjacentHTML("beforeend", content);
        });

        return this;
    },
    prepend: function (content) {
        this.el.forEach(function (element) {
            element.insertAdjacentHTML("afterbegin", content);
        });

        return this;
    },
    remove: function () {
        this.el.forEach(function (element) {
            element.parentNode.removeChild(element);
        });

        return this;
    },
    parent: function () {
        return this.el.length > 0 ? $(this.el[0].parentNode): $(null);
    },
    children: function () {
        var children = this.el.length > 0 ? Array.from(this.el[0].children): [];
        return $(children);
    },

    filter: function (selector) {
        const filteredElements = this.el ? Array.from(this.el).filter(el => el && el.matches && el.matches(selector)): [];
        return $(filteredElements);
    },


    first: function () {
        return this.el.length > 0 ? $(this.el[0]): $(null);
    },
    last: function () {
        return this.el.length > 0 ? $(this.el[this.el.length - 1]): $(null);
    },
    eq: function (index) {
        return this.el.length > index ? $(this.el[index]): $(null);
    },


    addClass: function (className) {
        try {
            this.el.forEach(function (element) {
                element.classList.add(className);
            });
        } catch (error) {
            console.error("Error in addClass method:",
                error.message);
            // You can choose to handle the error further or throw it if needed
        }

        return this;
    },

    removeClass: function (className) {
        try {
            this.el.forEach(function (element) {
                element.classList.remove(className);
            });
        } catch (error) {
            console.error("Error in removeClass method:",
                error.message);
            // You can choose to handle the error further or throw it if needed
        }

        return this;
    },


    toggleClass: function (className) {
        this.el.forEach(function (element) {
            element.classList.toggle(className);
        });

        return this;
    },

    // New methods
    addText: function (text) {
        this.el.forEach(function (element) {
            element.textContent += text;
        });

        return this;
    },

    setBackgroundColor: function (color) {
        this.el.forEach(function (element) {
            element.style.backgroundColor = color;
        });

        return this;
    },

    // New methods
    setFontSize: function (size) {
        this.el.forEach(function (element) {
            element.style.fontSize = size;
        });

        return this;
    },

    setBorderColor: function (color) {
        this.el.forEach(function (element) {
            element.style.borderColor = color;
        });

        return this;
    },

    setBorderRadius: function (radius) {
        this.el.forEach(function (element) {
            element.style.borderRadius = radius;
        });

        return this;
    },

    setTextColor: function (color) {
        this.el.forEach(function (element) {
            element.style.color = color;
        });

        return this;
    },

    setInnerHtml: function (html) {
        this.el.forEach(function (element) {
            element.innerHTML = html;
        });

        return this;
    },

    removeStyle: function (property) {
        this.el.forEach(function (element) {
            element.style.removeProperty(property);
        });

        return this;
    },

    hasClass: function (className) {
        return this.el.some(function (element) {
            return element.classList.contains(className);
        });
    },

    // Event handling
    on: function (eventType, selector, callback) {
        if (callback === undefined) {
            callback = selector;
            selector = null;
        }

        this.el.forEach(function (element) {
            element.addEventListener(eventType, function (event) {
                if (selector === null || event.target.matches(selector)) {
                    callback.call(event.target, event);
                }
            });
        });

        return this;
    },

    click: function (callback) {
        this.el.forEach(function (element) {
            element.addEventListener("click",
                callback);
        });

        return this;
    },
    off: function (eventType, callback) {
        this.el.forEach(function (element) {
            element.removeEventListener(eventType,
                callback);
        });

        return this;
    },

    // Utility methods
    each: function (callback) {
        this.el.forEach(callback);
        return this;
    },
    text: function (content) {
        this.el.forEach(function (element) {
            element.textContent = content;
        });

        return this;
    },

    text: function (content) {
        if (content !== undefined) {
            this.el.forEach(function (element) {
                element.textContent = content;
            });
            return this;
        } else {
            // Retrieve text content from the first element
            return this.el[0] ? this.el[0].textContent: null;
        }
    },


    slideUp: function (duration) {
        this.el.forEach(function (element) {
            element.style.height = "0";
        });

        setTimeout(function () {
            this.el.forEach(function (element) {
                element.style.display = "none";
            });
        }.bind(this), duration);

        return this;
    },


    slideDown: function (duration) {
        this.el.forEach(function (element) {
            element.style.display = ""; // Reset display property
            element.style.height = element.scrollHeight + "px";
        });

        return this;
    },

    toggle: function (duration = 0) {
        try {
            this.el.forEach(function (element) {
                if (element.style.display === "none") {
                    // If hidden, fade in
                    element.style.display = ""; // Ensure the element is visible before fading in
                    let opacity = 0;
                    const interval = 20;
                    const delta = interval / duration || 0;

                    function fade() {
                        opacity += delta;
                        element.style.opacity = opacity;

                        if (opacity >= 1) {
                            clearInterval(fadeTimer);
                        }
                    }

                    const fadeTimer = setInterval(fade, interval);
                } else {
                    // If visible, fade out
                    let opacity = 1;
                    const interval = 20;
                    const delta = interval / duration || 0;

                    function fade() {
                        opacity -= delta;
                        element.style.opacity = opacity;

                        if (opacity <= 0) {
                            element.style.display = "none";
                            clearInterval(fadeTimer);
                        }
                    }

                    const fadeTimer = setInterval(fade, interval);
                }
            });
        } catch (error) {
            console.error("Error in toggle method:",
                error.message);
            // You can choose to handle the error further or throw it if needed
        }

        return this;
    },

    attr: function (attributes) {
        if (typeof attributes === "object") {
            this.el.forEach(function (element) {
                for (var key in attributes) {
                    if (attributes.hasOwnProperty(key)) {
                        element.setAttribute(key, attributes[key]);
                    }
                }
            });
        } else if (attributes === undefined) {
            return this.el[0].getAttribute(attribute);
        }

        return this;
    },

    removeAttr: function (attribute) {
        this.el.forEach(function (element) {
            element.removeAttribute(attribute);
        });

        return this;
    },
    delegate: function (eventType, selector, callback) {
        this.el.forEach(function (element) {
            element.addEventListener(eventType, function (event) {
                if (event.target.matches(selector)) {
                    callback.call(event.target, event);
                }
            });
        });

        return this;
    },
    data: function (key, value) {
        if (value === undefined) {
            return this.el[0].dataset[key];
        }

        this.el.forEach(function (element) {
            element.dataset[key] = value;
        });

        return this;
    },

    width: function () {
        return this.el[0].offsetWidth;
    },
    height: function () {
        return this.el[0].offsetHeight;
    },
    val: function (value) {
        if (value === undefined) {
            return this.el[0].value;
        }

        this.el.forEach(function (element) {
            element.value = value;
        });

        return this;
    },

    // Additional methods
    fadeIn: function (duration, callback) {
        this.el.forEach(function (element) {
            element.style.transition = `opacity ${duration}s`;
            element.style.opacity = 1;
        });

        setTimeout(function () {
            if (callback && typeof callback === "function") {
                callback();
            }
        },
            duration * 1000);

        return this;
    },

    fadeOut: function (duration) {
        this.el.forEach(function (element) {
            element.style.transition = `opacity ${duration}s`;
            element.style.opacity = 0;
        });

        setTimeout(function () {
            this.el.forEach(function (element) {
                element.style.display = "none";
            });
        }.bind(this),
            duration * 1000);

        return this;
    },

    hide: function () {
        this.el.forEach(function (element) {
            element.style.display = "none";
        });

        return this;
    },
    show: function () {
        this.el.forEach(function (element) {
            element.style.display = "";
        });

        return this;
    },

    slideUp: function (duration) {
        this.el.forEach(function (element) {
            element.style.transition = `height ${duration}s`;
            element.style.overflow = "hidden";
            element.style.height = "0";
        });

        return this;
    },

    slideDown: function (duration) {
        this.el.forEach(function (element) {
            element.style.transition = `height ${duration}s`;
            element.style.overflow = "hidden";
            element.style.height = element.scrollHeight + "px";
        });

        return this;
    },

    fadeToggle: function (duration) {
        this.el.forEach(function (element) {
            const currentOpacity = parseFloat(
                window.getComputedStyle(element).opacity
            );
            const targetOpacity = currentOpacity === 0 ? 1: 0;

            element.style.transition = `opacity ${duration}s`;
            element.style.opacity = targetOpacity;
        });

        return this;
    },

    slideToggle: function (duration) {
        this.el.forEach(function (element) {
            const currentHeight = element.clientHeight;
            const targetHeight = currentHeight === 0 ? element.scrollHeight: 0;

            element.style.transition = `height ${duration}s`;
            element.style.overflow = "hidden";
            element.style.height = targetHeight + "px";
        });

        return this;
    },



    // Additional methods


    appendTo: function (targetSelector) {
        const targets = document.querySelectorAll(targetSelector);

        if (targets.length > 0) {
            this.el.forEach(function (element) {
                targets.forEach(function (target) {
                    target.appendChild(element.cloneNode(true));
                });
            });
        } else {
            console.warn("Target elements not found: " + targetSelector);
        }

        return this;
    },

    empty: function () {
        this.el.forEach(function (element) {
            element.innerHTML = "";
        });

        return this;
    },

    clone: function () {
        const clones = Array.from(this.el).map(function (element) {
            return element.cloneNode(true);
        });

        return $(clones);
    },
    find: function (selector) {
        const foundElements = Array.from(this.el).reduce((acc, element) => {
            const elements = Array.from(element.querySelectorAll(selector));
            return acc.concat(elements);
        }, []);

        return $(foundElements);
    },

    typeText: function (text, duration, loop) {
        this.el.forEach(function (element) {
            let index = 0;
            const typeAnimation = function () {
                const intervalId = setInterval(function () {
                    if (index <= text.length) {
                        element.textContent = text.substring(0, index);
                        index++;
                    } else {
                        clearInterval(intervalId);
                        if (loop) {
                            index = 0;
                            setTimeout(typeAnimation, 1000); // You can adjust the delay before starting the loop
                        }
                    }
                },
                    duration / text.length);
            };

            typeAnimation();
        });

        return this;
    },

    toggleClassAll: function (className) {
        this.el.forEach(function (element) {
            element.classList.toggle(className);
        });

        return this;
    },

    slideUpToggle: function (duration) {
        this.el.forEach(function (element) {
            if (element.style.height === "0") {
                element.style.transition = `height ${duration}s`;
                element.style.overflow = "hidden";
                element.style.height = element.scrollHeight + "px";
            } else {
                element.style.transition = `height ${duration}s`;
                element.style.overflow = "hidden";
                element.style.height = "0";
            }
        });

        return this;
    },

    delay: function (duration) {
        const self = this;
        return {
            then: function (callback) {
                setTimeout(function () {
                    callback.call(self);
                },
                    duration);
            },
        };
    },

    fadeInToggle: function (duration) {
        this.el.forEach(function (element) {
            const currentOpacity = parseFloat(
                window.getComputedStyle(element).opacity
            );
            const targetOpacity = currentOpacity === 0 ? 1: 0;

            element.style.transition = `opacity ${duration}s`;
            element.style.opacity = targetOpacity;
        });

        return this;
    },

    slideUpDownToggle: function (duration) {
        this.el.forEach(function (element) {
            if (element.style.height === "0") {
                element.style.transition = `height ${duration}s`;
                element.style.overflow = "hidden";
                element.style.height = element.scrollHeight + "px";
            } else {
                element.style.transition = `height ${duration}s`;
                element.style.overflow = "hidden";
                element.style.height = "0";
            }
        });

        return this;
    },

    fadeTo: function (opacity, duration) {
        this.el.forEach(function (element) {
            element.style.transition = `opacity ${duration}s`;
            element.style.opacity = opacity;
        });

        return this;
    },

    toggleAttr: function (attribute, value1, value2) {
        this.el.forEach(function (element) {
            const currentVal = element.getAttribute(attribute);
            const targetVal = currentVal === value1 ? value2: value1;
            element.setAttribute(attribute, targetVal);
        });

        return this;
    },

    wrap: function (wrapper) {
        const wrapperElement = document.createElement("div");
        wrapperElement.innerHTML = wrapper;

        this.el.forEach(function (element) {
            const parent = element.parentNode;
            parent.insertBefore(wrapperElement.cloneNode(true), element);
            parent.removeChild(element);
            wrapperElement.appendChild(element);
        });

        return this;
    },

    replaceWith: function (content) {
        this.el.forEach(function (element) {
            const parent = element.parentNode;
            const temp = document.createElement("div");
            temp.innerHTML = content;
            parent.insertBefore(temp.firstChild, element);
            parent.removeChild(element);
        });

        return this;
    },

    disable: function () {
        this.el.forEach(function (element) {
            if (element.tagName === "FORM" || element.tagName === "INPUT" || element.tagName === "SELECT" || element.tagName === "TEXTAREA") {
                element.disabled = true;
            }
        });

        return this;
    },

    isHidden: function () {
        return this.el.every(function (element) {
            return window.getComputedStyle(element).display === 'none';
        });
    },

    fadeInOutToggle: function (duration) {
        this.el.forEach(function (element) {
            const currentOpacity = parseFloat(
                window.getComputedStyle(element).opacity
            );
            const targetOpacity = currentOpacity === 0 ? 1: 0;

            element.style.transition = `opacity ${duration}s`;
            element.style.opacity = targetOpacity;
        });

        return this;
    },

    toggleHtml: function (content1, content2) {
        this.el.forEach(function (element) {
            const currentHtml = element.innerHTML;
            const targetHtml = currentHtml === content1 ? content2: content1;
            element.innerHTML = targetHtml;
        });

        return this;
    },

    slideLeftRightToggle: function (duration) {
        this.el.forEach(function (element) {
            const isHidden = window.getComputedStyle(element).display === 'none';
            const targetWidth = isHidden ? element.scrollWidth + 'px': '0';

            element.style.transition = `width ${duration}s`;
            element.style.overflow = 'hidden';
            element.style.width = targetWidth;
        });

        return this;
    },

    toggleProp: function (property) {
        this.el.forEach(function (element) {
            element[property] = !element[property];
        });

        return this;
    },

    insertBefore: function (targetSelector) {
        const targets = document.querySelectorAll(targetSelector);

        if (targets.length > 0) {
            this.el.forEach(function (element) {
                targets.forEach(function (target) {
                    target.parentNode.insertBefore(element.cloneNode(true), target);
                });
            });
        } else {
            console.warn("Target elements not found: " + targetSelector);
        }

        return this;
    },

    scrollToTop: function (duration) {
        const targetY = 0;
        this.el.forEach(function (element) {
            const startY = window.scrollY;
            const distance = targetY - startY;
            let startTime;

            function scrollAnimation(currentTime) {
                if (startTime === undefined) {
                    startTime = currentTime;
                }

                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);

                window.scrollTo(0, startY + distance * progress);

                if (timeElapsed < duration) {
                    requestAnimationFrame(scrollAnimation);
                }
            }

            requestAnimationFrame(scrollAnimation);
        });

        return this;
    },

    cloneTo: function (targetSelector) {
        const targets = document.querySelectorAll(targetSelector);

        if (targets.length > 0) {
            const clones = Array.from(this.el).map(function (element) {
                return element.cloneNode(true);
            });

            targets.forEach(function (target) {
                clones.forEach(function (clone) {
                    target.appendChild(clone);
                });
            });
        } else {
            console.warn("Target elements not found: " + targetSelector);
        }

        return this;
    },

    isDisabled: function () {
        return this.el.every(function (element) {
            return (
                element.tagName === "FORM" ||
                element.tagName === "INPUT" ||
                element.tagName === "SELECT" ||
                element.tagName === "TEXTAREA"
            )
            ? element.disabled: false;
        });
    },

    toggleDisabled: function () {
        this.el.forEach(function (element) {
            if (
                element.tagName === "FORM" ||
                element.tagName === "INPUT" ||
                element.tagName === "SELECT" ||
                element.tagName === "TEXTAREA"
            ) {
                element.disabled = !element.disabled;
            }
        });

        return this;
    },

    toggleChecked: function () {
        this.el.forEach(function (element) {
            if (element.tagName === "INPUT" && element.type === "checkbox") {
                element.checked = !element.checked;
            }
        });

        return this;
    },

    toggleSelected: function () {
        this.el.forEach(function (element) {
            if (element.tagName === "OPTION") {
                element.selected = !element.selected;
            }
        });

        return this;
    },

    wrapAll: function (wrapper) {
        const wrapperElement = document.createElement("div");
        wrapperElement.innerHTML = wrapper;

        this.el.forEach(function (element) {
            const parent = element.parentNode;
            parent.insertBefore(wrapperElement.cloneNode(true), element);
            parent.removeChild(element);
            wrapperElement.appendChild(element);
        });

        return this;
    },

    unwrap: function () {
        this.el.forEach(function (element) {
            const parent = element.parentNode;
            parent.replaceChild(element.firstChild, element);
        });

        return this;
    },

    toggleParent: function (parentSelector) {
        const parent = document.querySelector(parentSelector);

        if (parent) {
            this.el.forEach(function (element) {
                if (element.parentNode === parent) {
                    element.parentNode.removeChild(element);
                } else {
                    parent.appendChild(element.cloneNode(true));
                }
            });
        } else {
            console.warn("Parent element not found: " + parentSelector);
        }

        return this;
    },

    scrollIntoView: function (options) {
        this.el.forEach(function (element) {
            element.scrollIntoView(options);
        });

        return this;
    },

    hasAttr: function (attribute) {
        return this.el.some(function (element) {
            return element.hasAttribute(attribute);
        });
    },

    removeData: function (key) {
        this.el.forEach(function (element) {
            delete element.dataset[key];
        });

        return this;
    },

    closest: function (selector) {
        const closestParents = this.el.map(function (element) {
            return element.closest(selector);
        });

        return $(closestParents);
    },

    fadeOutToggleRemove: function (duration) {
        this.el.forEach(function (element) {
            element.style.transition = `opacity ${duration}s`;
            element.style.opacity = 0;
        });

        setTimeout(function () {
            this.el.forEach(function (element) {
                element.remove();
            });
        }.bind(this), duration * 1000);

        return this;
    },

    slideLeftToggle: function (duration) {
        this.el.forEach(function (element) {
            const isHidden = window.getComputedStyle(element).display === 'none';
            const targetWidth = isHidden ? element.scrollWidth + 'px': '0';

            element.style.transition = `width ${duration}s`;
            element.style.overflow = 'hidden';
            element.style.width = targetWidth;
        });

        return this;
    },

    toggleInlineStyle: function (styleName, value1, value2) {
        this.el.forEach(function (element) {
            const currentVal = element.style[styleName];
            const targetVal = currentVal === value1 ? value2: value1;
            element.style[styleName] = targetVal;
        });

        return this;
    },

    toggleCustomAttribute: function (attribute, value1, value2) {
        this.el.forEach(function (element) {
            const currentVal = element.getAttribute(attribute);
            const targetVal = currentVal === value1 ? value2: value1;
            element.setAttribute(attribute, targetVal);
        });

        return this;
    },

    fadeToToggle: function (opacity1, opacity2, duration) {
        this.el.forEach(function (element) {
            const currentOpacity = parseFloat(
                window.getComputedStyle(element).opacity
            );
            const targetOpacity = currentOpacity === opacity1 ? opacity2: opacity1;

            element.style.transition = `opacity ${duration}s`;
            element.style.opacity = targetOpacity;
        });

        return this;
    },

    toggleBackgroundColor: function (color) {
        this.el.forEach(function (element) {
            const currentColor = window.getComputedStyle(element).backgroundColor;
            const targetColor = currentColor === "rgba(0, 0, 0, 0)" ? color: "rgba(0, 0, 0, 0)";
            element.style.backgroundColor = targetColor;
        });

        return this;
    },

    toggleTextColor: function (color) {
        this.el.forEach(function (element) {
            const currentColor = window.getComputedStyle(element).color;
            const targetColor = currentColor === "rgba(0, 0, 0, 0)" ? color: "rgba(0, 0, 0, 0)";
            element.style.color = targetColor;
        });

        return this;
    },

    // create another methods includes(), some(), every(), filter(), map(), flatMap(), reduce(), reverse(), sort(), flat(), fill(), find(), findIndex(), forEach(), concat(), bind(), concate(), Array.from(), Object.assign(), String.split(), String.slice(), String.indexOf(),

    // Array methods
    includes: function (value) {
        return Array.from(this.el).some(function (element) {
            return element.textContent.includes(value);
        });
    },
    some: function (callback) {
        return Array.from(this.el).some(callback);
    },
    every: function (callback) {
        return Array.from(this.el).every(callback);
    },

    map: function (callback) {
        return $(Array.from(this.el).map(callback));
    },
    flatMap: function (callback) {
        return $(Array.from(this.el).flatMap(callback));
    },
    reduce: function (callback, initialValue) {
        return Array.from(this.el).reduce(callback, initialValue);
    },
    reverse: function () {
        return $(Array.from(this.el).reverse());
    },
    sort: function (compareFunction) {
        return $(Array.from(this.el).sort(compareFunction));
    },
    flat: function () {
        return $(Array.from(this.el).flat());
    },
    fill: function (value, start, end) {
        Array.from(this.el).forEach(function (element) {
            element.textContent = element.textContent.split('').fill(value, start, end).join('');
        });
        return this;
    },
    find: function (callback) {
        return $(Array.from(this.el).find(callback));
    },
    findIndex: function (callback) {
        return Array.from(this.el).findIndex(callback);
    },
    forEach: function (callback) {
        Array.from(this.el).forEach(callback);
        return this;
    },
    concat: function (arr) {
        return $(Array.from(this.el).concat(arr.el || arr));
    },

    // String methods
    split: function (separator, limit) {
        return $(Array.from(this.el).map(function (element) {
            return element.textContent.split(separator, limit);
        }).flat());
    },
    slice: function (start, end) {
        return $(Array.from(this.el).map(function (element) {
            return element.textContent.slice(start, end);
        }));
    },
    indexOf: function (searchValue, fromIndex) {
        return Array.from(this.el).map(function (element) {
            return element.textContent.indexOf(searchValue, fromIndex);
        });
    },

    replaceText: function (oldText, newText) {
        this.el.forEach(function (element) {
            element.textContent = element.textContent.replace(new RegExp(oldText, 'g'), newText);
        });

        return this;
    },
    shuffle: function () {
        const shuffled = Array.from(this.el).sort(() => Math.random() - 0.5);
        return $(shuffled);
    },
    copyToClipboard: function () {
        const textToCopy = this.el[0].textContent;
        navigator.clipboard.writeText(textToCopy);
        return this;
    },

    count: function () {
        return this.el.length;
    },

    scrollToBottom: function (duration) {
        const targetY = this.el[0].scrollHeight - this.el[0].offsetHeight;
        // ... (implementasi animasi scroll ke bagian bawah)
        return this;
    },

    rotate: function (angle) {
        this.el.forEach(function (element) {
            element.style.transform = `rotate(${angle}deg)`;
        });

        return this;
    },

    highlight: function (keyword) {
        this.el.forEach(function (element) {
            const regex = new RegExp(`(${keyword})`, 'gi');
            element.innerHTML = element.textContent.replace(regex, '<span class="highlight">$1</span>');
        });

        return this;
    },

    toggleFullScreen: function () {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            this.el[0].requestFullscreen();
        }

        return this;
    },

    serializeForm: function () {
        const formData = new FormData(this.el[0]);
        const serialized = {};
        formData.forEach((value, key) => {
            serialized[key] = value;
        });

        return serialized;
    },

    getBoundingClientRect: function () {
        return this.el[0].getBoundingClientRect();
    },

    getAttributes: function () {
        const attributes = Array.from(this.el[0].attributes);
        const attributeObj = {};
        attributes.forEach(attr => {
            attributeObj[attr.name] = attr.value;
        });

        return attributeObj;
    },
    toggleClassAllExcept: function(className, exceptClass) {
        this.el.forEach(function (element) {
            if (!element.classList.contains(exceptClass)) {
                element.classList.toggle(className);
            }
        });

        return this;
    },

    // New method
    smoothScrollTo: function (targetY, duration) {
        this.el.forEach(function (element) {
            const startY = element.scrollTop;
            const distance = targetY - startY;
            let startTime;

            function scrollAnimation(currentTime) {
                if (startTime === undefined) {
                    startTime = currentTime;
                }

                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);

                element.scrollTop = startY + distance * progress;

                if (timeElapsed < duration) {
                    requestAnimationFrame(scrollAnimation);
                }
            }

            requestAnimationFrame(scrollAnimation);
        });

        return this;
    },

    // New method
    scrollToBottom: function (duration) {
        this.el.forEach(function (element) {
            // Store the original scroll position
            const originalScrollTop = element.scrollTop;

            // Calculate the target scroll position
            const targetScrollTop = element.scrollHeight - element.clientHeight;

            // Calculate the distance to scroll
            const distance = targetScrollTop - originalScrollTop;

            // Store the starting time
            let startTime;

            // Define the scroll animation function
            function scrollAnimation(currentTime) {
                if (startTime === undefined) {
                    startTime = currentTime;
                }

                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);

                // Perform a smooth scroll animation
                element.scrollTop = originalScrollTop + distance * progress;

                if (timeElapsed < duration) {
                    requestAnimationFrame(scrollAnimation);
                }
            }

            // Request the animation frame to initiate the scroll animation
            requestAnimationFrame(scrollAnimation);
        });

        return this;
    },

    // New method
    shake: function (intensity, duration) {
        this.el.forEach(function (element) {
            // Store the original position and style
            const originalPosition = getComputedStyle(element).position;
            const originalStyle = element.getAttribute('style');

            // Apply shake effect using CSS keyframes
            const shakeKeyframes = `
            @keyframes shake {
            10%, 90% {
            transform: translate3d(-1px, 0, 0) rotate(${Math.random() * intensity}deg);
            }
            20%, 80% {
            transform: translate3d(2px, 0, 0) rotate(${Math.random() * intensity}deg);
            }
            30%, 50%, 70% {
            transform: translate3d(-4px, 0, 0) rotate(${Math.random() * intensity}deg);
            }
            40%, 60% {
            transform: translate3d(4px, 0, 0) rotate(${Math.random() * intensity}deg);
            }
            }
            `;

            // Create a style element to inject the keyframes
            const styleElement = document.createElement('style');
            styleElement.type = 'text/css';
            styleElement.appendChild(document.createTextNode(shakeKeyframes));
            document.head.appendChild(styleElement);

            // Apply the animation class with dynamic duration
            element.style.animation = `shake ${duration}s`;

            // Restore the original position and style after the shake animation completes
            setTimeout(function () {
                element.style.animation = ''; // Clear the animation
                element.style.position = originalPosition;
                element.setAttribute('style', originalStyle);
                document.head.removeChild(styleElement); // Remove injected keyframes
            }, duration * 1000);

            // Cleanup after the animation completes
            element.addEventListener('animationend', function () {
                element.style.position = originalPosition;
                element.setAttribute('style', originalStyle);
                document.head.removeChild(styleElement); // Remove injected keyframes
            }, {
                once: true
            });

            // Optional: Add custom logic for the shake effect if needed

            // ... (implementasi efek shake)
        });

        return this;
    },

};
$.prototype = {
    css: function (prop, val) {
        try {
            if (!this.el || this.el.length === 0) {
                console.error("Error: Elemen tidak ditemukan.");
                return this;
            }

            this.el.forEach(function (element) {
                if (typeof prop === "object") {
                    for (let key in prop) {
                        element.style[key] = prop[key];
                    }
                } else {
                    element.style[prop] = val;
                }
            });
        } catch (error) {
            console.error("Error in css method:", error.message);
        }
        return this;
    },

    color: function (color) {
        try {
            if (!this.el || this.el.length === 0) {
                console.error("Error: Elemen tidak ditemukan.");
                return this;
            }

            var isValidColor = /^#([0-9A-Fa-f]{3}){1,2}$|^[a-zA-Z]+$|^rgb(a?)(\d{1,3}%?,\s?){3,4}$|^hsl(a?)(\d{1,3}%?,\s?){3,4}$/i.test(color);

            if (!isValidColor) {
                console.error("Error: Warna tidak valid. Gunakan kode hex (#RRGGBB, #RGB), nama warna CSS, RGB, RGBA, HSL, atau HSLA.");
                return this;
            }

            return this.css("color", color);

        } catch (error) {
            console.error("Error in color method:", error.message);
        }

        return this;
    }
};
    
$.prototype.generateColor = function () {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

$.prototype.highlightCSS = function (cssCode) {
    const highlightedCode = cssCode
    .replace(/\/\*[\s\S]*?\*\//g, (match) => `<span class="comment">${match}</span>`) // Comments
    .replace(/([.#][\w-]+)/g, (match) => {
        if (match.startsWith('#')) {
            return `<span class="id">${match}</span>`; // ID Selector
        } else if (match.startsWith('.')) {
            return `<span class="class">${match}</span>`; // Class Selector
        } else {
            return `<span class="selector">${match}</span>`; // General Selector
        }
    })
    .replace(/([a-zA-Z-]+)(?=\s*:)/g,
        (match) => `<span class="property">${match}</span>`) // Properties
    .replace(/:\s*([^;]+);/g,
        ': <span class="value">$1</span>;') // Property Values
    .replace(/;/g,
        '<span class="semicolon">;</span>') // Semicolons
    .replace(/:/g,
        '<span class="colon">:</span>'); // Colons

    return highlightedCode;
};

const mq = $;
const mQ = $;
const MQ = $;
