import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FileBrowser from "./file-browser";

const inputId = "test1";
const pickerBtnId = "pickerBtnId";
const pickerBtnText = "Click here to open file browser";

const files = [
  new File(["file1"], "file1.png", { type: "image/png" }),
  new File(["file2"], "file2.pdf", { type: "image/pdf" }),
  new File(["file3"], "file3.jpg", { type: "image/jpg" }),
  new File(["file3"], "file3.jpeg", { type: "image/jpeg" }),
];

test("renders ERROR component when render is undefined and no pickerBtnText", async () => {
  userEvent.setup();
  const onSelectFiles = jest.fn();

  render(
    <FileBrowser
      inputId={inputId}
      dataTestId={pickerBtnId}
      onSelectFiles={onSelectFiles}
      pickerBtnText=""
    />
  );

  expect(await screen.findByTestId("invalid-component")).toBeInTheDocument();
});

test("renders component and calls callback function", async () => {
  userEvent.setup();
  const onSelectFiles = jest.fn();

  render(
    <FileBrowser
      inputId={inputId}
      dataTestId={pickerBtnId}
      onSelectFiles={onSelectFiles}
      pickerBtnText={pickerBtnText}
    />
  );

  const trigger = await screen.findByTestId(pickerBtnId);
  expect(trigger).toHaveTextContent(pickerBtnText);

  const input = await screen.findByTestId(inputId);
  expect(input).toBeInTheDocument();

  await userEvent.click(trigger);
  await userEvent.upload(input, files);

  expect(onSelectFiles).toHaveBeenCalledTimes(1);
});

test("renders REACTNODE pickerBtnText", async () => {
  userEvent.setup();
  const onSelectFiles = jest.fn();
  const testId = "ReactNodePickerBtnText";
  const text = "pickerBtnText as a ReactNode";

  render(
    <FileBrowser
      inputId={inputId}
      dataTestId={pickerBtnId}
      onSelectFiles={onSelectFiles}
      pickerBtnText={<div data-testid={testId}>{text}</div>}
    />
  );

  const trigger = await screen.findByTestId(testId);
  expect(trigger).toHaveTextContent(text);

  const input = await screen.findByTestId(inputId);
  expect(input).toBeInTheDocument();

  await userEvent.click(trigger);
  await userEvent.upload(input, files);

  expect(onSelectFiles).toHaveBeenCalledTimes(1);
});

test("selects ONLY ONE file when multiple is false", async () => {
  userEvent.setup();
  const onSelectFiles = jest.fn();

  render(
    <FileBrowser
      inputId={inputId}
      dataTestId={pickerBtnId}
      onSelectFiles={onSelectFiles}
      pickerBtnText={pickerBtnText}
    />
  );

  const trigger = await screen.findByTestId(pickerBtnId);
  const input = await screen.findByTestId(inputId);

  await userEvent.click(trigger);
  await userEvent.upload(input, files);

  expect(onSelectFiles).toHaveBeenCalledTimes(1);
  expect(onSelectFiles).toHaveBeenCalledWith([files[0]]);
  // expect(onSelectFiles).toHaveBeenCalledWith(expect.any(FileList));

  const calledFiles = onSelectFiles.mock.calls[0][0];
  expect(calledFiles).toHaveLength(1);
  expect(calledFiles[0]).toEqual(files[0]);
});

test("selects MULTIPLE files file when multiple is false", async () => {
  userEvent.setup();
  const onSelectFiles = jest.fn();

  render(
    <FileBrowser
      multiple
      inputId={inputId}
      dataTestId={pickerBtnId}
      onSelectFiles={onSelectFiles}
      pickerBtnText={pickerBtnText}
    />
  );

  const trigger = await screen.findByTestId(pickerBtnId);
  const input = await screen.findByTestId(inputId);

  await userEvent.click(trigger);
  await userEvent.upload(input, files);

  expect(onSelectFiles).toHaveBeenCalledTimes(1);
  expect(onSelectFiles).toHaveBeenCalledWith(files);
  // expect(onSelectFiles).toHaveBeenCalledWith(expect.any(FileList));

  const calledFiles = onSelectFiles.mock.calls[0][0];
  expect(calledFiles).toHaveLength(files.length);
  files.forEach((_e, idx) => {
    expect(calledFiles[idx]).toEqual(files[idx]);
  });
});

test("renders when passed RENDER props", async () => {
  userEvent.setup();
  const onSelectFiles = jest.fn();
  const testId = "renderProp";
  const text = "Click here to select files";

  render(
    <FileBrowser
      multiple
      inputId={inputId}
      dataTestId={pickerBtnId}
      onSelectFiles={onSelectFiles}
      pickerBtnText={pickerBtnText}
      render={(props) => {
        return (
          <div data-testid={testId} onClick={props.onClick}>
            {text}
          </div>
        );
      }}
    />
  );

  // ensure default button is not rendered
  expect(screen.queryByTestId(pickerBtnId)).not.toBeInTheDocument();

  const trigger = await screen.findByTestId(testId);
  expect(trigger).toHaveTextContent(text);

  const input = await screen.findByTestId(inputId);
  expect(input).toBeInTheDocument();

  await userEvent.click(trigger);
  await userEvent.upload(input, files);

  expect(onSelectFiles).toHaveBeenCalledTimes(1);
  expect(onSelectFiles).toHaveBeenCalledWith(files);
  // expect(onSelectFiles).toHaveBeenCalledWith(expect.any(FileList));

  const calledFiles = onSelectFiles.mock.calls[0][0];
  expect(calledFiles).toHaveLength(files.length);
  files.forEach((_e, idx) => {
    expect(calledFiles[idx]).toEqual(files[idx]);
  });
});
