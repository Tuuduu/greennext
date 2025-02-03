export default function NotFound() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
      <div className="w-full max-w-lg bg-white/50 dark:bg-gray-800 dark:text-white backdrop-blur-lg shadow-lg p-8 rounded-3xl border border-gray-300 dark:border-gray-700 text-center">
        <h1 className="text-4xl font-bold text-gray-700 dark:text-gray-300">
          404
        </h1>
        <p className="text-lg mt-2 text-gray-700 dark:text-gray-300">
          Page Not Found
        </p>
        <a
          href="/"
          className="mt-4 inline-block rounded-lg bg-green-500 py-2.5 px-4 text-sm font-medium text-white transition-transform hover:scale-105 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300"
        >
          Буцах
        </a>
      </div>
    </div>
  );
}
