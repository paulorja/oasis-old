function get_sprite_connection(cell) {
  pos_terrain = calc_connections(cell, 't', TERRAINS);
  pos_unit = {x: 0, y: 0}
  if(cell['u']) {
    pos_unit = calc_connections(cell, 'u', UNITS);
  }
  
  return {
    pos_x_terrain: pos_terrain['x'], 
    pos_y_terrain: pos_terrain['y'],
    pos_x_unit: pos_unit['x'],
    pos_y_unit: pos_unit['y']
  }
}

function calc_connections(cell, item, layer_data) {
  var x = cell['x'];
  var y = cell['y'];
  var id = cell[item]
  var c = null;
  if(layer_data[id] && layer_data[id]['connections']) {
    var c = layer_data[id]['connections'];
  }

  var con_index = null;
  
  if(c) {

    var top = null;
    var bottom = null;
    var left = null;
    var right = null;

    var diagonal_tr = null;
    var diagonal_tl = null;
    var diagonal_bl = null;
    var diagonal_br = null;

    world[x]   && world[x][y-1]   ? top      = world[x][y-1][item]   : null;
    world[x]   && world[x][y+1]   ? bottom   = world[x][y+1][item]   : null;
    world[x-1] && world[x-1][y]   ? left     = world[x-1][y][item]   : null;
    world[x+1] && world[x+1][y]   ? right    = world[x+1][y][item]   : null;
    
    world[x+1] && world[x+1][y-1]   ? diagonal_tr    = world[x+1][y-1][item] : null;
    world[x-1] && world[x-1][y-1]   ? diagonal_tl    = world[x-1][y-1][item] : null;
    world[x-1] && world[x-1][y+1]   ? diagonal_bl    = world[x-1][y+1][item] : null;
    world[x+1] && world[x+1][y+1]   ? diagonal_br    = world[x+1][y+1][item] : null;
    
    var ar_conn = {
      '2' : bottom == id,
      '8' : top == id,
      '4' : left == id,
      '6' : right == id,
      '9' : diagonal_tr == id,
      '7' : diagonal_tl == id,
      '3' : diagonal_br == id,
      '1' : diagonal_bl == id
    }
   
    for (var i = 0; i < c.length; i++) {
      var str_connections = c[i]['con'];
      
      if(
        ((ar_conn['1'] == true && c[i]['con'].indexOf("1") != -1) || (ar_conn['1'] == false && c[i]['con'].indexOf("1") == -1)) &&
        ((ar_conn['2'] == true && c[i]['con'].indexOf("2") != -1) || (ar_conn['2'] == false && c[i]['con'].indexOf("2") == -1)) &&
        ((ar_conn['3'] == true && c[i]['con'].indexOf("3") != -1) || (ar_conn['3'] == false && c[i]['con'].indexOf("3") == -1)) &&
        ((ar_conn['4'] == true && c[i]['con'].indexOf("4") != -1) || (ar_conn['4'] == false && c[i]['con'].indexOf("4") == -1)) &&
        ((ar_conn['6'] == true && c[i]['con'].indexOf("6") != -1) || (ar_conn['6'] == false && c[i]['con'].indexOf("6") == -1)) &&
        ((ar_conn['7'] == true && c[i]['con'].indexOf("7") != -1) || (ar_conn['7'] == false && c[i]['con'].indexOf("7") == -1)) &&
        ((ar_conn['8'] == true && c[i]['con'].indexOf("8") != -1) || (ar_conn['8'] == false && c[i]['con'].indexOf("8") == -1)) &&
        ((ar_conn['9'] == true && c[i]['con'].indexOf("9") != -1) || (ar_conn['9'] == false && c[i]['con'].indexOf("9") == -1))
      ) {
        return {x: c[i]['x'], y: c[i]['y'] };
      }
    }
  }
  

  return {x: 0, y: 0}
}