"use strict";
var KTLoginV1 = function() {
    $("#kt_login");
    var t = function() {
        $("#kt_login_signin_submit").click(function(t) {
            t.preventDefault();
            var e = $(this),
                i = $("#kt_login_form");
            i.validate({
                rules: {
                    username: {
                        required: !0
                    },
                    password: {
                        required: !0
                    }
                }
            }), i.valid() && (KTApp.progress(e[0]), setTimeout(function() {
                KTApp.unprogress(e[0])
            }, 2e3), i.ajaxSubmit({
                url: "",
                success: function(t, r, s, n) {
                    setTimeout(function() {
                        KTApp.unprogress(e[0]),
                            function(t, e, i) {
                                var r = $('<div class="alert alert-bold alert-solid-' + e + ' alert-dismissible" role="alert">\t\t\t<div class="alert-text">' + i + '</div>\t\t\t<div class="alert-close">                <i class="flaticon2-cross kt-icon-sm" data-dismiss="alert"></i>            </div>\t\t</div>');
                                t.find(".alert").remove(), r.prependTo(t), KTUtil.animateClass(r[0], "fadeIn animated")
                            }(i, "danger", "Incorrect username or password. Please try again.")
                    }, 2e3)
                }
            }))
        })
    };
    return {
        init: function() {
            t()
        }
    }
}();
jQuery(document).ready(function() {
    KTLoginV1.init()
});