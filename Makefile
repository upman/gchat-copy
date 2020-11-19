build:
	head -n 11 tampermonkey-template > tampermonkey.js
	cat content.js | sed 's/^/    /' >> tampermonkey.js
	tail -n 2 tampermonkey-template >> tampermonkey.js
