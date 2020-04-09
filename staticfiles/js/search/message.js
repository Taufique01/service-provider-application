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
        var text = $(this).val();
        $("#mesaage-body-text").val(text);
        // console.log("change" + t);

    });


    document.getElementById("sign-out-a").onclick = function () {
        document.getElementById("logout-form").submit();
        return false; // cancel the actual link
    };









});
