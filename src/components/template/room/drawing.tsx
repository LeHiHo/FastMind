import React from 'react';
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import drawImg from '/assets/icons/draw.png';
import eraseImg from '/assets/icons/eraser.png';
import trashImg from '/assets/icons/trash.png';
import { drawSocket } from '../../../api/socket';

const Drawing = () => {
  const [isPainting, setIsPainting] = useState(false);
  const [mousePosition, setMousePosition] = useState<
    { x: number; y: number } | undefined
  >(undefined);
  const [color, setColor] = useState('black');
  const [lineWidth, setLineWidth] = useState(4);

  const canvasRef = useRef<HTMLCanvasElement>(null); // 캔버스 (도화지)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null); // 그림 (내용)
  const [roomId, setRoomId] = useState('');

  // useEffect 하나 쓰려고 if문 썼습니다
  useEffect(() => {
    const newRoomId = window.location.pathname.split('/')[2];
    setRoomId(newRoomId);

    const canvas = canvasRef.current; // 캔버스 Ref
    if (canvas && !contextRef.current) {
      // 최초 마운트 시에만 실행
      canvas.width = 800;
      canvas.height = 450;
      canvas.style.width = '800px';
      canvas.style.height = '450px';
      canvas.style.backgroundColor = 'white';

      // 그리기
      const ctx = canvas.getContext('2d');
      ctx!.scale(1, 1);
      ctx!.lineCap = 'round';
      ctx!.lineWidth = lineWidth;
      contextRef.current = ctx;
    }

    // 색상 변경
    const ctx = contextRef.current; // context Ref
    if (ctx) {
      ctx.strokeStyle = color;
    }

    // 굵기 변경
    if (canvas && ctx) {
      ctx.lineWidth = lineWidth;
    }
  }, [color, lineWidth]);

  /// 색상 변경 함수 (여기에 부분 지우개 배경색으로 넣음)
  const changeColor = (newColor: string) => {
    setColor(newColor);
  };

  /// 전체 지우개 함수
  const EraseAll = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    ctx!.fillStyle = 'white';
    ctx!.fillRect(0, 0, 800, 450);
    drawSocket.emit('erase');
  };

  /// 굵기 변경 함수

  /// 마우스 이동 감지 + 그리는 역할
  const getDrawing = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) => {
    if (!canvasRef.current) {
      return;
    }

    const canvasCurrent: HTMLCanvasElement = canvasRef.current;
    const rect = canvasCurrent.getBoundingClientRect();

    const scaleX = canvasCurrent.width / rect.width;
    const scaleY = canvasCurrent.height / rect.height;

    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY,
      // offsetLeft는 그리는 영역 left끝에서 그림판이 얼마나 떨어졌냐.. top은 위에서 그림판이 얼마나 떨어졋냐
      // event.pageX/Y는 마우스로 그리는 부분의 좌표.. X는 왼쪽에서 떨어진만큼 빼야하고 Y는 위에서 떨어진 만큼 빼야함.
    };
  };

  /// mousedown 했을 때 좌표 저장 + 페인팅 시작 상태값 변경
  const startPaint = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const paint = getDrawing(event);

    if (paint) {
      setIsPainting(true); // 그리는 상태 true로 변경
      setMousePosition(paint); // 마우스 포지션에 좌표값 저장
    }
  };

  /// 그리기 (현재 좌표 -> 움직인 좌표로 이동)
  const paint = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (isPainting) {
      // 그리는 상태가 true일 때
      const newMousePosition = getDrawing(event); // 좌표를 변
      if (mousePosition && newMousePosition) {
        draw(mousePosition, newMousePosition); // 아래 mouseEvent 함수임
        setMousePosition(newMousePosition);
      }
    }
  };

  /// 그리기 끝내기 (mouseUp, exit)
  const exitPaint = () => {
    setIsPainting(false);
  };

  /// 그리는 함수 (canvasAPI 메서드)
  const draw = (
    originalMousePosition: { x: number; y: number },
    newMousePosition: { x: number; y: number },
  ) => {
    const ctx = contextRef.current;
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(originalMousePosition.x, originalMousePosition.y);
      ctx.lineTo(newMousePosition.x, newMousePosition.y);
      ctx.closePath();
      ctx.stroke();

      drawSocket.emit('drawing', {
        originalMousePosition,
        newMousePosition,
        option: {
          color,
          lineWidth,
          roomId,
        },
      });
    }
  };

  //
  const getRangeInputStyle = () => {
    const gradient_value = 100 / 10;
    const backgroundSize = gradient_value * lineWidth;
    return {
      background: `linear-gradient(to right, #FFE283 0%, #FFE283 ${backgroundSize}%, rgb(236, 236, 236) ${backgroundSize}%, rgb(236, 236, 236) 100%)`,
    };
  };

  useEffect(() => {
    drawSocket.connect();
    const onDrawingEvent = ({
      originalMousePosition,
      newMousePosition,
      option,
    }: IReciveInfo) => {
      const ctx = contextRef.current;
      if (!ctx) return;
      ctx.strokeStyle = option.color;
      ctx.lineWidth = option.lineWidth;
      ctx.beginPath();
      ctx.moveTo(originalMousePosition.x, originalMousePosition.y);
      ctx.lineTo(newMousePosition.x, newMousePosition.y);
      ctx.closePath();
      ctx.stroke();
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
    };

    const onEraseEvent = () => {
      const ctx = contextRef.current;
      if (!ctx) return;
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, 800, 450);
    };

    drawSocket.on('drawing', onDrawingEvent);
    drawSocket.on('erase', onEraseEvent);

    return () => {
      drawSocket.off('drawing', onDrawingEvent);
      drawSocket.off('erase', onEraseEvent);
      drawSocket.disconnect();
    };
  }, [drawSocket]);

  /// JSX
  return (
    <DrawingBox>
      <DrawingCanvas>
        <canvas
          ref={canvasRef}
          onMouseDown={startPaint}
          onMouseMove={paint}
          onMouseUp={exitPaint}
          onMouseLeave={exitPaint}
          className="canvas"
        />
        <DrawingTools>
          <ToolImage src={drawImg} alt="Draw" />

          <ColorButton
            color="red"
            onClick={() => changeColor('red')}></ColorButton>
          <ColorButton
            color="yellow"
            onClick={() => changeColor('yellow')}></ColorButton>
          <ColorButton
            color="green"
            onClick={() => changeColor('green')}></ColorButton>
          <ColorButton
            color="blue"
            onClick={() => changeColor('blue')}></ColorButton>
          <ColorButton
            color="purple"
            onClick={() => changeColor('purple')}></ColorButton>
          <ColorButton
            color="black"
            onClick={() => changeColor('black')}></ColorButton>
          <button onClick={() => changeColor('white')}>
            <ToolImage src={eraseImg} alt="Erase" />
          </button>

          <button onClick={() => EraseAll()}>
            <ToolImage src={trashImg} alt="EraseAll" />
          </button>

          <RangeInput
            onChange={(e) => setLineWidth(Number(e.target.value))}
            type="range"
            min="1"
            max="10"
            step="0.1"
            value={lineWidth}
            style={getRangeInputStyle()}></RangeInput>
        </DrawingTools>
      </DrawingCanvas>
    </DrawingBox>
  );
  // addEventListener를 포함한 useEffect를 제거하고 이렇게 간략화했습니다
};

const DrawingBox = styled.div``;

const DrawingCanvas = styled.div`
  width: 800px;
  height: 450px;
  position: relative;
  .canvas {
    border: 2px solid #4fd1c5;
    margin: 0 auto;
    border-radius: 15px;
  }
`;

const DrawingTools = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  border-radius: 0 0 15px 15px;
  background-color: #4fd1c5;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 25px;
`;

const ColorButton = styled.button`
  width: 40px;
  height: 40px;
  background-color: ${(props) => props.color || 'transparent'};
  border-radius: 50%;
  border: 3px solid #fff;
  margin-left: -10px;
  color: #fff;
  font-size: 12px;
`;

const ToolImage = styled.img`
  width: 40px;
  height: auto;
`;

const RangeInput = styled.input`
  background: linear-gradient(
    to right,
    #ffe283 0%,
    #ffe283 50%,
    #ececec 50%,
    #ececec 100%
  );
  border-radius: 8px;
  outline: none;
  transition: background 450ms ease-in;
  accent-color: #ffca1d;
`;

interface IReciveInfo {
  originalMousePosition: ICoordinate;
  newMousePosition: ICoordinate;
  option: {
    color: string;
    lineWidth: number;
    roomId: string;
  };
}

interface ICoordinate {
  x: number;
  y: number;
}

export default Drawing;
