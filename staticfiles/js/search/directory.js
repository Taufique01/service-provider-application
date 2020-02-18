///regex for postal code input checking
const POST_CODE_REGEX_TYPE = /^\s*(\d{1,5})?\s*$/;
///backend can handle leading and trailing spaces
const POST_CODE_REGEX_ENTER = /^\s*(\d{5})?\s*$/;


function updateCountsView(counts) {
    $("#user-count").html(counts.users);
    $("#zillow-count").html(counts.zillow);
    $("#darksky-count").html(counts.darksky);


}

function GetCounts() {

    $.ajax({
        url: $('#count-form').attr("js-counts-url"),
        type: $('#count-form').attr("method"),
        data: $('#count-form').serialize(),
        dataType: 'json',
        success: function (counts) {
            updateCountsView(counts);

        },


        error: function (request, status, error) {



        }
    });




}


function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
}


$(document).ready(function (event) {


    ///logout implementation
    document.getElementById("sign-out-a").onclick = function () {
        document.getElementById("logout-form").submit();
        return false; // cancel the actual link
    }

    ///table request attribute holder form
    var sp_table_form = $('#sp-table-form');

    // construct the table
    var table = $('#directory-table').DataTable({
        paging: true,
        ordering: false,
        info: true,
        searching: false,
        "processing": true,
        "serverSide": true,

        "ajax": {
            "url": sp_table_form.attr('js-sp-table-url'),
            "type": sp_table_form.attr("method"),
            "data": function (d) {

                d.csrfmiddlewaretoken = sp_table_form.children("input[name='csrfmiddlewaretoken']").val();
                d.columns[1].search.value = $('#post-code').val();

                //used to separate search inputs
                d.columns[4].search.seperator = '#';

                d.columns[4].search.value = function () {

                    var checkbox_input = '';
                    $('.js-trades-input').each(function () {

                        var this_checkbox_val = (this.checked ? d.columns[4].search.seperator + $(this).val() : '');

                        checkbox_input = checkbox_input + this_checkbox_val;
                    });
                    return checkbox_input;

                };





            }
        },
        "columns": [
            {
                "data": "county"
                            },
            {
                "data": "postal_code"
                            },
            {
                "data": "city"
                            },
            {
                "data": "state"

                            },
            {
                "data": "trade"
                            },
            {
                "data": "sp_name"
                            }
                       ]

    });



    ///search inputs event hanlder assignment
    $('#post-code').bind("enterKey", function (e) {


        table.ajax.reload(null, false);

    });

    $('#post-code').keyup(function (e) {
        if (e.keyCode == 13) {
            if (POST_CODE_REGEX_ENTER.test($(this).val())) {
                $(this).trigger("enterKey");

            } else {
                $(this).css('color', 'red');

            }
            return;

        }

        if (POST_CODE_REGEX_TYPE.test($(this).val())) {
            $(this).css('color', '#495057');

        } else {

            $(this).css('color', 'red');

        }
    });

    $('.js-trades-input').change(function () {


        var all_checked = true;

        $('.js-trades-input').each(function () {

            if (!this.checked) {
                all_checked = false;
                return false;
            }

        });

        if (all_checked)
            $('#ALL-trades-input').prop('checked', true);
        else
            $('#ALL-trades-input').prop('checked', false);

        table.ajax.reload(null, false);


    });

    $('#ALL-trades-input').change(function () {

        if (this.checked) {
            $('.js-trades-input').prop('checked', true);
            table.ajax.reload(null, false);
        }



    });





});
