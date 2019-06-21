

const init = function () {
    var keys = {
        '0': { 0: 'q', 1: 'w', 2: 'e', 3: 'r', 4: 't', 5: 'y', 6: 'u', 7: 'i', 8: 'o', 9: 'p', 'length': 10 },
        '1': { 0: 'a', 1: 's', 2: 'd', 3: 'f', 4: 'g', 5: 'h', 6: 'j', 7: 'k', 8: 'l', 'length': 9 },
        '2': { 0: 'z', 1: 'x', 2: 'c', 3: 'v', 4: 'b', 5: 'n', 6: 'm', 'length': 7 },
        'length': 3,
    }
    var hash = {
        'q': 'www.qq.com',
        'w': 'www.weibo.com',
        'z': 'www.zhihu.com',
        'b': 'www.baidu.com',
        'd': 'www.douban.com',
    }
    var hashInLocalStorage = getFromLocalStorage('hash')
    if (hashInLocalStorage) {
        hash = hashInLocalStorage
    }
    return {
        "keys": keys,
        "hash": hash
    }
}
const getFromLocalStorage = function (name) {
    return JSON.parse(localStorage.getItem(name) || null)
}

const c = function (tagName) {
    return document.createElement(tagName)
}
const createSpan = function (textContent) {
    let span = c('span')
    span.textContent = textContent
    span.className = 'text'
    return span
}
const createButton = function (id) {
    let button = c('button')
    button.textContent = 'E'
    button.id = id
    button.onclick = function (e) {
        let b = e.target
        let k = b.id
        let w = prompt('给我一个网站,你可以用相应的按键快捷进入')
        let i = b.previousSibling
        console.log(i)
        hash[k] = w
        i.src = 'http://' + w + '/favicon.ico'
        i.onerror = function (e) {
            e.target.src = '../img/icon.png'
        }
        localStorage.setItem('hash', JSON.stringify(hash))
    }
    return button
}
const createImg = function (domain) {
    let img = c('img')
    if (domain) {
        img.src = 'http://' + domain + '/favicon.ico'
    } else {
        img.src = '../img/icon.png'
    }
    img.onerror = function (e) {
        e.target.src = '../img/icon.png'
    }
    return img
}
const gennerateKeyboard = function (keys, hash) {
    var keybox = document.getElementById('keyboard')
    var index = 0
    while (index < keys['length']) {
        let key = c('div')
        key.className = 'row'
        keybox.appendChild(key)
        let row = keys[index]
        let i = 0
        while (i < row['length']) {
            let kbd = c('kbd')
            let bt = createButton(row[i])

            let span = createSpan(row[i])

            let img = createImg(hash[row[i]])

            kbd.appendChild(span)
            key.appendChild(kbd)
            kbd.appendChild(img)
            kbd.appendChild(bt)
            kbd.className = 'key'
            i = i + 1
        }
        index = index + 1
    }
}
const listenKeyboard = function (hash) {
    document.onkeypress = function (press) {
        if (!bodyState) {
            let k = press['key']
            Web_side = hash[k]
            window.open('http://' + Web_side, '_blank')
            console.log(Web_side)
        }
    }
}
const listenLight = function () {
    var lightswitch = document.getElementById('lightswitch')
    var light = true
    lightswitch.onclick = function (e) {
        if (light) {
            document.body.className = 'night'
            light = false
        } else {
            document.body.removeAttribute('class')
            light = true
        }
    }
}
//初始化数据
var HashK = init()
var keys = HashK['keys']
var hash = HashK['hash']

//生成键盘
gennerateKeyboard(keys, hash)

//监听键盘
listenKeyboard(hash)
//监听切换主题开关
listenLight()