import { useState, HTMLAttributes, cloneElement, ReactElement } from "react";
import { RDBDragEvent, DragAndDropRenderProps, RDBDragState } from "../types";
import { classNames } from "../lib/join-classes";

interface Props {
  zoneId: string;
  dataTestId?: string;
  maxSizeInMB?: number;
  children?: string | ReactElement;
  zoneClassName?: HTMLAttributes<HTMLElement>["className"];
  inZoneClassName?: HTMLAttributes<HTMLElement>["className"];
  render?: (props: DragAndDropRenderProps) => ReactElement;
  onDropFiles: (files: File[]) => void;
}

const initState: RDBDragState = {
  dropped: false,
  dragging: false,
  inDropZone: false,
};

export default function DragAndDrop(props: Readonly<Props>) {
  const {
    zoneId = "hot-zone",
    dataTestId = "hot-zone",
    maxSizeInMB = 1,
    children = "Drop files here",
    inZoneClassName = "inside-hot-zone",
    zoneClassName = "hot-zone",
    render = undefined,
    onDropFiles,
  } = props;

  const sizeInBytes = maxSizeInMB * 1024 * 1024;
  const [state, setState] = useState(initState);

  const resetState = () => {
    setState(initState);
  };

  const handleDragEnter = (e: RDBDragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // During ENTER, we want to check if the event is triggered by the DnD zone
    // If yes, then we're within the zone

    const target = e.target as HTMLElement;
    const currentTarget = e.currentTarget as HTMLElement;
    const relatedTarget = e.relatedTarget as HTMLElement;
    const triggeredByHotZone = target?.id === zoneId;

    const eventInDropZone =
      triggeredByHotZone || currentTarget?.contains(relatedTarget);

    setState((prev) => ({
      ...prev,
      dropped: false,
      inDropZone: eventInDropZone,
    }));
  };

  const handleDragLeave = (e: RDBDragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // During LEAVE, we want to check if the event trigger is located within the DnD zone
    // because this time we're assumed to be already inside the borders of the DnD zone

    // If the event is triggered by something OUTSIDE of the DnD zone, then we're no longer
    // inside the borders of the DnD zone

    const currentTarget = e.currentTarget as HTMLElement;
    const relatedTarget = e.relatedTarget as HTMLElement;
    const eventInDropZone = currentTarget?.contains(relatedTarget);

    setState((prev) => ({
      ...prev,
      dropped: false,
      inDropZone: eventInDropZone,
    }));
  };

  const handleDragOver = (e: RDBDragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const target = e.target as HTMLElement;
    const currentTarget = e.currentTarget as HTMLElement;

    e.dataTransfer.dropEffect = "copy";
    setState((prev) => ({
      ...prev,
      dragging: true,
      inDropZone: currentTarget?.contains(target),
    }));
  };

  const handleDrop = (e: RDBDragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const fileArray = Array.from(e.dataTransfer.files).filter(
      (file) => file.size <= sizeInBytes
    );

    onDropFiles(fileArray);
    resetState();
  };

  if (render) {
    const renderWithId = (renderProps: DragAndDropRenderProps) => {
      const renderedNode = render(renderProps);
      return cloneElement(renderedNode, { id: zoneId });
    };

    return renderWithId({
      state,
      resetState,
      onDrop: handleDrop,
      onDragEnter: handleDragEnter,
      onDragLeave: handleDragLeave,
      onDragOver: handleDragOver,
    });
  }

  return (
    <section
      id={zoneId}
      data-testid={dataTestId}
      // tabIndex={0}
      aria-labelledby="Drag and drop zone"
      className={classNames(
        zoneClassName,
        state.inDropZone ? inZoneClassName : ""
      )}
      onBlur={resetState}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      {children}
    </section>
  );
}
