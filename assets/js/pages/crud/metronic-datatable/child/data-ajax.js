"use strict";
var KTDatatableChildRemoteDataDemo= {
    init:function() {
        var t;
        t=$(".kt-datatable").KTDatatable( {
            data: {
                type:"remote", source: {
                    read: {
                        url: "https://keenthemes.com/metronic/tools/preview/api/datatables/demos/customers.php"
                    }
                }
                , pageSize:10, serverPaging:!0, serverFiltering:!1, serverSorting:!0
            }
            , layout: {
                scroll: !1, height: null, footer: !1
            }
            , sortable:!0, pagination:!0, detail: {
                title:"Load sub table", content:function(t) {
                    $("<div/>").attr("id", "child_data_ajax_"+t.data.RecordID).appendTo(t.detailCell).KTDatatable( {
                        data: {
                            type:"remote", source: {
                                read: {
                                    url:"https://keenthemes.com/metronic/tools/preview/api/datatables/demos/orders.php", params: {
                                        query: {
                                            generalSearch: "", CustomerID: t.data.RecordID
                                        }
                                    }
                                }
                            }
                            , pageSize:10, serverPaging:!0, serverFiltering:!1, serverSorting:!0
                        }
                        , layout: {
                            scroll:!0, height:300, footer:!1, spinner: {
                                type: 1, theme: "default"
                            }
                        }
                        , sortable:!0, columns:[ {
                            field: "RecordID", title: "#", sortable: !1, width: 30
                        }
                        , {
                            field:"OrderID", title:"Order ID", template:function(t) {
                                return"<span>"+t.OrderID+" - "+t.ShipCountry+"</span>"
                            }
                        }
                        , {
                            field: "ShipCountry", title: "Country", width: 100
                        }
                        , {
                            field: "ShipAddress", title: "Ship Address"
                        }
                        , {
                            field: "ShipName", title: "Ship Name"
                        }
                        , {
                            field: "TotalPayment", title: "Payment", type: "number"
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
                        ]
                    }
                    )
                }
            }
            , search: {
                input: $("#generalSearch")
            }
            , columns:[ {
                field: "RecordID", title: "", sortable: !1, width: 30, textAlign: "center"
            }
            , {
                field:"checkbox", title:"", template:"{{RecordID}}", sortable:!1, width:20, textAlign:"center", selector: {
                    class: "kt-checkbox--solid"
                }
            }
            , {
                field: "FirstName", title: "First Name", sortable: "asc"
            }
            , {
                field: "LastName", title: "Last Name"
            }
            , {
                field: "Company", title: "Company"
            }
            , {
                field: "Email", title: "Email"
            }
            , {
                field: "Address", title: "Address"
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
                field:"Actions", width:110, title:"Actions", sortable:!1, overflow:"visible", autoHide:!1, template:function() {
                    return'\t\t                  <div class="dropdown">\t\t                      <a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md" data-toggle="dropdown">\t\t                          <i class="la la-ellipsis-h"></i>\t\t                      </a>\t\t                      <div class="dropdown-menu dropdown-menu-right">\t\t                          <a class="dropdown-item" href="#"><i class="la la-edit"></i> Edit Details</a>\t\t                          <a class="dropdown-item" href="#"><i class="la la-leaf"></i> Update Status</a>\t\t                          <a class="dropdown-item" href="#"><i class="la la-print"></i> Generate Report</a>\t\t                      </div>\t\t                  </div>\t\t                  <a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Edit details">\t\t                      <i class="la la-edit"></i>\t\t                  </a>\t\t                  <a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Delete">\t\t                      <i class="la la-trash"></i>\t\t                  </a>\t\t              '
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
    KTDatatableChildRemoteDataDemo.init()
}

);