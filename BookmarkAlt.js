javascript:(
	async function() {
		var Redeem = "Throw";
		var maxCost = "1";
		var Tries = 0;
		document.querySelector('[aria-label="Bits and Points Balances"]').click();
		await new Promise(r => setTimeout(r, 100));
		while (document.querySelector('[title*="' + Redeem + '"]') == null && Tries <= 200) {
			console.log("Not found");
			await new Promise(r => setTimeout(r, 100));
			Tries++;
		}
		if (document.querySelector('[title*="' + Redeem + '"]') != null) {
			console.log(Tries + " needed to find 1st object");
			document.querySelector('[title*="' + Redeem + '"]').parentNode.parentNode.getElementsByTagName('button')[0].click();
			await new Promise(r => setTimeout(r, 100));
			Tries = 0;
			while (document.querySelector('p[data-test-selector="RewardText"]') == null && Tries <= 200) {
				console.log("Not found");
				await new Promise(r => setTimeout(r, 100));
				Tries++;
			}
			if (document.querySelector('p[data-test-selector="RewardText"]') == null) {
				document.querySelector('[aria-labelledby="channel-points-reward-center-header"]').querySelector('[aria-label="Close"]').click();
			} else {
				console.log(Tries + " needed to find 2nd object");
				if (typeof(maxCost) != "undefined" && maxCost != "") {
					console.log("Cost = " + document.querySelector('p[data-test-selector="RewardText"]').nextSibling.nextSibling.textContent);
					if (document.querySelector('p[data-test-selector="RewardText"]').nextSibling.nextSibling.textContent <= maxCost) {
						document.querySelector('p[data-test-selector="RewardText"]').parentNode.parentNode.parentNode.parentNode.click();
					} else {
						document.querySelector('[aria-labelledby="channel-points-reward-center-header"]').querySelector('[aria-label="Close"]').click();
						msgBox = document.createElement("div");
						msgBox.id = "msgBox";
						msgBox.style="padding-left:1vw;padding-right:1vw;position:absolute;top:0; left:0; right:0; bottom:0; margin:auto;color: #ff0000;background-color: #80808080;z-index: 1000;height: fit-content;width: fit-content;font-size: xxx-large;font-weight: bold";
						msgBox.textContent = "'" + Redeem + "' is not <= " + maxCost + " anymore";
						document.body.insertBefore(msgBox, document.body.childNodes[0]);
						setTimeout(() => {
							(function() {
								document.getElementById("msgBox").remove();
							})()
						}, 5000 );
						alert(Redeem + " is not less-equal than " + maxCost + " anymore");
					}
				} else {
					document.querySelector('p[data-test-selector="RewardText"]').parentNode.parentNode.parentNode.parentNode.click();
				}
			}
		}
	}
)()
