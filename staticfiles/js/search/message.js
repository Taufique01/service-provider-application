$(document).ready(function (event) {




    $("#message-form").submit(function (event) {

        event.preventDefault();
        $("#meg-spin").css("display", "inline-block");

        // alert("submit click");

        $.ajax({
            url: $(this).attr("js-send-message-url"),
            type: $(this).attr("method"),
            data: $(this).serialize(),
            dataType: 'json',
            success: function (data) {
                $("#meg-spin").css("display", "none");
                $("#result-div-title").html(data.status);
                $("#result-div-det").html(data.log);

            },


            error: function (request, status, error) {
                $("#meg-spin").css("display", "none");

                $("#result-div-title").html(error);
                $("#result-div-det").html("");


            }
        });







    });




    $("#message-body-title").change(function () {
        var userphn = $("#phone-input").val();
        var cus_name = $("#customer-name-input").val();
        var cs_phone = $("#csphone-input").val();
        var contract_num = $("#contract-input").val();

        var text = $(this).val();
        text = text.replace("[#userphone]", userphn);
        text = text.replace("[#csphone]", cs_phone);
        text = text.replace("[#customername]", cus_name);
        text = text.replace("[#contractnum]", contract_num);

        $("#mesaage-body-text").val(text);
        // console.log("change" + t);

    });


    document.getElementById("sign-out-a").onclick = function () {
        document.getElementById("logout-form").submit();
        return false; // cancel the actual link
    };









});
