import Profile from "./Profile";
import Menu from "./Menu";
import SignoutButton from "./SignoutButton";

const Sidebar = () => {

    return (
        <div className="w-[400px] h-screen flex flex-col items-center justify-between bg-[f4f7f6] shadow-xl">
            <div className="w-full flex flex-col gap-y-10 pt-10">
                <Profile />
                <Menu />
            </div>
            <SignoutButton />
        </div>
    )
}
export default Sidebar;
