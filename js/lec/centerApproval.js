var popUpCenterId=0;
function loadLecType() {

	var htmlStr = "<option value=-1>All</option><option value=1>Approved</option><option value=0>NotApproved</option>";
	$('#typeApp').html(htmlStr);
}

function onApprovalStateChange() {
	var htmlStr = "<option value=-1>All</option>";
	$('#centerApp').html(htmlStr);
	$('#typeApp').html(htmlStr);
	$("#lecApprovalId").html("");
}

function loadApprovalCity(obj) {
	blockU();
	var htmlStr = "<option value=-1>Select</option>";

	if ($('#stateApp').val() != -1) {
		$.ajax({
			type : "get",
			url : "eonlecGetCity?stateId=" + obj.value,
			cache : false,
			success : function(response) {
				unblockU("");
				for (var i = 0; i < response.length; i++) {
					htmlStr += "<option value=" + response[i].cityId + ">"
							+ response[i].cityName + "</option>";
				}

				$('#cityApp').html(htmlStr);
			},
			error : function() {
				unblockU("");
				$.alert.open('Error while load city');
			}
		});

	}

}

function loadLecForApproval() {
	blockU();
	var cityId = $('#cityApp').val();
	$('#table').bootstrapTable('showLoading'); 
	$
			.ajax({
				type : "get",
				url : "eongetLecForApproval?cityId=" + cityId,
				cache : false,
				success : function(response) {
					unblockU("");
					$('#table').bootstrapTable('hideLoading');
		 			$('#notification').hide();  
		 			$('#table').bootstrapTable('load', response);  
		 			
//					displayAllLecAfterSuccess(response);
				},
				error : function() {
					unblockU("");
					$.alert.open('Error while load city');
					$('#table').bootstrapTable('hideLoading');
		 			$('#notification').hide();  
		 			$('#table').bootstrapTable('load', response);  
				}
			});
}

function getLecId(i,name,totComp,centerId) {
	popUpCenterId=centerId;
	$("#centreName").text(name);
	$("#ttlNoComp").text(totComp);
	return true;
}
function getLecIdForView(i,status,centerId) {
	
	loadLecForEdit1(centerId);
	showLabDetl(centerId);
	return true;
}
function loadLecForEdit1(centerId) {
	//$.alert.open(centerId);
	$("#viewLecDtl tbody").html("");
	if(centerId!="undefined" && centerId!=undefined)
		{
		
	var htmlStr="";
	$
	.ajax({
		type : "get",
		url : "eonlecgetLECForEdit?centerId="+centerId,
		cache : false,
		success : function(response) {
		
			 var strHtml="";
			  strHtml +="<tr><td><h4 style='color:#2C46CE;'>General </h4></td><td></td><td></td><td></td> </tr>"
				      +"<tr><td><label>LEC Name:</label></td><td>"+response.name+"</td><td><label>Center ID</label></td><td>"+centerId+"</td> </tr>"
					  +"<tr><td><label>Address 1:</label></td><td>"+response.address1+"</td><td><label>Country</label></td><td>"+response.country+"</td> </tr>"
					  +"<tr><td><label>City :</label></td><td>"+response.city+"</td><td><label>State</label></td><td>"+response.state+"</td> </tr>"
					 
					  
					  +"<tr><td><label>Google URL:</label></td><td>"+response.googleUrl+"</td><td><label>Pin </label></td><td>"+response.pin+"</td> </tr>"
					  +"<tr><td><label>Nearest Railway Station:</label></td><td>"+response.nearestRailwayStation+"</td><td><label>Distance</label></td><td>"+response.distanceFromRailwayStation+"</td> </tr>"
					  +"<tr><td><label>Nearest Airport :</label></td><td>"+response.nearestAirport+"</td><td><label>Distance</label></td><td>"+response.distanceFromAirport+"</td> </tr>"
					 
					  
					 
//					  +"<tr><td>Police Station Contact No:</td><td>"phoneNoPS+"</td><td></td><td></td> </tr>"
//					  
//					  +"<tr><td><h3>Contract Person</h3></td><td></td><td></td><td></td> </tr>"
					  
					  
					  +"<tr><td><label>Head Name:</label></td><td>"+response.headName+"</td><td><label>Coordinator Name:</label></td><td>"+response.cordinator+"</td> </tr>"
					  +"<tr><td><label>Designation:</label></td><td>"+response.headDesignation+"</td><td><label>Designation</label></td><td>"+response.cordinatorDesigntion+"</td> </tr>"
					  +"<tr><td><label>Mobile:</label></td><td>"+response.headMobile+"</td><td><label>Mobile</label></td><td>"+response.cordinatorMobile+"</td> </tr>"
					 
					  +"<tr><td><label>Email :</label></td><td>"+response.headEmailID+"</td><td><label>Email</label></td><td>"+response.cordinatorEmail+"</td> </tr>"
					
					 
//					  +"<tr><td><h3>Other Detail</h3></td><td></td><td></td><td></td> </tr>"
//					  +"<tr><td><h5>Other Detail 1</h5></td><td></td><td></td><td></td> </tr>"
					  
					  +"<tr><td><label>No OF Labs:</label></td><td>"+response.noOfLabs+"</td><td><label>Number Of Building</label></td><td>"+response.noOfBuilding+"</td> </tr>"
					  +"<tr><td><label>Total Computers:</label></td><td>"+response.totalComputers+"</td><td><label>Number Of Floors Covered:</label> </td><td>"+response.noOfFloorsCovered+"</td> </tr>"
					  +"<tr><td><label>Total Usable Computers:</label></td><td>"+response.totalUsableComputers+"</td><td><label>Number OF Entrance Gate:</label></td><td>"+response.noOfEntranceGate+"</td> </tr>"
					  +"<tr><td><label>Date Of MOU:</label></td><td>"+response.dateOfMOU+"</td><td><label>MOU Valid Till:</label></td><td>"+response.mOUValidTill+"</td> </tr>"
				
					  +"<tr><td><label>Date Of Last Inspections:</label></td><td>"+response.dateOfLastInspection+"</td><td><label>Approachability</label></td><td>"+response.approachability+"</td> </tr>"
					  +"<tr><td><label>No Of Web Cam Available:</label></td><td>"+response.noOfWebCamera+"</td><td><label>No Of Biometric Device Available</label> </td><td>"+response.noOfBiometricDevice+"</td> </tr>"
//					  +"<tr><td>No Of LAN:</td><td>"+document.form1.noOfLAN.value+"</td><td>Fuel Required Per Hour:</td><td>"+document.form1.fuelRequiredPerHour.value+"</td> </tr>"
//					  +"<tr><td>Network Topology:</td><td>"+$("#networkTopology option:selected").text()+"</td><td>LAN Speed:</td><td>"+document.form1.lANspeed.value+"</td> </tr>"
//					 
//					  
//					  
//					  +"<tr><td>Network Cable Status:</td><td>"+$("#networkCableStatus option:selected").text()+"</td><td>Alert Message Status</td><td>"+document.form1.alertMessage.value+"</td> </tr>"
//					  +"<tr><td>Power Supply Status:</td><td>"+$("#powerSupplyStatus option:selected").text()+"</td><td>Generator Capacity </td><td>"+document.form1.generatorCapacity.value+"</td> </tr>"
//					  +"<tr><td>UPS Capacity:</td><td>"+document.form1.uPsCapacity.value+"</td><td>UPS Backup Timer</td><td>"+document.form1.uPSBackupTime.value+"</td> </tr>"
//					  +"<tr><td>Center Approved By:</td><td>"+document.form1.centreApprovedBy.value+"</td><td>Center Details Updated By</td><td>"+document.form1.centreDetailUpdatedBy.value+"</td> </tr>"
//					  +"<tr><td>Remarks:</td><td>"+document.form1.remarks.value+"</td><td></td><td></td> </tr>"
//					  
//					  +"<tr><td><h5>Other Detail 2</h5></td><td></td><td></td><td></td> </tr>"
//					  
//					  
//					  +"<tr><td>IS Wired Internet :</td><td>"+$("#wiredInternet").prop('checked')+"</td><td>IS CCTV Available </td><td>"+$("#cCTVAvailable").prop('checked')+"</td> </tr>"
//					  +"<tr><td>Is Wireless Internet :</td><td>"+$("#wirelessInternet").prop('checked')+"</td><td>Is CCTV Can Be Used</td><td>"+$("#cCTVcanBeUsed").prop('checked')+"</td> </tr>"
//					  +"<tr><td>Is WiFi :</td><td>"+$("#wiFi").prop('checked')+"</td><td>Is Clock Room on Entrance </td><td>"+$("#clockRoomOnEntrance").prop('checked')+"</td> </tr>"
//					  +"<tr><td>Is LAN :</td><td>"+$("#lAN").prop('checked')+"</td><td>Is Web Cam Available :</td><td>"+$("#webCameraAtCentre").prop('checked')+"</td> </tr>"
//					  
//					  
//					  
//					  +"<tr><td>Is Mobile Jammer Available  :</td><td>"+$("#mobileJammerAvailable").prop('checked')+"</td><td>Is External Biometric Device Available</td><td>"+$("#bioemetricDeviceAtCentre").prop('checked')+"</td> </tr>"
//					  +"<tr><td>Is Partitioning of Computers :</td><td>"+$("#partitioningOfComputers").prop('checked')+"</td><td>Is Display Board Available</td><td>"+$("#displayBoards").prop('checked')+"</td> </tr>"
//					  +"<tr><td>Is UPS Available  :</td><td>"+$("#uPSavailable").prop('checked')+"</td><td>Is Generator Available</td><td>"+$("#generatorAvailable").prop('checked')+"</td> </tr>"
//					  +"<tr><td>Is Canteen Available :</td><td>"+$("#canteen").prop('checked')+"</td><td>Is Fire Extinguisher Available</td><td>"+$("#fireExtinguisher").prop('checked')+"</td> </tr>"
//					  
//					  +"<tr><td>Is Ready For Exam  :</td><td>"+$("#readyForExam").prop('checked')+"</td><td>Is Disable Friendly </td><td>"+$("#disableFriendly").prop('checked')+"</td> </tr>"
//					  +"<tr><td>Is Sufficient Parking Space  :</td><td>"+$("#sufficientParkingSpace").prop('checked')+"</td><td>Is Sufficient Toilets </td><td>"+$("#sufficientToilets").prop('checked')+"</td> </tr>"
//					  +"<tr><td>Is Waiting Area For Students :</td><td>"+$("#waitingAreaForStudents").prop('checked')+"</td><td>Is Waiting Area For Guardians</td><td>"+$("#waitingAreaForGuardian").prop('checked')+"</td> </tr>"
//					  +"<tr><td>Is Management Responsive :</td><td>"+$("#managementResponsive").prop('checked')+"</td><td>Is Detailed Inspection Report Available</td><td>"+$("#detailedInspectionReportAvailable").prop('checked')+"</td> </tr>"
//					  +"<tr><td>Is External Audit Report Available :</td><td>"+$("#externalAuditReportAvailable").prop('checked')+"</td><td></td><td></td> </tr>"
					  
				 		 ;
					  $("#viewLecDtl").append(strHtml);
			
		},
		error : function() {
			
			$.alert.open('Error while load LEC');
		}
	});
		}
}


/*function displayAllLecAfterSuccess(response){

	var lecStr = "<option value=-1>All</option>";
	// for LEC Approval
	$('#centerApp').html(lecStr);
	$("#lecApprovalId").html("");
//	$("#lecApprovalId")
//			.append(
//					"<thead ><tr><th>S. No </th><th>Center Name </th><th>City</th><th>Total No of Computer</th><th>View Infra</th><th align='center'>Rating</th><th>Status</th><th>Action</th></tr></thead>");
	for (var i = 0; i < response.length; i++) {
		
		var status="";
		
		var rt= Math.round((response[i].rating / 5)*100);//rate
		
		if(response[i].status==1){
			status="Approved";
		}
		else{
			status="Not Approved";
		}

		lecStr += "<option value=" + response[i].centreId + ">"
				+ response[i].name + "</option>";

		$("#lecApprovalId")
				.append("<tr align='center'>");
		$("#lecApprovalId").append(
				"<td>" + (i + 1) + "." + "</td>");
		$("#lecApprovalId").append(
				"<td>" + response[i].name + "</td>");
		$("#lecApprovalId").append(
				"<td>" + $('#cityApp option:selected').text()
						+ "</td>");
		$("#lecApprovalId").append(
				"<td>" + response[i].totalComputers + "</td>");
		$("#lecApprovalId")
				.append(
						"<td align='center'><a href='#infraModal' onclick='return getLecIdForView("
							+ i
							+ ","
							+ response[i].status
							+","
							+ response[i].centreId
							+ ")'; data-toggle='modal'><span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span></a></td>");
		$("#lecApprovalId")
						.append(
						"<td align='center'><div class='rating-container rating-gly-star' data-content=''><div class='rating-stars' data-content=''  style='width: "+rt+"%';></div></div></td>");//rate
		$("#lecApprovalId").append(
				"<td>" + status + "</td>");
		
		if(response[i].status==1){
			$("#lecApprovalId")
			.append(
					"<td> <a data-toggle='modal'><span class='glyphicon glyphicon-ok-circle' aria-hidden='true'></span></a></td></tr></tbody>");
			
		}
		else{
			$("#lecApprovalId")
			.append(
					"<td> <a href='#myModal'  onclick='return getLecId("
							+ i
							+ ",\""
							+ response[i].name
							+ "\","
							+ response[i].totalComputers
							+","
							+ response[i].centreId
							+ ")'; data-toggle='modal'><span class='glyphicon glyphicon-remove-sign' aria-hidden='true'></span></a></td></tr>");
			
		}
		

	}
	$('#centerApp').html(lecStr);

}*/

function displayLecGridAfterSuccess(response){
	$("#lecApprovalId").html("");
//	$("#lecApprovalId")
//			.append(
//					"<thead><tr><th>S. No </th><th>Center Name </th><th>City</th><th>Total No of Computer</th><th>View Infra</th><th>Rating</th><th>Status</th><th>Action</th></tr></thead>");
	for (var i = 0; i < response.length; i++) {
		var status="";
		var rt= Math.round((response[i].rating / 5)*100);//rate
		if(response[i].status==1){
			status="Approved";
		}
		else{
			status="Not Approved";
		}
		
		$("#lecApprovalId").append("<tr align='center'>");
		$("#lecApprovalId").append("<td>" + (i + 1) + "." + "</td>");
		$("#lecApprovalId").append("<td>" + response[i].name + "</td>");
		$("#lecApprovalId").append("<td>" + $('#cityApp option:selected').text()+ "</td>");
		$("#lecApprovalId").append("<td>" + response[i].totalComputers + "</td>");
		$("#lecApprovalId")
		.append(
				"<td><a href='#infraModal' onclick='return getLecIdForView("
					+ i
					+ ","
					+ response[i].status
					+","
					+ response[i].centreId+ ")'; data-toggle='modal'><span class='glyphicon glyphicon-eye-open' aria-hidden='true'></span></a></td>");
		$("#lecApprovalId").append("<td align='center'><div class='rating-container rating-gly-star' data-content=''><div class='rating-stars' data-content=''  style='width: "+rt+"%';></div></div></td>");//rate
		$("#lecApprovalId").append("<td>" + status + "</td>");
		
		if(response[i].status==1){
			$("#lecApprovalId")
			.append(
					"<td> <a data-toggle='modal'><span class='glyphicon glyphicon-ok-circle' aria-hidden='true'></span></a></td></tr>");
			
		}
		else{
			$("#lecApprovalId")
			.append(
					"<td> <a href='#myModal'  onclick='return getLecId("
							+ i
							+ ",\""
							+ response[i].name
							+ "\","
							+ response[i].totalComputers
							+","
							+ response[i].centreId
							+ ")'; data-toggle='modal'><span class='glyphicon glyphicon-remove-sign' aria-hidden='true'></span></a></td></tr></tbody>");			
		}
		}
}

function loadParticularLec() {
	blockU();
	var lecId =$('#centerApp').val() ;

	if(lecId!=-1){
	
	$
			.ajax({
				type : "get",
				url : "eonloadparticularLec?lecId=" + lecId,
				cache : false,
				success : function(response) {
					unblockU("");
					displayLecGridAfterSuccess(response);
				},
				error : function() {
					$.alert.open('Error while load city');
				}
			});
	}
	else{
		unblockU("");
		loadLecForApproval();
	}
	
}

function approveLec() {

	var rating=$('#input-id').val();
	var remarks=$('#remarks').val();
	if(confirm("You are going to approve the selected Lec, Are you sure?")){
		
	
	$.ajax({
		type : "get",
		url : "eonapproveLec?lecId="+popUpCenterId+"&rating="+rating+"&remarks="+remarks,
		cache : false,
		success : function(response) {
			
			
					 if(response[0].headPhone=="#")
						{
						$.alert.open(response[0].name);
						return false;
						}
                      if($('#stateApp').val()!=-1 && $('#cityApp').val()!=-1 && $('#centerApp').val()!=-1){
                    	  loadParticularLec();
                      } 
                      else if($('#stateApp').val()!=-1 && $('#cityApp').val()!=-1 && $('#centerApp').val()==-1){
                    	  loadLecForApproval();
                      }
					},
					
		error : function() {
			$.alert.open('Error while load city');
		}
	});
	}

}
function filterAllLecOnType(cityId,typeId){
	
	$
	.ajax({
		type : "get",
		url : "eongetAllLecOnType?cityId="+cityId+"&typeId="+typeId,
		cache : false,
		success : function(response) {
			displayLecGridAfterSuccess(response);
		},
		error : function() {
			$.alert.open('Error while load city');
		}
	});

}

function filterParticularLecOnType(lecId,typeId){
	
	$
	.ajax({
		type : "get",
		url : "eongetParticularLecOnType?lecId="+lecId+"&typeId="+typeId,
		cache : false,
		success : function(response) {
			displayLecGridAfterSuccess(response);
		},
		error : function() {
			$.alert.open('Error while load city');
		}
	});
}

function filterLec(){
	
	var lecId =$('#centerApp').val() ;
	var cityId = $('#cityApp').val();
	var typeId=$('#typeApp').val();
	
	if(typeId!=-1){
		if(lecId!=-1){
			filterParticularLecOnType(lecId,typeId);
		}
		else{
			filterAllLecOnType(cityId,typeId);
			}
	}
	else
		{
		loadLecForApproval();
		}
	}

function showLabDetl(centreId){

	$("#viewLabDtl tbody").html("");
	var htmlStr = "<tr> <th>Lab No</th><th>Lab ID</th><th>Lab Name</th><th>Total Computer</th><th>Usable Computer</th><th>Block</th><th>Floor</th><th>No of Rows</th><th>No of Computer in Each Row</th> </tr>";

	$
			.ajax({
				type : "get",
				url : "eonlecGetNoOfLabs?centreId=" + centreId,
				cache : false,
				success : function(response) {

						$("#viewLabDtl").append(htmlStr);
						for (var i = 0; i < response.length; i++) {

							var htmlStrr = "<tr><td><input type='hidden' name='noOfLabs' value="
									+ noOfLabs
									+ "><input type='hidden' name='labcode' value="
									+ response[i].labcode
									+ "><input type='hidden' id='labId' name='labId' value="
									+ response[i].labId
									+ "><label name='labNo'>"
									+ response[i].labNo
									+ "</label><input type='hidden' name='labNo' value="
									+ response[i].labNo
									+ "> </td>"
									+ " <td><label name='labcode' >"
									+ response[i].labcode
									+ "</label></td>"
									+ "<td><input class='form-control' type='text' maxlength='20' onkeypress='return validateData(event,9)' name='labName' value="
									+ response[i].labName
									+ " readonly ></td>"
									+ "<td><input class='form-control' type='text' maxlength='3' onkeypress='return validateData(event,5)' name='totalComputer' id='totalComputer"
									+ i
									+ "' value="
									+ response[i].totalComputer
									+ " readonly></td>"
									+ "<td><input class='form-control' type='text' maxlength='3' onkeypress='return validateData(event,5)' name='totalUsableComputer' id='totalUsableComputer"
									+ i
									+ "'; value="
									+ response[i].totalUsableComputer
									+ " readonly></td>"
									+ "<td><input class='form-control' type='text' maxlength='2' onkeypress='return validateData(event,5)' name='block' id='block"
									+ i
									+ "' value="
									+ response[i].block
									+ " readonly></td>"
									+ "<td><input class='form-control' type='text' maxlength='2' onkeypress='return validateData(event,5)' name='floor' id='floor"
									+ i
									+ "' value="
									+ response[i].floor
									+ " readonly></td>"
									+ "<td><input class='form-control' type='text' maxlength='3' onkeypress='return validateData(event,5)' name='noOfRows' id='noOfRows"
									+ i
									+ "' value="
									+ response[i].noOfRows
									+ " readonly></td>"
									+ "<td><input class='form-control' type='text' maxlength='3' onkeypress='return validateData(event,5)' name='noOfComputerinRow' id='noOfComputerinRow"
									+ i
									+ "' value="
									+ response[i].noOfComputerinRow
									+ " readonly></td></tr>";
									

							$("#viewLabDtl").append(htmlStrr);
						}
				},
				error : function() {
					$.alert.open('Error while load NoOfLabs');
				}
			});

}