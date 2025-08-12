"use client";
import { createPost } from "@/utils/actions/post";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost({
            title: "test",
            description: "Longer text test",
          });
        }}
      >
        <div className="mb-4">
          <label
            htmlFor="postName"
            className="block text-sm font-medium text-gray-700"
          >
            Post Name
          </label>
          <input
            type="text"
            name="postName"
            id="postName"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}
