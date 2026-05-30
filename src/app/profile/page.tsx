"use client";

import { useEffect, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";

import { UserService }
from "@/services/user.service";

export default function ProfilePage() {

  const [profile, setProfile] =
    useState<any>(null);

  const loadProfile =
    async () => {

      const response =
        await UserService.getProfile();

      setProfile(
        response.data
      );
    };

  useEffect(() => {
    loadProfile();
  }, []);

  const saveProfile =
    async () => {

      await UserService.updateProfile({
        name: profile.name,
        email: profile.email,
      });

      alert(
        "Profile Updated"
      );
    };

  if (!profile)
    return null;

  return (
    <DashboardLayout>

      <div className="max-w-3xl">

        <h1 className="text-4xl font-bold mb-8">
          Profile
        </h1>

        <div className="bg-white border rounded-2xl p-8">

          <div className="space-y-6">

            <div>

              <label className="block mb-2 font-medium">
                Name
              </label>

              <input
                value={profile.name}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    name: e.target.value,
                  })
                }
                className="w-full border rounded-xl p-3"
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Email
              </label>

              <input
                value={profile.email}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    email: e.target.value,
                  })
                }
                className="w-full border rounded-xl p-3"
              />

            </div>

            <button
              onClick={saveProfile}
              className="bg-black text-white px-6 py-3 rounded-xl"
            >
              Save Changes
            </button>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}