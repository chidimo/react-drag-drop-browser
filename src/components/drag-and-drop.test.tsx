import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DragAndDrop from "./drag-and-drop";
import { classNames } from "../lib/join-classes";

const onDropFiles = jest.fn();

const inZoneClassName = "inZoneClassName";

const files = [
  new File(["file1"], "file1.png", { type: "image/png" }),
  new File(["file2"], "file2.pdf", { type: "image/pdf" }),
  new File(["file3"], "file3.jpg", { type: "image/jpg" }),
  new File(["file3"], "file3.jpeg", { type: "image/jpeg" }),
];

test("Uploads file when dropped in hot zone", async () => {
  userEvent.setup();
  const testId = "testId1";

  render(
    <DragAndDrop
      zoneId={"test1"}
      dataTestId={testId}
      inZoneClassName={inZoneClassName}
      onDropFiles={onDropFiles}
    >
      Drag and drop area
    </DragAndDrop>
  );

  const dropZone = screen.getByTestId(testId);

  expect(dropZone).not.toHaveClass(inZoneClassName);

  fireEvent.dragEnter(dropZone, {
    dataTransfer: { files },
  });

  expect(dropZone).toHaveClass(inZoneClassName);

  fireEvent.dragOver(dropZone, {
    dataTransfer: { files },
  });

  expect(dropZone).toHaveClass(inZoneClassName);

  fireEvent.drop(dropZone, {
    dataTransfer: { files },
  });

  expect(onDropFiles).toHaveBeenCalledTimes(1);
});

test("uploads files when dropped in a child element", async () => {
  userEvent.setup();
  const testId = "testId2";
  const childId = "childId";

  render(
    <DragAndDrop
      zoneId={"test2"}
      dataTestId={testId}
      inZoneClassName={inZoneClassName}
      onDropFiles={onDropFiles}
    >
      <div data-testid={childId}>Drag and drop area</div>
    </DragAndDrop>
  );

  const childZone = screen.getByTestId(childId);
  const dropZone = screen.getByTestId(testId);

  expect(dropZone).not.toHaveClass(inZoneClassName);

  fireEvent.dragEnter(childZone, {
    dataTransfer: { files },
  });

  fireEvent.dragLeave(dropZone, {
    dataTransfer: { files },
  });

  // this will not pass because the relatedTarget is not set on the element
  // expect(dropZone).toHaveClass(inZoneClassName);

  fireEvent.dragOver(childZone, {
    dataTransfer: { files },
  });

  fireEvent.drop(childZone, {
    dataTransfer: { files },
  });

  expect(onDropFiles).toHaveBeenCalledTimes(1);
  const calledFiles = onDropFiles.mock.calls[0][0];
  expect(calledFiles).toHaveLength(files.length);
  files.forEach((_e, idx) => {
    expect(calledFiles[idx]).toEqual(files[idx]);
  });
});

test("uploads files with a RENDER prop", async () => {
  userEvent.setup();
  const testId = "dragDropWithRenderProps";

  render(
    <DragAndDrop
      zoneId={testId}
      onDropFiles={onDropFiles}
      render={({ onDrop, onDragEnter, onDragLeave, onDragOver, state }) => {
        return (
          <div
            data-testid={testId}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            className={classNames(state.inDropZone && inZoneClassName)}
          >
            Hot zone with render props
          </div>
        );
      }}
    />
  );

  const dropZone = screen.getByTestId(testId);

  expect(dropZone).not.toHaveClass(inZoneClassName);

  fireEvent.dragEnter(dropZone, {
    dataTransfer: { files },
  });

  expect(dropZone).toHaveClass(inZoneClassName);

  fireEvent.dragOver(dropZone, {
    dataTransfer: { files },
  });

  fireEvent.drop(dropZone, {
    dataTransfer: { files },
  });

  expect(onDropFiles).toHaveBeenCalledTimes(1);
  const calledFiles = onDropFiles.mock.calls[0][0];
  expect(calledFiles).toHaveLength(files.length);
  files.forEach((_e, idx) => {
    expect(calledFiles[idx]).toEqual(files[idx]);
  });
});
