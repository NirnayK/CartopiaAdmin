"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export interface CategoryDocument {
  _id: string;
  name: string;
}

export const columns: ColumnDef<CategoryDocument>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "Edit",
    cell: ({ row }) => {
      const category = row.original;

      return (
        <div className="text-right">
          <Link href={`/categories/edit/${category._id}`}>
            <Button variant="outline">
              <div className="flex items-center gap-2">
                <Edit />
                <p className="hidden md:block">Edit</p>
              </div>
            </Button>
          </Link>
        </div>
      );
    },
  },
  {
    id: "Delete",
    cell: ({ row }) => {
      const category = row.original;

      return (
        <div className="text-right">
          <Link href={`/categories/delete/${category._id}`}>
            <Button variant="destructive">
              <div className="flex items-center gap-2">
                <Trash />
                <p className="hidden md:block">Delete</p>
              </div>
            </Button>
          </Link>
        </div>
      );
    },
  },
];
