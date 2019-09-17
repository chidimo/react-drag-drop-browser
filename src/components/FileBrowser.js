import React from 'react';
import propTypes from 'prop-types';

const FeatherIconUploadIcon = () => {
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
    RDDBInputID,
    RDDBIconStyle,
    RDDBIconComponent,
    RDDBFileBrowserHandler,
    RDDBFileBrowserDivClass,
    RDDBFileBrowserDivStyle,
    RDDBDisplayText,
    RDDBDisplayTextClass,
    RDDBAcceptFileTypes,
  } = props;

  const pickHandler = e => {
    e.preventDefault();
    e.stopPropagation();
    RDDBFileBrowserHandler([ ...e.target.files ]);
  };

  const inputID = RDDBInputID || '__RDDB_input__';

  return (
    <div
      className={RDDBFileBrowserDivClass}
      style={RDDBFileBrowserDivStyle}
    >
      {RDDBIconComponent !== undefined ? (
        <RDDBIconComponent
          style={{ width: '20px', height: '20px', ...RDDBIconStyle }}
        />
      ) : (
        <FeatherIconUploadIcon
          style={{ width: '20px', height: '20px', ...RDDBIconStyle }}
        />
      )}

      <p>
        {' '}
        <button
          className={RDDBDisplayTextClass}
          onClick={() => {
            document
              .getElementById(inputID)
              .click();
          }}
        >
          {RDDBDisplayText ||
                        'Drag a file here to upload or click here to browse for files.'}
        </button>
        <input
          onChange={e => pickHandler(e)}
          style={{ display: 'none' }}
          id={inputID}
          type="file"
          multiple
          accept={RDDBAcceptFileTypes}
        />
      </p>
    </div>
  );
};

FileBrowser.propTypes = {
  RDDBInputID: propTypes.string,
  RDDBIconStyle: propTypes.object,
  RDDBIconComponent: propTypes.func,
  RDDBDisplayText: propTypes.string,
  RDDBDisplayTextClass: propTypes.string,
  RDDBFileBrowserDivClass: propTypes.string,
  RDDBFileBrowserDivStyle: propTypes.object,
  RDDBFileBrowserHandler: propTypes.func.isRequired,
  RDDBAcceptFileTypes: propTypes.string,
};

export default FileBrowser;
