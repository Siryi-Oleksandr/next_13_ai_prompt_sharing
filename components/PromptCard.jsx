"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  const handleProfileClick = () => {
    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-center gap-5">
        <div className=" flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="user avatar"
            width={40}
            height={40}
            className="rounded-full object-contain"
            onClick={handleProfileClick}
          />

          <div className="flex flex-col">
            <h3
              className="font-satoshi font-semibold text-gray-800"
              onClick={handleProfileClick}
            >
              {post.creator.username}
            </h3>
            <p
              className="font-inter text-sm text-gray-500"
              onClick={handleProfileClick}
            >
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={14}
            height={14}
            alt="copy icon"
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 pt-3 flex gap-5 justify-center border-t border-gray-400-700">
          <p
            className="font-inter text-sm green_gradient cursor-pointer border rounded-md px-3 py-1"
            onClick={handleEdit}
          >
            Edit
          </p>

          <p
            className="font-inter text-sm orange_gradient cursor-pointer border rounded-md px-3 py-1"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
