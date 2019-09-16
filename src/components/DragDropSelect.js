import React from 'react';
import propTypes from 'prop-types';

import DragAndDrop from './DragAndDrop';
import FileBrowser from './FileBrowser';

const DragDropSelect = props => {
  const {
    DDSinputID,
    DDSiconStyle,
    DDSiconComponent,
    DDSdragDropHandler,
    DDSselectFileHandler,
    DDSfileBrowserDivClass,
    DDSfileBrowserDivStyle,
    DDSdisplayText,
    DDSdisplayTextClass,
    DDSacceptFileTypes,
  } = props;

  return (
    <DragAndDrop fileDropHandler={DDSdragDropHandler}>
      <FileBrowser
        DDSinputID={DDSinputID}
        DDSiconStyle={DDSiconStyle}
        DDSiconComponent={DDSiconComponent}
        DDSdisplayText={DDSdisplayText}
        DDSdisplayTextClass={DDSdisplayTextClass}
        DDSfileBrowserHandler={DDSselectFileHandler}
        DDSfileBrowserDivClass={DDSfileBrowserDivClass}
        DDSfileBrowserDivStyle={DDSfileBrowserDivStyle}
        DDSacceptFileTypes={DDSacceptFileTypes}
      />
    </DragAndDrop>
  );
};

DragDropSelect.propTypes = {
  DDSinputID: propTypes.string,
  DDSiconStyle: propTypes.object,
  DDSiconComponent: propTypes.func,
  DDSdisplayText: propTypes.string,
  DDSdisplayTextClass: propTypes.string,
  DDSfileBrowserDivClass: propTypes.string,
  DDSfileBrowserDivStyle: propTypes.object,
  DDSdragDropHandler: propTypes.func.isRequired,
  DDSselectFileHandler: propTypes.func.isRequired,
  DDSacceptFileTypes: propTypes.string,
};

export default DragDropSelect;
