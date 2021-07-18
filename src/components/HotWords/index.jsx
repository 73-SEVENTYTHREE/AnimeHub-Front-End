import React from 'react';
import {useMount, useMouse} from 'ahooks'
import './index.css'
import {Link} from "react-router-dom";

function HotWords (props) {
    const generateRandomColor = () => {
        const r = Math.floor(Math.random()*256);
        const g = Math.floor(Math.random()*256);
        const b = Math.floor(Math.random()*256);
        return 'rgb' + '(' + r + ',' + g + ',' + b + ')';
    }
    useMount(() => {
        let radius = 150;
        let dtr = Math.PI / 180;
        let d = 300;

        let mcList = [];
        let active = false;
        let lasta = 1;
        let lastb = 1;
        let distr = true;
        let tspeed = 2;
        let size = 250;

        let mouseX = 0;
        let mouseY = 0;

        let howElliptical = 1;

        let aA = null;
        let oDiv = null;
        let sa = 0
        let ca = 0
        let sb = 0
        let cb = 0
        let sc = 0
        let cc = 0
        let per;
        let i;
        let oTag = null;

        oDiv = document.getElementById('hotwords');

        aA = oDiv.getElementsByTagName('a');
        // Array.from(aA).forEach(item => {
        //     item.style.color = generateRandomColor();
        // })

        for (i = 0; i < aA.length; i++) {
            oTag = {};

            oTag.offsetWidth = aA[i].offsetWidth;
            oTag.offsetHeight = aA[i].offsetHeight;

            mcList.push(oTag);
        }

        sineCosine(0, 0, 0);

        positionAll();

        oDiv.onmouseover = function() {
            active = true;
        };

        oDiv.onmouseout = function() {
            active = false;
        };

        oDiv.onmousemove = function(ev) {
            let oEvent = ev;

            mouseX = oEvent.clientX - (oDiv.offsetLeft + oDiv.offsetWidth / 2);
            mouseY = oEvent.clientY - (oDiv.offsetTop + oDiv.offsetHeight / 2);

            mouseX /= 5;
            mouseY /= 5;
        };
        //requestAnimationFrame效果
        (function animloop() {
            update();
            window.requestAnimationFrame(animloop);
        })();

        function update() {
            let a;
            let b;

            if (active) {
                a = (-Math.min(Math.max(-mouseY, -size), size) / radius) * tspeed;
                b = (Math.min(Math.max(-mouseX, -size), size) / radius) * tspeed;
            } else {
                a = lasta * 0.98;
                b = lastb * 0.98;
            }

            lasta = a;
            lastb = b;

            if (Math.abs(a) <= 0.1 && Math.abs(b) <= 0.1) {
                return;
            }

            let c = 0;
            sineCosine(a, b, c);
            for (let j = 0; j < mcList.length; j++) {
                let rx1 = mcList[j].cx;
                let ry1 = mcList[j].cy * ca + mcList[j].cz * (-sa);
                let rz1 = mcList[j].cy * sa + mcList[j].cz * ca;

                let rx2 = rx1 * cb + rz1 * sb;
                let ry2 = ry1;
                let rz2 = rx1 * (-sb) + rz1 * cb;

                let rx3 = rx2 * cc + ry2 * (-sc);
                let ry3 = rx2 * sc + ry2 * cc;
                let rz3 = rz2;

                mcList[j].cx = rx3;
                mcList[j].cy = ry3;
                mcList[j].cz = rz3;

                per = d / (d + rz3);

                mcList[j].x = (howElliptical * rx3 * per) - (howElliptical * 2);
                mcList[j].y = ry3 * per;
                mcList[j].scale = per;
                mcList[j].alpha = per;

                mcList[j].alpha = (mcList[j].alpha - 0.6) * (10 / 6);
            }

            doPosition();
            depthSort();
        }

        function depthSort() {
            let i = 0;
            let aTmp = [];

            for (i = 0; i < aA.length; i++) {
                aTmp.push(aA[i]);
            }

            aTmp.sort(function(vItem1, vItem2) {
                if (vItem1.cz > vItem2.cz) {
                    return -1;
                } else if (vItem1.cz < vItem2.cz) {
                    return 1;
                } else {
                    return 0;
                }
            });

            for (i = 0; i < aTmp.length; i++) {
                aTmp[i].style.zIndex = i;
            }
        }

        function positionAll() {
            let phi = 0;
            let theta = 0;
            let max = mcList.length;
            let i = 0;

            let aTmp = [];
            let oFragment = document.createDocumentFragment();

            // 随机排序
            for (i = 0; i < aA.length; i++) {
                aTmp.push(aA[i]);
            }

            aTmp.sort(function() {
                return Math.random() < 0.5 ? 1 : -1;
            });

            for (i = 0; i < aTmp.length; i++) {
                oFragment.appendChild(aTmp[i]);
            }

            oDiv.appendChild(oFragment);

            for (let i = 1; i < max + 1; i++) {
                if (distr) {
                    phi = Math.acos(-1 + (2 * i - 1) / max);
                    theta = Math.sqrt(max * Math.PI) * phi;
                } else {
                    phi = Math.random() * (Math.PI);
                    theta = Math.random() * (2 * Math.PI);
                }
                // 坐标变换
                mcList[i - 1].cx = radius * Math.cos(theta) * Math.sin(phi);
                mcList[i - 1].cy = radius * Math.sin(theta) * Math.sin(phi);
                mcList[i - 1].cz = radius * Math.cos(phi);

                aA[i - 1].style.left = mcList[i - 1].cx + oDiv.offsetWidth / 2
                    - mcList[i - 1].offsetWidth / 2 + 'px';
                aA[i - 1].style.top = mcList[i - 1].cy + oDiv.offsetHeight / 2
                    - mcList[i - 1].offsetHeight / 2 + 'px';
            }
        }

        function doPosition() {
            let l = oDiv.offsetWidth / 2;
            let t = oDiv.offsetHeight / 2;
            for (let i = 0; i < mcList.length; i++) {
                aA[i].style.left = mcList[i].cx + l - mcList[i].offsetWidth / 2 + 'px';
                aA[i].style.top = mcList[i].cy + t - mcList[i].offsetHeight / 2 + 'px';

                aA[i].style.fontSize = Math.ceil(12 * mcList[i].scale / 2) + 8 + 'px';

                aA[i].style.filter = "alpha(opacity=" + 100 * mcList[i].alpha + ")";
                aA[i].style.opacity = mcList[i].alpha;
            }
        }

        function sineCosine(a, b, c) {
            sa = Math.sin(a * dtr);
            ca = Math.cos(a * dtr);
            sb = Math.sin(b * dtr);
            cb = Math.cos(b * dtr);
            sc = Math.sin(c * dtr);
            cc = Math.cos(c * dtr);
        }
    })
    return (
        <div id="hotwords">
            <Link to={{pathname:'/detailInfo', state:{name:'伊藤诚', type:'real_person'}}}>伊藤诚</Link>
            <Link to={{pathname:'/detailInfo', state:{name:'我妻由乃', type:'anime'}}}>我妻由乃</Link>
            <a href="http://www.lanrentuku.com" target="_blank">秋月爱莉</a>
            <Link to={{pathname:'/detailInfo', state:{name:'工作细胞', type:'anime'}}}>工作细胞</Link>
            <a href="http://www.lanrentuku.com" target="_blank">时崎狂三</a>
            <a href="http://www.lanrentuku.com" target="_blank">漩涡鸣人</a>
            <Link to={{pathname:'/detailInfo', state:{name:'火影忍者', type:'anime'}}}>火影忍者</Link>
            <Link to={{pathname:'/detailInfo', state:{name:'进击的巨人', type:'anime'}}}>进击的巨人</Link>
            <Link to={{pathname:'/detailInfo', state:{name:'花泽香菜', type:'real_person'}}}>花泽香菜</Link>
            <Link to={{pathname:'/detailInfo', state:{name:'埃罗芒阿老师', type:'anime'}}}>埃罗芒阿老师</Link>
            <Link to={{pathname:'/detailInfo', state:{name:'名侦探柯南', type:'anime'}}}>名侦探柯南</Link>
            <Link to={{pathname:'/detailInfo', state:{name:'廻廻奇譚', type:'music'}}}>廻廻奇譚</Link>
            <a href="http://www.lanrentuku.com" target="_blank">白上吹雪</a>
            <Link to={{pathname:'/detailInfo', state:{name:'从零开始的异界生活', type:'anime'}}}>从零开始的异界生活</Link>
            <Link to={{pathname:'/detailInfo', state:{name:'海贼王', type:'anime'}}}>海贼王</Link>
        </div>
    );
}

export default HotWords;