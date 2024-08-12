"use client";

import { Input } from "@material-tailwind/react";
import { useState } from "react";

export default function SearchComponent() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <Input
        value={search}
        placeholder="Search Images"
        icon={<i className="fa-solid fa-magnifying-glass" />}
        onChange={(e) => setSearch(e.target.value)}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        crossOrigin={undefined}
      />
    </div>
  );
}
