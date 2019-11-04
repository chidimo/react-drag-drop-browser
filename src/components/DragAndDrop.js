import React from "react";
import propTypes from "prop-types";

const DragAndDrop = props => {
  const { RDDBFileDropHandler, children, info, dispatch } = props;

  const handleDragEnter = e => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({ type: "SET_DROPPED", dropped: false });
    dispatch({ type: "SET_INSIDE_DRAG_AREA", insideDragArea: true });
    dispatch({ type: "SET_DRAG_COUNTER", dragCounter: info.dragCounter + 1 });

    if (e.dataTransfer.items && e.dataTransfer.files.length > 0) {
      dispatch({ type: "SET_INSIDE_DRAG_AREA", insideDragArea: true });
    }
  };

  const handleDragLeave = e => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({ type: "SET_INSIDE_DRAG_AREA", insideDragArea: false });
    dispatch({ type: "SET_DRAG_COUNTER", dragCounter: info.dragCounter - 1 });
    if (info.dragCounter > 0) return;
  };

  const handleDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      RDDBFileDropHandler([...e.dataTransfer.files]);
      e.dataTransfer.clearData();
      dispatch({ type: "SET_DRAG_COUNTER", dragCounter: 0 });
    }
    dispatch({ type: "RESET" });
  };

  return (
    <div
      onDrop={e => handleDrop(e)}
      onDragOver={e => handleDragOver(e)}
      onDragEnter={e => handleDragEnter(e)}
      onDragLeave={e => handleDragLeave(e)}
    >
      {children}
    </div>
  );
};

DragAndDrop.propTypes = {
  info: propTypes.object,
  dispatch: propTypes.func,
  children: propTypes.object,
  RDDBFileDropHandler: propTypes.func
};

export default DragAndDrop;
