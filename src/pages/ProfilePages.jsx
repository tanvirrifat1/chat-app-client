import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore"; // Import your auth store hook

function ProfilePages() {
  const { updated, authUser, isUpdatingProfile } = useAuthStore();

  const [selectImg, setSelectImg] = useState(null);

  // State to manage form values
  const [formData, setFormData] = useState({
    fullName: authUser?.fullName || "",
    email: authUser?.email || "",
    image:
      authUser?.profileImage ||
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
  });

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const image = reader.result;
      setSelectImg(image); // Update image preview
      try {
        await updated({ profileImage: image }); // Update profile image in the store or API
        setFormData((prevData) => ({ ...prevData, image })); // Sync image in formData
      } catch (error) {
        console.error("Error updating profile image", error);
      }
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Handle profile update logic here
      await updated({ fullName: formData.fullName });
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        className="flex lg:w-[700px] w-full flex-col items-center justify-center space-y-4 rounded-xl bg-white p-8 shadow-lg dark:bg-[#18181B]"
        onSubmit={handleSubmit} // Add submit handler
      >
        <div className="group relative">
          <img
            width={110}
            height={110}
            className="h-[110px] w-[110px] rounded-full bg-slate-500 object-cover"
            src={selectImg || formData.image}
            alt="Profile"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={isUpdatingProfile}
            className="absolute inset-0 h-[110px] w-[110px] opacity-0 cursor-pointer"
          />
        </div>
        <div className="w-full">
          <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400">
            <label className="block font-medium" htmlFor="name">
              Name
            </label>
            <input
              className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
              id="name"
              placeholder="Your Name"
              name="name"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              type="text"
            />
          </div>
        </div>
        <div className="w-full">
          <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400">
            <label className="block font-medium" htmlFor="email">
              Email
            </label>
            <input
              className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
              id="email"
              name="email"
              placeholder="Your Email"
              type="email"
              readOnly
              value={formData.email}
            />
          </div>
        </div>

        <div className="w-full">
          <p className="text-xl text-start ">Account Information</p>
          <div className="flex justify-between text-sm w-full my-2">
            <p>Member Since </p>
            <p>{authUser?.createdAt?.slice(0, 10)} </p>
          </div>
          <div className="flex justify-between text-sm w-full my-2">
            <p>Active status </p>
            <p>{authUser?.status} </p>
          </div>
        </div>

        <p className="text-lg">
          {" "}
          {isUpdatingProfile ? "Updating..." : "Update Profile"}
        </p>

        {/* <button
          type="submit"
          className="w-full rounded-full py-2 text-[12px] font-semibold text-sky-700 ring-1 ring-sky-700 hover:bg-sky-700 hover:text-white sm:text-sm md:text-base"
        >
          {isUpdatingProfile ? "Updating..." : "Update Profile"}
        </button> */}
      </form>
    </div>
  );
}

export default ProfilePages;
