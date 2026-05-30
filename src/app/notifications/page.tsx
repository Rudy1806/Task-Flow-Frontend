"use client";

import { useEffect, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";

import { NotificationService } from "@/services/notification.service";
export default function NotificationsPage() {

  const [
    notifications,
    setNotifications
  ] = useState<any[]>([]);

  const fetchNotifications =
    async () => {

      const response =
        await NotificationService
          .getNotifications();
        console.log(
  "NOTIFICATIONS RESPONSE:",
  response
);

      setNotifications(
        response.data
      );
    };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">

        <div className="flex justify-between items-center">
  <h1 className="text-4xl font-bold">
    Notifications
  </h1>

  <button
    onClick={async () => {
      await NotificationService.markAllRead();
      fetchNotifications();
    }}
    className="
      px-4 py-2
      bg-black
      text-white
      rounded-xl
    "
  >
    Mark All Read
  </button>
</div>

        <div className="bg-white rounded-2xl border">

          {notifications.length === 0 ? (

            <div className="p-8 text-center text-neutral-500">
              No notifications
            </div>

          ) : (

            notifications.map(
              (notification: any) => (

                <div
                key={notification.id}
                className={`
                    p-5
                    border-b
                    flex
                    justify-between
                    items-start
                    ${
                    !notification.is_read
                        ? "bg-blue-50"
                        : "bg-white"
                    }
                `}
                >

                  <div className="flex justify-between">

                    <div>

                      <h3 className="font-semibold">
                        {notification.title}
                      </h3>

                      <p className="text-xs text-neutral-400 mt-2">
                        {new Date(
                            notification.created_at
                        ).toLocaleString()}
                        </p>

                    </div>

                    {!notification.is_read && (

                      <button
                        onClick={async () => {

                          await NotificationService
                            .markAsRead(
                              notification.id
                            );

                          fetchNotifications();
                        }}
                        className="text-sm text-blue-600"
                      >
                        Mark Read
                      </button>

                    )}

                  </div>

                </div>

              )
            )

          )}

        </div>

      </div>
    </DashboardLayout>
  );
}