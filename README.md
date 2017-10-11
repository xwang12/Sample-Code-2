# Sample-Code-2
JavaScript project with NodeJS testing

Task:
Write a JavaScript module that defines a global object with a callable method named translate. The method translate should take a string of valid AML as its sole argument, and return a string containing valid HTML with no wrapping elements. It is not necessary to validate the provided AML, but valid AML should always result in valid HTML.

TextEffect:Strong  
OpeningTag:^% 
ClosingTag:^!%

TextEffect:Emphasis  
OpeningTag:^~ 
ClosingTag:^~%

Example:
Input: Hello, Earth!
Output: Hello, Earth!

Input: Hello, ^%Earth!^!%
Output: Hello, <strong>Earth!</strong>

Input: Hello^~Hello, ^%Earth!^!~ You are ^~welcome^!% here.^!~
Output: Hello<em>Hello, <strong>Earth!</strong></em><strong> You are <em>welcome</em></strong><em> here.</em>
