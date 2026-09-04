// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import useAuth from "../../hooks/useAuth";
// import {
//   getProfile,
//   updateProfile,
//   uploadProfileImage,
// } from "../../services/profileService";

// const Profile = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     role: "",
//     donorType: "",
//     recipientType: "",
//     avatar: "",
//   });

//   const [originalData, setOriginalData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [editing, setEditing] = useState(false);
//   const [uploadingImage, setUploadingImage] = useState(false);
//   const { setUser } = useAuth();

//   // =========================
//   // Fetch Profile
//   // =========================
//   const fetchProfile = async () => {
//     try {
//       const response = await getProfile();

//       const profileData = {
//         name: response.user.name || "",
//         email: response.user.email || "",
//         phone: response.user.phone || "",
//         address: response.user.address || "",
//         role: response.user.role || "",
//         donorType: response.user.donorType || "",
//         recipientType: response.user.recipientType || "",
//         avatar: response.user.avatar || "",
//       };

//       setFormData(profileData);
//       setOriginalData(profileData);

//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to load profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   // =========================
//   // Handle Input Changes
//   // =========================
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // =========================
//   // Enable Edit Mode
//   // =========================
//   const handleEdit = () => {
//     setEditing(true);
//   };

//   // =========================
//   // Cancel Editing
//   // =========================
//   const handleCancel = () => {
//     setFormData(originalData);
//     setEditing(false);
//   };


//   const handleAvatarChange = async (e) => {
//   const file = e.target.files[0];

//   if (!file) return;

//   // Check file type
//   const allowedTypes = [
//     "image/jpeg",
//     "image/png",
//     "image/webp",
//   ];

//   if (!allowedTypes.includes(file.type)) {
//     toast.error("Only JPG, PNG and WEBP images are allowed");
//     return;
//   }

//   // Check file size
//   if (file.size > 5 * 1024 * 1024) {
//     toast.error("Image must be smaller than 5MB");
//     return;
//   }

//   try {
//     setUploadingImage(true);

//     const imageData = new FormData();

//     imageData.append("avatar", file);

//     const response = await uploadProfileImage(imageData);

//     setFormData((prev) => ({
//       ...prev,
//       avatar: response.user.avatar,
//     }));

//     setOriginalData((prev) => ({
//       ...prev,
//       avatar: response.user.avatar,
//     }));

//     setUser(response.user);

//     toast.success("Profile image updated successfully");

//   } catch (error) {
//     console.error(error);

//     toast.error(
//       error.response?.data?.message ||
//       "Failed to upload profile image"
//     );

//   } finally {
//     setUploadingImage(false);

//     // Allow selecting the same image again
//     e.target.value = "";
//   }
// };

//   // =========================
//   // Save Profile
//   // =========================
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setSaving(true);

//       const response = await updateProfile(formData);

//       setUser(response.user);

//       const updatedData = {
//         name: response.user.name || "",
//         email: response.user.email || "",
//         phone: response.user.phone || "",
//         address: response.user.address || "",
//         role: response.user.role || "",
//         donorType: response.user.donorType || "",
//         recipientType: response.user.recipientType || "",
//       };

//       setFormData(updatedData);
//       setOriginalData(updatedData);

//       setEditing(false);

//       toast.success("Profile updated successfully");

//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to update profile");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // =========================
//   // Loading
//   // =========================
//   if (loading) {
//     return (
//       <div className="min-h-[60vh] flex items-center justify-center">
//         <p className="text-gray-500 text-lg">
//           Loading profile...
//         </p>
//       </div>
//     );
//   }

//   // =========================
//   // Input Style
//   // =========================
//   const inputClass = (editable = true) =>
//     `w-full mt-2 border rounded-lg p-3 outline-none transition ${
//       editing && editable
//         ? "bg-white border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
//         : "bg-gray-100 border-gray-200 text-gray-600"
//     }`;

//   return (
//     <div className="max-w-4xl mx-auto bg-white rounded-xl shadow overflow-hidden">

//       {/* =========================
//           Profile Header
//       ========================= */}
//       <div className="bg-gradient-to-r from-emerald-600 to-green-500 px-8 py-10">

//         <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">

//   {/* Avatar */}
//   <div className="relative group">

//     <label
//       htmlFor="avatar-upload"
//       className={`block relative ${
//         uploadingImage ? "cursor-wait" : "cursor-pointer"
//       }`}
//     >
//       {formData.avatar ? (
//         <img
//           src={formData.avatar}
//           alt="Profile"
//           className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
//         />
//       ) : (
//         <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center border-4 border-white shadow-lg">
//           <span className="text-4xl font-bold text-emerald-600">
//             {formData.name?.charAt(0)?.toUpperCase() || "U"}
//           </span>
//         </div>
//       )}

//       {/* Camera overlay */}
//       {!uploadingImage && (
//         <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
//           <span className="text-white text-2xl">
//             📷
//           </span>
//         </div>
//       )}

//       {/* Uploading overlay */}
//       {uploadingImage && (
//         <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center">
//           <span className="text-white text-sm font-semibold">
//             Uploading...
//           </span>
//         </div>
//       )}
//     </label>

//     {/* Hidden file input */}
//     <input
//       id="avatar-upload"
//       type="file"
//       accept="image/jpeg,image/png,image/webp"
//       onChange={handleAvatarChange}
//       disabled={uploadingImage}
//       className="hidden"
//     />

//     <p className="text-xs text-white/90 text-center mt-2">
//       Click photo to change
//     </p>

//   </div>

//   {/* User Info */}
//   <div className="text-white">

//     <h1 className="text-3xl font-bold">
//       {formData.name || "User"}
//     </h1>

//     <p className="mt-1 text-green-50">
//       {formData.donorType ||
//         formData.recipientType ||
//         "FoodBridge User"}
//     </p>

//     <span className="inline-block mt-3 px-4 py-1 bg-white/20 rounded-full text-sm">
//       {formData.role
//         ? formData.role.charAt(0).toUpperCase() +
//           formData.role.slice(1)
//         : "User"}
//     </span>

//   </div>

// </div>
          

//         </div>

      

//       {/* =========================
//           Profile Form
//       ========================= */}
//       <div className="p-8">

//         <div className="mb-8">

//           <h2 className="text-2xl font-semibold text-gray-900">
//             Personal Information
//           </h2>

//           <p className="text-gray-500 mt-1">
//             {editing
//               ? "Update the information associated with your account."
//               : "View the information associated with your account."}
//           </p>

//         </div>

//         <form
//           onSubmit={handleSubmit}
//           className="space-y-6"
//         >

//           {/* Name + Email */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//             {/* Name */}
//             <div>
//               <label className="font-medium text-gray-800">
//                 Full Name
//               </label>

//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 disabled={!editing}
//                 className={inputClass()}
//               />
//             </div>

//             {/* Email */}
//             <div>
//               <label className="font-medium text-gray-800">
//                 Email Address
//               </label>

//               <input
//                 type="email"
//                 value={formData.email}
//                 readOnly
//                 className={inputClass(false)}
//               />

//               <p className="text-sm text-gray-400 mt-1">
//                 Email cannot be changed.
//               </p>
//             </div>

//           </div>

//           {/* Phone + Role */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//             {/* Phone */}
//             <div>
//               <label className="font-medium text-gray-800">
//                 Phone Number
//               </label>

//               <input
//                 type="text"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 disabled={!editing}
//                 className={inputClass()}
//               />
//             </div>

//             {/* Role */}
//             <div>
//               <label className="font-medium text-gray-800">
//                 Account Role
//               </label>

//               <input
//                 type="text"
//                 value={
//                   formData.role
//                     ? formData.role.charAt(0).toUpperCase() +
//                       formData.role.slice(1)
//                     : ""
//                 }
//                 readOnly
//                 className={inputClass(false)}
//               />
//             </div>

//           </div>

//           {/* Address */}
//           <div>
//             <label className="font-medium text-gray-800">
//               Address
//             </label>

//             <input
//               type="text"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               disabled={!editing}
//               className={inputClass()}
//             />
//           </div>

//           {/* Donor Type */}
//           {formData.role === "donor" && (
//             <div>
//               <label className="font-medium text-gray-800">
//                 Donor Type
//               </label>

//               <input
//                 type="text"
//                 name="donorType"
//                 value={formData.donorType}
//                 onChange={handleChange}
//                 disabled={!editing}
//                 className={inputClass()}
//               />
//             </div>
//           )}

//           {/* Recipient Type */}
//           {formData.role === "recipient" && (
//             <div>
//               <label className="font-medium text-gray-800">
//                 Recipient Type
//               </label>

//               <input
//                 type="text"
//                 name="recipientType"
//                 value={formData.recipientType}
//                 onChange={handleChange}
//                 disabled={!editing}
//                 className={inputClass()}
//               />
//             </div>
//           )}

//           {/* =========================
//               Buttons
//           ========================= */}
//           <div className="flex justify-end gap-3 pt-6 border-t">

//             {!editing ? (

//               <button
//                 type="button"
//                 onClick={handleEdit}
//                 className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition"
//               >
//                 Edit Profile
//               </button>

//             ) : (

//               <>
//                 <button
//                   type="button"
//                   onClick={handleCancel}
//                   disabled={saving}
//                   className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition disabled:opacity-50"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="submit"
//                   disabled={saving}
//                   className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition disabled:opacity-50"
//                 >
//                   {saving ? "Saving..." : "Save Changes"}
//                 </button>
//               </>

//             )}

//           </div>

//         </form>

//       </div>

//     </div>
//   );
// };

// export default Profile;




import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

import {
  getProfile,
  updateProfile,
  uploadProfileImage,
} from "../../services/profileService";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    role: "",
    donorType: "",
    recipientType: "",
    avatar: "",
  });

  const [originalData, setOriginalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const { setUser } = useAuth();

  // =========================
  // Fetch Profile
  // =========================
  const fetchProfile = async () => {
    try {
      const response = await getProfile();

      const profileData = {
        name: response.user.name || "",
        email: response.user.email || "",
        phone: response.user.phone || "",
        address: response.user.address || "",
        role: response.user.role || "",
        donorType: response.user.donorType || "",
        recipientType: response.user.recipientType || "",
        avatar: response.user.avatar || "",
      };

      setFormData(profileData);
      setOriginalData(profileData);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // =========================
  // Handle Input Changes
  // =========================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // Upload Avatar
  // =========================
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, PNG and WEBP images are allowed");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5MB");
      e.target.value = "";
      return;
    }

    try {
      setUploadingImage(true);

      const imageData = new FormData();

      imageData.append("avatar", file);

      const response = await uploadProfileImage(imageData);

      setFormData((prev) => ({
        ...prev,
        avatar: response.user.avatar,
      }));

      setOriginalData((prev) => ({
        ...prev,
        avatar: response.user.avatar,
      }));

      setUser(response.user);

      toast.success("Profile image updated successfully");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to upload profile image"
      );
    } finally {
      setUploadingImage(false);
      e.target.value = "";
    }
  };

  // =========================
  // Enable Edit Mode
  // =========================
  const handleEdit = () => {
    setEditing(true);
  };

  // =========================
  // Cancel Editing
  // =========================
  const handleCancel = () => {
    setFormData(originalData);
    setEditing(false);
  };

  // =========================
  // Save Profile
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const response = await updateProfile(formData);

      setUser(response.user);

      const updatedData = {
        name: response.user.name || "",
        email: response.user.email || "",
        phone: response.user.phone || "",
        address: response.user.address || "",
        role: response.user.role || "",
        donorType: response.user.donorType || "",
        recipientType: response.user.recipientType || "",
        avatar: response.user.avatar || "",
      };

      setFormData(updatedData);
      setOriginalData(updatedData);

      setEditing(false);

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // Loading
  // =========================
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500 text-lg">
          Loading profile...
        </p>
      </div>
    );
  }

  // =========================
  // Input Style
  // =========================
  const inputClass = (editable = true) =>
    `w-full mt-2 border rounded-lg p-3 outline-none transition ${
      editing && editable
        ? "bg-white border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        : "bg-gray-100 border-gray-200 text-gray-600"
    }`;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow overflow-hidden">

      {/* =========================
          Profile Header
      ========================= */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-500 px-6 sm:px-8 py-10">

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">

          {/* Avatar */}
          <div className="relative group">

            <label
              htmlFor="avatar-upload"
              className={`block relative ${
                uploadingImage
                  ? "cursor-wait"
                  : "cursor-pointer"
              }`}
            >

              {formData.avatar ? (
                <img
                  src={formData.avatar}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center border-4 border-white shadow-lg">
                  <span className="text-4xl font-bold text-emerald-600">
                    {formData.name
                      ?.charAt(0)
                      ?.toUpperCase() || "U"}
                  </span>
                </div>
              )}

              {/* Camera Overlay */}
              {!uploadingImage && (
                <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <span className="text-white text-2xl">
                    📷
                  </span>
                </div>
              )}

              {/* Uploading Overlay */}
              {uploadingImage && (
                <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    Uploading...
                  </span>
                </div>
              )}

            </label>

            {/* Hidden File Input */}
            <input
              id="avatar-upload"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleAvatarChange}
              disabled={uploadingImage}
              className="hidden"
            />

            <p className="text-xs text-white/90 text-center mt-2">
              Click photo to change
            </p>

          </div>

          {/* User Information */}
          <div className="text-white text-center sm:text-left">

            <h1 className="text-3xl font-bold">
              {formData.name || "User"}
            </h1>

            <p className="mt-1 text-green-50">
              {formData.donorType ||
                formData.recipientType ||
                "FoodBridge User"}
            </p>

            <span className="inline-block mt-3 px-4 py-1 bg-white/20 rounded-full text-sm">
              {formData.role
                ? formData.role.charAt(0).toUpperCase() +
                  formData.role.slice(1)
                : "User"}
            </span>

          </div>

        </div>

      </div>

      {/* =========================
          Profile Form
      ========================= */}
      <div className="p-6 sm:p-8">

        <div className="mb-8">

          <h2 className="text-2xl font-semibold text-gray-900">
            Personal Information
          </h2>

          <p className="text-gray-500 mt-1">
            {editing
              ? "Update the information associated with your account."
              : "View the information associated with your account."}
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Name + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="font-medium text-gray-800">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!editing}
                className={inputClass()}
              />
            </div>

            <div>
              <label className="font-medium text-gray-800">
                Email Address
              </label>

              <input
                type="email"
                value={formData.email}
                readOnly
                className={inputClass(false)}
              />

              <p className="text-sm text-gray-400 mt-1">
                Email cannot be changed.
              </p>
            </div>

          </div>

          {/* Phone + Role */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="font-medium text-gray-800">
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!editing}
                className={inputClass()}
              />
            </div>

            <div>
              <label className="font-medium text-gray-800">
                Account Role
              </label>

              <input
                type="text"
                value={
                  formData.role
                    ? formData.role.charAt(0).toUpperCase() +
                      formData.role.slice(1)
                    : ""
                }
                readOnly
                className={inputClass(false)}
              />
            </div>

          </div>

          {/* Address */}
          <div>
            <label className="font-medium text-gray-800">
              Address
            </label>

            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              disabled={!editing}
              className={inputClass()}
            />
          </div>

          {/* Donor Type */}
          {formData.role === "donor" && (
            <div>
              <label className="font-medium text-gray-800">
                Donor Type
              </label>

              <input
                type="text"
                name="donorType"
                value={formData.donorType}
                onChange={handleChange}
                disabled={!editing}
                className={inputClass()}
              />
            </div>
          )}

          {/* Recipient Type */}
          {formData.role === "recipient" && (
            <div>
              <label className="font-medium text-gray-800">
                Recipient Type
              </label>

              <input
                type="text"
                name="recipientType"
                value={formData.recipientType}
                onChange={handleChange}
                disabled={!editing}
                className={inputClass()}
              />
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t">

            {!editing ? (

              <button
                type="button"
                onClick={handleEdit}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition"
              >
                Edit Profile
              </button>

            ) : (

              <>
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={saving}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </>

            )}

          </div>

        </form>

      </div>

    </div>
  );
};

export default Profile;