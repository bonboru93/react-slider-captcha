import './SliderCaptcha.css';import { useState, useEffect } from "react";
const SliderCaptcha = ({ onLoad, onCheck }) => {
  const [bgSrc, setBgSrc] = useState();
  const [puzzleSrc, setPuzzleSrc] = useState();
  const [pos, setPos] = useState(0);
  const [status, setStatus] = useState("ready");
  useEffect(() => {
    onLoad().then((r) => {
      setBgSrc(r.bgSrc);
      setPuzzleSrc(r.puzzleSrc);
    });
  }, [onLoad]);
  const _onCheck = () => {
    console.log(pos);
    setStatus("checking");
    onCheck(pos).then(() => setStatus("ok")).catch(() => setStatus("err")).finally(() => setTimeout(() => {
      setPos(0);
      setStatus("ready");
    }, 500));
  };
  return /* @__PURE__ */ React.createElement("div", { className: "slider_captcha" }, /* @__PURE__ */ React.createElement("img", { src: bgSrc, className: "bg" }), /* @__PURE__ */ React.createElement("img", { src: puzzleSrc, className: "puzzle", style: { left: pos } }), /* @__PURE__ */ React.createElement("div", { className: "slider", "data-hint": bgSrc ? "拖动滑块完成拼图" : "加载中" }, /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "range",
      max: "260",
      step: "0.1",
      style: {
        "--current-icon": `var(--${status}-icon)`,
        "--current-color": `var(--${status}-color)`,
        "--current-color-light": `var(--${status}-color-light)`
      },
      disabled: !bgSrc || status !== "ready",
      value: pos,
      onChange: (e) => setPos(Number(e.target.value)),
      onMouseUp: _onCheck,
      onTouchEnd: _onCheck,
      onKeyDown: (e) => e.preventDefault()
    }
  )));
};
export {
  SliderCaptcha as default
};
