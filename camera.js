const CAMERA_WIDTH = 300
const CAMERA_HEIGHT = 150


class Camera{
    constructor(bg_ctx,map){
        this.bg_ctx = bg_ctx
        this.map = map
        this.redraw = true

        this.scroll ={
            x : 0,
            y : 0,
        }

        this.offset = {
            x : 0,
            y : 0
        }
    }

    offsetX(value){
        const prev_offset_x = this.offset.x
        const max_offset_x = this.map.width - CAMERA_WIDTH
        this.offset.x = Math.min(Math.max(this.offset.x + value,0),max_offset_x)

        if(prev_offset_x !== this.offset.x) this.redraw = true
    }

    offsetY(value){
        const prev_offset_y = this.offset.y
        const max_offset_y = this.map.height - CAMERA_HEIGHT
        this.offset.y = Math.min(Math.max(this.offset.y + value,0),max_offset_y)

        if(prev_offset_y !== this.offset.y) this.redraw = true
    }

    scroll_camera = () =>{
        this.offsetX(this.scroll.x)
        this.offsetY(this.scroll.y)
    }

    isInside(){
        return true
    }

    render(){
        this.scroll_camera()
        //check if render require
        if(this.redraw){
            this.bg_ctx.drawImage(
                map.map_canvas,
                0 + this.offset.x,
                0 + this.offset.y,
                CAMERA_WIDTH,
                CAMERA_HEIGHT,
                0,
                0,
                CAMERA_WIDTH,
                CAMERA_HEIGHT)

            this.redraw = false
        }
    }
}


