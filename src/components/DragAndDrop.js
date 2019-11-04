import React, { useReducer } from 'react';
import propTypes from 'prop-types';

const DragAndDrop = props => {
  const { RDDBFileDropHandler, children } = props;

  const initState = {
    dragCounter: 0,
    dropped: false,
    dragging: false,
    insideDragArea: false,
  }

  const reducer = (state, action) => {
    switch(action.type) {
      case 'SET_DRAG_COUNTER':
        return { ...state, dragCounter: action.dragCounter}
      case 'SET_DROPPED':
        return { ...state, dropped: action.dropped};
      case 'SET_INSIDE_DRAG_AREA':
        return { ...state, insideDragArea: action.insideDragArea};
      case 'SET_DRAGGING':
        return { ...state, dragging: action.dragging};
      default:
        return state;
    }
  }

  const [info, dispatch] = useReducer(reducer, initState)

  const handleDragEnter = e => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({ type: 'SET_DRAG_COUNTER', dragCounter: info.dragCounter+1})
    if (e.dataTransfer.items && e.dataTransfer.files.length > 0) {
      dispatch({ type: 'SET_INSIDE_DRAG_AREA', insideDragArea: true})
    }
  };

  const handleDragLeave = e => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({ type: 'SET_DRAG_COUNTER', dragCounter: info.dragCounter-1})
    if (info.dragCounter > 0) return;
    dispatch({ type: 'SET_INSIDE_DRAG_AREA', insideDragArea: false})
  };

  const handleDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({ type: 'SET_DRAGGING', dragging: false })

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      RDDBFileDropHandler([ ...e.dataTransfer.files ]);
      e.dataTransfer.clearData();
      dispatch({ type: 'SET_DRAG_COUNTER', dragCounter: 0})
    }
    dispatch({ type: 'SET_DROPPED', dropped: true })
  };

  return (
    <div
        onDrop={e => handleDrop(e)}
        onDragOver={e => handleDragOver(e)}
        onDragEnter={e => handleDragEnter(e)}
        onDragLeave={e => handleDragLeave(e)}
    >
      {info.insideDragArea && <p>You can now drop</p>}
      {children}
    </div>
  );
};

DragAndDrop.propTypes = {
    children: propTypes.object,
    RDDBFileDropHandler: propTypes.func,
};

export default DragAndDrop;
