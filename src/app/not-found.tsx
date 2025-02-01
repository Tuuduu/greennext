export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-lg mt-2">Page Not Found</p>
      <a href="/" className="mt-4 px-4 py-2 bg-blue-500 rounded-md">
        Go Home
      </a>
    </div>
  );
}
