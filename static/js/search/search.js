var Zillow = (function () {
    ////private variable
    var zillow;
    var index;
  
    return {
        set: function (datas) {
            zillow = datas;
            index=0;

        },
        setIndex: function (i) {
            
           index=index+i;
           if(index<0)
              index=zillow.length-1;
           else if(index>=zillow.length)
              index=0;

        },
        getIndex: function () {
            
           return index;

        },
        datas: function () {

            return zillow;
        }

    };
})();


function getValidValue(value){

  if(value)
     return value
   return "........"

} 

function updateZillowView(){
  
    var index=Zillow.getIndex();
    var zillow=Zillow.datas()[index]
    var temp=index+1;
    $("#z-index").html(""+temp);
  
    $("#table-address").html(zillow.address.street);
    $("#table-city").html(zillow.address.city);
    $("#table-state").html(zillow.address.state);
    $("#table-zip").html(zillow.address.zipcode);

    $("#a-home-details").attr("href",zillow.links.home_details);
    $("#iframe-home-details").attr("src",zillow.links.home_details);
    $("#a-map").attr("href",zillow.links.map_this_home);
    $("#iframe-map").attr("src",zillow.links.map_this_home);
    $("#a-similars").attr("href",zillow.links.similar_sales);
    ////class for zestimate
    
    $(".table-zestimate").html(getValidValue(zillow.zestimate.zestimate));
    
    $(".table-updated").html(getValidValue(zillow.zestimate.last_updated));
    $(".table-val-change").html(getValidValue(zillow.zestimate.value_change));
    $(".table-val-low").html(getValidValue(zillow.zestimate.valuation_low));
    $(".table-val-high").html(getValidValue(zillow.zestimate.valuation_high));
    $(".table-percen").html(getValidValue(zillow.zestimate.percentile));
     
  





}



function updateWeatherView(data){
 
      var html_info__btn= '<i id="btn-weather-info" class="fa fa-info-circle float-right" aria-hidden="true"></i>';
      
      $("#time-top").html(data.time + html_info__btn);
     // var imcon='<img id="image-icon" alt="...">'
      //$("#icon").html(data.icon.toUpperCase()+imcon);
      //$("#image-icon").css("width","45px");
      //$("#image-icon").css("margin-left","20px");
      //$("#image-icon").attr("src",data.icon_url);


    $("#table-tem").html(data.temp);
    $("#table-mx-tem").html(data.max_temp);
    $("#table-mn-tem").html(data.min_temp);
    $("#table-strom-dis").html(getValidValue(data.stroam_distance));
    $("#table-precipp-acc").html(getValidValue(data.precip_acc));
    $("#summary").html(data.summary);
     
    $("#week_summary").html(data.week_sum);
    var table = $('#table-week').DataTable();
    table.clear();
    for(var i=0;i<data.week.length;i++){
       table.row.add( data.week[i]);
    }

   table.draw();
    
  
    
    
    if(data.alert_status)
      {
            var html_str='';

             for(var i=0;i<data.alerts.length;i++){
                 html_str= html_str+'<summary><a style="color: red;text-align: justify;font-size: 15px;font-weight: bold" href="'+ data.alerts[0].uri+'"'   +'>'+data.alerts[0].title+''+'</a> </summary>' +'<p style="margin-bottom: 10px;margin-top: -10px;text-align: justify"><span>'+data.alerts[0].time +'</span> to <span>'+data.alerts[0].expires+'</span><br>' +data.alerts[0].description+'</p>'; 
             }
             
                $("#div-alert").html(html_str);
                $("#div-alert").css("display","block");
               
        }
      else
        // $("#div-alert").css("display","none");



   initModal();

   var weather_currently_data="";
   for(var i in data.currently){
    
      weather_currently_data=weather_currently_data+ '<div class="p-2">'+ i+': '+data.currently[i]+'</div>';


   }
   
   $("#weather-info-div").html(weather_currently_data);
   



}




function initModal(){


  // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("btn-weather-info");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal 
    btn.onclick = function() {
      modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

}

function updateCountsView(counts){


    $("#user-count").html(counts.users);

    $("#zillow-count").html(counts.zillow);
    $("#darksky-count").html(counts.darksky);


}

function GetCounts(){

          $.ajax({
            url:$('#count-form').attr("js-counts-url") ,
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

function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
}
$(document).ready(function (event) {

/////get the users, zillow and darksky counts
///after a interval
   GetCounts();
   setInterval(GetCounts,5000);

   $('#z-previous').click(function(){
      Zillow.setIndex(-1);
      updateZillowView();

   });


  $('#z-next').click(function(){
     
           Zillow.setIndex(1);
           updateZillowView();
   });


    var table = $('#table-week').DataTable({
        destroy: true,
        paging:   false,
        ordering: false,
        info:     false,
        searching: false,
    

        columns: [
            { data: 'icon',"render": function ( data, type, row, meta ) {
                    
                    return '<img style="width:20px;" src="'+data+'">';
                 }, className: "align-middle" },
            { data: null, render: 'day', className: "align-middle" },
            { data: null, render: 'min_temp', className: "align-middle" },
            { data: null, render: 'max_temp', className: "align-middle" },

           
        ],
    
    });



    $("#search-form").submit(function (event) {

        event.preventDefault();
        $('.fa-spin-ds').css("display","inline");       
        $('.fa-check-ds').css("display","none");
        $('.fa-close-ds').css("display","none");
        var search_inputs =$(this).serialize();
        if(!isEmptyOrSpaces($('input[name="address"]').val())){

             $('.fa-spin-zlw').css("display","inline");       
             $('.fa-check-zlw').css("display","none");
             $('.fa-close-zlw').css("display","none");
 
              $.ajax({
              url:$(this).attr("js-zlw-search-url") ,
              type: $(this).attr("method"),
              data: search_inputs,
              dataType: 'json',
              success: function (data) {
                  $('.fa-spin-zlw').css("display","none");
                  $('.fa-check-zlw').css("display","inline");
                
                  Zillow.set(JSON.parse(data));
                  $('#z-total').html(Zillow.datas().length);
                  updateZillowView();
              },


              error: function (request, status, error) {
                 $('.fa-spin-zlw').css("display","none");
                 $('.fa-close-zlw').css("display","inline");
                 if(request.status==403)
                    alert("For access to Zillow , contact site admin.\r\nAdmin email: admin@fivethree.pro");
                 
                
            }
            });
        }

          $.ajax({
            url:$(this).attr("js-ds-search-url") ,
            type: $(this).attr("method"),
            data: search_inputs,
            dataType: 'json',
            success: function (data) {
                $('.fa-spin-ds').css("display","none");
                $('.fa-check-ds').css("display","inline");
                
                

               updateWeatherView(data);
            },


            error: function (request, status, error) {
                 $('.fa-spin-ds').css("display","none");
                 $('.fa-close-ds').css("display","inline");
                 if(request.status==403)
                    alert("For access to Darksy, contact site admin.\r\nAdmin email: admin@fivethree.pro");
                 else
                    alert("Please, Enter Valid Zip to Get Weather Reports.");
                
            }
        });


    

    });





  document.getElementById("sign-out-a").onclick=function() {
     document.getElementById("logout-form").submit();
     return false; // cancel the actual link
   }

 





});
