import React, { useRef } from 'react';
import propTypes from 'prop-types';

import FiUpload from './FiUpload';

const FileBrowser = props => {
  const {
    iconStyle,
    inDropZone,
    messageText,
    IconComponent,
    allowedFileTypes,
    allowMultipleFiles,
    fileBrowserHandler,
  } = props;

  const inputRef = useRef();

  const pickHandler = e => {
    e.preventDefault();
    e.stopPropagation();
    fileBrowserHandler([ ...e.target.files ]);
  };

  return (
    <div onClick={() => inputRef.current.click()} className={inDropZone ? "file-browser-zone inside-drop-zone" : "file-browser-zone"}>
      {IconComponent !== undefined ? (
        <IconComponent
          style={{ width: '20px', height: '20px', ...iconStyle }}
        />
      ) : (
        <FiUpload style={{ width: '20px', height: '20px', ...iconStyle }} />
      )}

      <p>
        {' '}
        <button>
          {messageText ||
            'Drag a file here to upload or click here to browse for files.'}
        </button>
        {allowMultipleFiles ? (
          <input
            multiple
            value=""
            type="file"
            id={'file-selector'}
            accept={allowedFileTypes}
            style={{ display: 'none' }}
            autoComplete={'new-password'}
            onChange={e => pickHandler(e)}
            ref={node => (inputRef.current = node)}
          />
        ) : (
          <input
            value=""
            type="file"
            id={'file-selector'}
            accept={allowedFileTypes}
            style={{ display: 'none' }}
            autoComplete={'new-password'}
            onChange={e => pickHandler(e)}
            ref={node => (inputRef.current = node)}
          />
        )}
      </p>
    </div>
  );
};

FileBrowser.propTypes = {
  iconStyle: propTypes.object,
  messageText: propTypes.string,
  IconComponent: propTypes.func,
  inDropZone: propTypes.bool,
  allowedFileTypes: propTypes.string,
  allowMultipleFiles: propTypes.bool,
  fileBrowserHandler: propTypes.func.isRequired,
};

export default FileBrowser;
