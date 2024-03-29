"use strict";
var KTLoginGeneral = function() {
    var i = $("#kt_login"),
        t = function(i, t, e) {
            var n = $('<div class="alert alert-' + t + ' alert-dismissible" role="alert">\t\t\t<div class="alert-text">' + e + '</div>\t\t\t<div class="alert-close">                <i class="flaticon2-cross kt-icon-sm" data-dismiss="alert"></i>            </div>\t\t</div>');
            i.find(".alert").remove(), n.prependTo(i), KTUtil.animateClass(n[0], "fadeIn animated"), n.find("span").html(e)
        },
        e = function() {
            i.removeClass("kt-login--forgot"), i.removeClass("kt-login--signup"), i.addClass("kt-login--signin"), KTUtil.animateClass(i.find(".kt-login__signin")[0], "flipInX animated")
        },
        n = function() {
            $("#kt_login_forgot").click(function(t) {
                t.preventDefault(), i.removeClass("kt-login--signin"), i.removeClass("kt-login--signup"), i.addClass("kt-login--forgot"), KTUtil.animateClass(i.find(".kt-login__forgot")[0], "flipInX animated")
            }), $("#kt_login_forgot_cancel").click(function(i) {
                i.preventDefault(), e()
            }), $("#kt_login_signup").click(function(t) {
                t.preventDefault(), i.removeClass("kt-login--forgot"), i.removeClass("kt-login--signin"), i.addClass("kt-login--signup"), KTUtil.animateClass(i.find(".kt-login__signup")[0], "flipInX animated")
            }), $("#kt_login_signup_cancel").click(function(i) {
                i.preventDefault(), e()
            })
        };
    return {
        init: function() {
            n(), $("#kt_login_signin_submit").click(function(i) {
                i.preventDefault();
                var e = $(this),
                    n = $(this).closest("form");
                n.validate({
                    rules: {
                        email: {
                            required: !0,
                            email: !0
                        },
                        password: {
                            required: !0
                        }
                    }
                }), n.valid() && (e.addClass("kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light").attr("disabled", !0), n.ajaxSubmit({
                    url: "",
                    success: function(i, s, r, a) {
                        setTimeout(function() {
                            e.removeClass("kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light").attr("disabled", !1), t(n, "danger", "Incorrect username or password. Please try again.")
                        }, 2e3)
                    }
                }))
            }), $("#kt_login_signup_submit").click(function(n) {
                n.preventDefault();
                var s = $(this),
                    r = $(this).closest("form");
                r.validate({
                    rules: {
                        fullname: {
                            required: !0
                        },
                        email: {
                            required: !0,
                            email: !0
                        },
                        password: {
                            required: !0
                        },
                        rpassword: {
                            required: !0
                        },
                        agree: {
                            required: !0
                        }
                    }
                }), r.valid() && (s.addClass("kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light").attr("disabled", !0), r.ajaxSubmit({
                    url: "",
                    success: function(n, a, l, o) {
                        setTimeout(function() {
                            s.removeClass("kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light").attr("disabled", !1), r.clearForm(), r.validate().resetForm(), e();
                            var n = i.find(".kt-login__signin form");
                            n.clearForm(), n.validate().resetForm(), t(n, "success", "Thank you. To complete your registration please check your email.")
                        }, 2e3)
                    }
                }))
            }), $("#kt_login_forgot_submit").click(function(n) {
                n.preventDefault();
                var s = $(this),
                    r = $(this).closest("form");
                r.validate({
                    rules: {
                        email: {
                            required: !0,
                            email: !0
                        }
                    }
                }), r.valid() && (s.addClass("kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light").attr("disabled", !0), r.ajaxSubmit({
                    url: "",
                    success: function(n, a, l, o) {
                        setTimeout(function() {
                            s.removeClass("kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light").attr("disabled", !1), r.clearForm(), r.validate().resetForm(), e();
                            var n = i.find(".kt-login__signin form");
                            n.clearForm(), n.validate().resetForm(), t(n, "success", "Cool! Password recovery instruction has been sent to your email.")
                        }, 2e3)
                    }
                }))
            })
        }
    }
}();
jQuery(document).ready(function() {
    KTLoginGeneral.init()
});