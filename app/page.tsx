// app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-12 bg-gradient-to-br from-blue-100 via-white to-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-5xl font-extrabold mb-6 text-blue-700">Gestor de Tareas</h1>
        <p className="text-gray-600 mb-8">Organiza tus tareas de manera eficiente y sencilla.</p>
        <div className="flex gap-4">
          <Link 
            href="/login" 
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
          >
            Iniciar Sesión
          </Link>
          <Link 
            href="/register" 
            className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-700 text-white rounded-lg hover:from-gray-600 hover:to-gray-800 transition-all shadow-lg hover:shadow-xl"
          >
            Registrarse
          </Link>
        </div>
      </div>
    </main>
  );
}