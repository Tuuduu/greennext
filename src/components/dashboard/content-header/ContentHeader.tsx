import Search from "./Search";

export default function ContentHeader() {
    return (
        <div className="w-full h-auto p-10 bg-gray-50">
            <div className="transition duration-150 ease-in-out w-full flex flex-row items-center justify-between gap-y-6 p-5 bg-white rounded-lg shadow hover:shadow-lg">
                <div>
                    <h1 className="text-md font-bold text-gray-700">Users</h1>
                </div>
                <div>
                    {/* <Search placeholder="11" /> */}
                </div>
            </div>
        </div>
    )
}
