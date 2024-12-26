"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SortOrder() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentOrder = searchParams.get("order") || "desc";

  const handleOrderChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("order", value);
    router.push(`/?${params.toString()}`);
  };

  return (
    <Select value={currentOrder} onValueChange={handleOrderChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort order" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="desc">Newest first</SelectItem>
        <SelectItem value="asc">Oldest first</SelectItem>
      </SelectContent>
    </Select>
  );
}
