(window.webpackJsonp=window.webpackJsonp||[]).push([[123],{639:function(n,e,t){"use strict";t.r(e),e.default="/* globals d3 */\nconst {Scene} = spritejs;\nconst container = document.getElementById('stage');\nconst scene = new Scene({\n  container,\n  width: 800,\n  height: 600,\n  mode: 'stickyWidth',\n});\n\nconst layer = d3.select(scene.layer('fglayer'));\ndocument.querySelector('#stage canvas').style.backgroundColor = '#222830';\n\nconst width = 1330;\nconst height = 520;\n\nconst projection = d3.geoMercator()\n  .center([107, 38])\n  .scale(width / 2 - 40)\n  .translate([width / 4 + 80, height / 2]);\n\nconst path = d3.geoPath().projection(projection);\n\nd3.json('https://s1.ssl.qhres2.com/static/6c6d50baf39026d5.json', (err, data) => {\n  if(err) throw new Error(err);\n\n  layer.selectAll('path')\n    .data(data.features)\n    .enter()\n    .append('path')\n    .attr('strokeColor', 'rgba(0,0,0,0.4)')\n    .attr('lineWidth', 1)\n    .attr('d', path)\n    .attr('fillColor', '#2f3644')\n    .on('click', (d) => {\n      /* eslint-disable no-console */\n      console.log(d.properties.name);\n      /* eslint-enable no-console */\n    })\n    .on('mouseenter', function (d) {\n      this.attr('fillColor', '#00c2ff');\n    })\n    .on('mouseleave', function (d) {\n      this.attr('fillColor', '#2f3644');\n    });\n});"}}]);