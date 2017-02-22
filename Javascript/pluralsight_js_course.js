const PHONE_PRICE = 99.99;
const ACCESSORY_PRICE = 9.99;
const TAX = 0.13;

var accountBalance = 400;
var purchasedAmount = 0;
var spendingMax = prompt("What is your max spending today?");

function taxes(amount) {
	return amount * (1 + TAX);
}

function niceFormat (amount) {
	return amount = amount.toFixed(2) + "$";
	}

var pPhone = 0;
var pAccessory = 0;

// keep buying phones while you still have money in your bank account
while (purchasedAmount < accountBalance ) {
	// buy a new phone including taxes
	purchasedAmount = purchasedAmount + taxes(PHONE_PRICE);
	pPhone++;
	// if we have not yet reach our spending max today
	if (purchasedAmount < spendingMax) {
		// buy a new accessory including taxes
		purchasedAmount = purchasedAmount + taxes(ACCESSORY_PRICE);
		pAccessory++;		
	}

	console.log(
	"You purchased: " + pPhone + " phone(s) and " + pAccessory +" accessories for: " + niceFormat(purchasedAmount)
	);

	if (purchasedAmount > accountBalance) {
	console.log("You can't afford " + pPhone + " phones!")
	}

}