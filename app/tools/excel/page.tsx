"use client";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";

const { Dragger } = Upload;

export default function Excel() {
  const props: UploadProps = {
    name: "file",
    multiple: false,
    accept: ".xls, .xlsx",
    action: "/api/excel",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      message.info("drop file");
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <main className="flex min-h-screen  flex-start justify-between p-24 gap-8">
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

      <section className="flex-1">side</section>
    </main>
  );
}
