import React from 'react';
import propTypes from 'prop-types';

import { FiUpload } from 'react-icons/fi';

const FileBrowser = props => {
  const {
    DDSinputID,
    DDSiconStyle,
    DDSiconComponent,
    DDSfileBrowserHandler,
    DDSfileBrowserDivClass,
    DDSfileBrowserDivStyle,
    DDSdisplayText,
    DDSdisplayTextClass,
    DDSacceptFileTypes,
  } = props;

  const pickHandler = e => {
    e.preventDefault();
    e.stopPropagation();
    DDSfileBrowserHandler([ ...e.target.files ]);
  };

  return (
    <div className={DDSfileBrowserDivClass} style={DDSfileBrowserDivStyle}>
      {DDSiconComponent !== undefined ? (
        <DDSiconComponent
          style={{ width: '20px', height: '20px', ...DDSiconStyle }}
        />
      ) : (
        <FiUpload
          style={{ width: '20px', height: '20px', ...DDSiconStyle }}
        />
      )}

      <p>
        {' '}
        <button
          className={DDSdisplayTextClass}
          onClick={() => {
            document
              .getElementById('__dds_react_component_input__')
              .click();
          }}
        >
          {DDSdisplayText ||
                        'Drag a file here to upload or click here to browse for files.'}
        </button>
        <input
          onChange={e => pickHandler(e)}
          style={{ display: 'none' }}
          id={DDSinputID || '__dds_react_component_input__'}
          type="file"
          multiple
          accept={DDSacceptFileTypes}
        />
      </p>
    </div>
  );
};

FileBrowser.propTypes = {
  DDSinputID: propTypes.string,
  DDSiconStyle: propTypes.object,
  DDSiconComponent: propTypes.func,
  DDSdisplayText: propTypes.string,
  DDSdisplayTextClass: propTypes.string,
  DDSfileBrowserDivClass: propTypes.string,
  DDSfileBrowserDivStyle: propTypes.object,
  DDSfileBrowserHandler: propTypes.func.isRequired,
  DDSacceptFileTypes: propTypes.string,
};

export default FileBrowser;
