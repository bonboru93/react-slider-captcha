import React, { useState } from "react"
import "./SliderCaptcha.less"

import defaultBgImg from "./assets/bg.jpg"
import defaultPuzzleImg from "./assets/puzzle.png"
import arrowRightIcon from "./assets/arrow_right.svg"
import okIcon from "./assets/ok.svg"
import errIcon from "./assets/err.svg"
import loadingIcon from "./assets/loading.svg"
import reloadIcon from "./assets/reload.svg"


const BG_WIDTH = 320
const PUZZLE_WIDTH = 60
const HANDLER_SIZE = 40
const PUZZLE_WALK = BG_WIDTH - PUZZLE_WIDTH
const HANDLER_WALK = BG_WIDTH - HANDLER_SIZE

const iconMap = {
    ready: arrowRightIcon,
    checking: loadingIcon,
    ok: okIcon,
    err: errIcon
}

const colorMap = {
    ready: ['#1991fa', '#d1e9fe'],
    checking: ['#1991fa', '#d1e9fe'],
    ok: ['#52ccba', '#d2f4ef'],
    err: ['#f57a7a', '#fce1e1']
}

const SliderCaptcha = ({ bgImg = defaultBgImg, puzzleImg = defaultPuzzleImg, onCheck }) => {
    const [puzzlePos, setPuzzlePos] = useState(0)
    const handlerPos = puzzlePos * HANDLER_WALK / PUZZLE_WALK

    const [status, setStatus] = useState('ready')

    const _onCheck = v => {
        setStatus('checking')
        onCheck(v)
            .then(() => setStatus('ok'))
            .catch(() => setStatus('err'))
            .finally(() => setTimeout(() => {
                setPuzzlePos(0)
                setStatus('ready')
            }, 500))
    }

    return (
        <div className="slider_captcha">
            <img src={bgImg} className="bg" />
            <img src={puzzleImg} className="puzzle" style={{ left: puzzlePos }} />
            <img src={reloadIcon} className="reload" />

            <div className="slider">
                <input type="range"
                    value={puzzlePos} max={PUZZLE_WALK} step="0.1"
                    onChange={e => setPuzzlePos(Number(e.target.value))}
                    onMouseUp={e => _onCheck(Number(e.target.value))}
                    onTouchEnd={e => _onCheck(Number(e.target.value))}
                    onKeyDown={e => e.preventDefault()}
                    style={{ pointerEvents: status !== 'ready' && 'none' }}
                />
                <div className="rail" style={{ gridTemplateColumns: `${handlerPos}px auto` }}>
                    <div style={{
                        background: colorMap[status][1],
                        borderColor: colorMap[status][0]
                    }} />
                </div>
                <div className="hint">拖动滑块完成拼图</div>
                <div className="handler" style={{
                    left: handlerPos,
                    background: colorMap[status][0]
                }}>
                    <img src={iconMap[status]} className={status} />
                </div>
            </div>
        </div>
    )
}

export default SliderCaptcha