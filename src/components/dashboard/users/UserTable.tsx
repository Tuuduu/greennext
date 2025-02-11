"use client";

import { useEffect, useState } from "react";
import anime from "animejs";
import Search from "../content-header/Search";
import RegisterForm from "@/components/RegisterForm";
import UserActionsModal from "@/components/UserActionsModal";

const UserTable = () => {
  const [users, setUsers] = useState<any[]>([]); // Бүх хэрэглэгчдийн мэдээлэл
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]); // Шүүгдсэн хэрэглэгчид
  const [loading, setLoading] = useState(true); // Ачааллын төлөв
  const [error, setError] = useState<string | null>(null); // Алдааны төлөв
  const [currentPage, setCurrentPage] = useState(1); // Одоогийн хуудас
  const [selectedUser, setSelectedUser] = useState<any | null>(null); // Сонгогдсон хэрэглэгч
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal төлөв
  const pageSize = 10; // Нэг хуудсан дахь элементүүдийн тоо

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

  useEffect(() => {
    fetchData();
  }, []);

  // Animation effect
  useEffect(() => {
    anime({
      targets: "tr",
      translateY: [-10, 0],
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 500,
      delay: anime.stagger(50),
    });
  }, [filteredUsers, currentPage]);

  // Хэрэглэгчдийг хайлтаар шүүх
  const handleSearch = (term: string) => {
    const filtered = users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(term.toLowerCase()) ||
        user.email.toLowerCase().includes(term.toLowerCase()) ||
        user.role?.toLowerCase().includes(term.toLowerCase()) ||
        user.department?.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1); // Шинэ хайлтаар эхний хуудсанд очих
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (userId: string) => {
    if (!userId) return console.error("Хэрэглэгчийн ID олдсонгүй.");

    try {
      const response = await fetch(`/api/users?id=${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Хэрэглэгч амжилттай устгагдлаа.");
        fetchData(); // Хэрэглэгчдийн жагсаалтыг дахин татаж шинэчлэх
      } else {
        const errorData = await response.json();
        console.error("Устгах үед алдаа гарлаа: ", errorData.message);
      }
    } catch (err) {
      console.error("Хэрэглэгч устгах үед алдаа: ", err);
    }
  };

  // Pagination data
  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = filteredUsers.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="transition duration-150 ease-in-out w-full flex flex-col gap-y-6 p-4 md:p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg">
        {/* Ачаалж байна эсвэл алдаа харуулах */}
        {loading && (
          <p className="text-gray-700 dark:text-gray-300">Ачаалж байна...</p>
        )}
        {error && <p className="text-red-500">Алдаа: {error}</p>}

        {!loading && !error && (
          <>
            {/* Хайх хэсэг */}
            <div className="w-full flex justify-between items-center mb-4">
              <Search
                placeholder="Хэрэглэгч хайх..."
                onSearch={(term: string) => handleSearch(term)}
              />
              <RegisterForm
                buttonName={"Хэрэглэгч нэмэх"}
                onRegisterSuccess={fetchData}
              />
            </div>

            {/* Хэрэглэгчдийн хүснэгт */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse divide-y divide-gray-200 dark:divide-gray-700 text-[12px] 2xl:text-base">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="text-gray-700 dark:text-gray-300 px-2 md:px-4 py-2 text-left">
                      №
                    </th>
                    <th className="text-gray-700 dark:text-gray-300 px-2 md:px-4 py-2 text-left">
                      Нэр
                    </th>
                    <th className="text-gray-700 dark:text-gray-300 px-2 md:px-4 py-2 text-left">
                      Имэйл
                    </th>
                    <th className="text-gray-700 dark:text-gray-300 px-2 md:px-4 py-2 text-left">
                      Алба
                    </th>
                    <th className="text-gray-700 dark:text-gray-300 px-2 md:px-4 py-2 text-left">
                      Албан тушаал
                    </th>
                    <th className="text-gray-700 dark:text-gray-300 px-2 md:px-4 py-2 text-center">
                      Үйлдэл
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {currentData.map((user: any, index: number) => (
                    <tr
                      key={user._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-2 md:px-4 py-4 text-gray-700 dark:text-gray-300">
                        {startIndex + index + 1}
                      </td>
                      <td className="px-2 md:px-4 py-4 text-gray-700 dark:text-gray-300">
                        {user.firstName}
                      </td>
                      <td className="px-2 md:px-4 py-4 text-gray-700 dark:text-gray-300">
                        {user.email}
                      </td>
                      <td className="px-2 md:px-4 py-4 text-gray-700 dark:text-gray-300">
                        {user.department}
                      </td>
                      <td className="px-2 md:px-4 py-4 text-gray-700 dark:text-gray-300">
                        {user.employment || "Хуучин хэрэглэгч"}
                      </td>
                      <td className="px-2 md:px-4 py-4 text-center text-gray-700 dark:text-gray-300">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                        >
                          Засах
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 border rounded-l-lg ${
                    currentPage === 1
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  Өмнөх
                </button>
                <span className="px-4 py-2 border bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 border rounded-r-lg ${
                    currentPage === totalPages
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  Дараах
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Засварлах болон устгах Modal */}
      {isModalOpen && selectedUser && (
        <UserActionsModal
          user={selectedUser}
          onClose={() => setIsModalOpen(false)}
          onSaveSuccess={fetchData}
        />
      )}
    </div>
  );
};

export default UserTable;
