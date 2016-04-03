Client side js
```js
var _client = new ClientFromServer();
//Your client id is _client._id

//Define a new client side function
//_client.new_function([string], [function]);
_client.new_function("func", (e) => {
    console.log.apply(console, e)
});
```

Server Side Js
```js
   Meteor.call("call_client", client-id, "func", ["data", "data"]);
```