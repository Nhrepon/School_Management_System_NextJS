import { usePathname } from "next/navigation"

export default function MainLayout({children}){
    const path = usePathname();
    const isDashboard = path.includes('/dashboard');
    return (
        <>
            {!isDashboard && <NavigationBar />}
            <main className="flex-grow">
            {children}
            </main>
            {!isDashboard && <Footer />}
        </>
    )
}