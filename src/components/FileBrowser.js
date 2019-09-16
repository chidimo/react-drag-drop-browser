import React from 'react';
import propTypes from 'prop-types';

const FeatherIconUpload = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-upload"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="17 8 12 3 7 8"></polyline>
      <line x1="12" y1="3" x2="12" y2="15"></line>
    </svg>
  );
};

const FileBrowser = props => {
  const {
    RDDSinputID,
    RDDSiconStyle,
    RDDSiconComponent,
    RDDSfileBrowserHandler,
    RDDSfileBrowserDivClass,
    RDDSfileBrowserDivStyle,
    RDDSdisplayText,
    RDDSdisplayTextClass,
    RDDSacceptFileTypes,
  } = props;

  const pickHandler = e => {
    e.preventDefault();
    e.stopPropagation();
    RDDSfileBrowserHandler([ ...e.target.files ]);
  };

  return (
    <div
      className={RDDSfileBrowserDivClass}
      style={RDDSfileBrowserDivStyle}
    >
      {RDDSiconComponent !== undefined ? (
        <RDDSiconComponent
          style={{ width: '20px', height: '20px', ...RDDSiconStyle }}
        />
      ) : (
        <FeatherIconUpload
          style={{ width: '20px', height: '20px', ...RDDSiconStyle }}
        />
      )}

      <p>
        {' '}
        <button
          className={RDDSdisplayTextClass}
          onClick={() => {
            document
              .getElementById('__RDDS_react_component_input__')
              .click();
          }}
        >
          {RDDSdisplayText ||
                        'Drag a file here to upload or click here to browse for files.'}
        </button>
        <input
          onChange={e => pickHandler(e)}
          style={{ display: 'none' }}
          id={RDDSinputID || '__RDDS_react_component_input__'}
          type="file"
          multiple
          accept={RDDSacceptFileTypes}
        />
      </p>
    </div>
  );
};

FileBrowser.propTypes = {
  RDDSinputID: propTypes.string,
  RDDSiconStyle: propTypes.object,
  RDDSiconComponent: propTypes.func,
  RDDSdisplayText: propTypes.string,
  RDDSdisplayTextClass: propTypes.string,
  RDDSfileBrowserDivClass: propTypes.string,
  RDDSfileBrowserDivStyle: propTypes.object,
  RDDSfileBrowserHandler: propTypes.func.isRequired,
  RDDSacceptFileTypes: propTypes.string,
};

export default FileBrowser;
