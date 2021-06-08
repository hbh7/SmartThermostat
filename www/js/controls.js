function control(path) {
	var req = new XMLHttpRequest();
	req.open('GET', path, true);
	req.send();
	updateStatus();
}

function setTemp(direction) {
	var req = new XMLHttpRequest();
	var url = "/api/settargettemp/";
	if(direction === "up") {
		url += (Number.parseInt($("#targetTemperature").text()) + 1);
	} else if(direction === "down") {
		url += (Number.parseInt($("#targetTemperature").text()) - 1);
	} else {
		url += (Number.parseInt($("#setTempNumber").val()));
	}
	req.open('GET', url, true);
	req.send();
	updateStatus();
}

function updateStatus() {
	$.get("/api/getcontrolmode", function( data ) {
		$("#currentControlMode").text(data);
	});

	$.get("/api/getclimatemode", function( data ) {
		$("#currentClimateMode").text(data);
	});

	$.get("/api/getfanmode", function( data ) {
		$("#currentFanMode").text(data);
	});

	$.get("/api/getcurrenttemp", function( data ) {
		$("#currentTemperature").text(data);
	});

	$.get("/api/gettargettemp", function( data ) {
		$("#targetTemperature").text(data);
	});
}

setInterval(updateStatus, 3000);
updateStatus();