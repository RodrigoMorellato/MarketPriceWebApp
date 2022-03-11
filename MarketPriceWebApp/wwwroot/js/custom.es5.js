'use strict';

$(document).ready(function () {
    init_DataTables();
});

// Panel toolbox
$(document).ready(function () {
    console.log("Collapse");
    $('.collapse-link').on('click', function () {
        var $BOX_PANEL = $(this).closest('.x_panel'),
            $ICON = $(this).find('i'),
            $BOX_CONTENT = $BOX_PANEL.find('.x_content');

        // fix for some div with hardcoded fix class
        if ($BOX_PANEL.attr('style')) {
            $BOX_CONTENT.slideToggle(200, function () {
                $BOX_PANEL.removeAttr('style');
            });
        } else {
            $BOX_CONTENT.slideToggle(200);
            $BOX_PANEL.css('height', 'auto');
        }

        $ICON.toggleClass('fa-chevron-up fa-chevron-down');
    });

    $('.close-link').click(function () {
        var $BOX_PANEL = $(this).closest('.x_panel');

        $BOX_PANEL.remove();
    });
});
// /Panel toolbox

/* DATA TABLES */

function init_DataTables() {

    console.log('run_datatables');

    if (typeof $.fn.DataTable === 'undefined') {
        return;
    }
    console.log('init_DataTables');

    var handleDataTableButtons = function handleDataTableButtons() {
        if ($("#datatable-buttons").length) {
            $("#datatable-buttons").DataTable({
                dom: "Blfrtip",
                buttons: [{
                    extend: "copy",
                    className: "btn-sm"
                }, {
                    extend: "csv",
                    className: "btn-sm",
                    fieldSeparator: ";"
                }, {
                    extend: "excel",
                    className: "btn-sm"
                }, {
                    extend: "pdfHtml5",
                    className: "btn-sm"
                }, {
                    extend: "print",
                    className: "btn-sm"
                }],
                responsive: true
            });
        }
    };

    TableManageButtons = (function () {
        "use strict";
        return {
            init: function init() {
                handleDataTableButtons();
            }
        };
    })();

    $('#datatable').dataTable();

    $('#datatable-keytable').DataTable({
        keys: true
    });

    //$('#datatable-responsive').DataTable();

    $('#datatable-scroller').DataTable({
        ajax: "js/datatables/json/scroller-demo.json",
        deferRender: true,
        scrollY: 380,
        scrollCollapse: true,
        scroller: true
    });

    $('#datatable-fixed-header').DataTable({
        fixedHeader: true
    });

    var $datatable = $('#datatable-checkbox');

    $datatable.dataTable({
        'order': [[1, 'asc']],
        'columnDefs': [{ orderable: false, targets: [0] }]
    });
    $datatable.on('draw.dt', function () {
        $('checkbox input').iCheck({
            checkboxClass: 'icheckbox_flat-green'
        });
    });

    TableManageButtons.init();
};

function initializeDatatables(wraper) {
    if ($("table.dt-responsive").length > 0) {
        jQuery.fn.DataTable.ext.type.search.string = function (data) {
            return !data ? '' : typeof data === 'string' ? data.replace(/έ/g, 'ε').replace(/[ύϋΰ]/g, 'υ').replace(/ό/g, 'ο').replace(/ώ/g, 'ω').replace(/ά/g, 'α').replace(/[ίϊΐ]/g, 'ι').replace(/ή/g, 'η').replace(/\n/g, ' ').replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i').replace(/ó/g, 'o').replace(/ú/g, 'u').replace(/ê/g, 'e').replace(/î/g, 'i').replace(/ô/g, 'o').replace(/è/g, 'e').replace(/ï/g, 'i').replace(/ü/g, 'u').replace(/ã/g, 'a').replace(/õ/g, 'o').replace(/ç/g, 'c').replace(/ì/g, 'i') : data;
        };
    }

    $((!wraper ? "" : wraper + " ") + "table.dt-responsive").each(function () {
        var oTable = $(this).dataTable({
            "aaSorting": [],
            "order": [],
            "stateSave": true,
            "stateLoadParams": function stateLoadParams(settings, data) {
                if (data.order) delete data.order;
            },
            "sPaginationType": "full_numbers",
            dom: "RlBfrtip",
            colReorder: true,
            fixedHeader: true,
            buttons: [{
                extend: "pdfHtml5",
                orientation: "landscape",
                pageSize: "A4",
                customize: function customize(doc) {
                    doc.defaultStyle.fontSize = 8;
                }
            }],
            "orderMulti": true,
            "pageLength": 100,
            "lengthMenu": [[10, 25, 50, 75, 100, -1], [10, 25, 50, 75, 100, "All"]]
        });

        $("#datatable-responsive_filter input").keyup(function () {
            oTable.fnFilter(jQuery.fn.DataTable.ext.type.search.string(this.value));
        });
    });
}

$(document).ready(function () {
    initializeDatatables(false);
});

function initTableById(tableId) {
    var oTable = $('#' + tableId).DataTable({
        order: [[0, 'asc']],
        "aaSorting": [],
        "stateSave": true,
        "stateLoadParams": function stateLoadParams(settings, data) {
            if (data.order) delete data.order;
        },
        "sPaginationType": "full_numbers",
        dom: "RlBfrtip",
        colReorder: true,
        fixedHeader: true,
        buttons: [{
            extend: "pdfHtml5",
            orientation: "landscape",
            pageSize: "A4",
            customize: function customize(doc) {
                doc.defaultStyle.fontSize = 8;
            }
        }],
        rowGroup: {
            startRender: function startRender(rows, group) {
                var priceAvg = rows.data().pluck(2).reduce(function (a, b) {
                    return a + b.replace(/[^\d]/g, "") * 1;
                }, 0) / rows.count();
                priceAvg = $.fn.dataTable.render.number(",", ".", 0, "").display(priceAvg);

                return $("<tr/>").append('<td colspan="2">Averages for ' + group + '</td>').append('<td>' + priceAvg + '</td>');
            }
        },
        dataSrc: 0,
        "orderMulti": true,
        "pageLength": 100,
        "lengthMenu": [[30, 50, 100, -1], [30, 50, 100, "All"]]
    });

    $("#datatable-responsive_filter input").keyup(function () {
        oTable.fnFilter(jQuery.fn.DataTable.ext.type.search.string(this.value));
    });
}

function initTableByIdGroup(tableId, groupName, columnGroup, subGroupName, columnSubGroup, numberColspanGroup, levelCustomButton, firstNumberColumnCompareShowButton, firstCustomButtonShowWhenGroupIs, methodFirstCustomButton, columnsParameterFirstCustomButton, textFirstCustomButton, secondNumberColumnCompareShowButton, secondCustomButtonShowWhenCollumnIs, methodoSecondCustomButton, columnsParameterSecondCustomButton, textSecondCustomButton) {
    var collapsedGroups = {};
    var top = "";

    var table = $('#' + tableId).DataTable({
        // order: [[columnGroup, "asc"]],
        orderFixed: [[columnGroup, "asc"]],
        responsive: true,
        rowGroup: {
            // Uses the 'row group' plugin
            dataSrc: [columnGroup, columnSubGroup],
            startRender: function startRender(rows, group, level) {
                var all = undefined;
                var groupingName = undefined;
                var customButton = "";
                var firstButton = false;
                var secondButton = false;
                var valueParameterFirstButton = "";
                var valueParameterSecondButton = "";

                var parameterLoader = function parameterLoader(value, columnsParameter) {
                    var columns = columnsParameter.split("-");
                    if (columns.length === 1) {
                        return value[columns[0]];
                    }
                    return columns.reduce(function (previous, current) {
                        if (!!previous) {
                            return value[previous] + "-" + value[current];
                        }
                        return value[current];
                    });
                };

                if (level === 0) {
                    top = group;
                    all = group;
                    groupingName = groupName;
                    if (level === levelCustomButton) {
                        rows.rows().data().filter(function (value, index) {
                            if (value[columnGroup] + '-' + value[columnSubGroup] !== all) {
                                return;
                            }
                            if (!!!firstButton) {
                                firstButton = value[firstNumberColumnCompareShowButton].toUpperCase() === firstCustomButtonShowWhenGroupIs.toUpperCase();
                                if (!!firstButton) {
                                    valueParameterFirstButton = parameterLoader(value, columnsParameterFirstCustomButton);
                                }
                            }
                            if (!!!secondButton) {
                                secondButton = value[secondNumberColumnCompareShowButton].toUpperCase() === secondCustomButtonShowWhenCollumnIs.toUpperCase();
                                if (!!secondButton) {
                                    valueParameterSecondButton = parameterLoader(value, columnsParameterSecondCustomButton);
                                }
                            }
                        });
                        customButton = loadCustomButton(firstButton, methodFirstCustomButton, valueParameterFirstButton, textFirstCustomButton, secondButton, methodoSecondCustomButton, valueParameterSecondButton, textSecondCustomButton);
                    }
                } else {
                    // if parent collapsed, nothing to do
                    if (!!collapsedGroups[top]) {
                        return false;
                    }
                    all = top + '-' + group;
                    groupingName = subGroupName;
                    if (level === levelCustomButton) {
                        rows.rows().data().filter(function (value, index) {
                            if (value[columnGroup] + '-' + value[columnSubGroup] !== all) {
                                return;
                            }
                            if (!!!firstButton) {
                                firstButton = value[firstNumberColumnCompareShowButton].toUpperCase() === firstCustomButtonShowWhenGroupIs.toUpperCase();
                                if (!!firstButton) {
                                    valueParameterFirstButton = parameterLoader(value, columnsParameterFirstCustomButton);
                                }
                            }
                            if (!!!secondButton) {
                                secondButton = value[secondNumberColumnCompareShowButton].toUpperCase() === secondCustomButtonShowWhenCollumnIs.toUpperCase();
                                if (!!secondButton) {
                                    valueParameterSecondButton = parameterLoader(value, columnsParameterSecondCustomButton);
                                }
                            }
                        });
                        customButton = loadCustomButton(firstButton, methodFirstCustomButton, valueParameterFirstButton, textFirstCustomButton, secondButton, methodoSecondCustomButton, valueParameterSecondButton, textSecondCustomButton);
                    }
                }

                var collapsed = !!collapsedGroups[all];

                rows.nodes().each(function (r) {
                    level === 0 ? r.style.display = collapsed ? "none" : "" : r.style.display = collapsed ? "" : "none";
                });

                // Add category name to the <tr>. NOTE: Hardcoded colspan
                return $("<tr/>").append('<td colspan="' + numberColspanGroup + '">\n                                ' + groupingName + ' ' + group + ' | Total de registros: (' + rows.count() + ') ' + customButton + '\n                            </td>').attr("data-name", all).toggleClass("collapsed", collapsed);

                //Footer of group
                //endRender: function (rows, group) {
                //    var avg = rows
                //        .data()
                //        .pluck(5)
                //        .reduce(function (a, b) {
                //            return a + b.replace(/[^\d]/g, '') * 1;
                //        }, 0) / rows.count();

                //    return 'Average salary in ' + group + ': ' +
                //        $.fn.dataTable.render.number(',', '.', 0, '$').display(avg);
                //}
            }
        },
        "stateSave": true,
        "stateLoadParams": function stateLoadParams(settings, data) {
            if (data.order) delete data.order;
        },
        "sPaginationType": "full_numbers",
        dom: "RlBfrtip",
        fixedHeader: true,
        buttons: [{
            extend: "pdfHtml5",
            orientation: "landscape",
            pageSize: "A4",
            customize: function customize(doc) {
                doc.defaultStyle.fontSize = 8;
            }
        }],
        "pageLength": -1,
        "lengthMenu": [[30, 50, 100, -1], [30, 50, 100, "All"]]
    });

    // Change the fixed ordering when the data source is updated
    table.on('rowgroup-datasrc', function (e, dt, val) {
        table.order.fixed({ pre: [[val, "asc"]] }).draw();
    });

    $("a.group-by").on("click", function (e) {
        e.preventDefault();

        table.rowGroup().dataSrc($(this).data("column"));
    });

    $('#' + tableId + ' tbody').on("click", "tr.dtrg-start", function () {
        var name = $(this).data("name");
        collapsedGroups[name] = !collapsedGroups[name];
        table.draw(false);
    });

    $("#datatable-responsive_filter input").keyup(function () {
        table.fnFilter(jQuery.fn.DataTable.ext.type.search.string(this.value));
    });

    $('[data-toggle="tooltip"]').tooltip({
        container: "body"
    });
}

function loadCustomButton(firstButton, methodoFirstCustomButton, columnParameterFirstCustomButton, textFirstCustomButton, secondButton, methodoSecondCustomButton, columnParameterSecondCustomButton, textSecondCustomButton) {
    if (!!firstButton) {
        var parametros = columnParameterFirstCustomButton.split("-");
        var button = '<span class="no-collapsable" style="float: right">\n                        <button type="button" class="btn btn-danger btn-sm" onclick="' + methodoFirstCustomButton + '(';
        parametros.forEach(function (parametro, index) {
            if (!!parametro) {
                if (index > 0) {
                    button += ', \'' + parametro + '\'';
                } else {
                    button += '\'' + parametro + '\'';
                }
            }
        });

        button += ');" style="padding: 0.3em; border: none; margin: unset">\n                        ' + textFirstCustomButton + '\n                     </button>\n                 </span>';

        return button;
    }
    if (!!secondButton) {
        var parametros = columnParameterSecondCustomButton.split("-");
        var button = '<span class="no-collapsable" style="float: right">\n                        <button type="button" class="btn btn-primary btn-sm" onclick="' + methodoSecondCustomButton + '(';
        parametros.forEach(function (parametro, index) {
            if (!!parametro) {
                if (index > 0) {
                    button += ', \'' + parametro + '\'';
                } else {
                    button += '\'' + parametro + '\'';
                }
            }
        });

        button += ');" style="padding: 0.3em; border: none; margin: unset">\n                        ' + textSecondCustomButton + '\n                     </button>\n                 </span>';

        return button;
    }

    return "";
}

