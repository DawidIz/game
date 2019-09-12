const MENU_FONT = {
    DEFAULT : {
        font : 'Arial',
        align : 'left',
        baseline : 'top',
        fillStyle : 'black',
    }
}

class MenuItem{
    constructor(content,size = 20,font = MENU_FONT.DEFAULT){
        this.font = font
        this.size = size
        this.content = content
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')
        this.redraw = false

        this.x = 0
        this.y = 0
        this.w = 0
        this.h = size

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
        this.w = this.canvas.width = Math.ceil(this.ctx.measureText(this.content).width)
        this.ctx = this.canvas.getContext('2d')
        //set again font for new context
        this.init()
    }

    render(){
        const {ctx,content,canvas} = this

        ctx.save()
        ctx.fillStyle = 'grey'
        ctx.fillRect(0,0,canvas.width,this.size)
        ctx.restore()

        ctx.fillText(content,0,0)
    }


}

class Menu{
    constructor(canvas){
        this.button_size = 20
        this.button_spacing = 10

        this.active_button = null

        this.canvas = canvas
        this.canvas.addEventListener('mousemove',this.handleMouseMove)
        this.ctx = this.canvas.getContext('2d')

        this.buttons = [
            new MenuItem('New game'),
            new MenuItem('Load game'),
            new MenuItem('Options'),
            new MenuItem('Quit')
        ]

        this.init()
    }

    init(){
        this.buttons.forEach((button,index) => {
            button.y = index * (this.button_size + this.button_spacing)
            button.w = button.canvas.width
            this.ctx.drawImage(button.canvas,button.x,button.y)
        })
    }

    render(){
        this.buttons.forEach(button => {
            if(button.redraw){
                console.log('redraw')
                this.ctx.drawImage(button.canvas,button.x,button.y)
                button.redraw = false 
            }       
        })
    }

    handleMouseMove = (event) =>{
        const mouse = getMousePosition(this.canvas,event)

        this.buttons.forEach((button,index) => {
            if(mouseIn(button,mouse)){
                this.active_button = index
                console.log(index)
                button.ctx.fillStyle = 'red'
                button.render()
                button.redraw = true
            }
            else if(this.active_button === index){
                this.active_button = null
                console.log('out')
                button.ctx.fillStyle = 'green'
                button.render()
                button.redraw = true

            }
        })

    }
}



    // this.canvas.addEventListener('click',this.eventClean)

    // eventClean = (event) =>{
    //     this.canvas.removeEventListener('mousemove',this.handleMouseMove)
    //     console.log('clean')
    // }