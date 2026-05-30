

"use client";

import { useEffect, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";

import { TaskService } from "@/services/task.service";
import { UserService } from "@/services/user.service";

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  const [editingTask, setEditingTask] =
    useState<any>(null);

  const [isEditOpen, setIsEditOpen] =
    useState(false);

  const [isCreateOpen, setIsCreateOpen] =
    useState(false);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
    assigned_to: "",
  });

  const fetchTasks = async () => {
    try {
      const response =
        await TaskService.getTasks();

      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response =
        await UserService.getUsers();

      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  const handleDelete = async (
    id: string
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this task?"
      );

    if (!confirmed) return;

    try {
      await TaskService.deleteTask(id);

      setTasks(
        tasks.filter(
          (task) => task.id !== id
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (
    task: any
  ) => {
    setEditingTask(task);
    setIsEditOpen(true);
  };

  const saveTask = async () => {
    try {
      await TaskService.updateTask(
        editingTask.id,
        {
          title: editingTask.title,
          description:
            editingTask.description,
          priority:
            editingTask.priority,
          status:
            editingTask.status,
          assigned_to:
            editingTask.assigned_to,
        }
      );

      await fetchTasks();

      setIsEditOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const createTask = async () => {
    try {
      await TaskService.createTask({
        title: newTask.title,
        description:
          newTask.description,
        priority:
          newTask.priority,
        status: "PENDING",
        assigned_to:
          newTask.assigned_to || null,
      });

      await fetchTasks();

      setIsCreateOpen(false);

      setNewTask({
        title: "",
        description: "",
        priority: "MEDIUM",
        assigned_to: "",
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            Tasks
          </h1>

        <button
        onClick={() => setIsCreateOpen(true)}
        className="px-4 py-2 bg-black text-white rounded-lg"
        >
        New Task
        </button>
      </div>

      <div className="border border-neutral-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-800">
              <th className="p-4 text-left">
                Title
              </th>

              <th className="p-4 text-left">
                Priority
              </th>

              <th className="p-4 text-left">
                Assigned To
            </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task: any) => (
              <tr
                key={task.id}
                className="border-b border-neutral-900"
              >
                <td className="p-4">
                  {task.title}
                </td>

                <td className="p-4">
                <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                    task.priority === "HIGH"
                        ? "bg-red-100 text-red-700"
                        : task.priority === "MEDIUM"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                >
                    {task.priority}
                </span>
                </td>

                <td className="p-4">
                <span
                    className={`px-3 py-1 rounded-full text-sm ${
                    task.assigned_user_name
                        ? "bg-purple-100 text-purple-700"
                        : "bg-neutral-100 text-neutral-500"
                    }`}
                >
                    {task.assigned_user_name || "Unassigned"}
                </span>
                </td>

                <td className="p-4">
                <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                    task.status === "COMPLETED"
                        ? "bg-green-100 text-green-700"
                        : task.status === "IN_PROGRESS"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                >
                    {task.status}
                </span>
                </td>

                <td className="p-4 flex gap-3">
                 <button
                onClick={() => handleEdit(task)}
                className="text-blue-400"
                >
                Edit
                </button>

                <button
                onClick={() => handleDelete(task.id)}
                className="text-red-400"
                >
                Delete
                </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    {isEditOpen && editingTask && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl w-[500px]">
        <h2 className="text-2xl font-bold mb-4">
            Edit Task
        </h2>

        <input
            value={editingTask.title}
            onChange={(e) =>
            setEditingTask({
                ...editingTask,
                title: e.target.value,
            })
            }
            className="w-full border p-3 rounded mb-4"
        />

        <select
            value={editingTask.priority}
            onChange={(e) =>
            setEditingTask({
                ...editingTask,
                priority: e.target.value,
            })
            }
            className="w-full border p-3 rounded mb-4"
        >
            <option>LOW</option>
            <option>MEDIUM</option>
            <option>HIGH</option>
        </select>

        <select
        value={editingTask.assigned_to || ""}
        onChange={(e) =>
            setEditingTask({
            ...editingTask,
            assigned_to: e.target.value,
            })
        }
        className="w-full border p-3 rounded mb-4"
        >
        <option value="">
            Unassigned
        </option>

        {users.map((user) => (
            <option
            key={user.id}
            value={user.id}
            >
            {user.name}
            </option>
        ))}
        </select>

        <select
            value={editingTask.status}
            onChange={(e) =>
            setEditingTask({
                ...editingTask,
                status: e.target.value,
            })
            }
            className="w-full border p-3 rounded mb-4"
        >
            <option>PENDING</option>
            <option>IN_PROGRESS</option>
            <option>COMPLETED</option>
        </select>

        <div className="flex justify-end gap-3">
            <button
            onClick={() => setIsEditOpen(false)}
            className="px-4 py-2 border rounded"
            >
            Cancel
            </button>

            <button
            onClick={saveTask}
            className="px-4 py-2 bg-black text-white rounded"
            >
            Save
            </button>
        </div>
        </div>
    </div>
    )}
    {isCreateOpen && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl w-[500px]">
      <h2 className="text-2xl font-bold mb-4">
        Create Task
      </h2>

      <input
        placeholder="Task Title"
        value={newTask.title}
        onChange={(e) =>
          setNewTask({
            ...newTask,
            title: e.target.value,
          })
        }
        className="w-full border p-3 rounded mb-4"
      />

      <textarea
        placeholder="Description"
        value={newTask.description}
        onChange={(e) =>
          setNewTask({
            ...newTask,
            description: e.target.value,
          })
        }
        className="w-full border p-3 rounded mb-4"
      />

      <select
        value={newTask.priority}
        onChange={(e) =>
          setNewTask({
            ...newTask,
            priority: e.target.value,
          })
        }
        className="w-full border p-3 rounded mb-4"
      >
        <option value="LOW">LOW</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="HIGH">HIGH</option>
      </select>

        <select
        value={newTask.assigned_to}
        onChange={(e) =>
            setNewTask({
            ...newTask,
            assigned_to: e.target.value,
            })
        }
        className="w-full border p-3 rounded mb-4"
        >
        <option value="">
            Unassigned
        </option>

        {users.map((user) => (
            <option
            key={user.id}
            value={user.id}
            >
            {user.name}
            </option>
        ))}
        </select>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => setIsCreateOpen(false)}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>

        <button
          onClick={createTask}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Create
        </button>
      </div>
    </div>
  </div>
)}
    </DashboardLayout>
  );
}