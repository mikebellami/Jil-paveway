"use strict";
var KTDatatablesDataSourceAjaxServer= {
    init:function() {
        $("#kt_table_1").DataTable( {
            responsive:!0, searchDelay:500, processing:!0, serverSide:!0, ajax:"https://keenthemes.com/metronic/tools/preview/api/datatables/demos/server.php", columns:[ {
                data: "OrderID"
            }
            , {
                data: "Country"
            }
            , {
                data: "ShipCity"
            }
            , {
                data: "CompanyName"
            }
            , {
                data: "ShipDate"
            }
            , {
                data: "Status"
            }
            , {
                data: "Type"
            }
            , {
                data: "Actions", responsivePriority: -1
            }
            ], columnDefs:[ {
                targets:-1, title:"Actions", orderable:!1, render:function(a, t, e, n) {
                    return'\n                        <span class="dropdown">\n                            <a href="#" class="btn btn-sm btn-clean btn-icon btn-icon-md" data-toggle="dropdown" aria-expanded="true">\n                              <i class="la la-ellipsis-h"></i>\n                            </a>\n                            <div class="dropdown-menu dropdown-menu-right">\n                                <a class="dropdown-item" href="#"><i class="la la-edit"></i> Edit Details</a>\n                                <a class="dropdown-item" href="#"><i class="la la-leaf"></i> Update Status</a>\n                                <a class="dropdown-item" href="#"><i class="la la-print"></i> Generate Report</a>\n                            </div>\n                        </span>\n                        <a href="#" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="View">\n                          <i class="la la-edit"></i>\n                        </a>'
                }
            }
            , {
                targets:-3, render:function(a, t, e, n) {
                    var s= {
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
                    return void 0===s[a]?a:'<span class="kt-badge '+s[a].class+' kt-badge--inline kt-badge--pill">'+s[a].title+"</span>"
                }
            }
            , {
                targets:-2, render:function(a, t, e, n) {
                    var s= {
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
                    return void 0===s[a]?a:'<span class="kt-badge kt-badge--'+s[a].state+' kt-badge--dot"></span>&nbsp;<span class="kt-font-bold kt-font-'+s[a].state+'">'+s[a].title+"</span>"
                }
            }
            ]
        }
        )
    }
}

;
jQuery(document).ready(function() {
    KTDatatablesDataSourceAjaxServer.init()
}

);