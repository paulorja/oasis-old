require 'websocket-client-simple'
require 'json'

def run_bot(nick_name, body_style = '1')
  Thread.new do
    ws = WebSocket::Client::Simple.connect 'ws://127.0.0.1:5000'

    ws.on :open do
      puts 'CONNECTION OPEN'
      ws.send({
        message: 'auth',
        nickname: nick_name,
        body_style: body_style,
      }.to_json)
    end

    ws.on :message do |msg|
      puts msg
      data = JSON.parse(msg.data)
      puts data['message']
      if data['message'] == 'init_world'
        ws.send({
          message: 'gameplay',
          gameplay_name: 'move',
          params: {
            to_x: 117,
            to_y: 125
          }
        }.to_json)
      end
    end
  end
end


run_bot 'joao', '1'
#run_bot 'maria', '3'
#run_bot 'batata', '4'
#run_bot 'maça', '5'
#run_bot 'guri', '1'
#run_bot 'guria', '4'
#run_bot 'sei la', '3'
#run_bot 'tolao', '2'

gets