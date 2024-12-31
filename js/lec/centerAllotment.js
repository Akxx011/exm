var examId = $('#examId').val();
function loadSlot() {

	var slotStr = "<option value=-1>All</option>";

	for (var i = 0; i < 3; i++) {

		slotStr += "<option value=" + (i + 1) + ">Slot" + (i + 1) + "</option>";
	}

	$('#slotId').html(slotStr);
}

function loadStatus() {

	var statusStr = "<option value=-1>All</option>";

	statusStr += "<option value='0'>Not Available</option>";

	statusStr += "<option value='1'>Available</option>";
	$('#status').html(statusStr);
}

function loadAllotExamState() {

	var stateStr = "<option value=-1>All</option>";

	$.ajax({
		type : "get",
		url : "eongetExamState?examId=" + examId,
		cache : false,
		success : function(response) {

			for (var i = 0; i < response.length; i++) {

				stateStr += "<option value=" + response[i].stateId + ">"
						+ response[i].stateName + "</option>";
			}
			$('#stateId').html(stateStr);
		},
		error : function() {
			$.alert.open('Error while loading State');
		}
	});
}

function loadAllotExamCity() {

	var cityStr = "<option value=-1>All</option>";
	/*
	 * var examId=$('#examId').val(); if(examId=="-1") { return false; }
	 */
	$.ajax({
		type : "get",
		url : "eongetExamCity?examId=" + examId,
		cache : false,
		success : function(response) {

			for (var i = 0; i < response.length; i++) {

				// $.alert.open(response[i].stateId+"-"+response[i].cityId);
				cityStr += "<option value=" + response[i].cityId + ">"
						+ response[i].cityName + "</option>";
			}
			$('#cityId').html(cityStr);
		},
		error : function() {
			$.alert.open('Error while load loadAllotExamCity');
		}
	});
}

function loadAllotExamLec() {
	var lecStr = "<option value=-1>All</option>";
	/*
	 * var examId=$('#examId').val(); if(examId=="-1") { return false; }
	 */
	$.ajax({
		type : "get",
		url : "eononLoadGetMailedLec?examId=" + examId,
		cache : false,
		success : function(response) {
			for (var i = 0; i < response.length; i++) {

				lecStr += "<option value=" + response[i].centreId + ">"
						+ response[i].name + "</option>";
			}
			$('#lecId').html(lecStr);
		},
		error : function() {
			$.alert.open('Error while load loadAllotExamLec');
		}
	});
}

function onStateLoadCity(obj) {

	var cityStr = "<option value=-1>All</option>";
	var slotStr = "<option value=-1>All</option>";
	var stateId = obj.value;

	if (stateId != -1) {
		$
				.ajax({
					type : "get",
					url : "eongetExamCityOnState?examId=" + examId + "&stateId="
							+ stateId,
					cache : false,
					success : function(response) {

						for (var i = 0; i < response.length; i++) {

							cityStr += "<option value=" + response[i].cityId
									+ ">" + response[i].cityName + "</option>";
						}
						$('#cityId').html(cityStr);
						$('#slotId').html(slotStr);
					},
					error : function() {
						$.alert.open('Error while load onStateLoadCity');
					}
				});
	}
}

function onStateLoadLec(obj) {

	var lecStr = "<option value=-1>All</option>";
	var stateId = obj.value;// $('#stateId').val();
	var slotStr = "<option value=-1>All</option>";
	loadStatus();

	$("#lecAllotGrid tbody").html("");

	$
			.ajax({
				type : "get",
				url : "eononStateChangeGetMailedLec?examId=" + examId
						+ "&stateId=" + stateId,
				cache : false,
				success : function(response) {

					gridSize = response.length;
					// $('#lecAllotGrid').show();
					$('#lecAllotGrid').append("<tbody id='lecAllotGridBody'>");
					var k = 0;
					for (var i = 0; i < response.length; i++) {

						lecStr += "<option value=" + response[i].centreId + ">"
								+ response[i].name + "</option>";

						var stateValue = response[i].state;
						var cityValue = response[i].city;
						var state = $(
								"#stateId option[value=" + stateValue + "]")
								.text();
						var city = $("#cityId option[value=" + cityValue + "]")
								.text();
						for (var j = 0; j < response[i].lecExamSlotAllotMapList.length; j++) {
							k++;

							if (response[i].lecExamSlotAllotMapList[j].isCapAssign == 1) {

								if (response[i].lecExamSlotAllotMapList[j].isECBAllot == 1) {
									$('#lecAllotGrid')
											.append(
													"<tr style='background-color: #98D898;'><td>"
															+ k
															+ "</td><td>"
															+ state
															+ "</td><td>"
															+ city
															+ "</td><td>"
															+ response[i].name
															+ "</td><td>Slot-"
															+ (j + 1)
															+ "</td><td>"
															+ response[i].totalComputers
															+ "</td><td>"
															+ response[i].lecExamSlotAllotMapList[j].lECCAP
															+ "</td><td><input name=ecbAllotCap id=ecbAllotCap readonly  size=4 type=text onkeypress='return validateData(event,5)' maxlength=4 value='"
															+ response[i].lecExamSlotAllotMapList[j].eCBAllotCAP
															+ "'></td>"
															+ "<input name='lecSlotId' id='lecSlotId'  type='hidden' value='"
															+ response[i].lecExamSlotAllotMapList[j].lECSLOTID
															+ "'></td></tr>");
								} else {
									$('#lecAllotGrid')
											.append(
													"<tr><td>"
															+ k
															+ "</td><td>"
															+ state
															+ "</td><td>"
															+ city
															+ "</td><td>"
															+ response[i].name
															+ "</td><td>Slot-"
															+ (j + 1)
															+ "</td><td>"
															+ response[i].totalComputers
															+ "</td><td>"
															+ response[i].lecExamSlotAllotMapList[j].lECCAP
															+ "</td><td><input name=ecbAllotCap id=ecbAllotCap  size=4 type=text onkeypress='return validateData(event,5)' maxlength=4 value='"
															+ response[i].lecExamSlotAllotMapList[j].eCBAllotCAP
															+ "'></td>"
															+ "<input name='lecSlotId' id='lecSlotId'  type='hidden' value='"
															+ response[i].lecExamSlotAllotMapList[j].lECSLOTID
															+ "'></td></tr>");

								}
							} else {
								$('#lecAllotGrid')
										.append(
												"<tr style='background-color: gainsboro;'><td>"
														+ k
														+ "</td><td>"
														+ state
														+ "</td><td>"
														+ city
														+ "</td><td>"
														+ response[i].name
														+ "</td><td>Slot-"
														+ (j + 1)
														+ "</td><td>"
														+ response[i].totalComputers
														+ "</td><td>"
														+ response[i].lecExamSlotAllotMapList[j].lECCAP
														+ "</td><td><input name=ecbAllotCap id=ecbAllotCap readonly  size=4 type=text onkeypress='return validateData(event,5)' maxlength=4 value='"
														+ response[i].lecExamSlotAllotMapList[j].eCBAllotCAP
														+ "'></td>"
														+ "<input name='lecSlotId' id='lecSlotId'  type='hidden' value='"
														+ response[i].lecExamSlotAllotMapList[j].lECSLOTID
														+ "'></td></tr>");
							}

						}

					}
					$('#lecAllotGrid').append("</tbody>");
					$('#lecId').html(lecStr);
				},
				error : function() {
					$.alert.open('Error while load onStateLoadLec');
				}
			});

}

function onCityLoadLec(obj) {
	loadStatus();
	var lecStr = "<option value=-1>All</option>";
	var cityId = obj.value;
	var slotStr = "<option value=-1>All</option>";
	$("#lecAllotGrid tbody").html("");
	if (cityId != -1) {
		$
				.ajax({
					type : "get",
					url : "eononCityChangeGetMailedLec?examId=" + examId
							+ "&cityId=" + cityId,
					cache : false,
					success : function(response) {

						gridSize = response.length;
						// $('#lecAllotGrid').show();
						$('#lecAllotGrid').append(
								"<tbody id='lecAllotGridBody'>");
						var k = 0;
						for (var i = 0; i < response.length; i++) {

							lecStr += "<option value=" + response[i].centreId
									+ ">" + response[i].name + "</option>";

							var stateValue = response[i].state;
							var cityValue = response[i].city;
							var state = $(
									"#stateId option[value=" + stateValue + "]")
									.text();
							var city = $(
									"#cityId option[value=" + cityValue + "]")
									.text();
							for (var j = 0; j < response[i].lecExamSlotAllotMapList.length; j++) {
								k++;

								if (response[i].lecExamSlotAllotMapList[j].isCapAssign == 1) {

									if (response[i].lecExamSlotAllotMapList[j].isECBAllot == 1) {
										$('#lecAllotGrid')
												.append(
														"<tr style='background-color: #98D898;'><td>"
																+ k
																+ "</td><td>"
																+ state
																+ "</td><td>"
																+ city
																+ "</td><td>"
																+ response[i].name
																+ "</td><td>Slot-"
																+ (j + 1)
																+ "</td><td>"
																+ response[i].totalComputers
																+ "</td><td>"
																+ response[i].lecExamSlotAllotMapList[j].lECCAP
																+ "</td><td><input name=ecbAllotCap id=ecbAllotCap readonly  size=4 type=text onkeypress='return validateData(event,5)' maxlength=4 value='"
																+ response[i].lecExamSlotAllotMapList[j].eCBAllotCAP
																+ "'></td>"
																+ "<input name='lecSlotId' id='lecSlotId'  type='hidden' value='"
																+ response[i].lecExamSlotAllotMapList[j].lECSLOTID
																+ "'></td></tr>");
									} else {
										$('#lecAllotGrid')
												.append(
														"<tr><td>"
																+ k
																+ "</td><td>"
																+ state
																+ "</td><td>"
																+ city
																+ "</td><td>"
																+ response[i].name
																+ "</td><td>Slot-"
																+ (j + 1)
																+ "</td><td>"
																+ response[i].totalComputers
																+ "</td><td>"
																+ response[i].lecExamSlotAllotMapList[j].lECCAP
																+ "</td><td><input name=ecbAllotCap id=ecbAllotCap  size=4 type=text onkeypress='return validateData(event,5)' maxlength=4 value='"
																+ response[i].lecExamSlotAllotMapList[j].eCBAllotCAP
																+ "'></td>"
																+ "<input name='lecSlotId' id='lecSlotId'  type='hidden' value='"
																+ response[i].lecExamSlotAllotMapList[j].lECSLOTID
																+ "'></td></tr>");

									}
								} else {
									$('#lecAllotGrid')
											.append(
													"<tr style='background-color: gainsboro;'><td>"
															+ k
															+ "</td><td>"
															+ state
															+ "</td><td>"
															+ city
															+ "</td><td>"
															+ response[i].name
															+ "</td><td>Slot-"
															+ (j + 1)
															+ "</td><td>"
															+ response[i].totalComputers
															+ "</td><td>"
															+ response[i].lecExamSlotAllotMapList[j].lECCAP
															+ "</td><td><input name=ecbAllotCap id=ecbAllotCap readonly  size=4 type=text onkeypress='return validateData(event,5)' maxlength=4 value='"
															+ response[i].lecExamSlotAllotMapList[j].eCBAllotCAP
															+ "'></td>"
															+ "<input name='lecSlotId' id='lecSlotId'  type='hidden' value='"
															+ response[i].lecExamSlotAllotMapList[j].lECSLOTID
															+ "'></td></tr>");
								}

							}

						}
						$('#lecAllotGrid').append("</tbody>");
						$('#lecId').html(lecStr);
						$('#slotId').html(slotStr);
					},
					error : function() {
						$.alert.open('Error while load onCityLoadLec');
					}
				});
	}

}

function loadLecAllotmentGrid() {

	$("#lecAllotGrid tbody").html("");

	$
			.ajax({
				type : "get",
				url : "eononLoadPopulateLecAllotGrid?examId=" + examId,
				success : function(response) {
					// unblockU("");
					gridSize = response.length;
					$('#lecAllotGrid').show();
					$('#lecAllotGrid').append("<tbody id='lecAllotGridBody'>");
					var k = 0;
					for (var i = 0; i < response.length; i++) {

						var stateValue = response[i].state;
						var cityValue = response[i].city;
						var state = $(
								"#stateId option[value=" + stateValue + "]")
								.text();
						var city = $("#cityId option[value=" + cityValue + "]")
								.text();
						for (var j = 0; j < response[i].lecExamSlotAllotMapList.length; j++) {
							k++;

							if (response[i].lecExamSlotAllotMapList[j].isCapAssign == 1) {

								if (response[i].lecExamSlotAllotMapList[j].isECBAllot == 1) {
									$('#lecAllotGrid')
											.append(
													"<tr style='background-color: #98D898;'><td>"
															+ k
															+ "</td><td>"
															+ state
															+ "</td><td>"
															+ city
															+ "</td><td>"
															+ response[i].name
															+ "</td><td>Slot-"
															+ (j + 1)
															+ "</td><td>"
															+ response[i].totalComputers
															+ "</td><td>"
															+ response[i].lecExamSlotAllotMapList[j].lECCAP
															+ "</td><td><input name=ecbAllotCap id=ecbAllotCap readonly  size=4 type=text onkeypress='return validateData(event,5)' maxlength=4 value='"
															+ response[i].lecExamSlotAllotMapList[j].eCBAllotCAP
															+ "'></td>"
															+ "<input name='lecSlotId' id='lecSlotId'  type='hidden' value='"
															+ response[i].lecExamSlotAllotMapList[j].lECSLOTID
															+ "'></td></tr>");
								} else {
									$('#lecAllotGrid')
											.append(
													"<tr><td>"
															+ k
															+ "</td><td>"
															+ state
															+ "</td><td>"
															+ city
															+ "</td><td>"
															+ response[i].name
															+ "</td><td>Slot-"
															+ (j + 1)
															+ "</td><td>"
															+ response[i].totalComputers
															+ "</td><td>"
															+ response[i].lecExamSlotAllotMapList[j].lECCAP
															+ "</td><td><input name=ecbAllotCap id=ecbAllotCap  size=4 type=text onkeypress='return validateData(event,5)' maxlength=4 value='"
															+ response[i].lecExamSlotAllotMapList[j].eCBAllotCAP
															+ "'></td>"
															+ "<input name='lecSlotId' id='lecSlotId'  type='hidden' value='"
															+ response[i].lecExamSlotAllotMapList[j].lECSLOTID
															+ "'></td></tr>");

								}
							} else {
								$('#lecAllotGrid')
										.append(
												"<tr style='background-color: gainsboro;'><td>"
														+ k
														+ "</td><td>"
														+ state
														+ "</td><td>"
														+ city
														+ "</td><td>"
														+ response[i].name
														+ "</td><td>Slot-"
														+ (j + 1)
														+ "</td><td>"
														+ response[i].totalComputers
														+ "</td><td>"
														+ response[i].lecExamSlotAllotMapList[j].lECCAP
														+ "</td><td><input name=ecbAllotCap id=ecbAllotCap readonly  size=4 type=text onkeypress='return validateData(event,5)' maxlength=4 value='"
														+ response[i].lecExamSlotAllotMapList[j].eCBAllotCAP
														+ "'></td>"
														+ "<input name='lecSlotId' id='lecSlotId'  type='hidden' value='"
														+ response[i].lecExamSlotAllotMapList[j].lECSLOTID
														+ "'></td></tr>");
							}

						}

					}
					$('#lecAllotGrid').append("</tbody>");
				},
				error : function() {
					// unblockU("");
					$.alert.open('Data not found');
				}
			});
}

function onLecChangeLoadLecAllotmentGrid(obj) {
	loadStatus();
	$("#lecAllotGrid tbody").html("");
	var values = []; // array of lecId
	var lecIdStr = ""; // parameter string to be sent to the controller

	// this puts the lecId in an array eliminating -1
	$('#lecId option').each(function() {
		if ($(this).attr('value') != -1) {
			values.push($(this).attr('value'));
		}
	});

	if ($('#lecId').val() == -1) {
		// blockU();
		$
				.ajax({
					type : "get",
					url : "eononChangePopulateLecAllotGrid?examId=" + examId
							+ "&lecId=" + values,
					success : function(response) {
						// unblockU("");
						var k = 0;
						gridSize = response.length;
						$('#lecAllotGrid').show();
						$('#lecAllotGrid').append(
								"<tbody id='lecAllotGridBody'>");
						for (var i = 0; i < response.length; i++) {

							var stateValue = response[i].state;
							var cityValue = response[i].city;
							var state = $(
									"#stateId option[value=" + stateValue + "]")
									.text();
							var city = $(
									"#cityId option[value=" + cityValue + "]")
									.text();
							for (var j = 0; j < response[i].lecExamSlotAllotMapList.length; j++) {
								k++;

								if (response[i].lecExamSlotAllotMapList[j].isCapAssign == 1) {

									if (response[i].lecExamSlotAllotMapList[j].isECBAllot == 1) {
										$('#lecAllotGrid')
												.append(
														"<tr style='background-color: #98D898;'><td>"
																+ k
																+ "</td><td>"
																+ state
																+ "</td><td>"
																+ city
																+ "</td><td>"
																+ response[i].name
																+ "</td><td>Slot-"
																+ (j + 1)
																+ "</td><td>"
																+ response[i].totalComputers
																+ "</td><td>"
																+ response[i].lecExamSlotAllotMapList[j].lECCAP
																+ "</td><td><input name=ecbAllotCap id=ecbAllotCap readonly  size=4 type=text onkeypress='return validateData(event,5)' maxlength=4 value='"
																+ response[i].lecExamSlotAllotMapList[j].eCBAllotCAP
																+ "'></td>"
																+ "<input name='lecSlotId' id='lecSlotId'  type='hidden' value='"
																+ response[i].lecExamSlotAllotMapList[j].lECSLOTID
																+ "'></td></tr>");
									} else {
										$('#lecAllotGrid')
												.append(
														"<tr><td>"
																+ k
																+ "</td><td>"
																+ state
																+ "</td><td>"
																+ city
																+ "</td><td>"
																+ response[i].name
																+ "</td><td>Slot-"
																+ (j + 1)
																+ "</td><td>"
																+ response[i].totalComputers
																+ "</td><td>"
																+ response[i].lecExamSlotAllotMapList[j].lECCAP
																+ "</td><td><input name=ecbAllotCap id=ecbAllotCap  size=4 type=text onkeypress='return validateData(event,5)' maxlength=4 value='"
																+ response[i].lecExamSlotAllotMapList[j].eCBAllotCAP
																+ "'></td>"
																+ "<input name='lecSlotId' id='lecSlotId'  type='hidden' value='"
																+ response[i].lecExamSlotAllotMapList[j].lECSLOTID
																+ "'></td></tr>");

									}
								} else {
									$('#lecAllotGrid')
											.append(
													"<tr style='background-color: gainsboro;'><td>"
															+ k
															+ "</td><td>"
															+ state
															+ "</td><td>"
															+ city
															+ "</td><td>"
															+ response[i].name
															+ "</td><td>Slot-"
															+ (j + 1)
															+ "</td><td>"
															+ response[i].totalComputers
															+ "</td><td>"
															+ response[i].lecExamSlotAllotMapList[j].lECCAP
															+ "</td><td><input name=ecbAllotCap id=ecbAllotCap readonly  size=4 type=text onkeypress='return validateData(event,5)' maxlength=4 value='"
															+ response[i].lecExamSlotAllotMapList[j].eCBAllotCAP
															+ "'></td>"
															+ "<input name='lecSlotId' id='lecSlotId'  type='hidden' value='"
															+ response[i].lecExamSlotAllotMapList[j].lECSLOTID
															+ "'></td></tr>");
								}
							}

						}
						$('#lecAllotGrid').append("</tbody>");
					},
					error : function() {
						// unblockU("");
						$.alert.open('Data not found');
					}
				});
	} else {

		$
				.ajax({
					type : "get",
					url : "eononChangePopulateLecAllotGrid?examId=" + examId
							+ "&lecId=" + $('#lecId').val(),
					success : function(response) {
						var k = 0;
						$('#lecAllotGrid').append(
								"<tbody id='lecAllotGridBody'>");
						for (var i = 0; i < response.length; i++) {

							var stateValue = response[i].state;
							var cityValue = response[i].city;
							var state = $(
									"#stateId option[value=" + stateValue + "]")
									.text();
							var city = $(
									"#cityId option[value=" + cityValue + "]")
									.text();
							for (var j = 0; j < response[i].lecExamSlotAllotMapList.length; j++) {
								k++;
								if (response[i].lecExamSlotAllotMapList[j].isCapAssign == 1) {

									if (response[i].lecExamSlotAllotMapList[j].isECBAllot == 1) {
										$('#lecAllotGrid')
												.append(
														"<tr style='background-color: #98D898;'><td>"
																+ k
																+ "</td><td>"
																+ state
																+ "</td><td>"
																+ city
																+ "</td><td>"
																+ response[i].name
																+ "</td><td>Slot-"
																+ (j + 1)
																+ "</td><td>"
																+ response[i].totalComputers
																+ "</td><td>"
																+ response[i].lecExamSlotAllotMapList[j].lECCAP
																+ "</td><td><input name=ecbAllotCap id=ecbAllotCap readonly  size=4 type=text onkeypress='return validateData(event,5)' maxlength=4 value='"
																+ response[i].lecExamSlotAllotMapList[j].eCBAllotCAP
																+ "'></td>"
																+ "<input name='lecSlotId' id='lecSlotId'  type='hidden' value='"
																+ response[i].lecExamSlotAllotMapList[j].lECSLOTID
																+ "'></td></tr>");
									} else {
										$('#lecAllotGrid')
												.append(
														"<tr><td>"
																+ k
																+ "</td><td>"
																+ state
																+ "</td><td>"
																+ city
																+ "</td><td>"
																+ response[i].name
																+ "</td><td>Slot-"
																+ (j + 1)
																+ "</td><td>"
																+ response[i].totalComputers
																+ "</td><td>"
																+ response[i].lecExamSlotAllotMapList[j].lECCAP
																+ "</td><td><input name=ecbAllotCap id=ecbAllotCap  size=4 type=text onkeypress='return validateData(event,5)' maxlength=4 value='"
																+ response[i].lecExamSlotAllotMapList[j].eCBAllotCAP
																+ "'></td>"
																+ "<input name='lecSlotId' id='lecSlotId'  type='hidden' value='"
																+ response[i].lecExamSlotAllotMapList[j].lECSLOTID
																+ "'></td></tr>");

									}
								} else {
									$('#lecAllotGrid')
											.append(
													"<tr style='background-color: gainsboro;'><td>"
															+ k
															+ "</td><td>"
															+ state
															+ "</td><td>"
															+ city
															+ "</td><td>"
															+ response[i].name
															+ "</td><td>Slot-"
															+ (j + 1)
															+ "</td><td>"
															+ response[i].totalComputers
															+ "</td><td>"
															+ response[i].lecExamSlotAllotMapList[j].lECCAP
															+ "</td><td><input name=ecbAllotCap id=ecbAllotCap readonly  size=4 type=text onkeypress='return validateData(event,5)' maxlength=4 value='"
															+ response[i].lecExamSlotAllotMapList[j].eCBAllotCAP
															+ "'></td>"
															+ "<input name='lecSlotId' id='lecSlotId'  type='hidden' value='"
															+ response[i].lecExamSlotAllotMapList[j].lECSLOTID
															+ "'></td></tr>");
								}
							}

						}
						$('#lecAllotGrid').append("</tbody>");

					},
					error : function() {
						// unblockU("");
						$.alert.open('Data not found');
					}
				});
	}

}
function updateEcbAllotment() {
	if (!confirm("Are you sure? You are going to save the alloted capacity")) {
		return false;
	}

	$
			.ajax({
				type : $("#frmSave").attr('method'),
				url : $("#frmSave").attr('action'),
				data : $("#frmSave").serialize(),
				success : function(response) {

					onStatusLoadGrid();
					$.alert.open("You have successfully saved the capacity for the Lec , If you want to confirm the capacity then click on confirm button");
					$("#tblExamSAllDtl").html("");
					$("#tblSAllDtl").html("");

					loadExamLec('this');
				},
				error : function() {
					$.alert.open('Data not saved');
				}
			});

}

function ConfirmEcbAllotment() {
	if (!confirm("Are you sure? You want to confirm the Lec allotment and send the acknowledgment mail for alloted Lec")) {
		return false;
	}

	$
			.ajax({
				type : $("#frmSave").attr('method'),
				url : "eonConfirmEcbAllotment",
				data : $("#frmSave").serialize() + "&examId=" + examId,
				success : function(response) {

					onStatusLoadGrid();
					$.alert.open("You have alloted the capacity for the Lec and an acknowledgment mail has been sent to the alloted LECs succesfully");
					$("#tblExamSAllDtl").html("");
					$("#tblSAllDtl").html("");

					loadExamLec('this');
				},
				error : function() {
					$.alert.open('Data not saved');
				}
			});

}

function onStatusLoadGrid() {

	$("#lecAllotGrid tbody").html("");
	var values = []; // array of lecId
	var lecIdStr = ""; // parameter string to be sent to the controller

	// this puts the lecId in an array eliminating -1
	$('#lecId option').each(function() {
		if ($(this).attr('value') != -1) {
			values.push($(this).attr('value'));
		}
	});

	if ($('#lecId').val() == -1) {
		$
				.ajax({
					type : "get",
					url : "eononStatusLoadAllotGrid?examId=" + examId + "&lecId="
							+ values + "&status=" + $('#status').val(),
					success : function(response) {
						var k = 0;
						gridSize = response.length;
						$('#lecAllotGrid').append(
								"<tbody id='lecAllotGridBody'>");
						for (var i = 0; i < response.length; i++) {

							var stateValue = response[i].state;
							var cityValue = response[i].city;
							var state = $(
									"#stateId option[value=" + stateValue + "]")
									.text();
							var city = $(
									"#cityId option[value=" + cityValue + "]")
									.text();

							for (var j = 0; j < response[i].lecExamSlotAllotMapList.length; j++) {
								k++;

								if (response[i].lecExamSlotAllotMapList[j].isCapAssign == 1) {

									if (response[i].lecExamSlotAllotMapList[j].isECBAllot == 1) {
										$('#lecAllotGrid')
												.append(
														"<tr style='background-color: #98D898;'><td>"
																+ k
																+ "</td><td>"
																+ state
																+ "</td><td>"
																+ city
																+ "</td><td>"
																+ response[i].name
																+ "</td><td>Slot-"
																+ (j + 1)
																+ "</td><td>"
																+ response[i].totalComputers
																+ "</td><td>"
																+ response[i].lecExamSlotAllotMapList[j].lECCAP
																+ "</td><td><input name=ecbAllotCap id=ecbAllotCap readonly  size=4 type=text onkeypress='return validateData(event,5)' maxlength=4 value='"
																+ response[i].lecExamSlotAllotMapList[j].eCBAllotCAP
																+ "'></td>"
																+ "<input name='lecSlotId' id='lecSlotId'  type='hidden' value='"
																+ response[i].lecExamSlotAllotMapList[j].lECSLOTID
																+ "'></td></tr>");
									} else {
										$('#lecAllotGrid')
												.append(
														"<tr><td>"
																+ k
																+ "</td><td>"
																+ state
																+ "</td><td>"
																+ city
																+ "</td><td>"
																+ response[i].name
																+ "</td><td>Slot-"
																+ (j + 1)
																+ "</td><td>"
																+ response[i].totalComputers
																+ "</td><td>"
																+ response[i].lecExamSlotAllotMapList[j].lECCAP
																+ "</td><td><input name=ecbAllotCap id=ecbAllotCap  size=4 type=text onkeypress='return validateData(event,5)' maxlength=4 value='"
																+ response[i].lecExamSlotAllotMapList[j].eCBAllotCAP
																+ "'></td>"
																+ "<input name='lecSlotId' id='lecSlotId'  type='hidden' value='"
																+ response[i].lecExamSlotAllotMapList[j].lECSLOTID
																+ "'></td></tr>");

									}
								} else {
									$('#lecAllotGrid')
											.append(
													"<tr style='background-color: gainsboro;'><td>"
															+ k
															+ "</td><td>"
															+ state
															+ "</td><td>"
															+ city
															+ "</td><td>"
															+ response[i].name
															+ "</td><td>Slot-"
															+ (j + 1)
															+ "</td><td>"
															+ response[i].totalComputers
															+ "</td><td>"
															+ response[i].lecExamSlotAllotMapList[j].lECCAP
															+ "</td><td><input name=ecbAllotCap id=ecbAllotCap readonly  size=4 type=text onkeypress='return validateData(event,5)' maxlength=4 value='"
															+ response[i].lecExamSlotAllotMapList[j].eCBAllotCAP
															+ "'></td>"
															+ "<input name='lecSlotId' id='lecSlotId'  type='hidden' value='"
															+ response[i].lecExamSlotAllotMapList[j].lECSLOTID
															+ "'></td></tr>");
								}
							}

						}
						$('#lecAllotGrid').append("</tbody>");
					},
					error : function() {
						$.alert.open('Data not found');
					}
				});
	} else {

		$
				.ajax({
					type : "get",
					url : "eononStatusLoadAllotGrid?examId=" + examId + "&lecId="
							+ $('#lecId').val() + "&status="
							+ $('#status').val(),
					success : function(response) {

						$('#lecAllotGrid').append(
								"<tbody id='lecAllotGridBody'>");
						var k = 0;
						for (var i = 0; i < response.length; i++) {

							var stateValue = response[i].state;
							var cityValue = response[i].city;
							var state = $(
									"#stateId option[value=" + stateValue + "]")
									.text();
							var city = $(
									"#cityId option[value=" + cityValue + "]")
									.text();
							for (var j = 0; j < response[i].lecExamSlotAllotMapList.length; j++) {
								k++;
								if (response[i].lecExamSlotAllotMapList[j].isCapAssign == 1) {

									if (response[i].lecExamSlotAllotMapList[j].isECBAllot == 1) {
										$('#lecAllotGrid')
												.append(
														"<tr style='background-color: #98D898;'><td>"
																+ k
																+ "</td><td>"
																+ state
																+ "</td><td>"
																+ city
																+ "</td><td>"
																+ response[i].name
																+ "</td><td>Slot-"
																+ (j + 1)
																+ "</td><td>"
																+ response[i].totalComputers
																+ "</td><td>"
																+ response[i].lecExamSlotAllotMapList[j].lECCAP
																+ "</td><td><input name=ecbAllotCap id=ecbAllotCap readonly  size=4 type=text onkeypress='return validateData(event,5)' maxlength=4 value='"
																+ response[i].lecExamSlotAllotMapList[j].eCBAllotCAP
																+ "'></td>"
																+ "<input name='lecSlotId' id='lecSlotId'  type='hidden' value='"
																+ response[i].lecExamSlotAllotMapList[j].lECSLOTID
																+ "'></td></tr>");
									} else {
										$('#lecAllotGrid')
												.append(
														"<tr><td>"
																+ k
																+ "</td><td>"
																+ state
																+ "</td><td>"
																+ city
																+ "</td><td>"
																+ response[i].name
																+ "</td><td>Slot-"
																+ (j + 1)
																+ "</td><td>"
																+ response[i].totalComputers
																+ "</td><td>"
																+ response[i].lecExamSlotAllotMapList[j].lECCAP
																+ "</td><td><input name=ecbAllotCap id=ecbAllotCap  size=4 type=text onkeypress='return validateData(event,5)' maxlength=4 value='"
																+ response[i].lecExamSlotAllotMapList[j].eCBAllotCAP
																+ "'></td>"
																+ "<input name='lecSlotId' id='lecSlotId'  type='hidden' value='"
																+ response[i].lecExamSlotAllotMapList[j].lECSLOTID
																+ "'></td></tr>");

									}
								} else {
									$('#lecAllotGrid')
											.append(
													"<tr style='background-color: gainsboro;'><td>"
															+ k
															+ "</td><td>"
															+ state
															+ "</td><td>"
															+ city
															+ "</td><td>"
															+ response[i].name
															+ "</td><td>Slot-"
															+ (j + 1)
															+ "</td><td>"
															+ response[i].totalComputers
															+ "</td><td>"
															+ response[i].lecExamSlotAllotMapList[j].lECCAP
															+ "</td><td><input name=ecbAllotCap id=ecbAllotCap readonly  size=4 type=text onkeypress='return validateData(event,5)' maxlength=4 value='"
															+ response[i].lecExamSlotAllotMapList[j].eCBAllotCAP
															+ "'></td>"
															+ "<input name='lecSlotId' id='lecSlotId'  type='hidden' value='"
															+ response[i].lecExamSlotAllotMapList[j].lECSLOTID
															+ "'></td></tr>");
								}
							}

						}
						$('#lecAllotGrid').append("</tbody>");

					},
					error : function() {
						$.alert.open('Data not found');
					}
				});
	}

}

function bulkAllotmentReminderMail() {
	if (!confirm("Are you sure? You want to send reminder mail to all the alloted LEC once again")) {
		return false;
	}

	$
			.ajax({
				type : "get",
				url : "eonbulkAllotmentReminderMail?examId=" + $("#examId").val(),
				success : function(response) {

					$.alert.open("An acknowledgment mail has been sent to all the LECs succesfully");

				},
				error : function() {
					$.alert.open('Mailed not sent');
				}
			});
}
