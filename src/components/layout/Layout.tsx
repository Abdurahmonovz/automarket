
import Sidebar from './Sidebar'
import Header from './Header'
import Main from './Main'

export default function Layout() {
  return (
    <div className='w-full bg-(--text-bg) text-(--text-base) flex'>
    <Sidebar/>
    <main className=' w-full '>
      <Header/>
      <Main/>
    </main>
   </div>
  )
}
