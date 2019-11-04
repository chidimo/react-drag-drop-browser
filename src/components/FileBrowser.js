import React from "react";
import propTypes from "prop-types";

import FiUpload from "./FiUpload";

const FileBrowser = props => {
  const {
    inputID,
    RDDBIconStyle,
    insideDragArea,
    RDDBDisplayText,
    RDDBIconComponent,
    RDDBAcceptMultiple,
    RDDBAcceptFileTypes,
    RDDBDisplayTextClass,
    RDDBFileBrowserHandler,
    RDDBFileBrowserDivClass,
    RDDBFileBrowserDivStyle
  } = props;

  const pickHandler = e => {
    e.preventDefault();
    e.stopPropagation();
    RDDBFileBrowserHandler([...e.target.files]);
  };

  return (
    <div
      style={{
        ...RDDBFileBrowserDivStyle,
        border: insideDragArea ? "1px dotted #07F" : ""
      }}
      className={RDDBFileBrowserDivClass}
      onClick={() => {
        document.getElementById(inputID).click();
      }}
    >
      {RDDBIconComponent !== undefined ? (
        <RDDBIconComponent
          style={{ width: "20px", height: "20px", ...RDDBIconStyle }}
        />
      ) : (
        <FiUpload style={{ width: "20px", height: "20px", ...RDDBIconStyle }} />
      )}

      <p>
        {" "}
        <button className={RDDBDisplayTextClass}>
          {RDDBDisplayText ||
            "Drag a file here to upload or click here to browse for files."}
        </button>
        {RDDBAcceptMultiple ? (
          <input
            multiple
            value=""
            type="file"
            id={inputID}
            style={{ display: "none" }}
            accept={RDDBAcceptFileTypes}
            autoComplete={"new-password"}
            onChange={e => pickHandler(e)}
          />
        ) : (
          <input
            value=""
            type="file"
            id={inputID}
            style={{ display: "none" }}
            accept={RDDBAcceptFileTypes}
            autoComplete={"new-password"}
            onChange={e => pickHandler(e)}
          />
        )}
      </p>
    </div>
  );
};

FileBrowser.propTypes = {
  inputID: propTypes.string,
  insideDragArea: propTypes.bool,
  RDDBIconStyle: propTypes.object,
  RDDBAcceptMultiple: propTypes.bool,
  RDDBIconComponent: propTypes.func,
  RDDBDisplayText: propTypes.string,
  RDDBDisplayTextClass: propTypes.string,
  RDDBAcceptFileTypes: propTypes.string,
  RDDBFileBrowserDivClass: propTypes.string,
  RDDBFileBrowserDivStyle: propTypes.object,
  RDDBFileBrowserHandler: propTypes.func.isRequired
};

export default FileBrowser;
