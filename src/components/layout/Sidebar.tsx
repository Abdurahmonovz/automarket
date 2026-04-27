
import logo from '../../assets/svg/logo.svg'
import { NavLink } from 'react-router-dom'
import { privateRoutes } from '../../utils/navigate'
import { useUser } from '../../context/UserContext'
import { LogOut } from 'lucide-react'
export default function Sidebar() {
    const { user,logout } = useUser()
    return (
        <div className='h-screen w-[270px] min-w-[270px] bg-(--text-white)  shadow-sm flex flex-col justify-between pb-5 gap-5'  >
            <div>
                <div className='h-20 flex items-center px-5 w-full'>

                    <img src={logo} alt='AUTO MARKET LOGO' />

                </div>
                <ul className='mt-10 px-5 flex flex-col gap-5'>
                    {
                        privateRoutes?.map(item => {
                            const Icon = item?.icon
                            return item?.roles.some((el) => el == user?.role) && (
                                <li key={item.path}>
                                    <NavLink to={item.path} className="text-xl  flex items-center gap-2 p-3  text-(--text-base)  rounded-xl">
                                        <Icon size={20} />
                                        <span>{item?.title}</span>
                                    </NavLink>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div  className=' px-5 text-white' onClick={logout}>
                <div className='flex items-center gap-2 bg-red-400 p-[10px_20px] rounded hover:opacity-55'>
                    <LogOut />
                    <span>Log out</span>
                </div>
            </div>
        </div>
    )
}
