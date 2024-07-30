import { HTMLAttributes, ReactElement, useRef } from "react";
import { FileBrowserRenderProps, FileEvent } from "../types";
import { classNames } from "../lib/join-classes";

interface Props {
  dataTestId?: string;
  inputId: string;
  multiple?: boolean;
  allowedFileTypes?: string[];
  pickerBtnText?: string | ReactElement;
  pickerBtnClassName?: HTMLAttributes<HTMLElement>["className"];
  render?: (props: FileBrowserRenderProps) => ReactElement;
  onSelectFiles: (files: File[]) => void;
}

export default function FileBrowser(props: Readonly<Props>) {
  const {
    inputId = "input-id",
    dataTestId = "file-browser",
    multiple = false,
    allowedFileTypes = [".pdf", ".jpeg", ".png", ".jpg"],
    pickerBtnText = "Click here to browse files",
    pickerBtnClassName = "file-browser-button",
    render = undefined,
    onSelectFiles,
  } = props;

  const isStringPicker = typeof pickerBtnText === "string";

  const nopickerBtnText =
    pickerBtnText === null ||
    pickerBtnText === undefined ||
    (typeof pickerBtnText === "string" && pickerBtnText === "");

  const inputRef = useRef<HTMLInputElement | null>();

  const pickFileHandler = (e: FileEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSelectFiles([...e.target.files]);
  };

  if (render === undefined && nopickerBtnText) {
    return (
      <p data-testid="invalid-component">
        You must provide a <code>render</code> prop or{" "}
        <code>pickerBtnText</code> prop
      </p>
    );
  }

  return (
    <>
      {render ? (
        render({
          onClick() {
            inputRef.current?.click();
          },
        })
      ) : (
        <button
          type="button"
          data-testid={dataTestId}
          onClick={() => {
            inputRef.current?.click();
          }}
          className={classNames(isStringPicker ? pickerBtnClassName : "")}
        >
          {pickerBtnText}
        </button>
      )}

      <input
        value=""
        type="file"
        id={inputId}
        data-testid={inputId}
        multiple={multiple}
        accept={allowedFileTypes.join(",")}
        style={{ display: "none" }}
        autoComplete={"new-password"}
        onChange={(e: FileEvent) => {
          pickFileHandler(e);
        }}
        ref={(node) => (inputRef.current = node)}
      />
    </>
  );
}
