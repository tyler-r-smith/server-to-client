Client side js

var _client = new ClientFromServer();
//Your client id is _client._id

_client.new_function("log", (e) => {
console.log.apply(console, e)
}