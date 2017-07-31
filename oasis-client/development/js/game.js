var canvas, ctx, frames = 0;
var world = null;
var characters = [];
var scroll_x = 0;
var scroll_y = 0;
var ws;

var cell_size = 64;
var sqrt2 = Math.sqrt(2);
var nickname = "";
var inventory = [];

var sync_mouse_move = null;
var can_keymove_again = true;

var range_x = screen.width / 64 / 2;
var range_y = screen.height / 64 / 2;

function now() {
    return new Date().getTime() / 1000;
}

function keydown(evt) {
  var keyCode = evt.keyCode;
  var char = characters[find_character_index(nickname)];
  if(char) {
    // ESC
    if(keyCode == 27) {
      var globalchat = document.getElementById("globalchat");
      if(globalchat.style.display == "block") {
        toggle_global_chat();
      }
      close_craft_window();
    }
    // ENTER
    if(keyCode == 13) {
      var globalchat = document.getElementById("globalchat");
      if(globalchat.style.display == "none") {
        toggle_global_chat();
      }
      var globalchat_input = document.getElementById("globalchat-input");
      globalchat_input.focus();
    }
    //keyboard move
    if(document.activeElement.id != "globalchat-input") {
      keyboard_move(0, -1, [87, 38], keyCode);
      keyboard_move(0, 1, [83, 40], keyCode);
      keyboard_move(-1, 0, [65, 37], keyCode);
      keyboard_move(1, 0, [68, 39], keyCode);
    }
  }
}

function keyboard_move(x, y, keycodes, key_pressed) {
  var char = characters[find_character_index(nickname)];
  if(can_keymove_again == true && char) {
    if(keycodes.includes(key_pressed)) {
      can_keymove_again = false;
      send_gameplay('move', {to_x : char['x'] + x, to_y : char['y'] + y});
      setTimeout(function() {
        can_keymove_again = true;
      }, char['speed'] * 1000);
    }
  }
}

function click(evt) {
  var clicked_x = parseInt((evt.clientX - scroll_x) / cell_size);
  var clicked_y = parseInt((evt.clientY - scroll_y) / cell_size);

  var clicked_cell = find_cell(clicked_x, clicked_y);
  var clicked_char = find_char(clicked_x, clicked_y);
  var char = find_player_char();

  if(evt.target.tagName === "CANVAS") {
    // MOVE
    if (clicked_cell && !exist_character_on(clicked_x, clicked_y)) {
      if(char['is_moving']) {
        sync_mouse_move = { 'x' : clicked_x, 'y' : clicked_y };
      } else {
        send_gameplay('move', {to_x : clicked_x, to_y : clicked_y});
      }
    }
    // ACTION CELL
    if(clicked_cell) {
      console.log('CELL ACTION');
      send_gameplay('cell_action', {x : clicked_x, y : clicked_y});
    }
    // ACTION CHAR
    if(clicked_char) {
      console.log('CHAR ACTION');
      send_gameplay('char_action', {to_x : clicked_x, to_y : clicked_y});
    }
  }
}

function find_cell_top(cell) {
  return world[cell['x']][[cell['y']]-1];
}

function find_cell_right(cell) {
  return world[cell['x']+1][[cell['y']]];
}

function find_cell_bottom(cell) {
  return world[cell['x']][[cell['y']]+1];
}

function find_cell_left(cell) {
  return world[cell['x']-1][[cell['y']]];
}

function main(ws_url) {
  ws = new WebSocket(ws_url);
  set_ws_callbacks();

  canvas = document.createElement("canvas");

  ctx = canvas.getContext("2d");
  document.body.appendChild(canvas);

  document.addEventListener("mousedown", click, false);
  document.addEventListener("keydown", keydown, false);

  run();
}

function run() {
  update();
  draw();
  window.requestAnimationFrame(run);
}

function is_on_player_view(x, y) {
  var char_i = find_character_index(nickname);
  var char = characters[char_i];
  if(char['x'] > x + range_x || char['x'] < x - range_x) {
    return false;
  }
  if(char['y'] > y + range_y || char['y'] < y - range_y) {
    return false;
  }
  return true;
}

function login() {
  var input_nickname = document.getElementById("input-nickname");
  var input_body_styles = document.getElementsByName("char-body-style");
  var char_body_style = "1";
  for(var i = 0; i < input_body_styles.length; i++) {
    if(input_body_styles[i].checked) {
      char_body_style = input_body_styles[i].value;
    }          
  }

  send({
    message : 'auth',
    nickname : input_nickname.value,
    body_style : char_body_style
  });
}

function init_world(height, width) {
  world = [];
  for(var x = 0; x < height; x++) {
    world.push([]);
    for(var y = 0; y < width; y++) {
      world[x].push({});
    }
  }
}

function refresh_cell(cell) {
  if(cell) {
    world[cell['x']][cell['y']] = cell;
    var pos = get_sprite_connection(cell);
    world[cell['x']][cell['y']]['pos_x_t'] = pos['pos_x_terrain'] * cell_size;
    world[cell['x']][cell['y']]['pos_y_t'] = pos['pos_y_terrain'] * cell_size;
    world[cell['x']][cell['y']]['pos_x_u'] = pos['pos_x_unit'] * cell_size;
    world[cell['x']][cell['y']]['pos_y_u'] = pos['pos_y_unit'] * cell_size;
  }
}

function set_part_of_world(part_of_world) {
  for(var i = 0; i < part_of_world.length; i ++) {
    world[part_of_world[i]['x']][part_of_world[i]['y']] = part_of_world[i];
  }
  for(var i = 0; i < part_of_world.length; i ++) {
    refresh_cell(world[part_of_world[i]['x']][part_of_world[i]['y']])
  }
}

function find_cell(x, y) {
  if(world && world[x] && world[x][y]) {
    return world[x][y];
  }
  return null;
}

function send_global_chat() {
  var globalchat_input = document.getElementById("globalchat-input");
  var msg = globalchat_input.value;
  if(msg != "") {
    send_gameplay('global_chat', {
      chat_message : msg
    });
  }
  
  globalchat_input.value = "";
}

function use_item(item_id) {
  send_gameplay('use_item', {
      item_id : item_id
  });
}

function craft(item_id) {
  send_gameplay('craft', {
    item_id : item_id
  });
}

function remove_equip(item_id) {
  send_gameplay('remove_equip', {
      item_id : item_id
  });
}

function toggle_global_chat() {
    var globalchat = document.getElementById("globalchat");
    var globalchat_bg = document.getElementById("globalchat-bg");
    var globalchat_btn = document.getElementById("globalchat-toggle-btn");
    document.getElementById("globalchat-title").style.color = "white"
    if(globalchat_btn.innerHTML === "-") {
      globalchat.style.display = "none";
      globalchat_btn.innerHTML = "+"
      globalchat_bg.style.width = '19%'
    } else {
        globalchat.style.display = "block";
        globalchat_btn.innerHTML = "-"
        globalchat_bg.style.width = '56%'
    }
}

function toggle_inventory() {
    var inventory = document.getElementById("inventory");
    var inventory_bg = document.getElementById("inventory-bg");
    var inventory_btn = document.getElementById("inventory-toggle-btn");
    if(inventory_btn.innerHTML === "-") {
      inventory.style.display = "none";
      inventory_bg.style.width = '20%'
      inventory_btn.innerHTML = "+"
    } else {
      inventory.style.display = "block";
      inventory_bg.style.width = '40%'
      inventory_btn.innerHTML = "-"
    }
}

function zoom_in() {
  cell_size += 32;
  if(cell_size > 128) {
    cell_size = 128;
  }
}

function zoom_out() {
  cell_size -= 32;
  if(cell_size < 32) {
    cell_size = 32;
  }
}

function open_craft_window() {
  document.getElementById('craft-window-bg').style.display = "block";
  document.getElementById('craft-window').style.display = "block";
  if(document.getElementById("inventory").style.display == "none") {
    toggle_inventory();
  }
}

function click_close_craft_window(event) {
  if(event.target.id == 'craft-window-bg') {
    close_craft_window();
  }
}

function close_craft_window() {
  document.getElementById('craft-window-bg').style.display = "none";
  document.getElementById('craft-window').style.display = "none";
  if(document.getElementById("inventory").style.display == "block") {
    toggle_inventory();
  }
}
