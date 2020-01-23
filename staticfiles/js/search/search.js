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
    $("#table-lat").html(zillow.address.latitude);
    $("#table-long").html(zillow.address.longitude);

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
     
    ///id for rent zestimate
    $("#table-zestimate").html(getValidValue(zillow.rent_zestimate.zestimate));
    $("#table-updated").html(getValidValue(zillow.rent_zestimate.last_updated));
    $("#table-val-change").html(getValidValue(zillow.rent_zestimate.value_change));
    $("#table-val-low").html(getValidValue(zillow.rent_zestimate.valuation_low));
    $("#table-val-high").html(getValidValue(zillow.rent_zestimate.valuation_high));
    $("#table-percen").html(getValidValue(zillow.rent_zestimate.percentile));
     






}



function updateWeatherView(data){

  
      $("#icon").html(data.icon.toUpperCase());

    $("#table-tem").html(data.temp);
    $("#table-mx-tem").html(data.max_temp);
    $("#table-mn-tem").html(data.min_temp);
    $("#table-strom-dis").html(getValidValue(data.stroam_distance));
    $("#table-precipp-acc").html(getValidValue(data.precip_acc));
    $("#summary").html(data.summary);
     
    
    
    if(data.alert_status)
      {
            var html_str='<div class="x_title"> <h3 style="margin-bottom: 0px;color: red">Alerts!</h3><div class="clearfix"></div></div>';

             for(var i=0;i<data.alerts.length;i++){
                 html_str= html_str+'<h2><a href="'+ data.alerts[0].uri+'"'   +'>'+data.alerts[0].title+''+'</a> </h2>' +'<p style="margin-bottom: 10px;margin-top: -10px"><span>'+data.alerts[0].title +'</span> to <span>'+data.alerts[0].expires+'</span></p>' +'<p style="text-align: justify">'+data.alerts[0].description+'</p>'; 
             }
             
                $("#div-alert").html(html_str);
                $("#div-alert").css("display","block");
               
        }
      else
         $("#div-alert").css("display","none");



    

}




$(document).ready(function (event) {

   $('#z-previous').click(function(){
      Zillow.setIndex(-1);
      updateZillowView();

   });


  $('#z-next').click(function(){
     
           Zillow.setIndex(1);
           updateZillowView();
   });


    $("#search-form").submit(function (event) {

        event.preventDefault();
        $('.fa-spin-zlw').css("display","inline");       
        $('.fa-check-zlw').css("display","none");
        $('.fa-close-zlw').css("display","none");
        $('.fa-spin-ds').css("display","inline");       
        $('.fa-check-ds').css("display","none");
        $('.fa-close-ds').css("display","none");
     
        $.ajax({
            url:$(this).attr("js-zlw-search-url") ,
            type: $(this).attr("method"),
            data: $(this).serialize(),
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
                 
                
            }
        });


          $.ajax({
            url:$(this).attr("js-ds-search-url") ,
            type: $(this).attr("method"),
            data: $(this).serialize(),
            dataType: 'json',
            success: function (data) {
                $('.fa-spin-ds').css("display","none");
                $('.fa-check-ds').css("display","inline");
                
                

               updateWeatherView(data);
            },


            error: function (request, status, error) {
                 $('.fa-spin-ds').css("display","none");
                 $('.fa-close-ds').css("display","inline");
                 alert("Please, Enter Valid Zip to Get Weather Reports.");
                
            }
        });


    

    });
});
