import { getWeather } from '@/utils/get-weather'
import styles from '../page.module.css'
export default async function Layout({children}) {
  // const weather = await getWeather(zip)
  return (
    <main className={styles.container}>
      <div style={{padding:"20px"}}>
        {children}
      </div>
    </main>
  )
  // ...
} 