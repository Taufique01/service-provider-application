var APPLIANCE = 'Appliance';
var SYSTEM = 'System';
var WHOLE_HOME = 'Whole Home';
var NOT_APPLICABLE = 'N/A';

function applyTax(input, tax) {

    return input + input * tax / 100;

}

function applyDiscount(input, discount) {
    return input - discount;



}

function displayOutput() {
    //base title output
    var base_title;
    var base_output_monthly = 0;
    var base_output_html = "";
    ///collect the base datas
    if ($("#discount2-chk").prop("checked")) {
        var discount = parseFloat($("#discount2-chk").val());

    } else {
        var discount = 0;
    }

    var tax = parseFloat($("#tax-in").val());

    if ($("#radio-appl").prop("checked")) {
        base_title = APPLIANCE;
        var appl_plans = $(".js-appl-plans");
        for (var i = 0; i < appl_plans.length; i++) {
            var appl_plan = $(appl_plans[i]);

            if (appl_plan.prop("checked")) {
                var cost = parseFloat(appl_plan.val());
                ///cost after applying tax
                cost = applyTax(cost, tax);
                var tag = appl_plan.data("tag");
                // alert(tag);
                //monthly total base output
                base_output_monthly = base_output_monthly + cost;
                ///base output plans lists
                //with taxes aplied
                //both monthly and yearly
                base_output_html = base_output_html + '<div>' + tag + ': ' + cost + '$/month' + ', ' + cost * 12 + '$/year' + '</div>';
                // console.log(parseFloat(appl_plan.val()));
                //alert(appl_plan.val());
            }

        }


        // do something
    }

    if ($("#radio-sys").prop("checked")) {
        base_title = SYSTEM;

        var sys_plans = $(".js-sys-plans");
        for (var i = 0; i < sys_plans.length; i++) {
            var sys_plan = $(sys_plans[i]);

            if (sys_plan.prop("checked")) {
                var cost = parseFloat(sys_plan.val());
                cost = applyTax(cost, tax);

                var tag = sys_plan.data("tag");
                //  alert(tag);
                base_output_monthly = base_output_monthly + cost;
                base_output_html = base_output_html + '<div>' + tag + ': ' + cost + '$/month' + ', ' + cost * 12 + '$/year' + '</div>';
                // console.log(parseFloat(appl_plan.val()));
                //alert(appl_plan.val());
            }
        }


    }
    if ($("#radio-wh").prop("checked")) {
        base_title = WHOLE_HOME;

        var wh_plans = $(".js-wh-plans");
        for (var i = 0; i < wh_plans.length; i++) {
            var wh_plan = $(wh_plans[i]);

            if (wh_plan.prop("checked")) {
                var cost = parseFloat(wh_plan.val());
                ///applytax
                cost = applyTax(cost, tax);

                var tag = wh_plan.data("tag");
                // alert(tag);
                base_output_monthly = base_output_monthly + cost;
                base_output_html = base_output_html + '<div>' + tag + ': ' + cost + '$/month' + ', ' + cost * 12 + '$/year' + '</div>';
                // console.log(parseFloat(appl_plan.val()));
                //alert(appl_plan.val());
            }
        }



    }
    /////get the Optionals values
    var options_output_yearly = 0;

    var addi_checks = $(".js-additional-check");

    for (var i = 0; i < addi_checks.length; i++) {
        var addi_check = $(addi_checks[i]);
        if (addi_check.prop("checked")) {
            options_output_yearly = options_output_yearly + parseFloat(addi_check.val());
        }

    }

    /////get additionals values

    if ($("#surge-protect-chk").prop("checked")) {
        var surge_protect = $("#surge-protect-select").children("option:selected").val();
        surge_protect = applyTax(parseFloat(surge_protect), tax);

        var surge_protect_output_html = surge_protect.toFixed(2) + "$/month" + ', ' + (surge_protect * 12).toFixed(2) + "$/year";

    } else {

        var surge_protect_output_html = NOT_APPLICABLE;

    }
    if ($("#electronics-protect-chk").prop("checked")) {
        var electronics_protect = $("#electronics-protect-select").children("option:selected").val();
        electronics_protect = applyTax(parseFloat(electronics_protect), tax);
        var electronics_protect_output_html = electronics_protect.toFixed(2) + "$/month" + ', ' + (electronics_protect * 12).toFixed(2) + "$/year";

    } else {


        var electronics_protect_output_html = NOT_APPLICABLE;

    }

    if ($("#line-protect-chk").prop("checked")) {
        var line_protect = $("#line-protect-chk").val();
        line_protect = applyTax(parseFloat(line_protect), tax);
        var line_protect_output_html = line_protect.toFixed(2) + "$/month" + ', ' + (line_protect * 12).toFixed(2) + "$/year";



    } else {
        var line_protect_output_html = NOT_APPLICABLE;

    }


    ////////////

    ////////calulations to display the results

    ///optional and base values
    ///apply tax to unapplied values
    ///all the values are now with taxes
    options_output_yearly = applyTax(options_output_yearly, tax);
    ///base output yearly
    var base_output_sum_yearly = 12 * base_output_monthly;

    ////output of options and base
    var base_options_output_yearly = base_output_sum_yearly + options_output_yearly;
    var base_options_output_monthly = base_output_monthly + options_output_yearly / 12;
    var base_options_output_html = base_options_output_monthly.toFixed(2) + '$/month' + ', ' + base_options_output_yearly.toFixed(2) + '$/year';


    ////Additional outputs
    ///placed on checked condition above



    ////display the outputs///
    ///display base ouput
    $("#out-base-title").html(base_title);
    $("#out-base-plans").html(base_output_html);
    ////with discount
    $("#out-base-total").html(applyDiscount(base_output_sum_yearly, discount).toFixed(2));



    ///dispay base-option output
    $("#base-option-output").html(base_options_output_html);

    $("#base-option-output-dis").html(applyDiscount(base_options_output_yearly, discount).toFixed(2));

    ///display additional output
    $("#surge-output").html(surge_protect_output_html);

    $("#electronics-output").html(electronics_protect_output_html);
    $("#line-output").html(line_protect_output_html);


}


$(document).ready(function (event) {

    $("#radio-appl").click(function () {

        $("#div-appl").css("display", "block");
        $("#div-sys").css("display", "none");
        $("#div-wh").css("display", "none");

    });

    $("#radio-sys").click(function () {

        $("#div-appl").css("display", "none");
        $("#div-sys").css("display", "block");
        $("#div-wh").css("display", "none");

    });

    $("#radio-wh").click(function () {

        $("#div-appl").css("display", "none");
        $("#div-sys").css("display", "none");
        $("#div-wh").css("display", "block");

    });


    $("#result-btn").click(function () {

        // displayOutput();

    });

    $(".js-cal-inputs").change(function () {

        displayOutput();

    });





});
