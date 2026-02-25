"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export default function AddBlog() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData();

    formData.append("title", (form.title as unknown as HTMLInputElement).value);
    formData.append(
      "content",
      (form.content as unknown as HTMLTextAreaElement).value,
    );
    formData.append(
      "author",
      (form.author as unknown as HTMLInputElement).value,
    );

    const imageInput = form.image as unknown as HTMLInputElement;
    if (imageInput.files && imageInput.files[0]) {
      formData.append("image", imageInput.files[0]);
    }

    try {
      const res = await fetch("/api/blogs", { method: "POST", body: formData });
      if (res.ok) router.push("/dashboard/blogs");
      else alert("Failed to create blog");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-stone-200">
      <h2 className="font-serif text-3xl font-bold mb-6">Add New Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" placeholder="Blog Title" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="author">Author</Label>
          <Input id="author" name="author" placeholder="Admin" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="content">Content</Label>
          <Textarea id="content" name="content" rows={8} required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="image">Cover Image</Label>
          <Input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          {preview && (
            <div className="mt-2 relative w-full h-40 rounded border overflow-hidden bg-stone-50">
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-contain"
              />
            </div>
          )}
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="bg-primary hover:bg-primary/90 text-white"
        >
          {loading ? "Saving..." : "Save Blog"}
        </Button>
      </form>
    </div>
  );
}
