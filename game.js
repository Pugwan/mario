//kaboom game
function startgame(){
  kaboom({
      global: true,
      fullscreen: true,
      scale: 2,
      debug: true,
      clearColor: [0, 0, 0, 1],
    });
    
    // Speed identifiers
    const MOVE_SPEED = 120
    const JUMP_FORCE = 360
    const BIG_JUMP_FORCE = 550
    let CURRENT_JUMP_FORCE = JUMP_FORCE
    const FALL_DEATH = 400
    const ENEMY_SPEED = 20
    
    // Game logic
    
    let isJumping = true
    
    //เซดรูปสิ่งของ
    loadRoot('https://i.imgur.com/')
    loadSprite('coin', 'wbKxhcd.png')
    loadSprite('evil-shroom', 'KPO3fR9.png')
    loadSprite('brick', 'pogC9x5.png')
    loadSprite('block', 'M6rwarW.png')
    loadSprite('mario', 'Wb1qfhK.png')
    loadSprite('mushroom', '0wMd92p.png')
    loadSprite('surprise', 'gesQ1KP.png')
    loadSprite('unboxed', 'bdrLpi6.png')
    loadSprite('pipe-top-left', 'ReTPiWY.png')
    loadSprite('pipe-top-right', 'hj2GK4n.png')
    loadSprite('pipe-bottom-left', 'c1cYSbt.png')
    loadSprite('pipe-bottom-right', 'nqQ79eI.png')
    
    
    loadSprite('blue-block', 'fVscIbn.png')
    loadSprite('blue-brick', '3e5YRQd.png')
    loadSprite('blue-steel', 'gqVoI2b.png')
    loadSprite('blue-evil-shroom', 'SvV4ueD.png')
    loadSprite('blue-surprise', 'RMqCc1G.png')
    
    loadSprite('wood-block','SwMr4oZ.png')
    loadSprite('door-secert','0CDVXMQ.png')
    loadSprite('dead-evil','tF0norN.png')
    loadSprite('ground','QrxjIUU.png')
    loadSprite('clound','TjLrADU.png')
    loadSprite('flowerdead','ZAoPve4.png')
    loadSprite('treemushgreen','9hwvlIF.png')
    loadSprite('treemushred','0NdFxlx.png')
    loadSprite('treemusyellow','2egKhaC.png')
    loadSprite('dirt wall','4mmKcbT.jpg')
    loadSprite('mincraftdirt','yjDQIM4.png')

    loadSprite('rockman','Fk6Vnoy.png')
    loadSprite('test','G1FcgQW.png')

    
    
    scene("menu", () => {
      add([
        text("Mario Bros with Js"),
        pos(width() / 2, height() * 0.2),
        origin("center"),
        scale(3),
      ]);
    
      add([
        rect(width() * 0.2, height() * 0.04),
        pos(width() / 2, height() * 0.4),
        origin("center"),
        "button",
        {
          clickAction: () => go("game", { level: 0, score: 0 }),
        },
      ]);
    
      add([
        text("Play game"),
        pos(width() / 2, height() * 0.4),
        origin("center"),
        color(0, 0, 0),
      ]);
    
      add([
        rect(width() * 0.2, height() * 0.04),
        pos(width() / 2, height() * 0.5),
        origin("center"),
        "button",
        {
          clickAction: () => go("collection"),
        },
      ]);
    
      add([
        text("Collections"),
        pos(width() / 2, height() * 0.5),
        origin("center"),
        color(0, 0, 0),
      ]);
  
      add([
        rect(width() * 0.2, height() * 0.04),
        pos(width() / 2, height() * 0.6),
        origin("center"),
        "button",
        {
          clickAction: () => go("shop"),
        },
      ]);
    
      add([
        text("Shop"),
        pos(width() / 2, height() * 0.6),
        origin("center"),
        color(0, 0, 0),
      ]);
      
      
      
    
      action("button", b => {
        if (b.isHovered()) {
          b.use(color(0.7, 0.7, 0.7));
        } else {
          b.use(color(1, 1, 1));
        }
    
        if (b.isClicked()) {
          b.clickAction();
        }
      });
    });
    start("menu");
// โค้ดสำหรับฉาก "shop" ในเกม Kaboom.js

function buyItem(item) {
  // ทำการซื้อสินค้าโดยเพิ่มข้อมูลเกี่ยวกับ item ลงในฐานข้อมูล
  // ในกรณีนี้ เราจะให้ item เป็น parameter และนำไปใช้ในการเพิ่มข้อมูลลงในฐานข้อมูลต่อไป
  // ตัวอย่างเช่น:
  console.log(item.name)

  getUserId().then(userId => {
    const newDocumentId = ID.unique();
    database.createDocument(
      databaseId,
      '6562165e1490741e8632',
      newDocumentId,
      {
        "userId": userId,              
        "skins": item.name
      }
      
    ).then(() => {
      alert('Item purchased successfully!');
    }).catch(error => {
      alert('Failed to purchase item');
      console.error(error);
    });
  })
}

function displayShopItems(items) {
  
  items.forEach((item, index) => {
    // สร้างองค์ประกอบเพื่อแสดงรายการสินค้าและปุ่มซื้อสินค้า
    add([      
      sprite(item.name), // โหลดภาพจาก URL ในฐานข้อมูล
      pos(100, 30 + index * 200), // ตำแหน่งของรูปภาพ
      scale(4), // ปรับขนาดของรูปภาพตามที่ต้องการ
    ]);
    add([
        text(item.name),
        pos(100, 140 + index * 200),
        color(1, 1, 1),
    ]);

    add([
        text(`Price: $${item.price}`),
        pos(100, 160 + index * 200),
        color(1, 1, 1),
    ]);

    add([
        rect(80, 20),
        pos(100, 180 + index * 200),
        "button",
        {
            clickAction: () => {                
                 buyItem(item);                 
            },
        },
    ]);

    add([
        text("Buy"),
        pos(125, 186 + index * 200),
        color(0, 0, 0),
    ]);

    add([
      rect(160, 20),
      pos(400, 380),
      "button",
      {
          clickAction: () => {
            go("menu")
          },
      },
  ]);

  add([
      text("Back to menu"),
      pos(425, 386),
      color(0, 0, 0),
  ]);

    action("button", (b) => {
        if (b.isHovered()) {
            b.use(color(0.7, 0.7, 0.7));
        } else {
            b.use(color(1, 1, 1));
        }

        if (b.isClicked()) {
            b.clickAction();
        }
    });
});
}
  scene("shop", () => {     
    const collectionIdskin = '6561fec3d1f900b246e5';
    // การแสดงรายการสินค้าและปุ่มซื้อสินค้า
    database.listDocuments(databaseId,collectionIdskin).then(response => {
        const items = response.documents;
        displayShopItems(items);
    }).catch(error => {
        console.error(error); // แสดงข้อผิดพลาดในการดึงข้อมูล
    });

  });
  
function displayShopItems(items) {
  
  items.forEach((item, index) => {
    // สร้างองค์ประกอบเพื่อแสดงรายการสินค้าและปุ่มซื้อสินค้า
    add([      
      sprite(item.name), // โหลดภาพจาก URL ในฐานข้อมูล
      pos(100, 30 + index * 200), // ตำแหน่งของรูปภาพ
      scale(4), // ปรับขนาดของรูปภาพตามที่ต้องการ
    ]);
    add([
        text(item.name),
        pos(100, 140 + index * 200),
        color(1, 1, 1),
    ]);

    add([
        text(`Price: $${item.price}`),
        pos(100, 160 + index * 200),
        color(1, 1, 1),
    ]);

    add([
        rect(80, 20),
        pos(100, 180 + index * 200),
        "button",
        {
            clickAction: () => {                
                 buyItem(item);                 
            },
        },
    ]);

    add([
        text("Buy"),
        pos(125, 186 + index * 200),
        color(0, 0, 0),
    ]);

    add([
      rect(160, 20),
      pos(400, 380),
      "button",
      {
          clickAction: () => {
            go("menu")
          },
      },
  ]);

  add([
      text("Back to menu"),
      pos(425, 386),
      color(0, 0, 0),
  ]);

    action("button", (b) => {
        if (b.isHovered()) {
            b.use(color(0.7, 0.7, 0.7));
        } else {
            b.use(color(1, 1, 1));
        }

        if (b.isClicked()) {
            b.clickAction();
        }
    });
});
}

function displaycolItems(items) {
  const uniqueSkins = []; // เก็บ skins ที่ไม่ซ้ำกัน
  const uniqueItems = []; // เก็บ items ที่ไม่ซ้ำกัน

  items.forEach(item => {
    if (!uniqueSkins.includes(item.skins)) {
      uniqueSkins.push(item.skins);      
    }
  });
  console.log(uniqueSkins)
  items.forEach((item, index) => {
    // สร้างองค์ประกอบเพื่อแสดงรายการสินค้าและปุ่มซื้อสินค้า
    add([      
      sprite(uniqueSkins[index]), // โหลดภาพจาก URL ในฐานข้อมูล
      pos(100, 30 + index * 200), // ตำแหน่งของรูปภาพ
      scale(4), // ปรับขนาดของรูปภาพตามที่ต้องการ
    ]);
    add([
        text(uniqueSkins[index]),
        pos(100, 140 + index * 200),
        color(1, 1, 1),
    ]);    

    add([
        rect(80, 20),
        pos(100, 180 + index * 200),
        "button",
        {
            clickAction: () => {                
                                
            },
        },
    ]);

    add([
        text("Eqip"),
        pos(125, 186 + index * 200),
        color(0, 0, 0),
    ]);

    add([
      rect(160, 20),
      pos(400, 380),
      "button",
      {
          clickAction: () => {
            go("menu")
          },
      },
  ]);
  add([
    text("Back to menu"),
    pos(425, 386),
    color(0, 0, 0),
  ]);
  
  action("button", (b) => {
      if (b.isHovered()) {
          b.use(color(0.7, 0.7, 0.7));
      } else {
          b.use(color(1, 1, 1));
      }
  
      if (b.isClicked()) {
          b.clickAction();
      }
  }); 
   
});

}

  // Create a new scene for displaying the collection
  scene("collection", () => {    
    getUserId().then(userId => {        
      database.listDocuments(
        databaseId,
        '6562165e1490741e8632',
        [
          Query.equal("userId", userId)
        ]          
      ).then(response => {
        const items = response.documents;
        console.log(items)
        displaycolItems(items);
      }).catch(error => {
        console.error(error); // แสดงข้อผิดพลาดในการดึงข้อมูล
      });
    });
  });
  
  
  
    //กำหนดฉากและตำแหน่งสิ่งของ แต่ละระดับ
    scene("game", ({ level, score }) => {
      layers(['bg', 'obj', 'ui'], 'obj')
    
      const maps = [
        [
          '                                      ',
          '                                      ',
          '                                      ',
          '                                      ',
          '                                      ',
          '     %   =*=%=                        ',
          '                                      ',
          '                                   -+ ',
          '                    ^   ^^^^ ^     () ',
          '==============================   =====',
        ],
        [
          '£                                       £',
          '£                                       £',
          '£                                       £',
          '£                                       £',
          '£                                       £',
          '£        @@@@@@              x x        £',
          '£                          x x x        £',
          '£                        x x x x  x   -+£',
          '£               z   z  xfxfxfxfxffx   ()£',
          '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
        ],
        [
          '£                                             £££££££££££££££££££££££££££££££££',
          '£                                                        £            £        ',
          '£                                                     £  £  £     £   £      78',
          '£                                                     £     £     £          45',
          '£                                             £££££££££££££££££££££££££££££££££',
          '£   *     @@@@@@                x             £',
          '£                            x  x             £',
          '£                         x  x  x    x      -+£',
          '£              z   z   x  x  x  x    x      ()£',
          '!!!!!!!!!!!!!!!!!!!!!!!!  !  !  !    !      !!£',
        ],
        [
          '£                                       £',
          '£       @@@@@@           @@@@@@         £',
          '£                                       £',
          '£                @@@@@@                 £',
          '£                                       £',
          '£         @@@@@@        @@@@@@          £',
          '£                                       £',
          '£        @@@@@@          @@@@@@       69£',
          '£                                     23£',
          '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
        ],
        [
          '£        *                                 ',
          '£                        %%                ',
          '£           %%}                            ',
          '£                         !!!              ',
          '£                  }%%%                    ',
          '£           !                     c        ',
          '£       !                                     ',
          '£   !                xfx                    -+',
          '£         ^^         xxx                    () ',
          '!!!!!!!!!!!!!   !!!  xxx  !!!             !!!!',
        ]
      ]
      
      const levelCfg = {
        width: 20,
        height: 20,
        '=': [sprite('block'), solid()],
        '$': [sprite('coin'), 'coin'],
        '%': [sprite('surprise'), solid(), 'coin-surprise'],
        '*': [sprite('surprise'), solid(), 'mushroom-surprise'],
        '}': [sprite('unboxed'), solid()],
        '(': [sprite('pipe-bottom-left'), solid(), scale(0.5)],
        ')': [sprite('pipe-bottom-right'), solid(), scale(0.5)],
        '-': [sprite('pipe-top-left'), solid(), scale(0.5), 'pipe'],
        '+': [sprite('pipe-top-right'), solid(), scale(0.5), 'pipe'],
        '4': [sprite('pipe-bottom-left'), solid(), scale(0.5)],
        '5': [sprite('pipe-bottom-right'), solid(), scale(0.5)],
        '7': [sprite('pipe-top-left'), solid(), scale(0.5), 'secertdoor'],
        '8': [sprite('pipe-top-right'), solid(), scale(0.5), 'secertdoor'],
        '^': [sprite('evil-shroom'), solid(), 'dangerous',body()], //ให้เป็น tag dangerous ที่ทำให้แพ้เกมได้
        '#': [sprite('mushroom'), solid(), 'mushroom', body()],//ทำให้มันมีbody เพื่อให้มันหล่นตามแรงโน้มถ่วงได้
        '!': [sprite('blue-block'), solid(), scale(0.5)],
        '£': [sprite('blue-brick'), solid(), scale(0.5)],
        'z': [sprite('blue-evil-shroom'), solid(), scale(0.5), 'dangerous',body()],
        '@': [sprite('blue-surprise'), solid(), scale(0.5), 'coin-surprise'],
        'x': [sprite('blue-steel'), solid(), scale(0.5) ],
        'w': [sprite('wood-block'),solid()],
        'd': [sprite('door-secert'),solid()],
        't': [sprite('dead-evil'),solid(),'dangerous',body()],
        'a': [sprite('dirt wall'),solid()],
        'g': [sprite('ground'),solid()],
        'c': [sprite('clound'),solid()],
        'f': [sprite('flowerdead'),solid(),'dangerous2',body()],
        'n': [sprite('treemushgreen'),solid()],
        'r': [sprite('treemushred'),solid()],
        'y': [sprite('treemusyellow'),solid()],
        '1': [sprite('mincraftdirt'),solid()],
        '2': [sprite('pipe-bottom-left'), solid(), scale(0.5)],
        '3': [sprite('pipe-bottom-right'), solid(), scale(0.5)],
        '6': [sprite('pipe-top-left'), solid(), scale(0.5), 'test2'],
        '9': [sprite('pipe-top-right'), solid(), scale(0.5), 'test2'],
      }
      //สร้างระดับของเกม
      const gameLevel = addLevel(maps[level], levelCfg)
      //สร้างป้ายเพื่อแสดงคะแนน
      const scoreLabel = add([
        text(score),
        pos(30, 6),
        layer('ui'),
        {
          value: score,
        }
      ])
      //แสดงหมายเลขระดับของด่านปัจจุบัน
      add([text('level ' + parseInt(level + 1) ), pos(40, 6)])
      
      //ขยายตัวละครของผู้เล่นให้ใหญ่
      function big() {
        let timer = 0
        let isBig = false
        return {
          update() {
            if (isBig) {
              CURRENT_JUMP_FORCE = BIG_JUMP_FORCE //ตอนตัวใหญ่ขึ้น เปลี่ยนการกระโดดให้สูงขึ้น
              timer -= dt()
              if (timer <= 0) {
                this.smallify()
              }
            }
          },
          isBig() {
            return isBig
          },
          smallify() {
            this.scale = vec2(1)
            CURRENT_JUMP_FORCE = JUMP_FORCE
            timer = 0
            isBig = false
          },
          biggify(time) {
            this.scale = vec2(2)
            timer = time
            isBig = true     
          }
        }
      }
       //สร้างตัวละคร
      const player = add([
        sprite('test'), solid(),
        pos(30, 0),
        body(),//ทำให้มันมีbody เพื่อให้มันหล่นตามแรงโน้มถ่วงได้
        big(),
        origin('bot')
      ])
      //ทำให้เห็ดเคลื่อนที่
      action('mushroom', (m) => {
        m.move(20, 0)
      })
    
      //โหม่งบล็อกแล้วของโผล่
      player.on("headbump", (obj) => {
        if (obj.is('coin-surprise')) {//ถ้าโหม่งโดนกล่องที่มีเหรียญ
          gameLevel.spawn('$', obj.gridPos.sub(0, 1))//เหรียญโผล่ด้านบนกล่อง
          destroy(obj)//ลบกล่องออก
          gameLevel.spawn('}', obj.gridPos.sub(0,0))//เปลี่ยนตำแหน่งที่เคยเป็นกล่อง(ที่โดนลบ) เป็นกล่องที่โดนเปิดแล้ว
        }
        if (obj.is('mushroom-surprise')) {
          gameLevel.spawn('#', obj.gridPos.sub(0, 1))
          destroy(obj)
          gameLevel.spawn('}', obj.gridPos.sub(0,0))
        }
      })
    
      // ทำให้ตัวละครผู้เล่นขยายเมื่อเขาเก็บเห็บ
      player.collides('mushroom', (m) => {
        destroy(m)
        player.biggify(6)
      })
      //จัดการการชนกับเหรียญและอัปเดตคะแนน
      player.collides('coin', (c) => {
        destroy(c)
        scoreLabel.value++
        scoreLabel.text = scoreLabel.value
      })
      //ทำให้ปีศาจเคลื่อนที่
      action('dangerous', (d) => {
        d.move(-ENEMY_SPEED, 0) 
      })
      // จัดการเจอกับปีศาจ
      player.collides('dangerous', (d) => {
        if (isJumping) { //โดดบนหัวมัน -> ปีศาจหาย
          destroy(d)
        } else {
          go('lose', { score: scoreLabel.value})//จบเกม เก็บสกอร์
        }
      })
      player.collides('dangerous2', () => {
          go('lose', { score: scoreLabel.value})//จบเกม เก็บสกอร์
      })
     
      // ตรวจสอบว่าตัวละครผู้เล่นตกจากสูงเกินไปหรือไม่
      player.action(() => {
        camPos(player.pos)
        if (player.pos.y >= FALL_DEATH) { //โดดตกแมพ -> ตาย
          go('lose', { score: scoreLabel.value})
        }
      })
      // ย้ายไประดับถัดไปเมื่อผู้เล่นเข้าท่อ
      player.collides('pipe', () => {
        keyPress('down', () => {
          if(level!=2){
          go('game', {
            level: (level + 1) % maps.length,
            score: scoreLabel.value
          })}else{
            go('game', {
              level: (level + 2) % maps.length,
              score: scoreLabel.value
            })
          }
        })
      })

      player.collides('secertdoor', () => {
        keyPress('down', () => {
          go('game', {
            level: maps.length-2,
            score: scoreLabel.value
          })
        })
      })

      player.collides('test2', () => {
        keyPress('down', () => {
          go('game', {
            level: level-1,
            score: scoreLabel.value
          })
        })
      })
    
      //การเคลื่อนที่และการตอบสนองต่าง ๆ
      keyDown('left', () => {
        player.move(-MOVE_SPEED, 0)
      })
    
      keyDown('right', () => {
        player.move(MOVE_SPEED, 0)
      })
    
      player.action(() => {
        if(player.grounded()) {
          isJumping = false
        }
      })
      // จัดการกระโดดของผู้เล่น
      keyPress('space', () => {
        if (player.grounded()) {
          isJumping = true
          player.jump(CURRENT_JUMP_FORCE)
        }
      })
    })
    
    scene('lose', ({ score }) => {
      add([
        text(score, 32),
        origin('center'),
        pos(width() / 2, height() / 2),
      ]);        
      
      const buttonWidth = 150; // กำหนดความกว้างของปุ่ม
      const buttonHeight = 30; // กำหนดความสูงของปุ่ม
    
      const restartButton = add([
        rect(buttonWidth, buttonHeight),
        pos(width() / 2 -120, height() / 2 + 60),
        origin('center'),
        color(255, 255, 255),
        layer('ui'),
      ]);
    
      const buttonText = add([
        text('Restart', 14),
        pos(width() / 2 -120, height() / 2 + 60),
        origin('center'),
        color(0, 0, 0),
        layer('ui'),
      ]);

      const backButton = add([
        rect(buttonWidth, buttonHeight),
        pos(width() / 2 + 120, height() / 2 + 60), // ปรับตำแหน่งให้ขวาของปุ่ม Restart
        origin('center'),
        color(255, 255, 255),
        layer('ui'),
      ]);
      
      const backButtonText = add([
        text('Back', 14),
        pos(width() / 2 + 120, height() / 2 + 60), // ปรับตำแหน่งให้ขวาของปุ่ม Restart
        origin('center'),
        color(0, 0, 0),
        layer('ui'),
      ]);
    
      restartButton.action(() => {
        if (restartButton.isHovered()) {
          buttonText.color = rgb(0, 0, 255);
          if (mouseIsClicked()) {
            go('game', { level: 0, score: 0 });
            updatescoredb(checkScore(score),checkCoin(score));
          }
        } else {
          buttonText.color = rgb(0, 0, 0);
        }
      });

      backButton.action(() => {
        if (backButton.isHovered()) {
          backButtonText.color = rgb(0, 0, 255);
          if (mouseIsClicked()) {
            go('menu'); // ส่งผู้เล่นกลับไปยัง scene 'menu'
          }
        } else {
          backButtonText.color = rgb(0, 0, 0);
        }
      });
    });
    
    
    
    
    // เริ่มเกมด้วยการเข้าสู่ฉาก "game" ด้วยระดับ 0 และคะแนน 0
    // start("game", { level: 0, score: 0})
}

if (typeof global !== 'undefined') {
  global.startgame = startgame;

}

// แนบ checkScore กับ window object สำหรับบราวเซอร์
if (typeof window !== 'undefined') {
  window.startgame = startgame;

}