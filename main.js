//IMPORTANT: Make sure to use Kaboom version 0.5.0 for this game by adding the correct script tag in the HTML file.
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
  
  //Hello
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
        '                            -+        ',
        '                    ^   ^   ()        ',
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
        '£               z   z  x x x x x  x   ()£',
        '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
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
      '^': [sprite('evil-shroom'), solid(), 'dangerous'], //ให้เป็น tag dangerous ที่ทำให้แพ้เกมได้
      '#': [sprite('mushroom'), solid(), 'mushroom', body()],//ทำให้มันมีbody เพื่อให้มันหล่นตามแรงโน้มถ่วงได้
      '!': [sprite('blue-block'), solid(), scale(0.5)],
      '£': [sprite('blue-brick'), solid(), scale(0.5)],
      'z': [sprite('blue-evil-shroom'), solid(), scale(0.5), 'dangerous'],
      '@': [sprite('blue-surprise'), solid(), scale(0.5), 'coin-surprise'],
      'x': [sprite('blue-steel'), solid(), scale(0.5)],
  
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
      sprite('mario'), solid(),
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
        go('game', {
          level: (level + 1) % maps.length,
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
  //เหตุการณ์การแพ้ (lose scene)
  scene('lose', ({ score }) => {
    add([text(score, 32), origin('center'), pos(width()/2, height()/ 2)]) //โชว์สกอร์ เมื่อแพ้
  })
  // เริ่มเกมด้วยการเข้าสู่ฉาก "game" ด้วยระดับ 0 และคะแนน 0
  start("game", { level: 0, score: 0})