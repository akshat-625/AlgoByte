export default function Contact() {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Contact Us</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Have a suggestion, feedback, or query? We’d love to hear from you!
      </p>
      <a
        href="mailto:ajhawar770@gmail.com"
        className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
      >
        ajhawar770@gmail.com
      </a>
    </div>
  );
}
