import { useCallback, useRef } from 'react'
import '@/styles/splitter.css'
export const Splitter = ({
    leftComponent,
    rightComponent
}: {leftComponent: JSX.Element,
    rightComponent: JSX.Element
}) => {
    const containerRef =useRef<HTMLDivElement>()
    const firstHalfRef = useRef<HTMLDivElement>()
    const secondHalfRef = useRef<HTMLDivElement>()
    const resizerRef = useRef<HTMLDivElement>()

    const handleMouseDown = useCallback((e: MouseEvent) => {
        const startPos = {
            x: e.clientX,
            y: e.clientY,
        }
        const currentLeftWidth = firstHalfRef.current.getBoundingClientRect().width

        const handleMouseMove = (e: MouseEvent) => {
            const dx = e.clientX - startPos.x
            // const dy = e.clientY - startPos.y
            updateWidth(currentLeftWidth, dx)
            updateCursor()
        }

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
            resetCursor()
        }

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
    }, [])

    const handleTouchStart = useCallback((e: TouchEvent) => {
        const touch = e.touches[0]
        const startPos = {
            x: touch.clientX,
            y: touch.clientY,
        }
        const currentLeftWidth = firstHalfRef.current.getBoundingClientRect().width

        const handleTouchMove = (e: TouchEvent) => {
            const touch = e.touches[0]
            const dx = touch.clientX - startPos.x
            // const dy = touch.clientY - startPos.y
            updateWidth(currentLeftWidth, dx)
            updateCursor()
        }

        const handleTouchEnd = () => {
            document.removeEventListener('touchmove', handleTouchMove)
            document.removeEventListener('touchend', handleTouchEnd)
            resetCursor()
        }

        document.addEventListener('touchmove', handleTouchMove)
        document.addEventListener('touchend', handleTouchEnd)
    }, [])

    const updateWidth = (currentLeftWidth, dx) => {
        const container = containerRef.current
        const firstHalfEle = firstHalfRef.current

        if (!container || !firstHalfEle) {
            return
        }

        const containerWidth = container.getBoundingClientRect().width
        const delta = currentLeftWidth + dx
        const newFirstHalfWidth = delta * 100 / containerWidth
        firstHalfEle.style.width = `${newFirstHalfWidth}%`
    }

    const updateCursor = () => {
        const container = containerRef.current
        const firstHalfEle = firstHalfRef.current
        const resizerEle = resizerRef.current
        const secondHalfEle = secondHalfRef.current

        if (!container || !firstHalfEle || !resizerEle || !secondHalfEle) {
            return
        }

        resizerEle.style.cursor = 'ew-resize'
        document.body.style.cursor = 'ew-resize'
        firstHalfEle.style.userSelect = 'none'
        firstHalfEle.style.pointerEvents = 'none'
        secondHalfEle.style.userSelect = 'none'
        secondHalfEle.style.pointerEvents = 'none'
    }

    const resetCursor = () => {
        const container = containerRef.current
        const firstHalfEle = firstHalfRef.current
        const resizerEle = resizerRef.current
        const secondHalfEle = secondHalfRef.current

        if (!container || !firstHalfEle || !resizerEle || !secondHalfEle) {
            return
        }

        resizerEle.style.removeProperty('cursor')
        document.body.style.removeProperty('cursor')
        firstHalfEle.style.removeProperty('user-select')
        firstHalfEle.style.removeProperty('pointer-events')
        secondHalfEle.style.removeProperty('user-select')
        secondHalfEle.style.removeProperty('pointer-events')
    }

    return (
        <div className="splitter" ref={containerRef}>
            <div className="splitter__first" ref={firstHalfRef}>
                { leftComponent }
            </div>
            <div
                className="splitter__resizer"
                ref={resizerRef}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
            />
            <div className="splitter__second" ref={secondHalfRef}>
                { rightComponent }
            </div>
        </div>
    )
}

export default Splitter