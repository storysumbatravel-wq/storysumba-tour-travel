"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function DeleteBlogButton({ id }: { id: string }) {
  const handleDelete = async () => {
    const confirmDelete = confirm("Delete this blog?");
    if (!confirmDelete) return;

    await fetch(`/api/blogs/${id}`, {
      method: "DELETE",
    });

    window.location.reload();
  };

  return (
    <DropdownMenuItem
      onClick={handleDelete}
      className="text-red-600 focus:text-red-600 focus:bg-red-50"
    >
      Delete
    </DropdownMenuItem>
  );
}
