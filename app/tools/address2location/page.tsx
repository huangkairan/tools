"use client";
import { Button, Input } from "antd";
import axios from "axios";
import { useState } from "react";
export default () => {
  const [location, setLocation] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const search = async (address: string) => {
    const res = await axios.post("/api/address2location", { address });
    if (res.data.code === 200) {
      setLocation(res.data.data);
    }
  };
  return (
    <main className="min-h-screen  p-24 pb-0 gap-8">
      <section className="h-1/3">
        <Input
          placeholder="input address"
          allowClear
          onPressEnter={(e: React.KeyboardEvent<HTMLInputElement>) => {
            search(e.currentTarget.value);
          }}
        />
      </section>

      <section className="my-8">
        x,y: {`${location.x},${location.y}`}{" "}
        <Button
          type="link"
          onClick={() => {
            window.open("https://lbs.amap.com/tools/picker");
          }}
        >
          测试坐标
        </Button>
      </section>
    </main>
  );
};
