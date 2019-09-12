//scroll map 
bg_canvas.addEventListener('mouseover',(event)=>{
    bg_canvas.addEventListener('mousemove',handleMouse)
})

bg_canvas.addEventListener('mouseout',(event)=>{
    bg_canvas.removeEventListener('mousemove',handleMouse)

    //clear
    camera.scroll.x = 0
    camera.scroll.y = 0
})

handleMouse = event => {
    const gap = 20
    const w = event.target.width
    const h = event.target.height
    
    const mouse = getMousePosition(event)

    if(mouse.x <= gap)
        camera.scroll.x = -2
    else if(mouse.x >= w - gap)
        camera.scroll.x = 2
    else 
        camera.scroll.x = 0

    if(mouse.y <= gap)
        camera.scroll.y = -2
    else if(mouse.y >= h - gap)
        camera.scroll.y = 2
    else 
        camera.scroll.y = 0
}
