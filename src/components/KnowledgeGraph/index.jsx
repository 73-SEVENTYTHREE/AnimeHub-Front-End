import React, {useEffect, useState} from 'react';
import * as d3 from 'd3';
import axios from "axios";
import {Button, Card, Empty, InputNumber} from "antd";

function KnowledgeGraph (props) {
    const [Links, setLinks] = useState([]);
    const [layerCount, setLayerCount] = useState(2);
    const [limitPerLayer, setLimitPerLayer] = useState(6);
    const [update, setUpdate] = useState(false);
    const generateRandomColor = () => {
        const r = Math.floor(Math.random()*200);
        const g = Math.floor(Math.random()*200);
        const b = Math.floor(Math.random()*200);
        return `rgba(${r}, ${g}, ${b}, 0.6)`;
    }
    useEffect(async () => {
        let links  = (await axios.post ('/api/getKnowledge', {guid:props.guid,layerCount,limitPerLayer})).data;
        setLinks(links)
        let graph = document.getElementById('graph');
        if(graph !== null && links.length !== 0){
            graph.parentNode.removeChild(graph);
            graph.remove();
            graph = null;
        }
        if(graph !== null || links.length === 0){
            return;
        }
        const nodes = {};
        links.forEach (function (link) {
            link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
            link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
        });

        const width = document.getElementsByTagName('body')[0].offsetWidth;
        const height = links.length >= 60 ? 1200:800;
        const force = d3.layout.force ()
            .nodes (d3.values (nodes))
            .links (links)
            .size ([width, height])
            .linkDistance (300)
            .linkStrength(0.8)
            .alpha(0.5)
            .gravity(0.05)
            .charge (-1000)
            .on ("tick", tick)
            .start ();

        const svg = d3.select ("#knowledge-graph").append ("svg")
            .attr ("width", width)
            .attr ("height", height)
            .attr('id', 'graph')

        const marker = svg.append ("marker")
                .attr ("id", "resolved")
                .attr ("markerUnits", "userSpaceOnUse")
                .attr ("viewBox", "0 -5 10 10")
                .attr ("refX", links.length >= 60 ? 38:32)
                .attr ("refY", -1)
                .attr ("markerWidth", 12)
                .attr ("markerHeight", 12)
                .attr ("orient", "auto")
                .attr ("stroke-width", 2)
                .append ("path")
                .attr ("d", "M0,-5L10,0L0,5")
                .attr ('fill', '#A254A2');

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
                'dx': 70,
                'dy': 0
            });

        edges_text.append ('textPath')
            .attr ('xlink:href', function (d, i) {
                return '#edgepath' + i
            })
            .style ("pointer-events", "none")
            .style("font-size", links.length >= 60 ? '.6rem':'.8rem')//关系字体大小
            .text (function (d) {
                return d.rela;
            });

        const circle = svg.append ("g").selectAll ("circle")
            .data (force.nodes ())
            .enter ().append ("circle")
            .style ("fill", function (node) {
                var color;
                var link = links[node.index];
                color = "#f3f3f3";
                if (node.name === props.name) color='rgb(55, 133, 140)'
                return color;
            })
            .style ('stroke', function (node) {
                var color;
                var link = links[node.index];
                color = "#A254A2";//边框颜色
                return color;
            })
            .attr ("r", links.length >= 60 ? 35:28)
            .on ("click", function (node) {
                edges_line.style ("stroke-width", function (line) {
                    if (line.source.name === node.name || line.target.name === node.name) {
                        console.log(line)
                        return 2;
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
            .style('font-size', links.length >= 60 ? '.5rem':'.8rem')
            .style ('fill', function (node) {
                var color;
                var link = links[node.index];
                color = "#A254A2"; //字体颜色
                if (node.name === props.name) color='black'
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
                } else if (d.name.length <= 6) {
                    d3.select (this).append ('tspan')
                        .attr ('x', 0)
                        .attr ('y', 2)
                        .text (function () {
                            return d.name;
                        });
                } else {
                    var top = d.name.substring (0, 6);
                    var bot = d.name.substring (6, d.name.length);

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
                return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
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
        const relevantContainer = document.getElementById('relevant-container');
        let resultContainer = document.getElementById('result-container');
        relevantContainer.style.top = resultContainer.offsetHeight + 'px'
    },[props.guid, update])
    return (
        <Card title={'知识图谱'}
              hoverable
              style={{border:'0', minHeight:'40rem'}}
              headStyle={{color:'white', fontSize:'1.3rem', backgroundImage: `linear-gradient(120deg, ${generateRandomColor()} 0, ${generateRandomColor()} 100%)`}}
              extra={Links.length === 0 ? '':
                  <div>
                      <strong color={'white'}>深度</strong>&nbsp;<InputNumber max={10} min={1} defaultValue={layerCount} onChange={value => setLayerCount(value)}/>&nbsp;&nbsp;&nbsp;&nbsp;
                      <strong color={'white'}>广度</strong>&nbsp;<InputNumber max={15} min={1} defaultValue={limitPerLayer} onChange={value => setLimitPerLayer(value)}/>&nbsp;&nbsp;&nbsp;&nbsp;
                      <Button type={'dashed'} size={'middle'} style={{border:'0', zIndex:'2'}} onClick={() => {
                          setUpdate(!update);
                      }}>更新知识图谱</Button>
                  </div>
              }
        >
        <div style={{minHeight:'400px', display:'flex', alignItems:'center', justifyContent:'center'}}>
            {
                Links.length === 0 ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'暂无相关信息'}/>:<div id={'knowledge-graph'} style={{overflow:'hidden'}}/>
            }
        </div>
        </Card>
    )
}
export default KnowledgeGraph;