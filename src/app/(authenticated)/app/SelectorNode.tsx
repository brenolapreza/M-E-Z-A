import React, { memo, useState } from "react";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";

export default memo(({ data }: any) => {
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(200);

  const handleResize = (_: any, { size }: any) => {
    setWidth(size.width);
    setHeight(size.height);
  };
  return (
    <>
      <div>
        <Resizable
          width={width}
          height={height}
          onResize={handleResize}
          draggableOpts={{ grid: [1, 1] }} // Define um grid para o redimensionamento
        >
          <div>
            <img
              src="/assets/8505c3db429e8b3548625f9bab0771ab.png"
              alt="Imagem"
            />
          </div>
        </Resizable>
      </div>
    </>
  );
});
