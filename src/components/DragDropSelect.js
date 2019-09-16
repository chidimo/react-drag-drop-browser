import React from 'react';
import propTypes from 'prop-types';

import DragAndDrop from './DragAndDrop';
import FileBrowser from './FileBrowser';

const DragDropSelect = props => {
  const {
    RDDSinputID,
    RDDSiconStyle,
    RDDSiconComponent,
    RDDSdragDropHandler,
    RDDSselectFileHandler,
    RDDSfileBrowserDivClass,
    RDDSfileBrowserDivStyle,
    RDDSdisplayText,
    RDDSdisplayTextClass,
    RDDSacceptFileTypes,
  } = props;

  return (
    <DragAndDrop RDDSfileDropHandler={RDDSdragDropHandler}>
      <FileBrowser
        RDDSinputID={RDDSinputID}
        RDDSiconStyle={RDDSiconStyle}
        RDDSiconComponent={RDDSiconComponent}
        RDDSdisplayText={RDDSdisplayText}
        RDDSdisplayTextClass={RDDSdisplayTextClass}
        RDDSfileBrowserHandler={RDDSselectFileHandler}
        RDDSfileBrowserDivClass={RDDSfileBrowserDivClass}
        RDDSfileBrowserDivStyle={RDDSfileBrowserDivStyle}
        RDDSacceptFileTypes={RDDSacceptFileTypes}
      />
    </DragAndDrop>
  );
};

DragDropSelect.propTypes = {
  RDDSinputID: propTypes.string,
  RDDSiconStyle: propTypes.object,
  RDDSiconComponent: propTypes.func,
  RDDSdisplayText: propTypes.string,
  RDDSdisplayTextClass: propTypes.string,
  RDDSfileBrowserDivClass: propTypes.string,
  RDDSfileBrowserDivStyle: propTypes.object,
  RDDSdragDropHandler: propTypes.func.isRequired,
  RDDSselectFileHandler: propTypes.func.isRequired,
  RDDSacceptFileTypes: propTypes.string,
};

export default DragDropSelect;
