function runUpgrade()
{
	if ( upgradeStatus.completed == false )
	{
		$.ajax({
			type: "post",
			url: baseURL,
			data: RUN_UPGRADE_DATA,
			cache: false,
			success: function( responseData ) {
				upgradeStatus = responseData;
				showStatus();
				setTimeout( runUpgrade, RUN_UPGRADE_WAIT_PERIOD );
			}
		});
	}
}

function showStatus()
{
	var upgradedStr;

	// number of items
	$("#numItems").html(upgradeStatus.numOfItems);

	// amount upgraded
	upgradedStr = "" + upgradeStatus.upgraded;
	if ( upgradeStatus.skipRefCounting == false )
	{
		upgradedStr += " (" + percentCompleted() + "%)";
	}
	$("#upgraded").html(upgradedStr);

	// amount skipped
	$("#skipped").html(upgradeStatus.skipped);

	// status message
	if ( upgradeStatus.completed == false )
	{
		$("#statusMsg").html(STATUS_PROCESSING);
	}
	else
	{
		$("#statusMsg").html(STATUS_DONE);
		$("#abortWarning").hide();
		$("#btnClose").val(LABEL_OK);
	}
}

function percentCompleted()
{
	var numProcessed;
	var perc;

	numProcessed = upgradeStatus.upgraded + upgradeStatus.skipped;
	if ( ( upgradeStatus.completed == true ) || ( numProcessed >= upgradeStatus.numOfItems ) )
	{
		perc = 100;
	}
	else
	{
		perc = Math.floor(( numProcessed * 100 ) / upgradeStatus.numOfItems);
	}

	return perc;
}

function doneUpgrade()
{
	window.close();
}
