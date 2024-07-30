import clsx from "clsx";
import { Upload } from "lucide-react";
import { useState } from "react";
import { DragAndDrop, FileBrowser } from "react-drag-drop-browser";

function App() {
  const [myFiles, setMyFiles] = useState<File[]>([]);

  const onAddFile = (files: File[]) => {
    setMyFiles((prev) => [...prev, ...files]);
  };

  return (
    <div className="space-y-8">
      <div className="">
        <h1 className="text-blue-700 text-2xl font-bold">
          React drag and drop browser demo
        </h1>
      </div>

      <div className="selected-files text-sm text-pink-600">
        {myFiles.map((f) => {
          return <p key={f.name}>{f.name}</p>;
        })}
      </div>

      <div className="space-y-3">
        <h4 className="text-blue-700 text-xl font-bold">
          Using the <code className="text-green-600">{"<FileBrowser />"}</code>{" "}
          component
        </h4>

        <div className="md:w-[400px] flex justify-center mx-auto">
          <img
            src="file-browser-props.png"
            alt="file-browser-props"
            className="w-full h-full"
          />
        </div>
      </div>

      <div className="">
        <FileBrowser
          inputId="pickerWithString"
          onSelectFiles={onAddFile}
          pickerBtnText="<FileBrowser /> with a string as the pickerBtnText"
        />
      </div>

      <div className="">
        <FileBrowser
          multiple
          inputId="pickerWithJSX"
          onSelectFiles={onAddFile}
          pickerBtnText={
            <div className="text-blue-700 py-3 px-5 border border-blue-500 rounded-md">
              <code className="text-pink-600">{"<FileBrowser />"}</code> with a{" "}
              <code className="text-pink-600">ReactElement</code> as the{" "}
              <code className="text-pink-600">pickerBtnText</code>
              <p>
                Has <code className="text-pink-600">multiple</code> prop to
                allow selecting multiple files
              </p>
            </div>
          }
        />
      </div>

      <div className="">
        <FileBrowser
          inputId="renderProps"
          onSelectFiles={onAddFile}
          render={({ onClick }) => {
            return (
              <div
                onClick={onClick}
                className="border border-blue-500 p-5 rounded-md"
              >
                <p className="text-blue-700 cursor-pointer">
                  <code className="text-pink-600">{"<FileBrowser />"}</code>{" "}
                  with a render prop that receives a prop with shape
                  <br />
                  <code className="text-pink-600">{'"{ onClick }"'}</code>
                </p>
              </div>
            );
          }}
        />
      </div>

      <div className="space-y-3">
        <h4 className="text-blue-700 text-xl font-bold">
          Using the <code className="text-green-600">{"<DragAndDrop />"}</code>{" "}
          component
        </h4>

        <div className="md:w-[400px] flex justify-center mx-auto">
          <img
            src="drag-and-drop-props.png"
            alt="drag-and-drop-props"
            className="w-full h-full"
          />
        </div>
      </div>

      <div className="">
        <DragAndDrop
          zoneId="standaloneZone"
          zoneClassName="flex items-center justify-center border border-blue-500 rounded-md p-10"
          onDropFiles={onAddFile}
        >
          <div className="p-3 bg-violet-400 w-full rounded-md">
            <div className="bg-blue-100 rounded-md py-3">
              <h4 className="text-blue-700">Using the drag and drop zone</h4>
            </div>
          </div>
        </DragAndDrop>
      </div>

      <div>
        <DragAndDrop
          zoneId="dragWithRenderProps"
          zoneClassName="flex items-center justify-center border border-blue-500 rounded-md"
          onDropFiles={onAddFile}
          render={({ state, onDrop, onDragEnter, onDragLeave, onDragOver }) => {
            return (
              <div
                className={clsx(
                  "border border-blue-500 rounded-md py-6",
                  state.inDropZone && "bg-violet-500 bg-opacity-50"
                )}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
              >
                <p className="text-blue-700">
                  <code className="text-pink-600">{"<DragAndDrop />"}</code>{" "}
                  that receives a prop with shape
                  <br />
                  <code className="text-pink-600">
                    {
                      '"{ onDrop, onDragEnter, onDragLeave, onDragOver, state, resetState }"'
                    }
                  </code>
                </p>
              </div>
            );
          }}
        />
      </div>

      <h4 className="text-blue-700 text-xl font-bold">
        Combinining the{" "}
        <code className="text-pink-600">{"<DragAndDrop />"}</code> with the{" "}
        <code className="text-pink-600">{"<FileBrowser />"}</code> component
      </h4>

      <hr />

      <div>
        <DragAndDrop
          zoneId="withPicker"
          inZoneClassName="bg-blue-300"
          zoneClassName="flex items-center justify-center border border-blue-500 rounded-md py-5 px-3"
          onDropFiles={onAddFile}
        >
          <div className="flex flex-col items-center justify-center gap-4 h-full">
            <h4 className="text-blue-700 font-medium">
              This component combines the drag and drop zone with the file
              browser
            </h4>

            <Upload className="text-blue-700" />
            <FileBrowser
              inputId="pickerInsideZone"
              onSelectFiles={onAddFile}
              pickerBtnText="This <FileBrower /> is rendered inside <DragAndDrop /> component"
            />
          </div>
        </DragAndDrop>
      </div>

      <div>
        <DragAndDrop
          zoneId="clickableZone"
          zoneClassName="flex items-center justify-center border border-blue-500 rounded-md"
          onDropFiles={onAddFile}
        >
          <FileBrowser
            inputId="pickerInClickableZone"
            onSelectFiles={onAddFile}
            render={(props) => {
              return (
                <div
                  onClick={props.onClick}
                  className="flex flex-col items-center justify-center gap-4 bg-gray-100 w-full h-full py-5 px-3 rounded-md"
                >
                  <Upload className="text-blue-700" />
                  <p className="text-blue-700">
                    This whole area is clickable and you can also drop a file in
                    it
                  </p>
                </div>
              );
            }}
            pickerBtnText="This picker is rendered inside a drop zone"
          />
        </DragAndDrop>
      </div>
    </div>
  );
}

export default App;
