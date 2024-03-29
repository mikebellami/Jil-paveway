"use strict";
var KTDatatableLocalSortDemo= {
    init:function() {
        var t;
        t=$(".kt-datatable").KTDatatable( {
            data: {
                type:"remote", source: {
                    read: {
                        url: "https://keenthemes.com/metronic/tools/preview/api/datatables/demos/default.php"
                    }
                }
                , pageSize:10, serverPaging:!1, serverFiltering:!0, serverSorting:!1, saveState: {
                    cookie: !0, webstorage: !0
                }
            }
            , layout: {
                scroll: !1, footer: !1
            }
            , sortable:!0, pagination:!0, search: {
                input: $("#generalSearch")
            }
            , columns:[ {
                field: "RecordID", title: "#", sortable: "asc", width: 30, type: "number", selector: !1, textAlign: "center"
            }
            , {
                field: "OrderID", title: "Order ID"
            }
            , {
                field:"Country", title:"Country", template:function(t) {
                    return t.Country+" "+t.ShipCountry
                }
            }
            , {
                field: "ShipDate", title: "Ship Date", type: "date", format: "MM/DD/YYYY"
            }
            , {
                field:"TotalPayment", title:"Payment", type:"number", sortCallback:function(t, e, a) {
                    var s=a.field;
                    return $(t).sort(function(t, a) {
                        var l=t[s], i=a[s];
                        return isNaN(parseFloat(l))&&null!=l&&(l=Number(l.replace(/[^0-9\.-]+/g, ""))), isNaN(parseFloat(i))&&null!=l&&(i=Number(i.replace(/[^0-9\.-]+/g, ""))), l=parseFloat(l), i=parseFloat(i), "asc"===e?l>i?1: l<i?-1: 0: l<i?1: l>i?-1: 0
                    }
                    )
                }
            }
            , {
                field:"Status", title:"Status", template:function(t) {
                    var e= {
                        1: {
                            title: "Pending", class: "kt-badge--brand"
                        }
                        , 2: {
                            title: "Delivered", class: " kt-badge--danger"
                        }
                        , 3: {
                            title: "Canceled", class: " kt-badge--primary"
                        }
                        , 4: {
                            title: "Success", class: " kt-badge--success"
                        }
                        , 5: {
                            title: "Info", class: " kt-badge--info"
                        }
                        , 6: {
                            title: "Danger", class: " kt-badge--danger"
                        }
                        , 7: {
                            title: "Warning", class: " kt-badge--warning"
                        }
                    }
                    ;
                    return'<span class="kt-badge '+e[t.Status].class+' kt-badge--inline kt-badge--pill">'+e[t.Status].title+"</span>"
                }
            }
            , {
                field:"Type", title:"Type", autoHide:!1, template:function(t) {
                    var e= {
                        1: {
                            title: "Online", state: "danger"
                        }
                        , 2: {
                            title: "Retail", state: "primary"
                        }
                        , 3: {
                            title: "Direct", state: "success"
                        }
                    }
                    ;
                    return'<span class="kt-badge kt-badge--'+e[t.Type].state+' kt-badge--dot"></span>&nbsp;<span class="kt-font-bold kt-font-'+e[t.Type].state+'">'+e[t.Type].title+"</span>"
                }
            }
            , {
                field:"Actions", title:"Actions", sortable:!1, width:110, overflow:"visible", autoHide:!1, template:function() {
                    return'\t\t\t\t\t\t<div class="dropdown">\t\t\t\t\t\t\t<a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md" data-toggle="dropdown">                                <i class="la la-cog"></i>                            </a>\t\t\t\t\t\t  \t<div class="dropdown-menu dropdown-menu-right">\t\t\t\t\t\t    \t<a class="dropdown-item" href="#"><i class="la la-edit"></i> Edit Details</a>\t\t\t\t\t\t    \t<a class="dropdown-item" href="#"><i class="la la-leaf"></i> Update Status</a>\t\t\t\t\t\t    \t<a class="dropdown-item" href="#"><i class="la la-print"></i> Generate Report</a>\t\t\t\t\t\t  \t</div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Edit details">\t\t\t\t\t\t\t<i class="la la-edit"></i>\t\t\t\t\t\t</a>\t\t\t\t\t\t<a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Delete">\t\t\t\t\t\t\t<i class="la la-trash"></i>\t\t\t\t\t\t</a>\t\t\t\t\t'
                }
            }
            ]
        }
        ),
        $("#kt_form_status").on("change", function() {
            t.search($(this).val().toLowerCase(), "Status")
        }
        ),
        $("#kt_form_type").on("change", function() {
            t.search($(this).val().toLowerCase(), "Type")
        }
        ),
        $("#kt_form_status,#kt_form_type").selectpicker()
    }
}

;
jQuery(document).ready(function() {
    KTDatatableLocalSortDemo.init()
}

);