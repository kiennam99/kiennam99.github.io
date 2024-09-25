run index.html at browser

to use the chatbot service
1. the ragflow server must be up.
2. host the http://localhost

The api usage - restful api -> get, post, put...
1. use the https://website/v1/api as the base url
2. at the request headers-> include "Authorization": "Bearer ragflow-<api key>"
2.1 If hosting using ngrok: add "ngrok-skip-browser-warning": "69420" to bypass that.

You need to setup the chatting ui and the data pipeline yourself.