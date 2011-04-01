var util = 
(function() {

    return {

        root: '/~agray/',

        highlight: function(je, cls) {
            if (je.hasClass(cls)) {
                je.removeClass(cls);
            } else {
                je.addClass(cls);
            }
        },

        // crockford object function
        // create a new object using 'o' as prototype;
        object: function(o) {
            function F() {}
            F.prototype = o;
            return new F();
        },

        cache: function() {

            var cache = new Array();

            return {
                put: function(key, val) {
                    cache[key] = val;
                },

                get: function(key) {
                    return cache[key];
                },

                unput: function(key) {
                    cache[key] = undefined;
                },

                each: function(f) {
                    // assumes jquery
                    $.each(cache, f);
                }
            };

        },


    };

})();

