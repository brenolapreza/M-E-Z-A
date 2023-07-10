import React, { useEffect, useState, useRef } from 'react';
import { Handle, Position, useStore, useUpdateNodeInternals } from 'reactflow';
import { drag } from 'd3-drag';
import { select } from 'd3-selection';
import { NodeResizer } from '@reactflow/node-resizer';

import '@reactflow/node-resizer/dist/style.css';
import styles from './styles.module.css';

export default function ResizeRotateNode({
  id,
  sourcePosition = Position.Left,
  targetPosition = Position.Right,
  data
}: any) {
  const rotateControlRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();
  const [rotation, setRotation] = useState(0);
  const [resizable, setResizable] = useState(false);
  const [rotatable, setRotatable] = useState(false);

  const handleClickNode = () => {
    setResizable(true);
    setRotatable(true);
  };

  const size = useStore((s) => {
    const node = s.nodeInternals.get(id);

    return {
      width: node?.width,
      height: node?.height
    };
  });
  useEffect(() => {
    if (!rotateControlRef.current) {
      return;
    }

    const selection = select(rotateControlRef.current);
    const dragHandler = drag().on('drag', (evt) => {
      const dx = evt.x - 100;
      const dy = evt.y - 100;
      const rad = Math.atan2(dx, dy);
      const deg = rad * (180 / Math.PI);
      setRotation(180 - deg);
      updateNodeInternals(id);
    });

    selection.call(dragHandler as any);
  }, [id, updateNodeInternals]);
  console.log(data);

  return (
    <div onClick={handleClickNode}>
      <div
        style={{
          transform: `rotate(${rotation}deg)`
        }}
        className={styles.node}
      >
        <NodeResizer isVisible={resizable} />

        <div
          ref={rotateControlRef}
          style={{
            display: rotatable ? 'block' : 'none'
          }}
          className="nodrag absolute w-[10px] h-[10px] bg-blue-500 left-2/4 top-[-30px] rounded-full translate-[-50%, -50%] cursor-alias"
        />
        <img src="/assets/8505c3db429e8b3548625f9bab0771ab.png" />
      </div>
    </div>
  );
}
