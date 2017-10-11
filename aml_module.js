var AMLTranslator = {
	translate: function (originalString) {

		const tagMap = {
			'^%':"<strong>",
			'^!%':"</strong>",
			'^~':"<em>",
			'^!~':"</em>"
		};
		let currentOpenTags= new Array(); //Hold currently opened tags
		let needReopenTags = new Array(); //Hold tags that need to be reopened before continuing
		let resultStr = '';		
		const str = originalString;

		//Check every character of the string and convert AML to HTML
		//charPos: the index refers to the character postion of the string
		for(let charPos = 0; charPos < str.length; charPos++) {
			
			//AML element found
			if(str.charAt(charPos) === '^') {
				
				//Open AML tag
				if(str.charAt(charPos + 1) !== '!') {
					let openTagMapKey = str.charAt(charPos) + str.charAt(charPos+1); //All open AML tag contains two characters
					resultStr += tagMap[openTagMapKey];
					currentOpenTags.push(openTagMapKey);
					charPos++; //Skip next character because AML open tag contains two characters
				} else { //Close AML tag
					let closeTagMapKey = str.charAt(charPos) + str.charAt(charPos+1) + str.charAt(charPos+2); //All close AML tag contains three characters
					
					//Need to close all opened tags before add the actual AML close tag
					while(currentOpenTags.length > 0) {
						let needCloseTagKey = currentOpenTags.pop();
						
						//Check if there is any tag need to be closed before this close tag
						if(needCloseTagKey.charAt(1) === closeTagMapKey.charAt(2)) {
							resultStr += tagMap[closeTagMapKey];
							//open tags that need to be reopened
							while(needReopenTags.length > 0) {
								let needReopenTagKey = needReopenTags.pop();
								resultStr += tagMap[needReopenTagKey];
								currentOpenTags.push(needReopenTagKey);	
							}
							break; //Once the AML close tag is added to the string, break out the while loop and check next string character
						}  

						//Close opened tags and store the tags in 'need to be reopened tags' stack
						resultStr += tagMap['^!' + needCloseTagKey.charAt(1)];
						needReopenTags.push(needCloseTagKey);
						
					}
					charPos+=2; //Skip next two characters because AML close tag contains three characters
				}
			} else { //AML element not found, then just add the character to result string
				resultStr += str.charAt(charPos);
			}
		}
		return resultStr;
	}
};

if(module.exports) {
	module.exports = AMLTranslator;
}