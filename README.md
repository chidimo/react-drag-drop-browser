# `react-drag-drop-browser`

Simple, customizable react drag and drop component. Also comes with a file browser.

Demo URL <https://codesandbox.io/embed/react-drag-drop-browser-demo-6j6rl>

[NPM](https://www.npmjs.com/) package URL: <https://www.npmjs.com/package/react-drag-drop-browser>

Current version: `1.1.5`

## Installation

Installation can be done with `yarn` or `npm`

1. `yarn add react-drag-drop-browser`
1. `npm install react-drag-drop-browser`

## Usage

The example below shows how to use the `DragDropSelect` component to build an array of `.pdf` files using the `useState` hook.

```jsx
// utils.js
const utils = {
    fileInFileArray: (fileArray, file) => {
        for (const f of fileArray) {
            if (f.name === file.name) {
                return true;
            }
        }
        return false;
    },

    const fileTooLarge: (file, maxSize) => {
        return file && file.size >= 1024 * 1024 * maxSize;
    },
};

export default utils;

// App.js
import React, { useState } from 'react';
import filesize from 'filesize';
import { DragDropSelect } from 'react-drag-drop-browser';
import utils from './utils';

function App() {
  const [ fileList, setFileList ] = useState([]);
  const [ error, setError ] = useState(false);
  const [ errorMsg, setErrorMsg ] = useState('');

  const updateResourceFileArray = files => {
    const maxSize = 1;
    const okayFiles = files.map(file => {
      const { name } = file;
      if (!name) {
        return {};
      } else if (utils.fileInFileArray(fileList, file)) {
        setError(true);
        setErrorMsg(`${file.name} is already listed`);
        return {};
      } else if (utils.fileTooLarge(file, 1)) {
        setError(true);
        setErrorMsg(`Size: ${filesize(file.size)}. Allowed: ${maxSize}MB.`);
        return {};
      } else {
        return file;
      }
    });
    setFileList(
      fileList.concat(okayFiles.filter(file => file.name !== undefined))
    );
  };
  return (
    <div>
      {error && (
        <p className="error-msg-text">
          {errorMsg}
        </p>
      )}
      <DragDropSelect
        RDDBDragDropHandler={updateResourceFileArray}
        RDDBFileBrowserHandler={updateResourceFileArray}
        RDDBAcceptFileTypes={'application/pdf'}
        RDDBFileBrowserDivClass={'upload-box-frame'}
        RDDBDisplayTextClass={'display-text'}
      />

      {fileList.map(file => (
        <p key={file.name}>{file.name}</p>
      ))}
    </div>
  );
}

export default App;
```

## props

|       Prop       |       Default    |     Function     |
| ---------------- | ---------------- | ---------------- |
|`RDDBInputID` (*optional, string*) | `__RDDB_input__` | Useful when rendering several file uploaders on the same page, where each ID is required to be unique|
|`RDDBIconStyle` (*optional, object*) | `{ width: '20px', height: '20px' }` | For passing extra styling to the default file upload icon. |
| `RDDBIconComponent` (*optional, Component*) | [feathericons](https://feathericons.com/) svg | Use this to pass a file upload icon of your choice. The only requirement is that it must be an `svg` element wrapped up as a `React` component. Default is shown [below](#default-icon). |
| `RDDBDisplayText` (*optional, string*) | *Drag a file here to upload or click here to browse for files.* | Set your preferred display text.|
| `RDDBDisplayTextClass` (*optional, string*) | none | For styling the display text. |
| `RDDBFileBrowserDivClass` (*optional, string*) | none | Set a class on the drag and drop area. |
| `RDDBFileBrowserDivStyle` (*optinal, object*) | none | Style the drag and drop area.
| `RDDBAcceptFileTypes` (*optional, string*) | none | Specify acceptable file types. |
| `RDDBAcceptMultiple` (*optional, bool*) | `false` | If file browser should accept multiple files |
| `RDDBDragDropHandler` (*required, function*) | none | callback that receives an array of files |
| `RDDBFileBrowserHandler` (*required, function*) | none | callback that receives an array of files |

### Default icon

```javascript
const FiUpload = () => {
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
```

## Credits

1. [Publish a react component as npm module](https://parastudios.de/create-a-react-component-as-npm-module/)
