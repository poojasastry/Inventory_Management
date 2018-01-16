$(document).ready( function() {
    $("#tabs").tabs();  
});
$(document).ready( function() {
    var gqty;
    $('#insert').trigger('reset');
    $('#remove').trigger('reset');
    $("#sku").focus();
    $("#sku2").focus();
    $("#add").hide();
    $("#send").hide();   

    var todaydate = new Date();
    var day = todaydate.getDate();
    var month = todaydate.getMonth() + 1;
    var year = todaydate.getFullYear();
    var datestring = month + "/" + day + "/" + year;
    //var datestring = year + "/" + month + "/" + day ;
    $("#date").val(datestring);
    $("#date2").val(datestring);

    var errorStatusHandle = $('#showdata');
    var elementHandle = new Array(3);
    elementHandle[0] = $('#sku');
    elementHandle[1] = $('#date');
    elementHandle[2] = $('#qty');

     function isValidData() {
        if(isEmpty(elementHandle[0].val())) {
            elementHandle[0].addClass("error");
            errorStatusHandle.text("Please enter a valid SKU.");
            elementHandle[0].focus();
            return false;
            }
        if((elementHandle[0].val()).length>7) {
            elementHandle[0].addClass("err");
            errorStatusHandle.text("Please enter a 7-digit string for SKU in the format AAA-XXX.");
            elementHandle[0].focus();
            return false;
            }
        if(isEmpty(elementHandle[1].val())) {
            elementHandle[1].addClass("error");
            errorStatusHandle.text("Please enter a date.");
            elementHandle[1].focus();
            return false;
            }
        if(!isValidDateFormat(elementHandle[1].val())) {
            elementHandle[1].addClass("error");
            errorStatusHandle.text("Please enter the date in mm/dd/yyyy format.");
            elementHandle[1].focus(); 
            return false;
            } 
        else if(!isValidDate(elementHandle[1].val())) {
            elementHandle[1].addClass("error");
            errorStatusHandle.text("Please enter a valid date.");
            elementHandle[1].focus(); 
            return false;
            }      
        if(isEmpty(elementHandle[2].val())) {
            elementHandle[2].addClass("error");
            errorStatusHandle.text("Please enter a quantity.");
            elementHandle[2].focus();
            return false;
            }
        if((elementHandle[2].val())==0) {
            elementHandle[2].addClass("error");
            errorStatusHandle.text("The quantity should be greater than 0.");
            elementHandle[2].focus();
            return false;
            }
        else if((elementHandle[2].val())<0) {
            elementHandle[2].addClass("error");
            errorStatusHandle.text("Quantity cannot be negative. Please enter a valid quantity.");
            elementHandle[2].focus();
            return false;
            }
        if(!$.isNumeric(elementHandle[2].val())) {
            elementHandle[2].addClass("error");
            errorStatusHandle.text("The quantity appears to be invalid, "+
            "numbers only please. ");
            elementHandle[2].focus();            
            return false;
            } 
            return true;
        }
        elementHandle[0].focus();

        elementHandle[0].on('keyup', function() {
        elementHandle[0].val(elementHandle[0].val().toUpperCase());
        });

    var errorStatusHandle2 = $('#showdata2');
    var elementHandle2 = new Array(3);
    elementHandle2[0] = $('#sku2');
    elementHandle2[1] = $('#date2');
    elementHandle2[2] = $('#qty2');

     function isValidData2() {
        if(isEmpty(elementHandle2[0].val())) {
            elementHandle2[0].addClass("error");
            errorStatusHandle2.text("Please enter a valid SKU.");
            elementHandle2[0].focus();
            return false;
            }
        else if((elementHandle2[0].val()).length>7) {
            elementHandle2[0].addClass("error");
            errorStatusHandle2.text("Please enter a 7-digit string for SKU in the format AAA-XXX.");
            elementHandle2[0].focus();
            return false;
            }
        if(isEmpty(elementHandle2[1].val())) {
            elementHandle2[1].addClass("error");
            errorStatusHandle2.text("Please enter a date.");
            elementHandle2[1].focus();
            return false;
            }
        if(!isValidDateFormat(elementHandle2[1].val())) {
            elementHandle2[1].addClass("error");
            errorStatusHandle2.text("Please enter the date in mm/dd/yyyy format.");
            elementHandle2[1].focus(); 
            return false;
            } 
        else if(!isValidDate(elementHandle2[1].val())) {
            elementHandle2[1].addClass("error");
            errorStatusHandle2.text("Please enter a valid date.");
            elementHandle2[1].focus(); 
            return false;
            }      
        if(isEmpty(elementHandle2[2].val())) {
            elementHandle2[2].addClass("error");
            errorStatusHandle2.text("Please enter a quantity.");
            elementHandle2[2].focus();
            return false;
            }
        if((elementHandle2[2].val())==0) {
            elementHandle2[2].addClass("error");
            errorStatusHandle2.text("The quantity should be greater than 0.");
            elementHandle2[2].focus();
            return false;
            }
        else if((elementHandle2[2].val())<0) {
            elementHandle2[2].addClass("error");
            errorStatusHandle2.text("Quantity cannot be negative. Please enter a valid quantity.");
            elementHandle2[2].focus();
            return false;
            }
        if(!$.isNumeric(elementHandle2[2].val())) {
            elementHandle2[2].addClass("error");
            errorStatusHandle2.text("The quantity appears to be invalid, "+
            "numbers only please. ");
            elementHandle2[2].focus();            
            return false;
            } 
            return true;
        }
        elementHandle2[0].focus();

        elementHandle2[0].on('keyup', function() {
        elementHandle2[0].val(elementHandle2[0].val().toUpperCase());
        });

    $('#resetval').on('click', function(){
        for(var i=0; i < 3; i++)
            elementHandle[i].removeClass("error");
        errorStatusHandle.text("");
        $('#insert').trigger('reset');
        $('#pdtimage').html('');
        $('#showdata').html('');
         $("#add").hide();
        $('#sub').attr('disabled','true');
        document.getElementById("date").value = datestring;
        $("#sku").focus();
    });

     $('#resetval2').on('click', function(){
        for(var i=0; i < 3; i++)
            elementHandle2[i].removeClass("error");
        errorStatusHandle2.text("");
        $('#remove').trigger('reset');
        $('#pdtimage2').html('');
        $('#showdata2').html('');
         $("#send").hide();
        $('#sub2').attr('disabled','true');
        document.getElementById("date2").value = datestring;
        $("#sku2").focus();
    });
    
    $('#sku').on('change', function(){
        var skuv=$('#sku').val();
        $('#qty').val('');
        $('#category').val('');
        $('#vendor').val('');
        $('#mfid').val('');
        $('#stock').val('');
        $('#pdtimage').html('');
        $('#showdata').html('');
        $("#add").hide();
        document.getElementById("date").value = datestring;
        //$('#sub').attr('disabled','true');
        if(skuv){
            $.get('/jadrn044/servlet/Merin?sku='+skuv,function(data){
                if(data.startsWith("not")) {
                    $('#showdata').text("This SKU does not exist. Please enter a valid one.");
                   // $('#showdata').css('color','red');
                    $('#sku').addClass("error");
                    $('#sub').attr('disabled','true');
                    $('#qty').val('');
                     $("#sku").focus();
                    //$('#message_line').html('');
                }
                else
                {
                    $('#sku').removeClass("error");
                    var tmpStr = data.split("|");
                    $('#category').val(tmpStr[0]);
                    $('#vendor').val(tmpStr[1]);
                    $('#mfid').val(tmpStr[2]);
                    $('#stock').val(tmpStr[4]);
                    $('#pdtimage').html('<img src=\"/~jadrn044/proj1/_uploadDIR_/' + tmpStr[3]+ '\" height="180px" width="180px" alt="product image" />');
                    $('#sub').removeAttr('disabled');
                }
                });
            }
        });           

    $('#sub').on('click', function(){
        for(var i=0; i < 3; i++)
            elementHandle[i].removeClass("error");
        errorStatusHandle.text("");
        if(isValidData()){
        $('#sub').attr('disabled','true');
        //$('#resetval').attr('disabled','true');
        var skuv=$('#sku').val();
        var datev=$('#date').val();
        var qtyv=$('#qty').val();

        $.get('/jadrn044/servlet/InsertMerchandise?sku='+skuv+'&date='+datev+'&quantity='+qtyv,function(data2){
            var tmpStr2 = data2.split("|");
            var showdata2 = qtyv+" products with SKU:"+skuv+" added. Total Quantity available:"+tmpStr2[0];   
            $('#showdata').html(showdata2);
            $("#add").show();
        });
        }
        });

    $('#add').on('click', function(){
        $('#showdata').html('');
        $("#add").hide();
        $('#insert').trigger('reset');
         $('#pdtimage').html('');
        document.getElementById("date").value = datestring;
        $('#sub').attr('disabled','true');
        $('#resetval').removeAttr('disabled');
         $("#sku").focus();
    });

    $('#sku2').on('change', function(){
        var skuv2=$('#sku2').val();
        $('#qty2').val('');
        $('#category2').val('');
        $('#vendor2').val('');
        $('#mfid2').val('');
        $('#stock2').val('');
        $('#pdtimage2').html('');
        $('#showdata2').html('');
        $("#send").hide();
        document.getElementById("date2").value = datestring;
        if(skuv2){
            $.get('/jadrn044/servlet/Merout?sku2='+skuv2,function(data3){
                if(data3.startsWith("not")) {
                    $('#showdata2').text("This SKU does not exist. Please enter a valid one.");
                   // $('#showdata2').css('color','red');
                    $('#sub2').attr('disabled','true');
                    $('#qty2').val('');
                     $('#sku2').addClass("error");
                      $("#sku2").focus();                    
                }
                else
                {
                    $('#sku2').removeClass("error");
                    var tmpStr3 = data3.split("|");
                    gqty=parseInt(tmpStr3[4]);
                    $('#category2').val(tmpStr3[0]);
                    $('#vendor2').val(tmpStr3[1]);
                    $('#mfid2').val(tmpStr3[2]);
                    $('#stock2').val(tmpStr3[4]);
                    $('#pdtimage2').html('<img src=\"/~jadrn044/proj1/_uploadDIR_/' + tmpStr3[3]+ '\" height="180px" alt="product image" width="180px" />');
                    $('#sub2').removeAttr('disabled');
                }
                });
            }
        });
    $('#sub2').on('click', function(){
        //$('#showdata').html('');
        for(var i=0; i < 3; i++)
            elementHandle2[i].removeClass("error");
        errorStatusHandle2.text("");
        if(isValidData2()){
        var skuv2=$('#sku2').val();
        var datev2=$('#date2').val();
        var qtyv2=$('#qty2').val();
        if((qtyv2<gqty)||(qtyv2==gqty))
            {
                $('#sub2').attr('disabled','true');
                //$('#resetval2').attr('disabled','true');
                $.get('/jadrn044/servlet/SendMerchandise?sku2='+skuv2+'&date2='+datev2+'&quantity2='+qtyv2,function(data4){
                var tmpStr4 = data4.split("|");
                //var showdata4 = qtyv2+" numbers of the product with SKU: "+skuv2+" have been removed from the warehouse inventory.<br>Total Quantity available:"+tmpStr4[0];   
                var showdata4 = qtyv2+" products with SKU:"+skuv2+" sent. Total Quantity available:"+tmpStr4[0];   
                $('#showdata2').html(showdata4);
                //$('#showdata2').css('color','green');
                $("#send").show();
                });
            }
        else
        {
             $('#showdata2').text("You do not have the mentioned quantity to send out.");
        }
        }
        });

    $('#send').on('click', function(){
        $('#showdata2').html('');
        $("#send").hide();
        $('#remove').trigger('reset');
         $('#pdtimage2').html('');
        document.getElementById("date2").value = datestring;
        $('#sub2').attr('disabled','true');
        $('#resetval2').removeAttr('disabled');
         $("#sku2").focus();
    });

     $('#logout').on('click', function(){
        $.get('/jadrn044/servlet/Logout',function(){
           $('#main').html('');
            var ans = "<h2>You have been logged out of Diva's Handbags! Click <a href='/jadrn044/login.html'>here</a> to login again.</h2>";
            $('#main').html(ans); 
            $('#main').css({"text-align":"center","color":"red","margin-top":"30px"});
        });
    });
    });

function isEmpty(fieldValue) 
{
    return $.trim(fieldValue).length == 0;    
} 

function isValidDate(fieldValue)
{
    var comp = fieldValue.split('/');
    var m = parseInt(comp[0], 10);
    var d = parseInt(comp[1], 10);
    var y = parseInt(comp[2], 10);
    var date = new Date(y,m-1,d);
    if (date.getFullYear() == y && date.getMonth() + 1 == m && date.getDate() == d) 
        return true;
    return false;
}
function isValidForm()
{
    for(var i=0; i < 3; i++)
            elementHandle[i].removeClass("error");
        errorStatusHandle.text("");
        return isValidData();
}
function isValidDateFormat(fieldValue) 
{
    var pattern = new RegExp(/^\d{1,2}\/\d{1,2}\/\d{4}$/) ;
    return pattern.test(fieldValue);
} 