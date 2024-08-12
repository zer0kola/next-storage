"use client";

import { Input } from "@material-tailwind/react";
import { useState } from "react";

export default function SearchComponent({ searchInput, setSearchInput }) {
  return (
    <div>
      <Input
        value={searchInput}
        placeholder="Search Images"
        icon={<i className="fa-solid fa-magnifying-glass" />}
        onChange={(e) => setSearchInput(e.target.value)}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        crossOrigin={undefined}
      />
    </div>
  );
}
