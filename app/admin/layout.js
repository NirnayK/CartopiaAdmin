import { AdminNav } from "@/components/AdminNav";

export default function AdminLayout({ children }) {
    return (
        <section className="bg-blue-500 min-h-screen flex">
            <AdminNav />
            <section className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4">
                {children}
            </section>
        </section>
    )
}