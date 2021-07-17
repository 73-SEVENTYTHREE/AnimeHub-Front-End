import React from 'react';
import {useMount} from "ahooks";
import * as d3 from 'd3';

function KnowledgeGraph (props) {

    useMount(() => {
        const links =
            [
                {source: '艾伦·麦席森·图灵', target: 'Alan Mathison Turing', 'rela': '外文名', type: 'resolved'},
                {source: '艾伦·麦席森·图灵', target: '英国', 'rela': '国籍', type: 'resolved'},
                {source: '艾伦·麦席森·图灵', target: '英国伦敦', 'rela': '出生地', type: 'resolved'},
                {source: '艾伦·麦席森·图灵', target: '1912年6月23日', 'rela': '出生日期', type: 'resolved'},
                {source: '艾伦·麦席森·图灵', target: '1954年6月7日', 'rela': '逝世日期', type: 'resolved'},
                {source: '艾伦·麦席森·图灵', target: '数学家，逻辑学家，密码学家', 'rela': '职业', type: 'resolved'},
                {source: '艾伦·麦席森·图灵', target: '剑桥大学国王学院，普林斯顿大学', 'rela': '毕业院校', type: 'resolved'},
                {source: '艾伦·麦席森·图灵', target: '“计算机科学之父”', 'rela': '主要成就', type: 'resolved'},
                {source: '艾伦·麦席森·图灵', target: '提出“图灵测试”概念', 'rela': '主要成就', type: 'resolved'},
                {source: '艾伦·麦席森·图灵', target: '人工智能', 'rela': '主要成就', type: 'resolved'},
                {source: '艾伦·麦席森·图灵', target: '破解德国的著名密码系统Enigma', 'rela': '主要成就', type: 'resolved'},
                {source: '艾伦·麦席森·图灵', target: '《论数字计算在决断难题中的应用》', 'rela': '代表作品', type: 'resolved'},
                {source: '艾伦·麦席森·图灵', target: '《机器能思考吗？》', 'rela': '代表作品', type: 'resolved'},
            ];

        const nodes = {};

        links.forEach (function (link) {
            link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
            link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
        });

        const width = 800, height = 800;

        const force = d3.layout.force ()
            .nodes (d3.values (nodes))
            .links (links)
            .size ([width, height])
            .linkDistance (180)
            .charge (-1500)
            .on ("tick", tick)
            .start ();

        const svg = d3.select ("#knowledge-graph").append ("svg")
            .attr ("width", width)
            .attr ("height", height);

        const marker =
            svg.append ("marker")
                .attr ("id", "resolved")
                .attr ("markerUnits", "userSpaceOnUse")
                .attr ("viewBox", "0 -5 10 10")
                .attr ("refX", 32)
                .attr ("refY", -1)
                .attr ("markerWidth", 12)
                .attr ("markerHeight", 12)
                .attr ("orient", "auto")
                .attr ("stroke-width", 2)
                .append ("path")
                .attr ("d", "M0,-5L10,0L0,5")
                .attr ('fill', '#000000');

        const edges_line = svg.selectAll (".edgepath")
            .data (force.links ())
            .enter ()
            .append ("path")
            .attr ({
                'd': function (d) {
                    return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y
                },
                'class': 'edgepath',
                'id': function (d, i) {
                    return 'edgepath' + i;
                }
            })
            .style ("stroke", function (d) {
                var lineColor;
                lineColor = "#B43232";
                return lineColor;
            })
            .style ("pointer-events", "none")
            .style ("stroke-width", 0.5)
            .attr ("marker-end", "url(#resolved)");

        const edges_text = svg.append ("g").selectAll (".edgelabel")
            .data (force.links ())
            .enter ()
            .append ("text")
            .style ("pointer-events", "none")
            .attr ({
                'class': 'edgelabel',
                'id': function (d, i) {
                    return 'edgepath' + i;
                },
                'dx': 80,
                'dy': 0
            });

        edges_text.append ('textPath')
            .attr ('xlink:href', function (d, i) {
                return '#edgepath' + i
            })
            .style ("pointer-events", "none")
            .style("font-size", '.8rem')
            .text (function (d) {
                return d.rela;
            });

        const circle = svg.append ("g").selectAll ("circle")
            .data (force.nodes ())
            .enter ().append ("circle")
            .style ("fill", function (node) {
                var color;
                var link = links[node.index];
                color = "#F9EBF9";
                return color;
            })
            .style ('stroke', function (node) {
                var color;
                var link = links[node.index];
                color = "#A254A2";
                return color;
            })
            .attr ("r", 28)
            .on ("click", function (node) {
                edges_line.style ("stroke-width", function (line) {
                    console.log (line);
                    if (line.source.name === node.name || line.target.name === node.name) {
                        return 4;
                    } else {
                        return 0.5;
                    }
                });
            })
            .call (force.drag);

        const text = svg.append ("g").selectAll ("text")
            .data (force.nodes ())
            .enter ()
            .append ("text")
            .attr ("dy", ".35em")
            .attr ("text-anchor", "middle")
            .style('font-size', '.5rem')
            .style ('fill', function (node) {
                var color;
                var link = links[node.index];
                color = "#A254A2";
                return color;
            }).attr ('x', function (d) {
                var re_en = /[a-zA-Z]+/g;
                if (d.name.match (re_en)) {
                    d3.select (this).append ('tspan')
                        .attr ('x', 0)
                        .attr ('y', 2)
                        .text (function () {
                            return d.name;
                        });
                } else if (d.name.length <= 4) {
                    d3.select (this).append ('tspan')
                        .attr ('x', 0)
                        .attr ('y', 2)
                        .text (function () {
                            return d.name;
                        });
                } else {
                    var top = d.name.substring (0, 4);
                    var bot = d.name.substring (4, d.name.length);

                    d3.select (this).text (function () {
                        return '';
                    });

                    d3.select (this).append ('tspan')
                        .attr ('x', 0)
                        .attr ('y', -7)
                        .text (function () {
                            return top;
                        });

                    d3.select (this).append ('tspan')
                        .attr ('x', 0)
                        .attr ('y', 10)
                        .text (function () {
                            return bot;
                        });
                }
            });

        function tick () {
            circle.attr ("transform", transform1);
            text.attr ("transform", transform2);

            edges_line.attr ('d', function (d) {
                const path = 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
                return path;
            });

            edges_text.attr ('transform', function (d, i) {
                if (d.target.x < d.source.x) {
                    const bbox = this.getBBox ();
                    const rx = bbox.x + bbox.width / 2;
                    const ry = bbox.y + bbox.height / 2;
                    return 'rotate(180 ' + rx + ' ' + ry + ')';
                } else {
                    return 'rotate(0)';
                }
            });
        }

        function transform1 (d) {
            return "translate(" + d.x + "," + d.y + ")";
        }

        function transform2 (d) {
            return "translate(" + (d.x) + "," + d.y + ")";
        }
    })

    return (
        <div id={'knowledge-graph'} style={{width:'100%', height:'100%', display:'flex', justifyContent:'center', alignItems:'center',
         overflow:'auto'}}/>
    )
}

export default KnowledgeGraph;