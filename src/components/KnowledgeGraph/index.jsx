import React, {useEffect, useState} from 'react';
import * as d3 from 'd3';
import axios from "axios";
import {Button} from "antd";

function KnowledgeGraph (props) {
    useEffect(async () => {
        let links  = (await axios.post ('/api/getKnowledge', {guid:props.guid})).data;
        console.log(links);
        if(document.getElementById('graph') !== null || links.length === 0){
            return;
        }
        const nodes = {};
        links.forEach (function (link) {
            link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
            link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
        });

        const width = 1400, height = 1000;
        const force = d3.layout.force ()
            .nodes (d3.values (nodes))
            .links (links)
            .size ([width, height])
            .linkDistance (200)
            .charge (-700)
            .on ("tick", tick)
            .start ();

        const svg = d3.select ("#knowledge-graph").append ("svg")
            .attr ("width", width)
            .attr ("height", height)
            .attr('id', 'graph')

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
    },[props.guid])

    return (
        <div id={'knowledge-graph'}/>
    )
}

export default KnowledgeGraph;