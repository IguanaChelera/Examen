import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/authOptions";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import NewTaskForm from './NewTaskForm';
import TaskItem from './TaskItem';

const prisma = new PrismaClient();

export default async function Dashboard() {
    const session = await getServerSession(authOptions);
    console.log('[DASHBOARD] session:', session);
    // Redirige si no hay sesión
    if (!session?.user?.email) {
        redirect('/login');
    }

    // Obtiene las tareas del usuario
    const tasks = await prisma.task.findMany({
        where: { 
            user: { 
                email: session.user.email 
            } 
        }
    });

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Panel de Control</h1>
            <NewTaskForm />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tasks.map((t: { id: number; title: string }) => (
                    <div key={t.id} className="p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                        <TaskItem id={t.id} title={t.title} />
                    </div>
                ))}
            </div>
        </div>
    );
}