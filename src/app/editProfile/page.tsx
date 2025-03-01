"use client";
import { useEffect, useState, FormEvent } from "react";
import { IoPerson } from "react-icons/io5";
import axios from "axios";
import { baseUrl } from "../../utils/api";
import { useRouter } from "next/navigation";

const EditProfile = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    status: "",
    company: "",
    website: "",
    location: "",
    skills: "",
    githubusername: "",
    bio: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found. Please login again.");

        const res = await axios.get(`${baseUrl}profile/me`, {
          headers: {
            "x-auth-token": token,
          },
        });

        const profile = res.data;
        setFormData({
          status: profile.status || "",
          company: profile.company || "",
          website: profile.website || "",
          location: profile.location || "",
          skills: profile.skills ? profile.skills.join(", ") : "",
          githubusername: profile.githubusername || "",
          bio: profile.bio || "",
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile.");
      }
    };

    fetchProfile();
  }, []);

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please login again.");

      await axios.post(
        `${baseUrl}profile`,
        {
          ...formData,
          skills: formData.skills.split(",").map((s) => s.trim()), // Stringni arrayga o‘girish
        },
        {
          headers: {
            "x-auth-token": token,
            "Content-Type": "application/json",
          },
        }
      );

      router.push("/dashboard");
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[800px] m-auto p-4 ">
      <h1 className="font-bold text-5xl text-[#17a2b8] pt-9 mb-2">
        Edit Your Profile
      </h1>
      <div className="flex items-center gap-2">
        <IoPerson className="text-2xl" />
        <p className="text-2xl mb-2">Add some changes to your profile</p>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <form
        className="w-[800px] flex flex-col items-start gap-2"
        onSubmit={onSubmit}
      >
        <select
          name="status"
          className="w-full border py-2 px-4"
          value={formData.status}
          onChange={onChange}
        >
          <option value="">* Select Professional Status</option>
          <option value="developer">Developer</option>
          <option value="junior-developer">Junior Developer</option>
          <option value="senior-developer">Senior Developer</option>
          <option value="manager">Manager</option>
          <option value="student">Student or Learning</option>
          <option value="instructor">Instructor or Teacher</option>
          <option value="intern">Intern</option>
          <option value="other">Other</option>
        </select>
        <p className="text-gray-500 text-sm">
          Give us an idea of where you are at in your career
        </p>
        <input
          name="company"
          className="w-full border py-2 px-4"
          placeholder="Company"
          value={formData.company}
          onChange={onChange}
        />
        <p className="text-gray-500 text-sm">
          Could be your own company or one you work for
        </p>
        <input
          name="website"
          className="w-full border py-2 px-4"
          placeholder="Website"
          value={formData.website}
          onChange={onChange}
        />
        <p className="text-gray-500 text-sm">
          Could be your own or a company website
        </p>
        <input
          name="location"
          className="w-full border py-2 px-4"
          placeholder="Location"
          value={formData.location}
          onChange={onChange}
        />
        <p className="text-gray-500 text-sm">
          City & state suggested (eg. Boston, MA)
        </p>

        <input
          name="skills"
          className="w-full border py-2 px-4"
          placeholder="* Skills (comma separated)"
          value={formData.skills}
          onChange={onChange}
        />
        <p className="text-gray-500 text-sm">
          Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
        </p>
        <input
          name="githubusername"
          className="w-full border py-2 px-4"
          placeholder="Github Username"
          value={formData.githubusername}
          onChange={onChange}
        />
        <p className="text-gray-500 text-sm">
          If you want your latest repos and a Github link, include your username
        </p>
        <textarea
          name="bio"
          className="w-full border py-2 px-4"
          placeholder="A short bio of yourself"
          value={formData.bio}
          onChange={onChange}
          rows={4}
        />
        <p className="text-gray-500 text-sm">Tell us a little about yourself</p>
        <button
          type="submit"
          className="bg-[#17a2b8] text-white py-2 px-4"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
