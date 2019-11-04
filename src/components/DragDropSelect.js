import React, { useReducer } from "react";
import propTypes from "prop-types";

import DragAndDrop from "./DragAndDrop";
import FileBrowser from "./FileBrowser";

const DragDropSelect = props => {
  const {
    RDDBInputID,
    RDDBIconStyle,
    RDDBDisplayText,
    RDDBIconComponent,
    RDDBAcceptMultiple,
    RDDBDragDropHandler,
    RDDBAcceptFileTypes,
    RDDBDisplayTextClass,
    RDDBFileBrowserHandler,
    RDDBFileBrowserDivClass,
    RDDBFileBrowserDivStyle
  } = props;

  const inputID = RDDBInputID || "__RDDB_input__";

  const initState = {
    dragCounter: 0,
    dropped: false,
    dragging: false,
    insideDragArea: false
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_DRAG_COUNTER":
        return { ...state, dragCounter: action.dragCounter };
      case "SET_DROPPED":
        return { ...state, dropped: action.dropped };
      case "SET_INSIDE_DRAG_AREA":
        return { ...state, insideDragArea: action.insideDragArea };
      case "SET_DRAGGING":
        return { ...state, dragging: action.dragging };
      case 'RESET':
        return initState
      default:
        return state;
    }
  };

  const [info, dispatch] = useReducer(reducer, initState);

  return (
    <DragAndDrop
      info={info}
      dispatch={dispatch}
      RDDBFileDropHandler={RDDBDragDropHandler}
    >
      <FileBrowser
        inputID={inputID}
        RDDBIconStyle={RDDBIconStyle}
        RDDBDisplayText={RDDBDisplayText}
        insideDragArea={info.insideDragArea}
        RDDBIconComponent={RDDBIconComponent}
        RDDBAcceptMultiple={RDDBAcceptMultiple}
        RDDBAcceptFileTypes={RDDBAcceptFileTypes}
        RDDBDisplayTextClass={RDDBDisplayTextClass}
        RDDBFileBrowserHandler={RDDBFileBrowserHandler}
        RDDBFileBrowserDivClass={RDDBFileBrowserDivClass}
        RDDBFileBrowserDivStyle={RDDBFileBrowserDivStyle}
      />
    </DragAndDrop>
  );
};

DragDropSelect.propTypes = {
  RDDBInputID: propTypes.string,
  RDDBIconStyle: propTypes.object,
  RDDBAcceptMultiple: propTypes.bool,
  RDDBIconComponent: propTypes.func,
  RDDBDisplayText: propTypes.string,
  RDDBDisplayTextClass: propTypes.string,
  RDDBFileBrowserDivClass: propTypes.string,
  RDDBFileBrowserDivStyle: propTypes.object,
  RDDBDragDropHandler: propTypes.func.isRequired,
  RDDBFileBrowserHandler: propTypes.func.isRequired,
  RDDBAcceptFileTypes: propTypes.string
};

export default DragDropSelect;
