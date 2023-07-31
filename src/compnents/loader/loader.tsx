import styles from './loader.module.css'
import utils from '../../../styles/utils.module.css'

export default function Loader() {
    return (
        <div className={utils.boxWithShadow+" "+styles.container}>
            <h1 className={styles.title}>Uploading</h1>
            <div className={styles.loadingBar}>
                <div className={styles.cursor}></div>
            </div>
        </div>
    )
}