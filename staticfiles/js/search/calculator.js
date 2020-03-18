var APPLIANCE = 'Appliance';
var SYSTEM = 'System';
var WHOLE_HOME = 'Whole Home';
var NOT_APPLICABLE = 'N/A';

var MONTHS_IN_A_YEAR = 12;
var ONE_MONTH_FREE_IN_YEAR = 11;
///applicable month in a year with respect to discount1
var MONTHS_IN_A_YEAR_WITH_DIS = MONTHS_IN_A_YEAR;
var TAX = 0;
var TAX_TAG_SMALL = '<small>&nbsp;with tax</small>'
var text_output = "";

function applyTax(input) {

    return input + input * TAX / 100;

}

function yearlyAfterDiscount(monthly, discount2) {
    ///takes monthly input
    return monthly * MONTHS_IN_A_YEAR_WITH_DIS - discount2;
}

function buildTableRowHTML(tag, monthly, discount2) {

    var yearly = (MONTHS_IN_A_YEAR * monthly).toFixed(2);
    var yearly_after_dis = yearlyAfterDiscount(monthly, discount2).toFixed(2);
    monthly = monthly.toFixed(2);
    var row_text;
    var row_html;
    if (discount2 == 0 && MONTHS_IN_A_YEAR_WITH_DIS == MONTHS_IN_A_YEAR) {
        row_html = '<tr>' + '<td>' + tag + '</td>' + '<td>' + monthly + '$' + '</td>' + '<td>' + yearly + '$' + '</td>' + '<td>' + NOT_APPLICABLE + '</tr>';
        row_text = "" + tag + "- " + monthly + "$ monthly" + ", " + yearly + "$ yearly" + "\r\n";


    } else {

        row_html = '<tr>' + '<td>' + tag + '</td>' + '<td>' + monthly + '$' + '</td>' + '<td>' + yearly + '$' + '</td>' + '<td>' + yearly_after_dis + '$' + '</td>' + '</tr>';
        row_text = "" + tag + "- " + monthly + "$ monthly" + ", " + yearly + "$ yearly" + ", " + yearly_after_dis + "$ yearly(with discount)" + "\r\n";
    }
    return {
        row_html: row_html,
        row_text: row_text,
    }

}



function baseOutputHtml_row(monthly, discount2, tag) {
    /////// the cost is MONTHLY here
    ///this function also used in Base with Option output
    var without_tax_row = buildTableRowHTML(tag, monthly, discount2);

    if (TAX > 0) {
        monthly = applyTax(monthly);
        var with_tax_row = buildTableRowHTML(tag + TAX_TAG_SMALL, monthly, discount2);
        //return a extra row that is summed with tax
        return {
            row_html: without_tax_row["row_html"] + with_tax_row["row_html"],
            row_text: without_tax_row["row_text"] + with_tax_row["row_text"],



        }
    } else {

        return {
            row_html: without_tax_row["row_html"],
            row_text: without_tax_row["row_text"],



        }

    }
    //add a row for costs with TAX 


}

function displayOutput() {
    ///collect the discount datas
    if ($("#discount2-chk").prop("checked")) {
        var discount2 = parseFloat($("#discount2-chk").val());
    } else {
        var discount2 = 0;
    }
    ///discount month free
    if ($("#discount1-chk").prop("checked")) {
        MONTHS_IN_A_YEAR_WITH_DIS = ONE_MONTH_FREE_IN_YEAR;
    } else {
        MONTHS_IN_A_YEAR_WITH_DIS = MONTHS_IN_A_YEAR;


    }


    ///tax of the state
    TAX = parseFloat($("#tax-in").val());

    /////get the Optionals values
    var options_yearly = 0;
    var opt_checks = $(".js-optional-check");

    for (var i = 0; i < opt_checks.length; i++) {
        var opt_check = $(opt_checks[i]);
        if (opt_check.prop("checked")) {
            options_yearly = options_yearly + parseFloat(opt_check.val());
        }

    }
    ///apply tax after getting 'options_yearly'
    // options_yearly = applyTax(options_yearly, tax);
    options_monthly = options_yearly / MONTHS_IN_A_YEAR;

    var base_options_output_html = "";
    //base title output
    var base_title;
    var base_output_monthly = 0;
    var base_output_html = "";

    var base_output_text = "";
    var base_options_output_text = "";


    if ($("#radio-appl").prop("checked")) {
        base_title = APPLIANCE;
        var appl_plans = $(".js-appl-plans");
        for (var i = 0; i < appl_plans.length; i++) {
            var appl_plan = $(appl_plans[i]);

            if (appl_plan.prop("checked")) {
                //tag is appliance type tag
                var tag = appl_plan.data("tag");
                var base_monthly = parseFloat(appl_plan.val());
                ///base_monthly cost after applying tax
                //base_monthly = applyTax(base_monthly, tax);
                ///base output
                base_output_html = base_output_html + baseOutputHtml_row(base_monthly, discount2, tag)["row_html"];
                base_output_text = base_output_text + baseOutputHtml_row(base_monthly, discount2, tag)["row_text"];
                //the base_options cost is monthly
                var base_options_monthly = options_monthly + base_monthly;
                ///base option output
                if (options_monthly > 0) {

                    base_options_output_html = base_options_output_html + baseOutputHtml_row(base_options_monthly, discount2, tag)["row_html"];
                    base_options_output_text = base_options_output_text + baseOutputHtml_row(base_options_monthly, discount2, tag)["row_text"];
                }

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
                //tag is appliance type tag
                var tag = sys_plan.data("tag")
                var base_monthly = parseFloat(sys_plan.val());
                ///base_monthly cost after applying tax
                // base_monthly = applyTax(base_monthly, tax);
                ///base output
                base_output_html = base_output_html + baseOutputHtml_row(base_monthly, discount2, tag)["row_html"];
                base_output_text = base_output_text + baseOutputHtml_row(base_monthly, discount2, tag)["row_text"];
                //the base_options cost is monthly
                var base_options_monthly = options_monthly + base_monthly;
                ///base option output
                if (options_monthly > 0) {


                    base_options_output_html = base_options_output_html + baseOutputHtml_row(base_options_monthly, discount2, tag)["row_html"];
                    base_options_output_text = base_options_output_text + baseOutputHtml_row(base_options_monthly, discount2, tag)["row_text"];
                }
            }
        }


    }
    if ($("#radio-wh").prop("checked")) {
        base_title = WHOLE_HOME;

        var wh_plans = $(".js-wh-plans");
        for (var i = 0; i < wh_plans.length; i++) {
            var wh_plan = $(wh_plans[i]);

            if (wh_plan.prop("checked")) {
                //tag is appliance type tag
                var tag = wh_plan.data("tag")
                var base_monthly = parseFloat(wh_plan.val());
                ///base_monthly cost after applying tax
                //  base_monthly = applyTax(base_monthly, tax);
                ///base output
                base_output_html = base_output_html + baseOutputHtml_row(base_monthly, discount2, tag)["row_html"];
                base_output_text = base_output_text + baseOutputHtml_row(base_monthly, discount2, tag)["row_text"];
                //the base_options cost is monthly
                var base_options_monthly = options_monthly + base_monthly;
                ///base option output
                if (options_monthly > 0) {

                    base_options_output_html = base_options_output_html + baseOutputHtml_row(base_options_monthly, discount2, tag)["row_html"];
                    base_options_output_text = base_options_output_text + baseOutputHtml_row(base_options_monthly, discount2, tag)["row_text"];
                }
            }
        }



    }

    /////get additionals values

    if ($("#surge-protect-chk").prop("checked")) {
        var surge_protect = $("#surge-protect-select").children("option:selected").val();
        surge_protect = applyTax(parseFloat(surge_protect));

        var surge_protect_output_html = surge_protect.toFixed(2) + "$/month" + ', ' + (surge_protect * 12).toFixed(2) + "$/year";

    } else {

        var surge_protect_output_html = NOT_APPLICABLE;

    }
    if ($("#electronics-protect-chk").prop("checked")) {
        var electronics_protect = $("#electronics-protect-select").children("option:selected").val();
        electronics_protect = applyTax(parseFloat(electronics_protect));
        var electronics_protect_output_html = electronics_protect.toFixed(2) + "$/month" + ', ' + (electronics_protect * 12).toFixed(2) + "$/year";

    } else {


        var electronics_protect_output_html = NOT_APPLICABLE;

    }

    if ($("#line-protect-chk").prop("checked")) {
        var line_protect = $("#line-protect-chk").val();
        line_protect = applyTax(parseFloat(line_protect));
        var line_protect_output_html = line_protect.toFixed(2) + "$/month" + ', ' + (line_protect * 12).toFixed(2) + "$/year";
    } else {
        var line_protect_output_html = NOT_APPLICABLE;

    }


    ////display the outputs///
    $(".out-title").html(base_title);
    ///display base ouput
    $("#out-base-plans").html(base_output_html);

    ///dispay base-option output
    $("#base-option-output").html(base_options_output_html);

    ///display additional output
    $("#surge-output").html(surge_protect_output_html);

    $("#electronics-output").html(electronics_protect_output_html);
    $("#line-output").html(line_protect_output_html);

    ////save the text output


    text_output = "Base-\r\n" +
        base_output_text + "Base with Options-\r\n" + base_options_output_text + "Additiona- \r\n" + "Surge Protect- " + surge_protect_output_html + "\r\n" + "Electronics Protect- " + electronics_protect_output_html + "\r\n" + "Line Protect-" + line_protect_output_html;

    console.log(text_output);


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



    $(".js-cal-inputs").change(function () {

        displayOutput();

    });


    $("#warrenty-input").change(function () {



    });



    $("#phone-input").change(function () {



    });

    $("#name-input").change(function () {



    });


    $("#offer-btn").click(function () {

        var text_area = $("#offer-text");
        var OFFER_TEXT = text_area.text();
        //var confirm_text = CONFIRM_TEXT;
        var name = $("#name-input").val();
        var phone = $("#phone-input").val();
        var username = $("#username").html();
        var zipcode = $("#zipcode").text();
        if (!zipcode) {

            zipcode = $("#state").text();
        }

        // var warranty = $("#warranty-input").val();

        var offer_text = OFFER_TEXT.replace('[@NAME]', name);
        offer_text = offer_text.replace('[@DASH_USER_NAME]', username);
        offer_text = offer_text.replace('[@ZIPCODE', zipcode);
        offer_text = offer_text.replace('[@FORM_OUTPUT]', text_output);
        offer_text = offer_text.replace('[@DASH_USER_PHONE]', phone);

        text_area.text(offer_text);
        //need to be visible before copy
        text_area.css('display', 'fixed');

        text_area.select();
        document.execCommand("copy");

        // text_area.css('display', 'none');

        text_area.text(OFFER_TEXT);



        // displayOutput();

    });


    $("#confirmation-btn").click(function () {
        //alert('clicked');
        var text_area = $("#confirmation-text");
        var CONFIRM_TEXT = text_area.text();
        //var confirm_text = CONFIRM_TEXT;
        var name = $("#name-input").val();
        //var phone = $("#phone-input").val();
        var warranty = $("#warranty-input").val();
        var after_30_days = $("#after-30-days").text();

        var confirm_text = CONFIRM_TEXT.replace('[@NAME]', name);
        // confirm_text = CONFIRM_TEXT.replace('[@PHONE]', phone);

        confirm_text = confirm_text.replace('[@WARRANTY]', warranty);
        confirm_text = confirm_text.replace('[@30DAYSFUTURE]', after_30_days);

        text_area.text(confirm_text);



        text_area.css('display', 'fixed');
        text_area.select();
        document.execCommand("copy");
        // text_area.css('display', 'none');
        text_area.text(CONFIRM_TEXT);





        // displayOutput();

    });


});
