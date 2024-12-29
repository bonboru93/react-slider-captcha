import React, { useState } from "react"
import "./SliderCaptcha.less"

import defaultBgImg from "./assets/bg.jpg"
import defaultPuzzleImg from "./assets/puzzle.png"

const BG_WIDTH = 320
const PUZZLE_WIDTH = 60
const HANDLER_SIZE = 40
const PUZZLE_WALK = BG_WIDTH - PUZZLE_WIDTH
const HANDLER_WALK = BG_WIDTH - HANDLER_SIZE

const SliderCaptcha = ({ onVerify }) => {
    const [puzzlePos, setPuzzlePos] = useState(0)
    const handlerPos = puzzlePos * HANDLER_WALK / PUZZLE_WALK

    const _onVerify = v => {
        onVerify(v)
        setPuzzlePos(0)
    }

    return (
        <div className="slider_captcha">
            <img src={defaultBgImg} className="bg" />
            <img src={defaultPuzzleImg} className="puzzle" style={{ left: puzzlePos }} />

            <div className="slider">
                <input type="range"
                    value={puzzlePos} max={PUZZLE_WALK} step="0.1"
                    onChange={e => setPuzzlePos(Number(e.target.value))}
                    onMouseUp={e => _onVerify(Number(e.target.value))}
                    onTouchEnd={e => _onVerify(Number(e.target.value))}
                />
                <div className="rail" style={{ gridTemplateColumns: `${handlerPos}px auto` }} />
                <div className="hint">拖动滑块完成拼图</div>
                <div className="handler" style={{ left: handlerPos }} />
            </div>
        </div>
    )
}

export default SliderCaptcha