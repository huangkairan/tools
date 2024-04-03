import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";

type JsonViewerProps = {
  value: Object;
};

export default function JsonViewer({ value }: JsonViewerProps) {
  return (
    <div className="rounded-md overflow-hidden">
      <CodeMirror
        readOnly
        minHeight="80vh"
        width="60vw"
        height="50vh"
        value={JSON.stringify(value, null, 2)}
        extensions={[json()]}
      />
    </div>
  );
}
