import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Save, X, Upload, User, Mail, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../lib/axios";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const authUser = useAuthStore((state) => state.authUser);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    profilePic: "",
  });

  // ✅ Pre-fill data when authUser is available
  useEffect(() => {
    if (authUser) {
      setFormData({
        fullName: authUser.fullName || "",
        email: authUser.email || "",
        profilePic: authUser.profilePic || "",
      });
    }
  }, [authUser]);

  const UpdateProfileMutation = useMutation({
    mutationFn: (formDataToSend) => updateUser(formDataToSend),
    onSuccess: (data) => {
      console.log("Profile updated successfully:", data);
      toast.success("Profile updated successfully!");
      navigate("/profile");
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profilePic: file, // send raw file, not base64
      }));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("fullName", formData.fullName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("profilePic", formData.profilePic);

    UpdateProfileMutation.mutate(formDataToSend);
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b]/90 to-[#0f172a] p-4 text-white">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Update Profile</h1>
          <p className="mt-2 text-gray-400">Edit your account information</p>
        </div>

        <div className="backdrop-blur-md bg-[#1e293b]/80 border border-gray-700 shadow-xl rounded-lg">
          <form onSubmit={handleSave} className="p-6 space-y-6">
            {/* Profile Picture */}
            <div className="text-center">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="h-28 w-28 rounded-full ring-4 ring-indigo-500/30 overflow-hidden bg-indigo-500/10 flex items-center justify-center">
                    {formData.profilePic ? (
                      <img
                        src={
                          formData.profilePic instanceof File
                            ? URL.createObjectURL(formData.profilePic)
                            : formData.profilePic
                        }
                        alt={formData.fullName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-lg text-indigo-400">
                        {formData.fullName.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <label className="absolute bottom-1 right-1 p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full cursor-pointer shadow-lg transition-colors">
                    <Upload className="h-4 w-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="flex h-11 w-full rounded-md border border-gray-700 bg-[#0f172a] pl-10 pr-3 text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="flex h-11 w-full rounded-md border border-gray-700 bg-[#0f172a] pl-10 pr-3 text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="border-t border-gray-700 pt-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={UpdateProfileMutation.isPending}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors bg-indigo-600 hover:bg-indigo-500 text-white h-11 px-8 disabled:opacity-50"
                >
                  {UpdateProfileMutation.isPending ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors border border-gray-700 bg-[#1e293b] hover:bg-gray-700 text-white h-11 px-8"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
