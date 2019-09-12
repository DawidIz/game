console.log('work')
//main div with canvas
const game_div = document.createElement('div')
document.body.appendChild(game_div)

//background canvas
const bg_canvas = document.createElement('canvas')
const bg_context = bg_canvas.getContext('2d')
game_div.appendChild(bg_canvas)

//game canvas
const g_canvas = document.createElement('canvas')
const g_context = g_canvas.getContext('2d')
game_div.appendChild(g_canvas)

//ui canvas
const ui_canvas = document.createElement('canvas')
const ui_context = ui_canvas.getContext('2d')

game_div.appendChild(ui_canvas)



init = () => {
    window.requestAnimationFrame(loop)
}

const sprite = new Sprite()
const map = new Map()
const camera = new Camera(bg_context,map)


sprite.context.scale(0.5,0.5)

loop = () => {
    camera.render()

    sprite.update()
    g_context.clearRect(0,0,600,600)

    g_context.drawImage(sprite.sprite,0,0)
    g_context.drawImage(sprite.sprite,100,0)
    
    window.requestAnimationFrame(loop)
}

init()