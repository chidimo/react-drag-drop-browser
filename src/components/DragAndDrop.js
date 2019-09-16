import React, { useState } from 'react';
import propTypes from 'prop-types';

const DragAndDrop = props => {
  const { RDDSfileDropHandler, children } = props;

  // eslint-disable-next-line no-unused-vars
  const [ dragging, setDragging ] = useState(false);
  const [ insideDragArea, setInsideDragArea ] = useState(false);
  let [ dragCounter, setDragCounter ] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [ dropped, setDropped ] = useState(false);

  const handleDragEnter = e => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(dragCounter++);
    // eslint-disable-next-line no-console
    console.log('insideDragArea');
    if (e.dataTransfer.items && e.dataTransfer.files.length > 0) {
      setInsideDragArea(true);
    }
  };

  const handleDragLeave = e => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(dragCounter--);
    if (dragCounter > 0) return;
    // eslint-disable-next-line no-console
    console.log('NOT insideDragArea');
    setInsideDragArea(false);
  };

  const handleDragOver = e => {
    // just override this
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      RDDSfileDropHandler([ ...e.dataTransfer.files ]);
      e.dataTransfer.clearData();
      dragCounter = 0;
    }
    setDropped(true);
  };

  return (
    <div
      onDragEnter={e => handleDragEnter(e)}
      onDragLeave={e => handleDragLeave(e)}
      onDragOver={e => handleDragOver(e)}
      onDrop={e => handleDrop(e)}
    >
      {insideDragArea && <p>You can now drop</p>}
      {children}
    </div>
  );
};

DragAndDrop.propTypes = {
  children: propTypes.object,
  RDDSfileDropHandler: propTypes.func,
};

export default DragAndDrop;
