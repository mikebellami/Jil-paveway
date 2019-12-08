    // only number input function
            function Num(evt) {
                var charCode = (evt.which) ? evt.which : event.keyCode
                if (charCode > 31 && (charCode < 48 || charCode > 57))
                    return false;

                return true;
            }

            // calculation function for total fee amount
            $(document).ready(function(){
                $('#s_amt').keyup(doMath);
                $('#p_num').keyup(doMath);
            });
            function doMath(){
                $('#total_amt').html($('#s_amt').val() * $('#p_num').val());  
            }

            // Data binding function
           
            // Declare a global object to store view data.
            var viewData;

            viewData = {};

            $(function() {
                // Update the viewData object with the current field keys and values.
                function updateViewData(key, value) {
                    viewData[key] = value;
                }

                // Register all bindable elements
                function detectBindableElements() {
                    var bindableEls;

                    bindableEls = $('[data-bind]');

                    // Add event handlers to update viewData and trigger callback event.
                    bindableEls.on('change', function() {
                        var $this;
                        
                        $this = $(this);
                        
                        updateViewData($this.data('bind'), $this.val());

                        $(document).trigger('updateDisplay');
                    });

                    // Add a reference to each bindable element in viewData.
                    bindableEls.each(function() {
                        updateViewData($(this));
                    });
                }

                // Trigger this event to manually update the list of bindable elements, useful when dynamically loading form fields.
                $(document).on('updateBindableElements', detectBindableElements);

                detectBindableElements();
            });

                $(function() {
                    // An example of how the viewData can be used by other functions.
                    function updateDisplay() {
                        var updateEls;

                        updateEls = $('[data-update]');

                        updateEls.each(function() {
                            $(this).html(viewData[$(this).data('update')]);
                        });
                    }

                    // Run updateDisplay on the callback.
                    $(document).on('updateDisplay', updateDisplay);
            });   

                 // linking APIS to frontend
     $(function(){
               
               var $kt_data = $('#kt-data');
                 $.ajax({
                    type: 'GET',
                    serverSide: true,
                    url: "src/public/record",
                    success: function(kt_data) {
                    // var tbodyEL = $('tbody').hmtl('');

                    // $.each(kt_data,function(i, school){
                    //     kt_data.append('\ <tr data-row="0" class="kt-datatable__row" style="left: 0px;">\
                    //         <td class="kt-datatable__cell--sorted kt-datatable__cell--center kt-datatable__cell" data-field="RecordID"><span style="width: 30px;">'+school.id+'</span></td>\
                    //         <td data-field="Name" class="kt-datatable__cell"><span style="width: 112px;">'+school.name+'</span></td>\
                    //         <td data-field="Country" class="kt-datatable__cell"><span style="width: 112px;">'+school.email+'</span></td>\
                    //         <td data-field="Phone" class="kt-datatable__cell"><span style="width: 112px;">'+school.phone+'</span></td>\
                    //         <td data-field="Address" class="kt-datatable__cell"><span style="width: 112px;">'+school.address+'</span></td>\
                    //         <td data-field="" class="kt-datatable__cell"><span style="width: 112px;">'+school.std_num+'</span></td>\
                    //         <td data-field="Type" data-autohide-disabled="false" class="kt-datatable__cell"><span style="width: 112px;"><span class="kt-badge "></span> &#8358; &nbsp;'+school.address+'</span></td>\
                    //         <td data-field="Actions" data-autohide-disabled="false" class="kt-datatable__cell"><span style="overflow: visible; position:relative; width: 110px;"> <a title="Edit details" class="btn btn-sm btn-clean btn-icon btn-icon-sm"  data-toggle="modal" data-target="#kt_typeahead_modal"><i class="flaticon2-paper"></i> </a><a title="Delete" class="btn btn-sm btn-clean btn-icon btn-icon-sm"> <i class="flaticon2-trash"></i> </a></span></td>\
                    //        </tr>\ '); 
                    // })
                    console.log(kt_data)

                    }
                })

            })
           
     $(function(){
        $("#ajax_data").KTDatatable({
            ajax:{
                ServerSide: true,
                Processing: true,
                type: 'GET',
                url: "https://keenthemes.com/metronic/tools/preview/api/datatables/demos/default.phpd"
            },
            column:[
                // {"school": "id"},
                // {"school": "name"},
                // {"school": "email"},
                // {"school": "phone"},
                // {"school": "address"},
                // {"school": "std_num"},
                // {"school": "amount"}
                {
                field: "RecordID", title: "#", sortable: "asc", width: 30, type: "number", selector: !1, textAlign: "center"
            }
            , {
                field: "OrderID", title: "Order ID"
            }
            ]
        });
     });
        