
function loadEcbType() {
	$.ajax({
		type : "get",
		url : "eonLoadEcbType",
		cache : false,
		data : 'ecbType=ECB',
		success : function(response) {
			var str = "<option value='-1'>Select ECB Type</option>";
			for (var i = 0; i < response.length; i++) {

				str += "<option value=" + response[i].listSrl + ">"
						+ response[i].listItemValue + "</option>";
			}
			$('#ecbType').html(str);
			$('#EonAddNewEcbUser').html("");
		},
		error : function() {	
			$.alert.open('Error while request..');
		}
	});

}
function loadEcbUser(obj) {
	blockU();
	$('#table').bootstrapTable('showLoading');  
	$
			.ajax({
				type : "get",
				url : "eonLoadEbcUser?ecbType="
						+ document.forms[0].ecbType.value + "&ecbName="
						+ document.forms[0].ecbName.value,
				cache : false,
				data : '',
				success : function(response) {
					unblockU("");
					$('#table').bootstrapTable('hideLoading');
		 			$('#notification').hide();  
		 			$('#table').bootstrapTable('load', response);  
					/*var str = "";
					for (var i = 0; i < response.length; i++) {
						str += "<tr>";
						str += "<td>" + (parseInt(i) + 1) + "</td>";
						str += "<td>" + response[i].name + "</td>";
						str += "<td>" + response[i].userName + "</td>";
						str += "<td><a><span class='glyphicon glyphicon-pencil' aria-hidden='true'></span></a></td>";
						str += "<td><a href='#'><span onclick=deleteUser("
								+ response[i].userId
								+ ",'"+response[i].userName+"'); class='glyphicon glyphicon-remove-sign' aria-hidden='true' style='color: red;'></span></a></td>"
						str += "</tr>";
					}
					$('#EonAddNewEcbUser').html(str);*/
				},
				error : function() {
					unblockU("");
					$.alert.open('Error while request..');
					$('#table').bootstrapTable('hideLoading');
		 			$('#notification').hide();
				}
			});
}

function loadEcbUserReset() {
	blockU();
	//$.alert.open('loadEcbUserReset');
	$('#tableR').bootstrapTable('showLoading'); 
	$
			.ajax({
				type : "get",
				url : "eonLoadEbcUser?ecbType="
						+ document.forms[0].ecbType.value + "&ecbName="
						+ document.forms[0].ecbName.value,
				cache : false,
				data : '',
				success : function(response) {
					unblockU("");
					$('#tableR').bootstrapTable('hideLoading');
		 			$('#notification').hide();  
		 			$('#tableR').bootstrapTable('load', response);  
					/*var str = "";
					for (var i = 0; i < response.length; i++) {
						str += "<tr>";
						str += "<td>" + (parseInt(i) + 1) + "</td>";
						str += "<td>" + response[i].name + "</td>";
						str += "<td>" + response[i].userName + "</td>";
						str += "<td><a href='#'><span onclick='resetPasward("
								+ response[i].userId
								+ ");' class='glyphicon glyphicon-pencil' aria-hidden='true'></span></a></td>";
						// str+="<td><a><span class='glyphicon
						// glyphicon-remove-sign' aria-hidden='true'
						// style='color: red;'></span></a></td>"
						str += "</tr>";
					}
					$('#EonAddNewEcbUser').html(str);*/
				},
				error : function() {
					unblockU("");
					$.alert.open('Error while request..');
					$('#tableR').bootstrapTable('hideLoading');
		 			$('#notification').hide();  
				}
			});
}

function loadDefaultUser() {
	$.ajax({
		type : "get",
		url : "eonLoadEbcDefaultUser",
		cache : false,
		data : '',
		success : function(response) {
			var str = "<option value='-1'>Select</option>";
			for (var i = 0; i < response.length; i++) {
				str += "<option value=" + response[i].defaultUserId + ">"
						+ response[i].defaultUserType + "</option>";
			}
			$('#defaultUsetId').html(str);
		},
		error : function() {
			$.alert.open('Error while request..');
		}
	});
}
function loadEcbName(obj) {
	blockU();
	$('#EonAddNewEcbUser').html("");
	$.ajax({
		type : "get",
		url : "eongetActiveEcbName?ecbType=" + obj.value,
		cache : false,
		data : '',
		success : function(response) {
			unblockU("");
			var str = "<option value='-1'>Select ECB Name</option>";
			for (var i = 0; i < response.length; i++) {
				str += "<option value=" + response[i].ecbId + ">"
						+ response[i].ecbName + "</option>";
			}
			$('#ecbName').html(str);
		},
		error : function() {
			unblockU("");
			$.alert.open('Error while request..');
		}
	});
}
function loadNewUsers(obj) {
	$.ajax({
		type : "get",
		url : "loadNewUser?roleId=" + obj.value + "&ecbId="
				+ document.forms[0].ecbName.value + "&ecbType="
				+ document.forms[0].ecbType.value,
		cache : false,
		data : '',
		success : function(response) {
			if(response==null || response=="")
				{
					$('#userName').html("");
					$('#password').html("");
				}
			else
				{
					$('#userName').html(response[0].userName);
					$('#password').html("**********");
					
				}
		},
		error : function() {
			$.alert.open('Error while request..');
		}
	});
}
function addNewUser() {
	if($('#defaultUsetId').val()=="-1")
		{
		$.alert.open("Please select user.");
		}
	else if($('#userName').html()!="")
		{
		$('#SAANModal').modal('hide');
		blockU();
	$.ajax({
		type : "get",
		url : "eonAddEbcUser?ecbId=" + document.forms[0].ecbName.value
				+ "&defaultUsetId=" + document.forms[0].defaultUsetId.value
				+ "&userName=" + $('#userName').html(),
		cache : false,
		data : '',
		success : function(response) {
			unblockU("User added successfully");	
			 $('#userName').html("");
			 $('#password').html("");
			loadEcbUser('');
		},
		error : function() {
			unblockU("");
			$.alert.open('Error while request..');
		}
	});
		}
	else
		{
		$.alert.open("User name cannot empty.");
		}
}
function resetPasward(userId) {
	bootbox.confirm("Are you sure want to reset password?", function(result) {
		if (result == true) {
			blockU();
			$.ajax({
				type : "get",
				url : "eonResetEbcUser?userId=" + userId,
				cache : false,
				data : '',
				success : function(response) {
					unblockU();
					$.alert.open("Password has been reset successfully and sent to registered email id.");
					// loadEcbUserReset();
				},
				error : function() {
					unblockU();
					$.alert.open('Error while request..');
				}
			});

		}
		;
	});
}
function deleteUser(userId,userName) {
	
	var arr = userName.split(".");
	
	var val= arr[0].charAt(arr[0].length-1);
	if(isNaN(val))
	{
		$.alert.open("You cannot delete default user.");
		return false;
	}
	bootbox.confirm("Are you sure you want to delete this user?", function(result) {
		if (result == true) {
			blockU();
			$.ajax({

				type : "get",
				url : "eonDeleteEbcUser?userId=" + userId,
				cache : false,
				data : '',
				success : function(response) {
					unblockU();
					$.alert.open("User has been deleted successfully.");
					loadEcbUser('');
				},
				error : function() {
					unblockU();
					$.alert.open('Error while request..');
				}
			});

		}
		;
	});

}
