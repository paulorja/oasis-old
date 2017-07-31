window.onload=function(){
    var ui = document.getElementById("ui");

    ui.innerHTML += '\
      <button onclick="open_craft_window()" id="btn-open-crafting"></button>\
    ';

    ui.innerHTML += '\
      <div id="zoom-bg">\
        <button onclick="zoom_in()">+</button>\
        <button onclick="zoom_out()">-</button>\
      </div>'
    ;

    ui.innerHTML += '\
      <div id="craft-window-bg" onclick="click_close_craft_window(event)">\
        <div id="craft-window">\
          <div id="craft-exp-bg"><div id="craft-exp"></div></div>\
          <table id="table-crafting">\
            <thead><tr><th>Item</th><th>Precisa de</th><th></tr></head>\
            <tbody id="tbody-crafting"><tbody>\
          </table>\
        </div>\
      </div>'
    ;

    ui.innerHTML += '\
      <div id="equips-bg">\
        <div id="equip-head"></div>\
        <div id="equip-body"></div>\
        <div id="equip-head"></div>\
        <div id="equip-face"></div>\
        <div id="equip-body"></div>\
        <div id="equip-right_hand"></div>\
      </div>\
    ';

    ui.innerHTML += '\
      <div id="inventory-bg" class="window-bg">\
        <div onclick="toggle_inventory()" class="window-header">\
          <table style="width: 100%;">\
            <tr>\
              <td>MOCHILA</td>\
              <td style="text-align: right"><button id="inventory-toggle-btn">-</button></td>\
            </tr>\
          </table>\
        </div>\
        <div id="inventory">\
        </div>\
      </div>\
    ';

    ui.innerHTML += '\
      <div id="globalchat-bg" class="window-bg">\
          <div onclick="toggle_global_chat()" class="window-header">\
              <table style="width: 100%;">\
                  <tr>\
                      <td id="globalchat-title">CHAT</td>\
                      <td style="text-align: right"><button id="globalchat-toggle-btn">-</button></td>\
                  </tr>\
              </table>\
          </div>\
          <div id="globalchat">\
              <div id="globalchat-messages">\
              </div>\
              <form action="javascript:void(0);" onsubmit="send_global_chat()">\
                  <label>\
                      Global Chat:\
                      <input type="text" id="globalchat-input">\
                  </label>\
                  <button>Send</button>\
              </form>\
          </div>\
      </div>\
    ';

    ui.innerHTML += '\
      <div id="auth-bg">\
        <div id="auth-form">\
          <form action="javascript:void(0);" onsubmit="login()">\
            <h1>Login</h1>\
            <div>\
              <label>\
                Nickname:\
                <br>\
                <input id="input-nickname" type="text" required minlength="2" maxlength="12">\
              </label>\
            </div>\
            <div>\
              <br />\
              <label>\
                <input type="radio" name="char-body-style" checked value="1">\
                <img src="/sprites/character/body_style/body_style_1.png">\
              </label>\
              <label>\
                <input type="radio" name="char-body-style" value="2">\
                <img src="/sprites/character/body_style/body_style_2.png" >\
              </label>\
              <label>\
                <input type="radio" name="char-body-style" value="3">\
                <img src="/sprites/character/body_style/body_style_3.png">\
              </label>\
              <label>\
                <input type="radio" name="char-body-style" value="4">\
                <img src="/sprites/character/body_style/body_style_4.png">\
              </label>\
              <label>\
                <input type="radio" name="char-body-style" value="5">\
                <img src="/sprites/character/body_style/body_style_5.png">\
              </label>\
              <label>\
                <input type="radio" name="char-body-style" value="6">\
                <img src="/sprites/character/body_style/body_style_6.png">\
              </label>\
            </div>\
            <br>\
            <div>\
              <button id="btn-login">Entrar</button>\
            </div>\
          </form>\
        </div>\
      </div>\
    ';
}