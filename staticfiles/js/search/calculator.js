var APPLIANCE = 'Appliance';
var SYSTEM = 'System';
var WHOLE_HOME = 'Complete Home';
var NOT_APPLICABLE = 'N/A';

var MONTHS_IN_A_YEAR = 12;
var ONE_MONTH_FREE_IN_YEAR = 11;
///applicable month in a year with respect to discount1
var MONTHS_IN_A_YEAR_WITH_DIS = MONTHS_IN_A_YEAR;
var TAX = 0;
var TAX_TAG_SMALL = '<small>&nbsp;with tax</small>'
var text_output = "";

var DISCLOSURE = {};
var ADDITIONAL_TOTAL_MONTHLY = 0;
var OPTIONAL_TOTAL_MONTHLY = 0;
var BASE_TITLE;


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
        row_html = '<tr>' + '<td>' + tag + '</td>' + '<td>' + '$' + monthly + '</td>' + '<td>' + '$' + yearly + '</td>' + '<td>' + NOT_APPLICABLE + '</tr>';
        row_text = "" + tag + "- " + "$" + monthly + " monthly" + ", " + "$" + yearly + " yearly" + "\r\n";


    } else {

        row_html = '<tr>' + '<td>' + tag + '</td>' + '<td>' + '$' + monthly + '</td>' + '<td>' + '$' + yearly + '</td>' + '<td>' + '$' + yearly_after_dis + '</td>' + '</tr>';
        row_text = "" + tag + "- " + "$" + monthly + " monthly" + ", " + "$" + yearly + " yearly" + ", " + "$" + yearly_after_dis + " yearly(with discount)" + "\r\n";
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
    ///make the dictionary used to generate
    //disclosure message empty every time
    DISCLOSURE = {};

    var discount_list = "";
    ///collect the discount datas
    if ($("#discount2-chk").prop("checked")) {
        var discount2 = parseFloat($("#discount2-chk").val());
        discount_list = discount_list + "$100.0 Off Annual Premium,";
    } else {

        var discount2 = 0;
    }
    ///discount month free
    if ($("#discount1-chk").prop("checked")) {
        MONTHS_IN_A_YEAR_WITH_DIS = ONE_MONTH_FREE_IN_YEAR;
        discount_list = discount_list + "1st Month Free";
    } else {
        MONTHS_IN_A_YEAR_WITH_DIS = MONTHS_IN_A_YEAR;
    }


    ///tax of the state
    TAX = parseFloat($("#tax-in").val());

    /////get the Optionals values
    var options_yearly = 0;
    var optons_list = "";

    var opt_checks = $(".js-optional-check");
    for (var i = 0; i < opt_checks.length; i++) {
        var opt_check = $(opt_checks[i]);
        if (opt_check.prop("checked")) {
            options_yearly = options_yearly + parseFloat(opt_check.val());
            optons_list = optons_list + opt_check.data("optname") + ", ";
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
                DISCLOSURE[tag] = parseFloat(appl_plan.val());

                var base_monthly = parseFloat(appl_plan.val());
                ///base output
                base_output_html = base_output_html + baseOutputHtml_row(base_monthly, discount2, tag)["row_html"];
                // base_output_text = base_output_text + baseOutputHtml_row(base_monthly, discount2, tag)["row_text"];
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
                var tag = sys_plan.data("tag");
                DISCLOSURE[tag] = parseFloat(sys_plan.val());
                var base_monthly = parseFloat(sys_plan.val());
                ///base_monthly cost after applying tax
                // base_monthly = applyTax(base_monthly, tax);
                ///base output
                base_output_html = base_output_html + baseOutputHtml_row(base_monthly, discount2, tag)["row_html"];
                // base_output_text = base_output_text + baseOutputHtml_row(base_monthly, discount2, tag)["row_text"];
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
                var tag = wh_plan.data("tag");
                DISCLOSURE[tag] = parseFloat(wh_plan.val());
                var base_monthly = parseFloat(wh_plan.val());
                ///base_monthly cost after applying tax
                //  base_monthly = applyTax(base_monthly, tax);
                ///base output
                base_output_html = base_output_html + baseOutputHtml_row(base_monthly, discount2, tag)["row_html"];
                // base_output_text = base_output_text + baseOutputHtml_row(base_monthly, discount2, tag)["row_text"];
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

    var additional_total_monthly = 0;


    if ($("#surge-protect-chk").prop("checked")) {
        var surge_protect = $("#surge-protect-select").children("option:selected").val();
        surge_protect = applyTax(parseFloat(surge_protect));
        additional_total_monthly = additional_total_monthly + surge_protect;
        var surge_protect_output_html = "$" + surge_protect.toFixed(2) + "/month" + ', ' + "$" + (surge_protect * 12).toFixed(2) + "/year";

    } else {

        var surge_protect_output_html = NOT_APPLICABLE;

    }
    if ($("#electronics-protect-chk").prop("checked")) {
        var electronics_protect = $("#electronics-protect-select").children("option:selected").val();
        electronics_protect = applyTax(parseFloat(electronics_protect));
        additional_total_monthly = additional_total_monthly + electronics_protect;
        var electronics_protect_output_html = "$" + electronics_protect.toFixed(2) + "/month" + ', ' + "$" + (electronics_protect * 12).toFixed(2) + "/year";

    } else {


        var electronics_protect_output_html = NOT_APPLICABLE;

    }

    if ($("#line-protect-chk").prop("checked")) {
        var line_protect = $("#line-protect-chk").val();
        line_protect = applyTax(parseFloat(line_protect));
        additional_total_monthly = additional_total_monthly + line_protect;
        var line_protect_output_html = "$" + line_protect.toFixed(2) + "/month" + ', ' + "$" + (line_protect * 12).toFixed(2) + "/year";
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

    BASE_TITLE = base_title;

    if (discount_list)
        discount_list = " and " + discount_list;

    if (optons_list + discount_list)
        optons_list = "**includes " + optons_list + discount_list;

    text_output = base_title + " Warranty" + "\r\n" + base_options_output_text + optons_list + "\r\n" + "Surge Protect- " + surge_protect_output_html + "\r\n" + "Electronics Protect- " + electronics_protect_output_html + "\r\n" + "Line Protect-" + line_protect_output_html;
    ///for disclosure message
    ADDITIONAL_TOTAL_MONTHLY = additional_total_monthly;
    OPTIONAL_TOTAL_MONTHLY = options_monthly;



    // console.log(text_output);


}









$(document).ready(function (event) {


    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }



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


    $("#disclosure-btn").click(function () {

        var baselen = Object.keys(DISCLOSURE).length;

        // alert(baselen);
        if (baselen == 1) {
            disclosureMessage();
            modal.style.display = "block";
        } else if (baselen > 1) {
            var yes_no = confirm("Choose single onption for Base input or showing results for\r\n" + Object.keys(DISCLOSURE)[0]);
            if (yes_no) {
                disclosureMessage();
                modal.style.display = "block";

            }
        } else {


            alert("Invalid input for Base");
            return;
        }






    });

    $("#popup-text").contextmenu(function () {
        // alert("Handler for .contextmenu() called.");



        $(this).select();
        document.execCommand("copy");

        return false;



    });




    $("#note-btn").click(function () {
        var sales_details_row = "SALES DETAILS: ";
        var action_taken_row = "ACTION TAKEN : ";


        for (var disclosure in DISCLOSURE) {

            var base_tag = disclosure;

            var base = DISCLOSURE[disclosure];
            var bs_op_add_monthly = base + ADDITIONAL_TOTAL_MONTHLY + OPTIONAL_TOTAL_MONTHLY;

            bs_op_add_monthly = applyTax(bs_op_add_monthly);
            break;
        }

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



        if ($("#pay-monthly").prop("checked")) {
            var monthly_or_yearly_row = "MONTHLY : " + bs_op_add_monthly.toFixed(2);
        } else if ($("#pay-yearly").prop("checked")) {

            var monthly_or_yearly_row = "YEARLY : " + yearlyAfterDiscount(bs_op_add_monthly, discount2).toFixed(2);

        } else {

            var monthly_or_yearly_row = "";
        }


        if ($("#pay-ach").prop("checked")) {

            var pay_details = $("#pay-ach").val();
        } else if ($("#pay-cc").prop("checked")) {


            var pay_details = $("#pay-cc").val();

        } else if ($("#pay-invoice").prop("checked")) {
            var pay_details = $("#pay-invoice").val();

        } else {

            var pay_details = "";
        }

        var pay_details_row = "BILLED TO: " + pay_details;



        // var advise_out_row = "";
        var advises = $(".js-advice-inputs");

        for (var i = 0; i < advises.length; i++) {
            var advise = $(advises[i]).val();

            //    advise_out_row = advise_out_row + ', ' + advise;

            action_taken_row = action_taken_row + 'Advised of: ' + advise + '...';
        }


        if ($("#action-chk-0").prop("checked")) {
            ///OK@2E

            sales_details_row = sales_details_row + $("#action-chk-0").val();
            action_taken_row = action_taken_row + '...' + $("#action-chk-0").val();



        }

        var cob = "cob: ";


        if ($("#action-chk-1").prop("checked")) {
            //registered online account
            cob = cob + $("#action-chk-1").val();
            action_taken_row = action_taken_row + '...' + $("#action-chk-1").val();

        }

        if ($("#action-chk-2").prop("checked")) {
            //Refused options and additions
            cob = cob + '...' + $("#action-chk-2").val();
            action_taken_row = action_taken_row + '...' + $("#action-chk-2").val();

        }

        if ($("#action-chk-3").prop("checked")) {
            //Sent email confirmation
            cob = cob + '...' + $("#action-chk-3").val();
            action_taken_row = action_taken_row + '...' + $("#action-chk-3").val();

        }
        var warranty = 'warranty #' + $("#warranty-input").val();


        sales_details_row = sales_details_row + '...' + 'enrolled in cinch  ' + base_tag + ' ded...' + warranty + '...' + cob;



        var sales_scripting_row = "SALES SCRIPTING COMPLETED: ";

        if ($("#action-chk-4").prop("checked")) {

            ///sales scripting completed
            sales_scripting_row = sales_scripting_row + 'YES';
        } else {
            sales_scripting_row = sales_scripting_row + 'NO';
        }


        var billing_script_row = 'CC/ACH SCRIPTING COMPLETED: '
        if ($("#action-chk-5").prop("checked")) {

            ///billing scripting completed
            billing_script_row = billing_script_row + 'YES';
        } else {
            billing_script_row = billing_script_row + 'NO';
        }

        var rod_row = "ROD: ";

        if ($("#action-chk-6").prop("checked")) {

            ///sales scripting completed
            rod_row = rod_row + 'YES';
        } else {
            rod_row = rod_row + 'NO';
        }

        var name = $("#name-input").val();
        var phone = $("#phone-input-cus").val();

        var caller_row = "CALLER: " + "Name: " + name + ", Phone: " + phone;


        var call_reason_row = "REASON FOR CALL: ";
        if ($("#call-reason-enroll").prop("checked")) {
            call_reason_row = call_reason_row + $("#call-reason-enroll").val();

        } else if ($("#call-reason-productenq").prop("checked")) {
            call_reason_row = call_reason_row + $("#call-reason-productenq").val();


        } else if ($("#call-reason-other").prop("checked")) {
            call_reason_row = call_reason_row + $("#call-reason-other").val();

        }


        var reason_det_row = "REASON DETAILS: " + "Customer interested in Cinch " + BASE_TITLE + " Warranty";


        var new_line = '\r\n';
        var note_output = caller_row + '\r\n' + call_reason_row + '\r\n' + reason_det_row + '\r\n' + action_taken_row + '\r\n' + sales_details_row + '\r\n' + pay_details_row + '\r\n' + monthly_or_yearly_row + '\r\n' + sales_scripting_row + '\r\n' + rod_row + '\r\n' + billing_script_row + '\r\n';


        $(".hidden-copy-text").text(note_output);
        $(".hidden-copy-text").select();
        document.execCommand('copy');



        $(this).tooltip('show');



    });

    $("#note-btn").mousemove(function () {
        $(this).tooltip('hide');



    });

    function disclosureMessage() {

        var after_30_days = $("#after-30-days").text();
        var after_60_days = $("#after-60-days").text();


        var show_yearly_total = false;
        var is_invoice = false;


        if ($("#pay-yearly").prop("checked")) {
            show_yearly_total = true;
        }

        if ($("#pay-invoice").prop("checked")) {
            show_yearly_total = true;
            is_invoice = true;
        }


        if ($("#discount1-chk").prop("checked")) {
            var dis_meg = DISCLOSURE_MESSAGE_2_IF_30_FREE;

            dis_meg = dis_meg.replace("[ADDITIONAL TOTAL MONTHLY]", applyTax(ADDITIONAL_TOTAL_MONTHLY.toFixed(2)));
            if (is_invoice)
                after_60_days = "the closing date";

        } else {
            var dis_meg = DISCLOSURE_MESSAGE_2_IF_NOT_30_FREE;
            if (is_invoice)
                after_30_days = "the closing date";
        }
        ///collect the discount datas
        if ($("#discount2-chk").prop("checked")) {
            var discount2 = parseFloat($("#discount2-chk").val());
        } else {
            var discount2 = 0;
        }





        for (var disclosure in DISCLOSURE) {

            var base = DISCLOSURE[disclosure];
            var bs_op_add_monthly = base + ADDITIONAL_TOTAL_MONTHLY + OPTIONAL_TOTAL_MONTHLY;

            if (show_yearly_total)
                var bs_op_add_total = yearlyAfterDiscount(bs_op_add_monthly, discount2);
            else
                var bs_op_add_total = bs_op_add_monthly;

            bs_op_add_total = applyTax(bs_op_add_total);

            bs_op_add_total = bs_op_add_total.toFixed(2);
            dis_meg = dis_meg.replace("[TOTAL INCLUDING OPTIONS AND ADDITIONS]", bs_op_add_total);
            dis_meg = dis_meg.replace("[30DAYSFUTURE]", after_30_days);
            dis_meg = dis_meg.replace("[60DAYSFUTURE]", after_60_days);

            dis_meg = DISCLOSURE_MESSAGE_1 + dis_meg + DISCLOSURE_MESSAGE_3;

            $("#popup-text").text(dis_meg);


            break;







        }



    }


    $("#offer-btn").click(function () {

        var name = $("#name-input").val();
        var phone = $("#phone-input").val();
        var username = $("#username").html();
        var zipcode = $("#zipcode").text();
        if (!zipcode) {

            zipcode = $("#state").text();
        }


        var offer_text = OFFER_TEXT.replace('[@NAME]', name);
        offer_text = offer_text.replace('[@DASH_USER_NAME]', username);
        offer_text = offer_text.replace('[@ZIPCODE]', zipcode);
        offer_text = offer_text.replace('[@FORM_OUTPUT]', text_output);
        offer_text = offer_text.replace('[@DASH_USER_PHONE]', phone);
        $("#popup-text").text(offer_text);

        modal.style.display = "block";


    });


    $("#confirmation-btn").click(function () {
        //alert('clicked');
        //var text_area = $("#confirmation-text");
        //  var CONFIRM_TEXT = CONFIRMATION;
        //var confirm_text = CONFIRM_TEXT;
        var name = $("#name-input").val();
        //var phone = $("#phone-input").val();
        var warranty = $("#warranty-input").val();
        var after_30_days = $("#after-30-days").text();

        var confirm_text = CONFIRM_TEXT.replace('[@NAME]', name);
        // confirm_text = CONFIRM_TEXT.replace('[@PHONE]', phone);

        confirm_text = confirm_text.replace('[@WARRANTY]', warranty);
        confirm_text = confirm_text.replace('[@30DAYSFUTURE]', after_30_days);
        $("#popup-text").text(confirm_text);
        modal.style.display = "block";

    });


    $("#btn-ach").click(function () {

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;



        var name = $("#name-input").val();
        var date = $("#after-30-days").text();
        var is_invoice = false;
        var show_yearly_total = false;

        ///discount month free
        if ($("#discount1-chk").prop("checked")) {
            MONTHS_IN_A_YEAR_WITH_DIS = ONE_MONTH_FREE_IN_YEAR;
            date = $("#after-60-days").text();
        } else {
            MONTHS_IN_A_YEAR_WITH_DIS = MONTHS_IN_A_YEAR;

        }


        ///collect the discount datas
        if ($("#discount2-chk").prop("checked")) {
            var discount2 = parseFloat($("#discount2-chk").val());
        } else {
            var discount2 = 0;
        }




        if ($("#pay-yearly").prop("checked")) {
            show_yearly_total = true;

        }

        if ($("#pay-invoice").prop("checked")) {
            show_yearly_total = true;
            date = "the closing date";
        }




        for (var disclosure in DISCLOSURE) {

            var base_tag = disclosure;
            var base = DISCLOSURE[disclosure];
            var bs_op_add_monthly = base + ADDITIONAL_TOTAL_MONTHLY + OPTIONAL_TOTAL_MONTHLY;

            if (show_yearly_total) {
                var bs_op_add_total = yearlyAfterDiscount(bs_op_add_monthly, discount2);
            } else
                var bs_op_add_total = bs_op_add_monthly;

            bs_op_add_total = applyTax(bs_op_add_total);

            bs_op_add_total = bs_op_add_total.toFixed(2);
            //bs_op_add_monthly = applyTax(bs_op_add_monthly).toFixed(2);
            break;
        }


        var ach_text = ACH_TEXT.replace('[FORM_NAME]', name);
        ach_text = ach_text.replace('[FORM_NAME]', name);
        ach_text = ach_text.replace('[FORM_NAME]', name);
        ach_text = ach_text.replace("[PAY DATE]", date);
        ach_text = ach_text.replace("[TODAY'S DATE]", today);


        ach_text = ach_text.replace("[FORM OUTPUT MONTHLY]", bs_op_add_total);




        $("#popup-text").text(ach_text);
        modal.style.display = "block";


    });

    $("#btn-cc").click(function () {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;

        var name = $("#name-input").val();
        var date = $("#after-30-days").text();
        var is_invoice = false;
        var show_yearly_total = false;


        ///discount month free
        if ($("#discount1-chk").prop("checked")) {
            MONTHS_IN_A_YEAR_WITH_DIS = ONE_MONTH_FREE_IN_YEAR;
            date = $("#after-60-days").text();
        } else {
            MONTHS_IN_A_YEAR_WITH_DIS = MONTHS_IN_A_YEAR;

        }


        ///collect the discount datas
        if ($("#discount2-chk").prop("checked")) {
            var discount2 = parseFloat($("#discount2-chk").val());
        } else {
            var discount2 = 0;
        }




        if ($("#pay-yearly").prop("checked")) {
            show_yearly_total = true;

        }

        if ($("#pay-invoice").prop("checked")) {
            show_yearly_total = true;
            date = "the closing date";
        }


        for (var disclosure in DISCLOSURE) {

            var base_tag = disclosure;

            var base = DISCLOSURE[disclosure];
            var bs_op_add_monthly = base + ADDITIONAL_TOTAL_MONTHLY + OPTIONAL_TOTAL_MONTHLY;

            if (show_yearly_total)
                var bs_op_add_total = yearlyAfterDiscount(bs_op_add_monthly, discount2);
            else
                var bs_op_add_total = bs_op_add_monthly;

            bs_op_add_total = applyTax(bs_op_add_total);

            bs_op_add_total = bs_op_add_total.toFixed(2);

            // bs_op_add_monthly = applyTax(bs_op_add_monthly).toFixed(2);
            break;
        }


        var cc_text = CC_TEXT.replace('[FORM_NAME]',
            name);
        cc_text = cc_text.replace('[FORM_NAME]',
            name);
        cc_text = cc_text.replace('[FORM_NAME]',
            name);
        cc_text = cc_text.replace("[PAY DATE]", date);

        cc_text = cc_text.replace("[TODAY'S DATE]", today);

        cc_text = cc_text.replace('[FORM OUTPUT MONTHLY]', bs_op_add_total);






        $("#popup-text").text(cc_text);
        modal.style.display = "block";


    });


});
