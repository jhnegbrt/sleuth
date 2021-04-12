export default function createChannel(receive, receiveAll, remove){

  App.cable.subscriptions.create(
    { channel: "ChatChannel" },
    {
      received: data => {
        switch (data.type){
          case "message":
            receive(data)
            break
          case "messages":
            receiveAll(data)
            break
          case "delete":
            remove(data['message_id'])
            break
        }
      },
      load: function() { return this.perform("load")},
      speak: function(message) {
        return this.perform("speak", message);
      },
      update: function(message){
        return this.perform("update_message", message)
      },
      remove_message: function(data){
        return this.perform("remove_message", data)
      }
    }
  )

}
