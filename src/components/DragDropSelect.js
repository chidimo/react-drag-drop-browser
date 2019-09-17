import React from 'react';
import propTypes from 'prop-types';

import DragAndDrop from './DragAndDrop';
import FileBrowser from './FileBrowser';

const DragDropSelect = props => {
  const {
    RDDBInputID,
    RDDBIconStyle,
    RDDBIconComponent,
    RDDBDragDropHandler,
    RDDBSelectFileHandler,
    RDDBFileBrowserDivClass,
    RDDBFileBrowserDivStyle,
    RDDBDisplayText,
    RDDBDisplayTextClass,
    RDDBAcceptFileTypes,
  } = props;

  return (
    <DragAndDrop RDDBFileDropHandler={RDDBDragDropHandler}>
      <FileBrowser
        RDDBInputID={RDDBInputID}
        RDDBIconStyle={RDDBIconStyle}
        RDDBIconComponent={RDDBIconComponent}
        RDDBDisplayText={RDDBDisplayText}
        RDDBDisplayTextClass={RDDBDisplayTextClass}
        RDDBFileBrowserHandler={RDDBSelectFileHandler}
        RDDBFileBrowserDivClass={RDDBFileBrowserDivClass}
        RDDBFileBrowserDivStyle={RDDBFileBrowserDivStyle}
        RDDBAcceptFileTypes={RDDBAcceptFileTypes}
      />
    </DragAndDrop>
  );
};

DragDropSelect.propTypes = {
  RDDBInputID: propTypes.string,
  RDDBIconStyle: propTypes.object,
  RDDBIconComponent: propTypes.func,
  RDDBDisplayText: propTypes.string,
  RDDBDisplayTextClass: propTypes.string,
  RDDBFileBrowserDivClass: propTypes.string,
  RDDBFileBrowserDivStyle: propTypes.object,
  RDDBDragDropHandler: propTypes.func.isRequired,
  RDDBSelectFileHandler: propTypes.func.isRequired,
  RDDBAcceptFileTypes: propTypes.string,
};

export default DragDropSelect;
