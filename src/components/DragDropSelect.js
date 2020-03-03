import React, { useReducer } from 'react';
import propTypes from 'prop-types';

import DragAndDrop from './DragAndDrop';
import FileBrowser from './FileBrowser';

const DragDropSelect = props => {
  const {
    iconStyle,
    messageText,
    IconComponent,
    dragDropHandler,
    allowedFileTypes,
    allowMultipleFiles,
    fileBrowserHandler,
  } = props;

  const initState = {
    dropDepth: 0,
    dropped: false,
    dragging: false,
    inDropZone: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_DROPPED':
        return { ...state, dropped: action.dropped };
      case 'SET_DRAGGING':
        return { ...state, dragging: action.dragging };
      case 'SET_IN_DROP_ZONE':
        return { ...state, inDropZone: action.inDropZone };
      case 'RESET_DROP_DEPTH':
        return { ...state, dropDepth: 0 };
      case 'INCREMENT_DROP_DEPTH':
        return { ...state, dropDepth: state.dropDepth + 1 };
      case 'DECREMENT_DROP_DEPTH':
        return { ...state, dropDepth: state.dropDepth - 1 };
      case 'RESET':
        return initState;
      default:
        return state;
    }
  };

  const [info, dispatch] = useReducer(reducer, initState);

  return (
    <DragAndDrop
      info={info}
      dispatch={dispatch}
      fileDropHandler={dragDropHandler}
      inDropZone={info.inDropZone}
    >
      <FileBrowser
        iconStyle={iconStyle}
        messageText={messageText}
        inDropZone={info.inDropZone}
        IconComponent={IconComponent}
        allowedFileTypes={allowedFileTypes}
        fileBrowserHandler={fileBrowserHandler}
        allowMultipleFiles={allowMultipleFiles}
      />
    </DragAndDrop>
  );
};

DragDropSelect.propTypes = {
  inDropZone: propTypes.bool,
  iconStyle: propTypes.object,
  messageText: propTypes.string,
  IconComponent: propTypes.func,
  allowMultipleFiles: propTypes.bool,
  allowedFileTypes: propTypes.string,
  dragDropHandler: propTypes.func.isRequired,
  fileBrowserHandler: propTypes.func.isRequired,
};

export default DragDropSelect;
