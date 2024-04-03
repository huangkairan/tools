"use client";
import JsonViewer from "@/components/JsonViewer";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Segmented, Upload } from "antd";
import { useState } from "react";

const { Dragger } = Upload;

export default function Excel() {
  const [excelData, setExcelData] = useState<Record<string, Array<unknown>>>(
    {}
  );
  const [key, setKey] = useState<string>("default");
  const props: UploadProps = {
    name: "file",
    multiple: false,
    accept: ".xls, .xlsx",
    maxCount: 1,
    action: "/api/excel",
    onChange(info) {
      const { status, response } = info.file;
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        const { data } = response;
        setExcelData(data);
        setKey(Object.keys(data)[0]);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <main className="flex min-h-screen  flex-start justify-between p-24 pb-0 gap-8">
      <section className="basis-1/3">
        <div className="h-32">
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-hint">
              drag excel file here or click to upload
            </p>
          </Dragger>
        </div>
      </section>

      <section className="flex-1">
        <div className="mb-2">
          <Segmented
            options={Object.keys(excelData)}
            value={key}
            onChange={setKey}
          />
        </div>
        <JsonViewer value={excelData[key]} />
      </section>
    </main>
  );
}
