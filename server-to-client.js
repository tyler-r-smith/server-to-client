// Write your package code here!

// Variables exported by this module can be imported by other packages and
// applications. See server-to-client-tests.js for an example of importing.
export class ClientFromServer {
    constructor (_id) {
        this._id = _id || Random.id(20);
        this.func = {};
        ServerToClient_Subscription = Meteor.subscribe('ServerToClient');
        ServerToClientCursor = ServerToClient.find({client_id: this._id});
        ServerToClientCursor.observe({
            added: (item) => {
                Meteor.call("remove_call", item._id);
                if (typeof this.func[item.func] === 'function')
                    this.func[item.func](item.data);
            }
        });
    }
    new_function(name, func) {
        if (typeof name !== 'string') {
            return false;
        }
        if (typeof func !== 'function') {
            return false;
        }
        this.func[name] = func;
    }
}

export const call_client = function(client_id, func, data) {
    console.log("calling client", client_id, func, data);
    var _id = ServerToClient.insert({client_id: client_id, func: func, data: data});
    Meteor.setTimeout(function () {
        Meteor.call("remove_call", _id);
    }, 5000)
}
ServerToClient = new Mongo.Collection('serverToClient');

if (Meteor.isServer){
    Meteor.publish("ServerToClient", function(){
        return ServerToClient.find({});
    });
    
    Meteor.methods({
        call_client: function(client_id, func, data){
            console.log("calling client", client_id, func, data);
            var _id = ServerToClient.insert({client_id: client_id, func: func, data: data});
            Meteor.setTimeout(function(){
                Meteor.call("remove_call", _id);
            }, 5000)
        },
        remove_call: function(_id){
            ServerToClient.remove({_id: _id});
        }
    });
    
    ServerToClient.allow({
        remove: function (_id, doc){
            console.log("remove client callback");
            console.log(_id);
            console.log(doc);
            return doc._id === _id;
        }
    });

}