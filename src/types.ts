import { ChangeEvent, DragEvent } from "react";

export type RDBDragEvent<TElmt = HTMLDivElement> = DragEvent<TElmt>;

export interface FileBrowserRenderProps {
  onClick?: () => void;
}

export interface RDBDragState {
  dropped: boolean;
  dragging: boolean;
  inDropZone: boolean;
}

export type FileEvent = ChangeEvent<HTMLInputElement> & {
  target: EventTarget & { files: FileList };
  dataTransfer: DataTransfer & { files: FileList };
  currentTarget: EventTarget & { files: FileList } & HTMLInputElement;
  preventDefault: () => null;
};

export interface DragAndDropRenderProps {
  state: RDBDragState;
  resetState: () => void;
  onDrop: (e: RDBDragEvent) => void;
  onDragOver: (e: RDBDragEvent) => void;
  onDragLeave: (e: RDBDragEvent) => void;
  onDragEnter: (e: RDBDragEvent) => void;
}
