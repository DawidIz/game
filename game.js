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

////////////////////////////

const PLAYER = {
    image : {
        src : './img/body.png'
    },
    tiles : {
        width: 80,
        height: 110,
        rows : 4,
        cols: 4
    },
    animations : {
        BASIC : [
            { x:0, y:0, t:200 },
            { x:1, y:0, t:200 },
        ]
    }
}

class Animation{
    constructor(DATA){
        this.DATA = DATA
        this.time = new Date()
        this.frame = 0
        this.frames = []

    }

    update(){

    }

}

class Player {
    constructor(data){
        this.data = data
        this.x = 20
        this.y = 0
        this.image = new Image()
        this.image.src = this.data.image.src
    }

    render(ctx){
        const width = this.data.tiles.width
        const height = this.data.tiles.height
        // const x = this.data.animation[0].x
        const x = 0
        // const y = this.data.animation[0].y
        const y = 0
        ctx.drawImage(
            this.image,
            width * x,
            height * y,
            width,
            height,
            this.x,
            this.y,
            width,
            height
        )
    }

}

////////////////////////////
const player = new Image()
const p = new Player(PLAYER)

init = () => {
    console.log('init')
    player.src = './img/body.png'
    window.requestAnimationFrame(loop)
}

const test = new Sprite()

loop = () => {
    console.log('loop')
    // g_context.drawImage(player,0,0,60,100,0,0,60,100)
    p.render(g_context)

    test.update()
    bg_context.fillRect(0,0,600,600)
    bg_context.drawImage(test.sprite,0,0)
    bg_context.drawImage(test.sprite,100,0)

    window.requestAnimationFrame(loop)
}

init()





