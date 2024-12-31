// for blockUI
function blockU() { 
//	jQuery.noConflict();
        $.blockUI({ css: { 
            border: 'none', 
            padding: '5px', 
            backgroundColor: '#000', 
            '-webkit-border-radius': '10px', 
            '-moz-border-radius': '10px', 
            opacity: .2, 
            color: '#fff' 
        } }); 
       
        //alert(alertMasg);
//        setTimeout($.unblockUI, 2000); 
    }; 
//unblock UI
    function unblockU() {
//    	$.unblockUI(2000);
    	setTimeout($.unblockUI, 0);
    };