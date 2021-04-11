class ChatChannel < ApplicationCable::Channel

  def subscribed
    stream_for 'chat_channel'
  end

  def speak(data)
    # debugger
    message = Message.find_by(id: data['message']['id'])
    if message.nil?
      new_message = Message.create(content: data['message']['content'], sender_id: data['message']['sender_id'])
      socket = { 
        id: new_message.id, 
        content: new_message.content,
        sender_id: new_message.sender_id,
      }
    else
      updated_message = message.update(content: data['message']['content'])
      socket = { 
        id: message.id, 
        content: message.content,
        sender_id: message.sender_id,
      }
    end
    ChatChannel.broadcast_to('chat_channel', socket)
  end
  def unsubscribed; end
end


# ['content'], sender_id: data['message']['sender_id']
