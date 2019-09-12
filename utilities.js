getMousePosition = (parent,event) => {
    return {
        x: event.clientX - parent.offsetLeft,
        y: event.clientY - parent.offsetTop
    }
}

mouseIn = (element,mouse,margin = 0) => {
    const x1 = element.x - margin
    const y1 = element.y - margin
    const x2 = element.x + element.w + margin
    const y2 = element.y + element.h + margin

    if(mouse.x <= x2 && mouse.x >= x1 && mouse.y <= y2 && mouse.y >= y1)
        return true

    return false
}