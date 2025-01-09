"use client";

import { useEffect, useState } from "react";

const UserTable = () => {
  const [users, setUsers] = useState<any[]>([]); // Бүх хэрэглэгчдийн мэдээлэл
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]); // Шүүгдсэн хэрэглэгчид
  const [loading, setLoading] = useState(true); // Ачааллын төлөв
  const [error, setError] = useState<string | null>(null); // Алдааны төлөв

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP алдаа: ${response.status}`);
        }

        const result = await response.json();
        if (result && result.data) {
          setUsers(result.data); // Зөвхөн өгөгдлийг тохируулах
          setFilteredUsers(result.data);
        } else {
          setUsers([]);
          setFilteredUsers([]);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log("users dataa  ---> ", users);
  // Хэрэглэгчдийг хайлтаар шүүх
  const handleSearch = (term: string) => {
    const filtered = users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(term.toLowerCase()) ||
        user.email.toLowerCase().includes(term.toLowerCase()) ||
        user.role.toLowerCase().includes(term.toLowerCase()) ||
        user.department.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className="w-full h-full px-6 bg-gray-50">
      <div className="transition duration-150 ease-in-out w-full flex flex-col gap-y-6 p-6 bg-white rounded-lg shadow hover:shadow-lg">
        {/* Ачаалж байна эсвэл алдаа харуулах */}
        {loading && <p className="text-gray-700">Ачаалж байна...</p>}
        {error && <p className="text-red-500">Алдаа: {error}</p>}

        {!loading && !error && (
          <>
            {/* Хайх хэсэг */}
            <div className="w-full flex justify-between items-center mb-4">
              <input
                type="text"
                placeholder="Хэрэглэгчийн хайлт..."
                onChange={(e) => handleSearch(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Хэрэглэгчдийн хүснэгт */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-gray-700 px-4 py-2 text-left">№</th>
                    <th className="text-gray-700 px-4 py-2 text-left">Нэр</th>
                    <th className="text-gray-700 px-4 py-2 text-left">Имэйл</th>
                    <th className="text-gray-700 px-4 py-2 text-left">
                      Компани
                    </th>
                    <th className="text-gray-700 px-4 py-2 text-left">Алба</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((user: any, index: number) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 text-gray-700">{index + 1}</td>
                      <td className="px-4 py-4 text-gray-700">
                        {user.firstName}
                      </td>
                      <td className="px-4 py-4 text-gray-700">{user.email}</td>
                      <td className="px-4 py-4 text-gray-700">
                        {user.department}
                      </td>
                      <td className="px-4 py-4 text-gray-700">
                        {user.workingPart}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserTable;
