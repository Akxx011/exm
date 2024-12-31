   function loadECB() {
   	var htmlStr="";
   	$
   	.ajax({
   		type : "get",
   		url : "eonExamgetAllEonEcbRegistration",
   		
   		cache : false,
   		success : function(response) {
   			
   			for (var i = 0; i < response.length; i++) {
   				htmlStr+="<option value="+response[i].ecbId+">"+response[i].ecbName+"</option>";
   			}
   			$('#ecbId').html(htmlStr);
// $('#searchState').html(htmlStr);
   			loadQpCreatedBy(document.form1.ecbId);
   			loadPasswordBy(document.form1.ecbId);
   		},
   		error : function() {
   			$.alert.open('Error while load ECB');
   		}
   	});
   }


   function loadQpCreatedBy(obj) {
   	
   	var htmlStr="<option value=-1>Select</option>";
   	$
   	.ajax({
   		type : "get",
   		url : "eonExamgetAllSystemUsersByEcbId?ecbId="+obj.value,
   		
   		cache : false,
   		success : function(response) {
   			
   			for (var i = 0; i < response.length; i++) {
   				htmlStr+="<option value="+response[i].userID+">"+response[i].userName+"</option>";
   			}
   			
   			$('#qPCreationBy').html(htmlStr);
   			// $('#searchState').html(htmlStr);
   			if(qPCreationBy!="")
				{
					document.form1.qPCreationBy.value=qPCreationBy;
					
				}
   			
   		
   		},
   		error : function() {
   			$.alert.open('Error while load Qp Created By');
   		}
   	});
   }

   // getAllSystemUsersByEcbIdPasswordBy


   function loadPasswordBy(obj) {
   	
   	var htmlStr="<option value=-1>Select</option>";
   	$
   	.ajax({
   		type : "get",
   		url : "eonExamgetAllSystemUsersByEcbIdPasswordBy?ecbId="+obj.value,
   		
   		cache : false,
   		success : function(response) {
   			
   			for (var i = 0; i < response.length; i++) {
   				htmlStr+="<option value="+response[i].userID+">"+response[i].userName+"</option>";
   			}
   			
   			$('#passwordBy').html(htmlStr);
   			// $('#searchState').html(htmlStr);
   			if(passwordBy!="")
				{
					document.form1.passwordBy.value=passwordBy;
					
				}
   			
   		
   		},
   		error : function() {
   			$.alert.open('Error while load Qp Created By1');
   		}
   	});
   }

   // getAllTypesOfQp
   function loadTypesOfQp() {
   	
   	var htmlStr="<option value=-1>Select</option>";
   	$
   	.ajax({
   		type : "get",
   		url : "eonExamgetAllTypesOfQp",
   		
   		cache : false,
   		success : function(response) {
   			
   			for (var i = 0; i < response.length; i++) {
   				htmlStr+="<option value="+response[i].lookupId+">"+response[i].lookupName+"</option>";
   			}
   			$('#typeOfQP').html(htmlStr);
// $('#searchState').html(htmlStr);
   			
   			if(typeOfQP!="")
			{
				document.form1.typeOfQP.value=typeOfQP;
				
			}
   		
   		},
   		error : function() {
   			$.alert.open('Error while load ECB');
   		}
   	});
   }
   
   
   function toSave()
   {
   	
   			var checkArray=["ecbId"];
   			var msgArray =["Please select ecb name."];
   			
   		if(validateFields(checkArray, 0 , msgArray) && confirm("Are you sure, you are going to save."))
   		{	
   			document.form1.submit();
   		}
   }

  

// eonExamgetExamRegistrationForEdit
var qPCreationBy='';
var passwordBy='';
var typeOfQP='';
var arrOfStateId=[];
var arrOfCityId=[];
function loadExamRegistrationForEdit1(examId) {
	
	
	if(examId!="undefined" && examId!=undefined)
		{
		// $.alert.open(examId);
	var htmlStr="";
	$
	.ajax({
		type : "get",
		url : "eonExamgetExamRegistrationForEdit?examId="+examId,
		cache : false,
		success : function(response) {
			// debugger;
			$("#ecbId").val(response.ecbId);
			qPCreationBy=response.qPCreationBy;
			passwordBy=response.passwordBy;
			typeOfQP=response.typeOfQP;
// $.alert.open(response.typeOfQP);
			// $("#typeOfQP").val(response.typeOfQP);
			for(var k=0;k<response.examCity.length;k++)
				{
				
				arrOfStateId.push(response.examCity[k].stateBean.stateId+"#"+response.examCity[k].stateBean.stateName);
				arrOfCityId.push(response.examCity[k].cityBean.cityId+"#"+response.examCity[k].cityBean.cityName+"#"+response.examCity[k].expectedCount);
				
				}	
			
	document.getElementById('nameOfExamination').value=response.nameOfExam;
	document.getElementById('displayName').value=response.displayName;
	document.getElementById('examinationSize').value=response.examinationSize;
	document.getElementById('purpose').value=response.purpose;
	document.getElementById('course').value=response.course;
	var startDate=response.startDate;
	var finalStartDate=startDate.split(" ");
	document.getElementById('startDate').value=finalStartDate[0];
	var endDate=response.endDate;
	var finalEndDate=endDate.split(" ");
	document.getElementById('endDate').value=finalEndDate[0];
	
	document.getElementById('totalMarks').value=response.totalMarks;
	document.getElementById('noOfMockTest').value=response.noOfMockTest;
	
	document.getElementById('noOfSlots').value=response.noOfSlots;
	var slotstartdate=response.slotBookingStartDate;
	var finalSlotDate=slotstartdate.split(" ");
	document.getElementById('startBdt').value=finalSlotDate[0];
	
	var slotEndDate=response.slotBookingEndDate;
	var finalSlotEndDate=slotEndDate.split(" ");
	document.getElementById('endBdt').value=finalSlotEndDate[0];
	document.getElementById('loginBeforeStart').value=response.loginBeforeStart;
	document.getElementById('instructionBeforeStart').value=response.instructionBeforeStart;
	document.getElementById('qPDownloadTimeBeforeStart').value=response.qPDownloadTimeBeforeStart;
	
	/*loadQpCreatedBy(document.form1.ecbId);
	loadPasswordBy(document.form1.ecbId);*/
	
	$("#qPCreationBy").val(response.qPCreationBy);
	$("#passwordBy").val(response.passwordBy);
	
	document.getElementById('bufferPer').value=response.bufferPer;
	
	
	 var arrOfStateId1 = ArrNoDupe(arrOfStateId);
	 
	  for(var n=0;n<arrOfStateId1.length;n++)
		  {
		  loadCity(arrOfStateId1[n].split("#")[0],arrOfStateId1[n].split("#")[1]);
		  }
	
	var exSlot= eval(response.examSlot);
// var cexSlot = exSlot.length;
	  // $('#moudate0').datepicker("setDate", new Date(2008,9,03) );
// $('#moudate0').val(new Date(2008,09,03));
// $('#moudate0').val(new Date(2015-10-09));
	  
	$.each(exSlot, function(i, v){
		// debugger;
		var cexSlot = exSlot.length;
		var dbDate = v.examdate;
		var date = dbDate.split(" "); 
		var date1=date[0];
		$('#moudate'+i).val(date1);
		
		var fromTime=v.startTime;
		// var fromTime1 = fromTime.split(" ");
		// var finalFromTime=fromTime1[1];
		$('#starttp'+i).val(tConvert(fromTime));
		
		var endTime=v.endTime;
// var endTime1 = endTime.split(" ");
// var finalEndTime=endTime1[1];
		$('#endtp'+i).val(tConvert(endTime));
		
// var slotCap=v.slotCapacity;
// $('#slotCapacity0').val(slotCapacity);
	    document.getElementById('slotCapacity'+i).value=v.slotCapacity;
	   if(i<(cexSlot-1)){
		$('#btnAdd').click();
	   }
		});
	
	var exManPower= eval(response.examManPowerMapping);
	$.each(exManPower, function(i, v){
		// debugger;
		
		$('#noOfStudentsGroupSize'+(i+1)).val(v.noOfStudentsGroupSize);
		$('#noOfFacilityPerGroup'+(i+1)).val(v.noOfFacilityPerGroup);
// document.getElementById('noOfStudentsGroupSize1').value=
	});
		
	$("input[type=checkbox]").each(function(){
		var name = this.name;
		// $.alert.open("document.forms[0]."+name+".value='"+response[0][name]+"'")
		// eval("document.forms[0]."+name+".value='"+response[0][name]+"'");
		if(response[name]=="0" || response[name]=="null" || response[name]==null)
			{
			eval("document.forms[0]."+name+".checked=false")
			}
		else
			{
			
			eval("document.forms[0]."+name+".checked=true")
			}
		});
	  
	 
	  
	 
		
}
	});
		}
	}


function tConvert (time) {
	// debugger ;
	var H = +time.substr(0, 2);
	var h = H % 12 || 12;
	var ampm = H < 12 ? " AM" : " PM";
	time = h + time.substr(2, 3) + ampm;
	return time;
	}

$(document).ready(function() {
	$('.ss li').not('.active').addClass('disabled');
    $('.ss li').not('.active').find('a').removeAttr("data-toggle");
});





function toFirstTabSave(){
	
	var checkArray=["ecbId","nameOfExam","examinationSize","startDate","endDate","slotBookingStartDate","slotBookingEndDate","bufferPer"];
	var msgArray =["Please select ECB name.","please enter exam name", "Please enter exam size","Please enter exam start date","Please enter exam end date","Please enter slot booking start date","Please enter slot booking end date","Please enter buffer percentage"];
	
	
	
	
var	dateOfExamination = document.getElementsByName("dateOfExamination");
var	startTime = document.getElementsByName("startTime");
var	endTime = document.getElementsByName("endTime");

if(validateFields(checkArray, 0 , msgArray))
	{
	for(var i=0;i<dateOfExamination.length;i++ )
	{
	if(dateOfExamination[i].value=="")
		{
			$.alert.open("Please enter Slot Date");
			dateOfExamination[i].focus();
			
			return false;
		}
		if(startTime[i].value=="")
		{
			$.alert.open("Please enter Slot Start Time");
			startTime[i].focus();
			return false;
		}
		if(endTime[i].value=="")
		{
			$.alert.open("Please enter Slot End Time");
			endTime[i].focus();
			return false;
		}
	}
	
	
	
	
	if(confirm("You are going create New Exam. Are you sure"))
		{
		
	  var frm=$("#frm");
	 // $.alert.open(frm.serialize());
	  $.ajax({
		        type: frm.attr('method'),
		        url: frm.attr('action'),
		        data: frm.serialize(),
		        success: function (response) {
		        	// $.alert.open(response);
		        $("#examId").val(response);
		        $.alert.open($("#nameOfExamination").val()+" has been successfully created");
		        },
				error : function() {
					$.alert.open('Error while assigning the value');
				}
		    });
	// $('.nav-tabs > .active').next('li').find('a').trigger('click');
		
	     $('.ss li.active').next('li').removeClass('disabled');
	     $('.ss li.active').next('li').find('a').attr("data-toggle","tab")
	     $('.nav-tabs > .active').next('li').find('a').trigger('click');
		}
	// $('.b').removeAttr('data-toggle');
}
}

function toSecondTabSave(){
	
	var checkArray=["ecbId"];
	var msgArray =["Please select ECB Name."];
	
if(validateFields(checkArray, 0 , msgArray))
	{
	if(!confirm("You are going update existing Exam. Are you sure"))
	{
	return false;
	}
	  var frm=$("#frm");
	// $.alert.open(frm.serialize());
	  $.ajax({
		        type: frm.attr('method'),
		        url: frm.attr('action'),
		        data: frm.serialize(),
		        success: function (response) {
		        // $.alert.open(response);
		        $("#examId").val(response);
		        $.alert.open($("#nameOfExamination").val()+" has been successfully updated");
		        },
				error : function() {
					$.alert.open('Error while assigning the value');
				}
		    });
	// $('.nav-tabs > .active').next('li').find('a').trigger('click');
	  	 $('.ss li.active').next('li').removeClass('disabled');
	     $('.ss li.active').next('li').find('a').attr("data-toggle","tab")
	     $('.nav-tabs > .active').next('li').find('a').trigger('click');
	// $('.b').removeAttr('data-toggle');
}
}

function toThirdTabSave(){
	
	var checkArray=["ecbId"];
	var msgArray =["Please select ecb name."];
	
if(validateFields(checkArray, 0 , msgArray))
	{	
	if(!confirm("You are going update existing exam. Are you sure"))
	{
	return false;
	}
	  var frm=$("#frm");
	// $.alert.open(frm.serialize());
	  $.ajax({
		        type: frm.attr('method'),
		        url: frm.attr('action'),
		        data: frm.serialize(),
		        success: function (response) {
		        // $.alert.open(response);
		        $("#examId").val(response);
		        $.alert.open($("#nameOfExamination").val()+" has been successfully updated");
		        },
				error : function() {
					$.alert.open('Error while assigning the value');
				}
		    });
	// $('.nav-tabs > .active').next('li').find('a').trigger('click');
	  	$('.ss li.active').next('li').removeClass('disabled');
	     $('.ss li.active').next('li').find('a').attr("data-toggle","tab")
	     $('.nav-tabs > .active').next('li').find('a').trigger('click');
	// $('.b').removeAttr('data-toggle');
}
}

function toFourthTabSave(){
	
	var checkArray=["ecbId"];
	var msgArray =["Please select ecb name."];
	
if(validateFields(checkArray, 0 , msgArray))
	{	
	if(!confirm("You are going update existing exam. Are you sure"))
	{
	return false;
	}
	  var frm=$("#frm");
	// $.alert.open(frm.serialize());
	  $.ajax({
		        type: frm.attr('method'),
		        url: frm.attr('action'),
		        data: frm.serialize(),
		        success: function (response) {
		        // $.alert.open(response);
		        $("#examId").val(response);
		        $.alert.open($("#nameOfExamination").val()+" has been successfully updated");
		        },
				error : function() {
					$.alert.open('Error while assigning the value');
				}
		    });
	// $('.nav-tabs > .active').next('li').find('a').trigger('click');
	  	 $('.ss li.active').next('li').removeClass('disabled');
	     $('.ss li.active').next('li').find('a').attr("data-toggle","tab")
	     $('.nav-tabs > .active').next('li').find('a').trigger('click');
	// $('.b').removeAttr('data-toggle');
}
}



function toFifthTabSave(){
	
	var checkArray=["ecbId"];
	var msgArray =["Please select ecb name."];
	var expectedCount = document.getElementsByName("expectedCount");
	var flag=true; 
	for(var i=0;i<expectedCount.length;i++){
		if(expectedCount[i].value=="" || expectedCount[i].value=="0")
			{
			
			flag=false;
			$.alert.open("Expected Count cannot be blank or zero. ");
			}
	}
if(validateFields(checkArray, 0 , msgArray) && flag)
	{	
	if(!confirm("You are going update existing exam. Are you sure"))
	{
	return false;
	}
	  var frm=$("#frm");
	// $.alert.open(frm.serialize());
	  $.ajax({
		        type: frm.attr('method'),
		        url: frm.attr('action'),
		        data: frm.serialize(),
		        success: function (response) {
		        // $.alert.open(response);
		        $("#examId").val(response);
		        $.alert.open($("#nameOfExamination").val()+" has been successfully updated");
		        },
				error : function() {
					$.alert.open('Error while assigning the value');
				}
		    });
	// $('.nav-tabs > .active').next('li').find('a').trigger('click');
	     $('.ss li.active').next('li').removeClass('disabled');
	     $('.ss li.active').next('li').find('a').attr("data-toggle","tab")
	     $('.nav-tabs > .active').next('li').find('a').trigger('click');
	// $('.b').removeAttr('data-toggle');
}
}



function showPreview()
{
	
		var strHtml="";
  strHtml +="<tr><td><h3>Details </h3></td><td></td><td></td><td></td> </tr>"
	      +"<tr><td>Name Of Exam :</td><td>"+document.form1.nameOfExamination.value+"</td><td>Display Name </td><td>"+document.form1.displayName.value+"</td> </tr>"
	      +"<tr><td>Examination Size :</td><td>"+document.form1.examinationSize.value+"</td><td></td><td></td> </tr>"
	      +"<tr><td>Purpose :</td><td>"+document.form1.purpose.value+"</td><td>Courses </td><td>"+document.form1.course.value+"</td> </tr>"
	      +"<tr><td>Exam Start Date :</td><td>"+document.form1.startDate.value+"</td><td>Exam End Date </td><td>"+document.form1.endDate.value+"</td> </tr>";
  
  strHtml +="<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>";
	for(var i = 0; i < document.form1.dateOfExamination.length; i++){
		strHtml +="<tr><td>Date :</td><td>"+document.form1.dateOfExamination[i].value+"</td><td>From Time </td><td>"+document.form1.startTime[i].value+"</td></tr>" 
	      +"<tr><td>To Time :</td><td>"+document.form1.endTime[i].value+"</td><td>Slot Capacity </td><td>"+document.form1.slotCapacity[i].value+"</td> </tr>";
		strHtml +="<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>";
	}     
  
	     
strHtml +="<tr><td>Total Marks  :</td><td>"+document.form1.totalMarks.value+"</td><td>No of Mock Test  </td><td>"+document.form1.noOfMockTest.value+"</td> </tr>"
	      +"<tr><td>Type of QP :</td><td>"+$("#typeOfQP option:selected").text()+"</td><td>No of Slots </td><td>"+document.form1.noOfSlots.value+"</td> </tr>"
	      +"<tr><td>Slot Booking : From Date  :</td><td>"+document.form1.slotBookingStartDate.value+"</td><td>To Date </td><td>"+document.form1.slotBookingEndDate.value+"</td> </tr>"
	      +"<tr><td>Login Time Before Start :</td><td>"+document.form1.loginBeforeStart.value+"</td><td>&nbsp;</td><td>&nbsp;</td></tr>"
	      +"<tr><td>Instruction Before Start:</td><td>"+document.form1.instructionBeforeStart.value+"</td><td>&nbsp;</td><td>&nbsp;</td></tr>"
	      +"<tr><td>Download Time Before Start  :</td><td>"+document.form1.qPDownloadTimeBeforeStart.value+"</td><td>Password By </td><td>"+$("#passwordBy option:selected").text()+"</td> </tr>"
	      +"<tr><td>QP Creation By   :</td><td>"+$("#qPCreationBy option:selected").text()+"</td><td>Buffer Percentage </td><td>"+document.form1.bufferPer.value+"</td> </tr>"
	      ;

strHtml +="<tr><td>Role At Center</td><td>Student Group Size</td><td colspan='2'>Requirement Per Group Size</td></tr>"
			+"<tr><td>Center Manager</td><td>"+document.form1.noOfStudentsGroupSize1.value+"</td><td colspan='2'>"+document.form1.noOfFacilityPerGroup1.value+"</td></tr>"
			+"<tr><td>Center Manager</td><td>"+document.form1.noOfStudentsGroupSize2.value+"</td><td colspan='2'>"+document.form1.noOfFacilityPerGroup2.value+"</td></tr>"
			+"<tr><td>Center Manager</td><td>"+document.form1.noOfStudentsGroupSize3.value+"</td><td colspan='2'>"+document.form1.noOfFacilityPerGroup3.value+"</td></tr>"
			+"<tr><td>Center Manager</td><td>"+document.form1.noOfStudentsGroupSize4.value+"</td><td colspan='2'>"+document.form1.noOfFacilityPerGroup4.value+"</td></tr>"
			+"<tr><td>Center Manager</td><td>"+document.form1.noOfStudentsGroupSize5.value+"</td><td colspan='2'>"+document.form1.noOfFacilityPerGroup5.value+"</td></tr>"
			+"<tr><td>Center Manager</td><td>"+document.form1.noOfStudentsGroupSize6.value+"</td><td colspan='2'>"+document.form1.noOfFacilityPerGroup6.value+"</td></tr>"
			+"<tr><td>Center Manager</td><td>"+document.form1.noOfStudentsGroupSize7.value+"</td><td colspan='2'>"+document.form1.noOfFacilityPerGroup7.value+"</td></tr>"
			+"<tr><td>Center Manager</td><td>"+document.form1.noOfStudentsGroupSize8.value+"</td><td colspan='2'>"+document.form1.noOfFacilityPerGroup8.value+"</td></tr>"
			;
strHtml +="<tr><td><h3>Check List </h3></td><td></td><td></td><td></td> </tr>"
	    +"<tr><td>Is Slot Booking By Candidate :</td><td>"+$("#isSlotBookingByCandidate").prop('checked')+"</td><td>Is QP Print Center Manager :</td><td>"+$("#isQpPrintByCentreManager").prop('checked')+"</td> </tr>"
	    +"<tr><td>Is QP Print IT Manager Allowed  :</td><td>"+$("#iSQPprintByITManager").prop('checked')+"</td><td>Is Key Provided :</td><td>"+$("#isKeysProvided").prop('checked')+"</td> </tr>"
	    +"<tr><td>Is Revisit Allowed :</td><td>"+$("#isRevisitedAllowed").prop('checked')+"</td><td>Is Score Printable :</td><td>"+$("#isScorePrintabled").prop('checked')+"</td> </tr>"
	    +"<tr><td>Is Score Displayed  :</td><td>"+$("#iSScoreDisplay").prop('checked')+"</td><td>Is Score Print By Center Manager :</td><td>"+$("#iSScorePrintByCentreManager").prop('checked')+"</td> </tr>"
	    +"<tr><td>Is Score Print By IT Manager :</td><td>"+$("#iSScorePrintByITManager").prop('checked')+"</td><td>Is QP Print By Student :</td><td>"+$("#isQPPrintByStudent").prop('checked')+"</td> </tr>"
	    +"<tr><td>Is Pre Registration Required :</td><td>"+$("#iSPreRegistrationRequired").prop('checked')+"</td><td>Is Key Print By Student :</td><td>"+$("#iSKeyPrintByStudent").prop('checked')+"</td> </tr>"
	    +"<tr><td>Is Candidate Login ID :</td><td>"+$("#iSCandidateLoginId").prop('checked')+"</td><td>Is Candidate Password :</td><td>"+$("#iSCandidateLoginPassword").prop('checked')+"</td> </tr>"
	    +"<tr><td>Is Candidate Verification :</td><td>"+$("#iSCandidateVerification").prop('checked')+"</td><td>Is Webcam Required :</td><td>"+$("#iSwebCamRequired").prop('checked')+"</td> </tr>"
	    +"<tr><td>Is Boimetric Required :</td><td>"+$("#isBiometricRequired").prop('checked')+"</td><td>Is Boicall Allowed :</td><td>"+$("#isBioCallAllowed").prop('checked')+"</td> </tr>"
	    +"<tr><td>Is Biocall Time Additional :</td><td>"+$("#isBioCallTimeAdditional").prop('checked')+"</td><td>Is Resource Allowed  :</td><td>"+$("#isResourceAllowes").prop('checked')+"</td> </tr>"
	    +"<tr><td>Is Bell Ring Pattern To Be Used :</td><td>"+$("#iSBellPatternToBeUSed").prop('checked')+"</td><td>Bell Time Warning Before Stop :</td><td>"+$("#bellTimeWarningBeforeSTop").prop('checked')+"</td> </tr>"
	    
	    +"<tr><td>Bell Ring Time Get Ready  :</td><td>"+$("#belRinglTimeGetReady").prop('checked')+"</td><td></td><td></td> </tr>"
	    +"<tr><td>Bell Start Time :</td><td>"+document.form1.bellTimeStart.value+"</td><td>Bell End Time :</td><td>"+document.form1.belEndlTime.value+"</td> </tr>"
		 ;
strHtml +="<tr><td><h3>Instructions 1 </h3></td><td></td><td></td><td></td> </tr>"
		     +"<tr><td colspan='4'>"+document.form1.instructionOne.value+"</td></tr>"
	;


	 $("#previewId").html(strHtml);
	 
}
function ArrNoDupe(a) {
    var temp = {};
    for (var i = 0; i < a.length; i++)
        temp[a[i]] = true;
    var r = [];
    for (var k in temp)
        r.push(k);
    return r;
}

function loadStateEdit() {
	
	var htmlStr="";
	$
	.ajax({
		type : "get",
		url : "eonExamGetStateRegistration?countryID=1",
		beforeSend: function(){
			$('#tblExamState').html('Loading...');
		},
		cache : false,
		success : function(response) {
			// $.alert.open("length is------>"+response.length);
			for (var i = 0; i < response.length; i++) {
				htmlStr+="<tr><td><a href='#' onclick=loadCity("+response[i].stateId+",'"+encodeURIComponent(response[i].stateName)+"');>"+response[i].stateName+"</a> </td></tr>";
				
// "<option value="+response[i].stateId+">"+response[i].stateName+"</option>";
				
			}
			$('#tblExamState').html(htmlStr);
			
			
			},
		error : function() {
			$('#tblExamState').html('');
			$.alert.open('Error while load State, please reload the page again');
		}
	});
}
function fillCity()
{
	
	var obj = document.getElementsByName("conCityName");
	for(var x=0; x<obj.length; x++)
		{
			for(var m=0;m<arrOfCityId.length;m++)
			{
				// $.alert.open("cityid--db->"+arrOfCityId[m].split("#")[0]);
				// $.alert.open("cityid-page-->"+obj[x].value.split("#")[1]);
				if(arrOfCityId[m].split("#")[0]==obj[x].value.split("#")[1])
					{
					
						obj[x].checked=true;
						break;
					}
			}// GURGAON#6#Haryana#1
		}
	loadConfigure();
}
// tblExamState


/*
 * This function is call the controller " lecGetCity" and Get the no of City and
 * Set all the City in the dropDown
 */

function loadCity(obj,name) {
	if(!checkStateId(obj))
		{
		return false;
		}
	var htmlStr="";
	$
	.ajax({
		type : "get",
		url : "eonExamGetCityRegistration?stateId="+obj,
		cache : false,
		beforeSend: function(){
			// $('#tblExamCity').html('Loading...');
		},
		success : function(response) {
			var strHtml1="";
			
			for (var i = 0; i < response.length; i++) {
				
				htmlStr+="<tr><td><a href='#' onclick='change("+response[i].cityId+");'>"+response[i].cityName+"</a>  </td>" +
				        "<td><input name='conCityName' id='conCityName' value='"+response[i].cityName+"#"+response[i].cityId+"#"+decodeURIComponent(name)+"#"+obj+"' type=checkbox onclick=loadConfigure1(this);></td>" +
						"</tr>";
				
// htmlStr+="<option
// value="+response[i].cityId+">"+response[i].cityName+"</option>";
			}
			
			
			
			strHtml1="<div class='panel panel-default'>"
		    +"<div class='panel-heading' role='tab' id='headingOne'>"
		    +"<h4 class='panel-title'>"
		    +"  <a role='button' data-toggle='collapse' data-parent='#accordion' href='#collapseOne"+obj+"' aria-expanded='true' aria-controls='collapseOne'>"
		    +"   <label id='selectedState'><input type=hidden name='tempStateId' value='"+obj+"'>"+decodeURIComponent(name)+"</label>"
		    +"      </a><input type='checkbox' class='pull-right' onclick='checkAll(this);' >"
		    +"    </h4>"
		    +" </div>"
		    +"<div id='collapseOne"+obj+"' class='panel-collapse collapse in' role='tabpanel' aria-labelledby='headingOne'>"
		    +"  <div class='panel-body'>"
		    +"  <table class='table table-hover'>"
		    +"			        	  <tbody>"
		    +htmlStr+
		    +"			        	  </tbody>"
		    +"			        	  </table>"
		    +"  </div>"
		    +" </div>"
		    +"</div>"	;
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			$('#divtblExamCity').append(strHtml1);
	     // $('#selectedState').val()=name;
			// $("#selectedState").append(decodeURIComponent(name));
		
			$("#grandCountId").text(document.getElementById('examinationSize').value);	
// document.form1.city.value=cityId;
		// $('#cityComp').html(htmlStr);
			fillCity();
		},
		error : function() {
			$.alert.open('Error while load city');
		}
	});
}
function checkStateId(stateId)
{
var obj = document.getElementsByName("tempStateId")	;
for(var i=0;i<obj.length;i++)
	{
	if(stateId==obj[i].value)
		{
		$.alert.open("This State already selected");
		return false;
		}
	}
return true;
}
function loadConfigure()
{
	//debugger;
	var html="";
	
	var conCityName = document.getElementsByName("conCityName");
	var cnt=1;
	for(var i=0;i<conCityName.length;i++)
		{
		
		if(conCityName[i].checked==true)//cityName#cityId#stateName#stateId
			//if(arrOfCityId.length>0){
		html+="<tr><input type=hidden value='"+conCityName[i].value.split("#")[1]+"::"+conCityName[i].value.split("#")[3]+"' name=strVal ><td></td><td>"+conCityName[i].value.split("#")[2]+"</td><td>"+conCityName[i].value.split("#")[0]+"</td><td><input type=text value='"+arrOfCityId[i].split("#")[2]+"' size=4 id=expectedCount name=expectedCount onblur='totalCount();' maxlength=4 onkeypress='return validateData(event,5)'></td></tr>"
			//}else{
			//	html+="<tr><input type=hidden value='"+conCityName[i].value.split("#")[1]+"::"+conCityName[i].value.split("#")[3]+"' name=strVal ><td>"+(cnt++)+"</td><td>"+conCityName[i].value.split("#")[2]+"</td><td>"+conCityName[i].value.split("#")[0]+"</td><td><input type=text value='' size=4 id=expectedCount name=expectedCount onblur='totalCount();' maxlength=4 onkeypress='return validateData(event,5)'></td></tr>"
			//}
		}
	
	$("#configureId").html(html);
	
}
function loadConfigure1(obj)
{
	var html1=""; var cnt=0;
	if(obj.checked==true)
		{
		var strVal = document.getElementsByName("strVal");
		var flag=true;
		for(var i=0; i<strVal.length; i+=1)
		{
			
			  if(strVal[i].value.split("::")[0]==obj.value.split("#")[1])
				  {
				  flag=false;
				  } 
		} 
		if(flag)
			{
			var html="";
			html+="<tr><td><input type=hidden value='"+obj.value.split("#")[1]+"::"+obj.value.split("#")[3]+"' name=strVal ></td><td>"+obj.value.split("#")[2]+"</td><td>"+obj.value.split("#")[0]+"</td><td><input type=text value='' size=4 id=expectedCount name=expectedCount onblur='totalCount(this);' maxlength=4 onkeypress='return validateData(event,5)'></td></tr>";
			$("#configureId").append(html);
			}
		
		}
	else
		{	 
			var table = document.getElementById('configureId');
			var rowLength = table.rows.length;
			var strVal = document.getElementsByName("strVal");
			for(var i=0; i<rowLength; i+=1)
			{
				  var row = table.rows[i];
				 
				  if(strVal[i].value.split("::")[0]!=obj.value.split("#")[1])
					  {
					 
					  var cellLength = row.cells.length;
					  html1+="<tr>";
					 var  expectedCount = document.getElementsByName("expectedCount");
					  for(var y=0; y<cellLength; y+=1){
					    var cell = row.cells[y];
					    if(y==3)
					    html1+="<td><input type=text value='"+expectedCount[i].value+"' size=4 id=expectedCount name=expectedCount onblur='totalCount(this);' maxlength=4 onkeypress='return validateData(event,5)'></td>";
					    else
					     html1+="<td>"+cell.innerHTML+"</td>";	
					  }
					  html1+="</tr>";
					  }
				 
				 
			} 
		  $("#configureId").html(html1);
		}
}
function checkAll(obj)
{
	var conCityName = document.getElementsByName("conCityName");
	for(var i=0;i<conCityName.length;i++)
	{
		if(obj.checked==true)
			conCityName[i].checked=true;
		else
			conCityName[i].checked=false;	
	}
	loadConfigure();
}
function totalCount(obj)
{
	// debugger;
	var totCount=0;
	var expectedCount = document.getElementsByName("expectedCount");
     var grandTotal=document.getElementById('examinationSize').value;	
	for(var i=0;i<expectedCount.length;i++)
	{
		if(expectedCount[i].value!="")
			{
			totCount = totCount+parseInt(expectedCount[i].value);
				if(totCount > grandTotal ){
					obj.value="";
					$.alert.open("Expected count cannot be greater than Exam Size");
					break;
				}
			
			}
		
	}
	$("#totalCountId").text(totCount);
	
/*else{
		$.alert.open("Total Count can not be greater than Grand Total Count");
		$("#totalCountId").text('');
		document.getElementById('expectedCount').value='';
		return false;
	}*/
}


/*
 * function chkFromTime(ele){ var id = ele.id; var c = id.replace('starttp',
 * ''); var dt = $('#moudate'+c).datepicker('getDate'); var dt1 =
 * dt.getFullYear()+"/"+(parseInt(dt.getMonth())+1)+"/"+dt.getDate(); var fromdt =
 * dt1 +" "+document.getElementById('starttp'+c).value; var todt = dt1 +"
 * "+document.getElementById('endtp'+c).value; //$.alert.open(fromdt); var from =
 * Date.parse(fromdt); var to = Date.parse(todt); if (from >= to){ $.alert.open("To
 * time should always be greater than From time."); return false; } return true; }
 */

/*
 * function chkToTime(ele){ debugger; var id = ele.id; var c =
 * id.replace('endtp', '');
 * 
 * var dt = $('#moudate'+c).datepicker('getDate'); var dt1 =
 * dt.getFullYear()+"/"+(parseInt(dt.getMonth())+1)+"/"+dt.getDate(); var fromdt =
 * dt1 +" "+document.getElementById('starttp'+c).value; var todt = dt1 +"
 * "+document.getElementById('endtp'+c).value; //$.alert.open(fromdt); var from =
 * Date.parse(fromdt); var to = Date.parse(todt);
 * 
 * if (from >= to){ $.alert.open("To time should always be greater than From time.");
 * return false; } return true; }
 */
function chkToTime(ele){
// debugger;
	var id = ele.id;

	var c = id.replace('endtp', '');
	 //   c = id.replace('starttp', '');
	 //c = id.replace('starttp', '');
	
// var dt = $('#moudate'+c).datepicker('getDate');
	var dt=$('#moudate'+c).val();
		//var spdate=dt.split("-");
		//var dt1=spdate[0]+"/"+spdate[1]+"/"+spdate[2];
// var dt1 = dt.getFullYear()+"/"+(parseInt(dt.getMonth())+1)+"/"+dt.getDate();
	var fromdt = dt +" "+document.getElementById('starttp'+c).value;
	var todt = dt +" "+document.getElementById('endtp'+c).value;
	// $.alert.open(fromdt);
	var from = Date.parse(fromdt);
	var to = Date.parse(todt);
	
	if (from >= to){
		$.alert.open("To Time should always be greater than From Time."); 
		document.getElementById('endtp'+c).value='';
		return false;
	}
	return true;
}

function chkStartEndDate(){
	var startDate=document.form1.startDate.value;
	var endDate=document.form1.endDate.value;
	var testStartDate = Date.parse(startDate);
	var testEndDate = Date.parse(endDate);
	if(testStartDate > testEndDate){
		$.alert.open("Exam Start Date is greater than Exam End Date ");
		document.form1.startDate.value='';
		document.form1.endDate.value='';
		return false;	
	}
	}

function chkdateOfExamination(ele){
	
	var id = ele.id;
	var c = id.replace('moudate', '');
	var dt=$('#moudate'+c).val();
	var testDateOfExamination = Date.parse(dt);
	var startDate=document.form1.startDate.value;
	var endDate=document.form1.endDate.value;
	var testStartDate = Date.parse(startDate);
	var testEndDate = Date.parse(endDate);
	//$.alert.open(testStartDate);
	//$.alert.open(testEndDate);
	if(testStartDate > testEndDate){
		$.alert.open("Exam Start Date is greater than Exam End Date ");
		return false;	
	}
	if(testEndDate < testDateOfExamination || testStartDate > testDateOfExamination ){
		$.alert.open("Date of Exam is grater than End Date");
		ele.value="";
		return false;
	}
}

function chkslotBookingStartDate(){
	
	var slotBookingStartDate=document.form1.slotBookingStartDate.value;
	var slotBookingEndDate=document.form1.slotBookingEndDate.value;
	var testSlotBookingStartDate = Date.parse(slotBookingStartDate);
	var testSlotBookingEndDate = Date.parse(slotBookingEndDate);
	
	var startDate=document.form1.startDate.value;
	var testStartDate = Date.parse(startDate);
	if(testStartDate < testSlotBookingStartDate){
		$.alert.open("Slot Booking From Date is greater than Exam Start Date");
		
		document.form1.slotBookingStartDate.value='';
		return false;
	}else if(testStartDate < testSlotBookingEndDate){
		$.alert.open("Slot Booking End Date is greater than Exam Start Date");
		//document.form1.slotBookingStartDate.value='';
		document.form1.slotBookingEndDate.value='';
		return false;
	}
	else if(testSlotBookingStartDate > testSlotBookingEndDate){
		$.alert.open("Slot Booking From Date  is greater than Slot Booking End Date ");
		document.form1.slotBookingStartDate.value='';
		document.form1.slotBookingEndDate.value='';
		return false;	
	}
	else{
		
	}
	
	
}

function chkReqPerGroup(ele){
	var id = ele.id;
	var c = id.replace('noOfFacilityPerGroup', '');
	var studentGoupSize=document.getElementById('noOfStudentsGroupSize'+c).value;
	var reqPerGroup=document.getElementById('noOfFacilityPerGroup'+c).value;
	if(studentGoupSize < reqPerGroup){
		$.alert.open("Student Group Size should be greater than Requirement Per Group Size");
		document.getElementById('noOfFacilityPerGroup'+c).value = '0';
		return false;
	}	
}

function chkSlot(ele){
	// debugger;
	var examSize=document.getElementById('examinationSize').value;
// $.alert.open("examSize"+examSize);
	var id = ele.id;
	var c = id.replace('slotCapacity', '');
	var slot=0;
	for(var i=0;i<=c;i++){
	slot+=parseInt(document.getElementById('slotCapacity'+i).value);
	}
	// $.alert.open("slot "+slot);
	if(slot>examSize){
		$.alert.open("Slot is greater than Exam Size");
		return false;
	}
}

function displayExam(){
	document.getElementById('displayName').value=document.getElementById('nameOfExamination').value;
}


$(document).ready(function() {
    $('textarea.editor').ckeditor();
});


<!-- End Editor -->

/*$('#typeOfQP').multiselect({
includeSelectAllOption: false,
preventInputChangeEvent: true,
enableFiltering: true,
numberDisplayed: 1000,
maxHeight: 300,
nonSelectedText: "<span class='label-m'>{{ tran('admin/contacts/table.more') }}</span>",
allSelectedText: "<span class='label-m'>{{ tran('admin/contacts/table.more') }}</span>",
enableCaseInsensitiveFiltering: true,
templates: {
button: '<button type="button" class="multiselect dropdown-toggle" data-toggle="dropdown"  data-placement="bottom"></button>'
},
onChange: function (option, checked, select) {},
buttonText: function (options, select) {
return 'My fixed label';
}
});*/

$(document).ready(function() {
$('#startDate').datepicker({
  format: 'yyyy-mm-dd',
  todayHighlight: true,
  autoclose: true,
  startDate: '+0d',	  
	 });
$('#endDate').datepicker({
  format: 'yyyy-mm-dd',
  todayHighlight: true,
  autoclose: true,
  startDate: '+0d',
	 });
$('.nexttab').click(function(){
  $('.nav-tabs > .active').next('li').find('a').trigger('click');
});



$("#startBdt").datepicker({
format: 'yyyy-mm-dd',
todayHighlight: true,
autoclose: true,
startDate: '+0d',
});
$('#endBdt').datepicker({
  format: 'yyyy-mm-dd',
  todayHighlight: true,
  autoclose: true,
  startDate: '+0d',
	 });

$('#bst').timepicker({
	autoclose: true
});// timeset
$('#bet').timepicker({
	autoclose: true
});// timeset
});

$(document).on('focusin','[id^=moudate]', function() {
	$(this).datepicker({
		format: 'yyyy-mm-dd',
		todayHighlight: true,
		autoclose: true,
		startDate: '+0d',
	});
// $('#moudate0').datepicker('setDate', '+0');
});

$(document).on('focusin', '[id^=starttp]', function() {
	$(this).timepicker({
		autoclose: true,
	});
});
$(document).on('focusin','[id^=endtp]', function() {
	$(this).timepicker({
		autoclose: true,
	});
});

// $('body').on('focusin', ".endtp", function() {
// $(this).timepicker();
// });

// *************************************************************************************
$(document).ready(function() {

		var regex = /^(.*)(\d)+$/i;
		var cloneIndex = $(".clonedInput").length;
		document.getElementById('noOfSlots').value=cloneIndex;
		if ($(".clonedInput").length == 1) {
			$('.remove').hide();
		} else {
			$('.remove').show();
		}

		function clone() {
			if(cloneIndex==3){
				$.alert.open("Cannot grater than 3");
				return false;
			}
			$(this).parents(".clonedInput").clone().appendTo(
					".container2").attr("id",
					"clonedInput" + cloneIndex).find("*").each(
					function() {
						var id = this.id || "";
						var match = id.match(regex) || [];
						if (match.length == 3) {
							this.id = match[1] + (cloneIndex);
						}
					}).on('click', 'btnAdd', clone).on('click',	'btnDel', remove);
			// $(".container2").attr('style', 'display:block;border:solid 1px
			// #555;');
			$(".container2");
			cloneIndex++;

			// se tem só uma linha esconde o delete
			console.log("Total de linhas => "
					+ $(".clonedInput").length);

			if ($(".clonedInput").length == 1) {
				$('.btnDel').hide();
			} else {
				$('.btnDel').show();
			}
			
			var thisind = cloneIndex-1;
			document.getElementById('noOfSlots').value=cloneIndex;
// $(document).on('blur','#endtp'+thisind, function(){
// chkToTime(document.getElementById('endtp'+thisind));
// });
// $(document).on('blur','#slotCapacity'+thisind, function(){
// noOfSlot(document.getElementById('slotCapacity'+thisind));
// });
			

		}
		function remove() {
			$(this).parents(".clonedInput").remove();
			cloneIndex--;
			document.getElementById('noOfSlots').value=cloneIndex;
			if ($(".clonedInput").length == 1) {
				$('.btnDel').hide();
			} else {
				$('.btnDel').show();
			}

		}
		$(document).on("click", ".btnAdd", clone);
		$(document).on("click", ".btnDel", remove);
	});


$(document).ready(function() {
$('#bookingfromDate')
   .datepicker({
       format: 'yyyy-mm-dd',
       autoclose: true,
       
   });
$('#examslotDate')
.datepicker({
   format: 'yyyy-mm-dd',
   autoclose: true
});
$('#bookingtoDate')
.datepicker({
   format: 'yyyy-mm-dd',
   autoclose: true
});
});

