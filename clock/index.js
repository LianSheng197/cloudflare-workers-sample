/**
 * 節錄自目前運作的私人 workers: https://day.ls197.workers.dev/
 * v20210122.1830
 */

let CONFIG = {
    width: undefined,
    /* /size:{width}x{height} */
    height: undefined
}

/**
 * 全域函式：控制輸出 SVG 格式的內容，由各個分頁函式呼叫
 * @param  {string} output
 * @param  {number} code
 * 
 * @return {String}
 */
const F_printSVG = (output, code = 200) => {
    if (code == 200) {
        // 200 OK

        return `
        <svg width="${CONFIG.width || 500}" height="${CONFIG.height || 90}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <rect width="500" height="90" style="fill: #fff; stroke-width: 1; stroke: #333;" />
            <text x="10" y="70" fill="#333" style="font-size: 64px; user-select: none; letter-spacing: -2;">今天是</text>
            ${output}
            <text x="380" y="70" fill="#333" style="font-size: 64px; user-select: none; letter-spacing: -2; font-family:">哦！</text>
        </svg>`;
    } else if (code == 204) {
        // 204 No Content

        return output;
    } else if (code == 403) {
        // 403 Forbidden

        return `
        <svg width="${CONFIG.width || 200}" height="${CONFIG.height || 50}" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <title>403 Forbidden</title>
            <text x="10" y="30" fill="#f33" style="font-size: 24px; user-select: none;">403 Forbidden!</text>
        </svg>`
    } else if (code == 404) {
        // 404 Not Found

        return `
        <svg width="${CONFIG.width || 200}" height="${CONFIG.height || 50}" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <title>404 Not Found</title>
            <text x="10" y="30" fill="#333" style="font-size: 24px; user-select: none;">404 Not Found!</text>
        </svg>`
    }
}

/**
 * 工具函式：取得現在的時分秒
 * @return {object}
 */
const f_getFullTime = () => {
    let d = new Date(Date.now() + 8 * 60 * 60 * 1000);
    let hh = `0${d.getHours()}`.substr(-2);
    let mm = `0${d.getMinutes()}`.substr(-2);
    let ss = `0${d.getSeconds()}`.substr(-2);

    let result = {
        hour: hh,
        minute: mm,
        second: ss
    };

    return result;
}

const f_timeClock = () => {
    let output = "";
    let time = f_getFullTime();

    let rotate = {
        h: (time.hour % 12) * 30 + time.minute / 2 + time.second / 120,
        m: time.minute * 6 + time.second / 10,
        s: time.second * 6
    }

    output = `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-1136 -1136 2272 2272" width="${CONFIG.width || 600}" height="${CONFIG.height || 600}">
        <!-- 修改自 https://github.com/tomchen/animated-svg-clock -->
        <title>Clock</title>
        <style type="text/css">
        #face-outline {
            fill: #fff;
            stroke: #d3d3d3;
            stroke-width: 64;
        }
        #face-use {
            fill: #666;
            stroke: none;
        }
        #hand-h-use,
        #hand-m-use {
            fill: #000;
            stroke: none;
        }
        #hand-s-use {
            fill: #bd2420;
            stroke: none;
        }
        #center-dot {
            fill: #fff;
            stroke: none;
        }
        @keyframes rotation {
            from {
            -ms-transform: rotate(0deg);
            -moz-transform: rotate(0deg);
            -webkit-transform: rotate(0deg);
            -o-transform: rotate(0deg);
            transform: rotate(0deg);
            }
            to {
            -ms-transform: rotate(360deg);
            -moz-transform: rotate(360deg);
            -webkit-transform: rotate(360deg);
            -o-transform: rotate(360deg);
            transform: rotate(360deg);
            }
        }
        #hand-h-use {
            -ms-animation: rotation 43200s linear infinite;
            -moz-animation: rotation 43200s linear infinite;
            -webkit-animation: rotation 43200s linear infinite;
            -o-animation: rotation 43200s linear infinite;
            animation: rotation 43200s linear infinite;
        }
        #hand-m-use {
            -ms-animation: rotation 3600s linear infinite;
            -moz-animation: rotation 3600s linear infinite;
            -webkit-animation: rotation 3600s linear infinite;
            -o-animation: rotation 3600s linear infinite;
            animation: rotation 3600s linear infinite;
        }
        #hand-s-use {
            -ms-animation: rotation 60s linear infinite;
            -moz-animation: rotation 60s linear infinite;
            -webkit-animation: rotation 60s linear infinite;
            -o-animation: rotation 60s linear infinite;
            animation: rotation 60s linear infinite;
        }
        </style>
        <defs>
            <path id="mark-5min" d="M -40,-1000 l 80,0 0,245 -80,0 z"/>
            <path id="mark-min" d="M -15,-1000 l 30,0 0,80  -30,0 z"/>
            <path id="hand-h" transform="rotate(${rotate.h})" d="M -50,-650 l 100,0 10,890 -120,0 z"/>
            <path id="hand-m" transform="rotate(${rotate.m})" d="M -40,-850 l 80,0 10,1200 -100,0 z"/>
            <g id="hand-s" transform="rotate(${rotate.s})">
                <path d="M -20,-550 l 30,0 7,890 -30,0 z"/>
                <path d="M 0,-725 a 105,105 0 0 1 0,210 a 105,105 0 0 1 0,-210 z"/>
            </g>
            <g id="face-30d">
                <use xlink:href="#mark-5min"/>
                <use xlink:href="#mark-min" transform="rotate(06)"/>
                <use xlink:href="#mark-min" transform="rotate(12)"/>
                <use xlink:href="#mark-min" transform="rotate(18)"/>
                <use xlink:href="#mark-min" transform="rotate(24)"/>
            </g>
            <g id="face-90d">
                <use xlink:href="#face-30d"/>
                <use xlink:href="#face-30d" transform="rotate(30)"/>
                <use xlink:href="#face-30d" transform="rotate(60)"/>
            </g>
            <g id="face">
                <use xlink:href="#face-90d"/>
                <use xlink:href="#face-90d" transform="rotate(90)"/>
                <use xlink:href="#face-90d" transform="rotate(180)"/>
                <use xlink:href="#face-90d" transform="rotate(270)"/>
            </g>
        </defs>
        <circle id="face-outline" r="1104"/>
        <use xlink:href="#face" id="face-use"/>
        <use xlink:href="#hand-h" id="hand-h-use"/>
        <use xlink:href="#hand-m" id="hand-m-use"/>
        <use xlink:href="#hand-s" id="hand-s-use"/>
        <circle id="center-dot" r="10"/>
    </svg>
    `;

    return F_printSVG(output, 204);
}

/**
 * 主要函式：判別請求路徑
 * @param {object} event
 * 
 * @return {String}
 */
const Main = event => {
    const PATH = url.match(/https:\/\/.+?(\/.*)$/)[1];
    console.log(PATH);

    if (PATH.match(/\/size:\d+x\d+/)) {
        const cfg = PATH.match(/\/size:(\d+)x(\d+)/);
        f_customSvgSize(cfg[1], cfg[2]);
    }

    if (PATH.match(/^\/time\/clock\.png/)) {
        return f_timeClock();
    } else {
        return "";
    }
}

/**
 * 控制輸出規格
 * @param {String} data
 * @param {Object} request
 * @param {string} type
 * 
 * @return {Promise}
 */
async function handleRequest(data, request, type) {
    const types = {
        svg: "image/svg+xml"
    };

    return new Response(data, {
        headers: {
            "content-type": types[type],
        },
    });
}

/**
 * 監聽請求並輸出
 */
addEventListener('fetch', async event => {
    const data = Main(event);

    console.log(data.length);
    event.respondWith(handleRequest(data, event.request, "svg"));
    console.log("Completed!");
});