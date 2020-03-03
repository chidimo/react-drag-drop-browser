import React from 'react';
import propTypes from 'prop-types';

// The dropDepth variable helps us avoid the situation of multiple dragEnter events
// When dragEnter is fired, we increment dropDepth. So for each dragEnter event,
// dropDepth increments by 1.
// When a dragLeave is fired, we decrement dropDepth. If dropDepth is still > 0,
// we know we're not yet at the topmost div, and we don't set any state.

const DragAndDrop = props => {
  const { info, children, dispatch, inDropZone, fileDropHandler } = props;

  const handleDragEnter = e => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({ type: 'INCREMENT_DROP_DEPTH' });
    dispatch({ type: 'SET_DROPPED', dropped: false });
  };

  const handleDragLeave = e => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({ type: 'DECREMENT_DROP_DEPTH' });
    if (info.dropDepth > 0) return;
    dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false });
  };

  const handleDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
    dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: true });
  };

  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();

    const files = [ ...e.dataTransfer.files ];

    if (files && files.length > 0) {
      fileDropHandler(files);
      e.dataTransfer.clearData();
      dispatch({ type: 'RESET_DROP_DEPTH', dropDepth: 0 });
    }
    dispatch({ type: 'RESET' });
  };

  return (
    <div
      className={
        inDropZone ? 'drag-drop-zone inside-drag-area' : 'drag-drop-zone'
      }
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
  inDropZone: propTypes.bool,
  fileDropHandler: propTypes.func,
};

export default DragAndDrop;
