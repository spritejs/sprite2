(window.webpackJsonp=window.webpackJsonp||[]).push([[99],{615:function(n,e,t){"use strict";t.r(e),e.default="const {Scene, Sprite, Label, Group, Path} = spritejs;\nclass Button extends Label {\n  connect(parent, zOrder) {\n    super.connect(parent, zOrder);\n\n    this.addEventListener('mouseenter', (evt) => {\n      this.attr({\n        fillColor: '#635d47',\n        bgcolor: '#00e15e',\n      });\n    });\n\n    this.addEventListener('mousedown', (evt) => {\n      this.attr({\n        scale: 0.95,\n      });\n    });\n\n    this.addEventListener('mouseup', (evt) => {\n      this.attr({\n        scale: 1,\n      });\n    });\n\n    this.addEventListener('mouseleave', (evt) => {\n      this.attr({\n        fillColor: '#00e15e',\n        bgcolor: '',\n      });\n    });\n  }\n}\n\n(async function () {\n  const container = document.getElementById('stage');\n  const scene = new Scene({\n    container,\n    width: 1600,\n    height: 1200,\n    mode: 'stickyWidth',\n    // contextType: '2d',\n  });\n\n  await scene.preload([\n    'https://p5.ssl.qhimg.com/t01f47a319aebf27174.png',\n    'https://s3.ssl.qhres2.com/static/a6a7509c33a290a6.json',\n  ]);\n\n  const bglayer = scene.layer('bg'),\n    fglayer = scene.layer('fg', {\n      handleEvent: false,\n      renderMode: 'repaintAll',\n    });\n\n  bglayer.canvas.style.backgroundColor = '#635D47';\n\n  const wall = new Sprite();\n  wall.attr({\n    size: [10, 740],\n    pos: [940, 250],\n    bgcolor: '#CFC441',\n  });\n  fglayer.append(wall);\n\n  function randomBirds(i) {\n    const pos = [100, 350 + 60 * i];\n    const duration = Math.round(200 + 300 * Math.random());\n\n    const g = new Group();\n    g.attr({\n      anchor: [0.5, 0.5],\n      pos,\n      zIndex: 200,\n    });\n\n    const s = new Sprite('huanhuan.png');\n    s.attr({scale: 0.4});\n\n    g.appendChild(s);\n\n    g.animate([\n      {x: 100},\n      {x: 900},\n      {x: 100},\n    ], {\n      duration: duration * 20,\n      iterations: Infinity,\n      easing: 'ease-in-out',\n      fill: 'both',\n    });\n\n    g.animate([\n      {rotate: 30, scale: [1, 1]},\n      {rotate: -30, scale: [-1, 1]},\n      {rotate: 30, scale: [1, 1]},\n    ], {\n      duration: duration * 20,\n      iterations: Infinity,\n      easing: 'step-end',\n      fill: 'both',\n    });\n\n    const outerFireD = 'M19.8173,24.1766 L5.3273,32.9936 C4.6293,33.4186 3.7183,33.1976 3.2943,32.4996 C3.1953,32.3376 3.1313,32.1596 3.1003,31.9836 L0.1953,15.2736 C-1.0387,8.1796 3.7123,1.4286 10.8073,0.1946 C17.9013,-1.0394 24.6523,3.7116 25.8853,10.8056 C26.8283,16.2296 24.2443,21.4666 19.8173,24.1766';\n\n    const outerFire = new Path();\n    outerFire.attr({\n      d: outerFireD,\n      pos: [22, 90],\n      fillColor: 'rgb(253,88,45)',\n      zIndex: -1,\n    });\n    g.append(outerFire);\n\n    const innerFireD = 'M15.9906,13.766 L8.4096,26.718 C8.0486,27.335 7.2706,27.521 6.6726,27.133 C6.4296,26.976 6.2536,26.748 6.1536,26.491 L0.6356,12.223 C-1.1554,7.594 0.9666,2.393 5.3746,0.605 C9.7826,-1.182 14.8076,1.122 16.5976,5.752 C17.6546,8.483 17.3236,11.455 15.9906,13.766';\n\n    const innerFire = new Path();\n    innerFire.attr({\n      d: innerFireD,\n      pos: [30, 90],\n      rotate: 15,\n      fillColor: 'rgb(254,222,9)',\n      zIndex: -1,\n    });\n    g.append(innerFire);\n\n    fglayer.append(g);\n\n    return g;\n  }\n\n  for(let i = 0; i < 10; i++) {\n    randomBirds(i);\n  }\n\n  const [speedupBtn, slowdownBtn, pauseBtn, playBtn]\n    = ['Speed up', 'Slow down', 'Pause', 'Play'].map((type, i) => {\n      const button = new Button(type);\n\n      button.attr({\n        anchor: [0.5, 0.5],\n        pos: [1300, 400 + 150 * i],\n        size: [170, 50],\n        font: '36px Arial',\n        lineHeight: 50,\n        textAlign: 'center',\n        fillColor: '#00e15e',\n        border: [3, '#00e15e'],\n        borderRadius: 25,\n        padding: 30,\n      });\n      bglayer.appendChild(button);\n\n      return button;\n    });\n\n  speedupBtn.id = 'speedUp';\n  speedupBtn.addEventListener('click', (evt) => {\n    fglayer.timeline.playbackRate += 0.2;\n  });\n\n  slowdownBtn.addEventListener('click', (evt) => {\n    fglayer.timeline.playbackRate -= 0.2;\n  });\n\n  pauseBtn.addEventListener('click', (evt) => {\n    fglayer.timeline.playbackRate = 0;\n  });\n\n  playBtn.addEventListener('click', (evt) => {\n    fglayer.timeline.playbackRate = 1;\n  });\n\n  const birdCountLabel = new spritejs.Label();\n  birdCountLabel.attr({\n    pos: [60, 20],\n    font: '36px Arial',\n    fillColor: 'white',\n  });\n\n  bglayer.appendChild(birdCountLabel);\n\n  setInterval(() => {\n    birdCountLabel.text = `playbackRate: ${fglayer.timeline.playbackRate.toFixed(2)}`;\n  }, 100);\n\n  window.scene = scene;\n}());"}}]);