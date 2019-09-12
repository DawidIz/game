const ALIGN = {
    START : 'start',
    END : 'end',
    LEFT : 'left',
    CENTER : 'center',
    RIGHT : 'right',
}

const BASELINE = {
    TOP : 'top',
    BOT : 'bottom',
    MID : 'middle',
    ALPHABETIC : 'alphabetic',
    HANGING : 'hanging'
}

const FONTS = {
    DEFAULT : {
        font : 'Arial',
        align : ALIGN.LEFT,
        baseline : BASELINE.TOP,

        fill : true,
        fillStyle : 'black',

        stroke :false,
        strokeStyle : 'red',
    }
}

const MENU_FONT = {
    
}

class Text{
    constructor(content,size = 20,font = FONTS.DEFAULT){
        this.font = font
        this.size = size
        this.content = content
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')

        //set font
        this.init()
        //set canvas width based on text 
        this.prerender()
        //render
        this.render()
    }

    init(){
        const {font,align,baseline,strokeStyle,fillStyle} = this.font
        const {ctx,size} = this

        ctx.font = `${size}px ${font}`
        ctx.textAlign = align
        ctx.textBaseline = baseline
        ctx.strokeStyle = strokeStyle
        ctx.fillStyle = fillStyle
    }

    prerender(){
        this.canvas.width = Math.ceil(this.ctx.measureText(this.content).width)
        this.ctx = this.canvas.getContext('2d')
        //set again font for new context
        this.init()
    }

    render(){
        const {ctx,content,font,canvas} = this

        ctx.save()
        ctx.fillStyle = 'grey'
        ctx.fillRect(0,0,canvas.width,this.size)
        ctx.restore()

        if(font.stroke)
            ctx.strokeText(this.content,0,0)
        if(font.fill)
            ctx.fillText(content,0,0)
    }


}

class Button{
    constructor(text){
        this.text = new Text(text)
        this.x = 0
        this.y = 0
        this.w = 20
        this.h = 20
    }

    hover(){
        this.text.ctx.fillStyle = 'yellow'
        this.text.render()
    }
    
    over(){
        console.log('over')
    }
}

//x,y,w,h

class Menu{
    constructor(canvas){
        this.button_size = 20
        this.button_spacing = 10

        this.active_button = null

        this.canvas = canvas
        this.canvas.addEventListener('mouseover',this.handleMouseMove)
        this.ctx = this.canvas.getContext('2d')

        this.buttons = [
            new Button('New game'),
            new Button('New game'),
            new Button('Options'),
            new Button('Quit')
        ]

        this.init()
    }

    init(){
        this.buttons.forEach((button,index) => {
            button.y = index * (this.button_size + this.button_spacing)
            button.w = button.text.canvas.width
            this.ctx.drawImage(button.text.canvas,button.x,button.y)
        })
    }

    handleMouseMove = (event) =>{
        console.log('over')
        const mouse = getMousePosition(this.canvas,event)

        this.buttons.forEach((button,index) => {
            if(mouseIn(button,mouse))
            {
                this.active_button = index
                button.hover()
                this.ctx.drawImage(button.text.canvas,button.x,button.y)
                console.log(index)
            }
            else if(this.active_button !== null){
                const id = this.active_button
                this.active_button = null
                this.buttons[id].over()
                this.ctx.drawImage(button.text.canvas,this.buttons[id].x,this.buttons[id].y)
            }
                
        })

    }

    // this.canvas.addEventListener('click',this.eventClean)

    // eventClean = (event) =>{
    //     this.canvas.removeEventListener('mousemove',this.handleMouseMove)
    //     console.log('clean')
    // }
}