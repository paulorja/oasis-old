function update() {
  frames++;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  update_character_pos();
}

function update_character_pos() {
  for (var i = 0; i < characters.length; i++) {
    if(characters[i]['nickname'] == nickname) {
      scroll_x = characters[i]['x'] * -cell_size + (canvas.width/2);
      scroll_y = characters[i]['y'] * -cell_size + (canvas.height/2);
    }
    var pos_x = characters[i]['x'] * cell_size + scroll_x;
    var pos_y = characters[i]['y'] * cell_size + scroll_y;
    var end_move = characters[i]['end_move'];
    var speed = characters[i]['speed'];
    var speed_sqrt2 = speed * sqrt2

    if(now() < end_move) {
        characters[i]['is_moving'] = true;
        var pathfinding = characters[i]['pathfinding'];
        var path_size = pathfinding.length
        var diff_move = end_move - now();

        function fuck_the_name(character, x, y) {
          if(character['nickname'] == nickname) {
            scroll_x -= x;
            scroll_y -= y;
          } else {
            pos_x += x;
            pos_y += y;
          }
        }

        function fuck_the_name_2(character, x, y) {
          if(diff_move >= speed) {
              fuck_the_name(character, x, y);
              diff_move -= speed;
          } else {
              fuck_the_name(character, x / speed * diff_move, y / speed * diff_move);
              diff_move = 0;
          }
        }

        function fuck_the_name_3_diagonal(character, x, y) {
          if(diff_move >= speed_sqrt2) {
              fuck_the_name(character, x, y);
              diff_move -= speed_sqrt2;
          } else {
              fuck_the_name(character, x / speed_sqrt2 * diff_move, y / speed_sqrt2 * diff_move);
              diff_move = 0;
          }
        }

        for(var k = path_size; k > 1; k--) {
            if(pathfinding[k-1][0] < pathfinding[k-2][0] && pathfinding[k-1][1] === pathfinding[k-2][1]) {
                fuck_the_name_2(characters[i], cell_size, 0)
            } else if(pathfinding[k-1][0] > pathfinding[k-2][0] && pathfinding[k-1][1] === pathfinding[k-2][1]) {
                fuck_the_name_2(characters[i], -cell_size, 0)
            } else if(pathfinding[k-1][1] < pathfinding[k-2][1] && pathfinding[k-1][0] === pathfinding[k-2][0]) {
                fuck_the_name_2(characters[i], 0, cell_size)
            } else if(pathfinding[k-1][1] > pathfinding[k-2][1] && pathfinding[k-1][0] === pathfinding[k-2][0]) {
                fuck_the_name_2(characters[i], 0, -cell_size)
            } else if(pathfinding[k-1][0] < pathfinding[k-2][0] && pathfinding[k-1][1] > pathfinding[k-2][1]) {
                fuck_the_name_3_diagonal(characters[i], cell_size, -cell_size)
            } else if(pathfinding[k-1][0] > pathfinding[k-2][0] && pathfinding[k-1][1] < pathfinding[k-2][1]) {
                fuck_the_name_3_diagonal(characters[i], -cell_size, cell_size)
            } else if(pathfinding[k-1][0] < pathfinding[k-2][0] && pathfinding[k-1][1] < pathfinding[k-2][1]) {
                fuck_the_name_3_diagonal(characters[i], cell_size, cell_size)
            } else if(pathfinding[k-1][0] > pathfinding[k-2][0] && pathfinding[k-1][1] > pathfinding[k-2][1]) {
                fuck_the_name_3_diagonal(characters[i], -cell_size, -cell_size)
            }
        }
    } else {
      if(characters[i]['is_moving'] == true) {
        send_gameplay('take_cell_drops', {});
      }
      characters[i]['is_moving'] = false;
    }

    // SYNC MOUSE MOVE
    if(characters[i]['nickname'] == nickname) {
      if(characters[i]['is_moving']) {
        var current_mod_x = (scroll_x-(canvas.width/2)) % 64 * -1;
        var current_mod_y = (scroll_y-(canvas.height/2)) % 64 * -1;
        if(current_mod_x >= 0 && current_mod_x < 6 && current_mod_y >= 0 && current_mod_y < 6) {
          setTimeout(function() {
            if(sync_mouse_move != null) {
              send_gameplay('move', {to_x : sync_mouse_move['x'], to_y : sync_mouse_move['y']});
              sync_mouse_move = null;
            }
          }, 100);
        }
      } else {
        if(sync_mouse_move != null) {
          send_gameplay('move', {to_x : sync_mouse_move['x'], to_y : sync_mouse_move['y']});
          sync_mouse_move = null;
        }
      }
    }

    characters[i]['pos_x'] = pos_x;
    characters[i]['pos_y'] = pos_y;
  }
}