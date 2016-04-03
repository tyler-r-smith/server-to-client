// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by server-to-client.js.
import { name as packageName } from "meteor/server-to-client";

// Write your tests here!
// Here is an example.
Tinytest.add('server-to-client - example', function (test) {
  test.equal(packageName, "server-to-client");
});
