function set_ws_callbacks() {
  ws.onmessage = function(ws_msg) {
    var msg = JSON.parse(ws_msg.data);
    switch(msg['message']) {
      case 'auth_success':
        nickname = msg['nickname'];
        document.getElementById("auth-bg").style.display = "none";
        document.getElementById("globalchat-bg").style.display = "block";
        document.getElementById("inventory-bg").style.display = "block";
        document.getElementById("zoom-bg").style.display = "block";
        document.getElementById("btn-open-crafting").style.display = "block";
        toggle_global_chat();
        toggle_inventory();
      break;
      case 'init_world':
        init_world(msg['height'], msg['width']);
        set_part_of_world(msg['part_of_world']);
      break;
      case 'all_characters':
        characters = msg['characters'];
      break;
      case 'add_character':
        characters.push(msg['character']);
      break;
      case 'remove_character':
        characters.splice(find_character_index(msg['nickname']), 1);
      break;
      case 'refresh_cell':
        var cell = msg['cell'];
        refresh_cell(cell);
        refresh_cell(find_cell_top(cell));
        refresh_cell(find_cell_bottom(cell));
        refresh_cell(find_cell_left(cell));
        refresh_cell(find_cell_right(cell));
      break;
      case 'refresh_craft_list':
        var tbody = document.getElementById("tbody-crafting");
        tbody.innerHTML = "";
        for (var i = 0; i < msg['craft_list'].length; i++) {
          item = msg['craft_list'][i]
          var required_html = "";
          item['required'].forEach(function(req) {
            required_html += req['amount'] + 'x: <img src="sprites/item/'+ req['item_id'] +'.png">'
          }, this);
          tbody.innerHTML += '<tr>\
            <td>' + '<img src="sprites/item/'+ item['id'] +'.png">' + '</td>\
            <td>' + required_html + '</td>\
            <td style="text-align: right"><button onclick="craft('+item['id']+')" id="btn-craft-item"></button></td>\
          </tr>';
        }
      break;
      case 'craft_info':
        var progress = 0;
        if(msg['craft_info']['next_level_exp'] > 0) {
          progress = msg['craft_info']['exp'] / msg['craft_info']['next_level_exp'] * 100
        }
        document.getElementById('craft-exp').style.width = progress + "%";
      break;
      case 'part_of_world':

      break;
      case 'refresh_character':
        var i = find_character_index(msg['character']['nickname']);
        characters[i] = msg['character']
        characters[i]['end_move'] = msg['character']['time_to_move'] + now();
        if(characters[i]['nickname'] == nickname) {
          function html_equip(equip) {
            if(characters[i][equip]) {
              document.getElementById("equip-"+equip).innerHTML = "" +
              "<img src='sprites/item/" + characters[i][equip]['id'] + ".png' " + 
              "class='inventory-item' onclick='remove_equip("+characters[i][equip]['id']+")'>";
            } else {
              document.getElementById("equip-"+equip).innerHTML = "";
            }
          }
          html_equip('right_hand');
          html_equip('face');
          html_equip('head');
          html_equip('body');
        }
      break;
      case 'global_chat':
        var globalchat_messages = document.getElementById("globalchat-messages");
        globalchat_messages.innerHTML += "" +
            "<div><b> " + msg['nickname'] + " </b>" + msg['chat_message'] + "</div>";
        globalchat_messages.scrollTop = globalchat_messages.scrollHeight;

        var globalchat = document.getElementById("globalchat");
        if(globalchat.style.display == "none") {
          document.getElementById("globalchat-title").style.color = "red"
        }      
      break;
      case 'inventory':
        inventory = document.getElementById('inventory');
        inventory.innerHTML = "";
        for(var i = 0; i < msg['inventory'].length; i++) {
          inventory.innerHTML += "" +
          "<img src='sprites/item/" + msg['inventory'][i]['id'] + ".png' " + 
          "class='inventory-item' onclick='use_item("+msg['inventory'][i]['id']+")'>";
        }
      break;
      default:
        alert('Erro -> Mensagem não encontrada');
      }
    };

  ws.onopen = function() {
  };

  ws.onerror = function() {
    alert('Sem conexão.');
    //window.location.reload();
  };
}

function send(cmd) {
  ws.send(JSON.stringify(cmd));
}

function send_gameplay(gameplay_name, params) {
  send({
    message : 'gameplay',
    gameplay_name : gameplay_name,
    params : params
  })
}