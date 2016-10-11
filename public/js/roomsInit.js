/*
 * Version: 0.0.1
 * 
 * Author: Alessandro Sebastiani
 */


(function ($) {

    $.fn.extend({
        HomeBuilder: function (options) {
            var defaults = {};
            var options = $.extend(defaults, options);
            var self = this;
            var query = $.getJSON("/lights/rooms", function (data) {


                for (var i in data.rooms) {

                    for (var j in data.rooms[i].loc) {
                        console.log(data.rooms[i].loc[j]);
                        var color = 'red';
                        if (data.rooms[i].state == 1) {
                            color = 'green';
                        }
                        var block = "<div class=\"ip_tooltip ip_img32\" room='" + data.rooms[i].name + "' \
                        style=\"top: " + data.rooms[i].loc[j].top + "; left: " + data.rooms[i].loc[j].left + "\" \
                        data-button=\"more" + color + "\" data-tooltipbg=\"bgblack\"> \
                        <p>" + data.rooms[i].name + "<br> \
                        </div>";
                        self.append(block);
                    }
                }
            });

            return query;
        }
    });
})(jQuery);