import { NavBar } from "@/components/NavBar";

export default function AdminLayout({ children }) {
    return (
        <section className="bg-slate-300 min-h-screen flex">
            <NavBar />
            <section className="bg-slate-50 flex-grow mt-20 p-3 md:m-4 md:rounded-xl md:p-4">
                {children}
            </section>
        </section>
    );
}
