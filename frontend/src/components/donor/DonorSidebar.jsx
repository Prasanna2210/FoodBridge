import { NavLink } from "react-router-dom";
import Logo from "../common/Logo";

const DonorSidebar = () => {
    const menuItems = [
        {
            name: "Dashboard",
            path: "/donor",
            icon: "🏠",
        },
        {
            name: "Add Donation",
            path: "/donor/add",
            icon: "➕",
        },
        {
            name: "My Donations",
            path: "/donor/donations",
            icon: "📦",
        },
        {
            name: "Requests",
            path: "/donor/requests",
            icon: "📨",
        },
    ];

    return (
        <aside className="w-72 min-h-screen bg-white shadow-xl border-r">

            <div className="p-6 border-b">
                <Logo />
            </div>

            <nav className="p-4 space-y-2">

                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === "/donor"}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                                ? "bg-emerald-600 text-white shadow"
                                : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                            }`
                        }
                    >
                        <span className="text-xl">{item.icon}</span>
                        <span>{item.name}</span>
                    </NavLink>
                ))}

            </nav>

        </aside>
    );
};

export default DonorSidebar;