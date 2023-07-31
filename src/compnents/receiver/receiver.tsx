import { useState } from 'react'
import styles from './receiver.module.css'
import utils from '../../../styles/utils.module.css'

interface IProps {
    filename: string
}

export default function Receiver({ filename }: IProps) {
    const [isLinkCopied, setIsLinkCopied] = useState<boolean>(false)

    const getUrl = (file: string): string => {
        const IS_SERVER = typeof window === "undefined"
        const baseUrl = IS_SERVER ? process.env.NEXT_PUBLIC_SITE_URL : window.location.origin

        return new URL("images/"+file, baseUrl).toString()
    }

    const copyLink = async () => {
        await navigator.clipboard.writeText(getUrl(filename))
        setIsLinkCopied(true)
    }

    return (
        <div className={utils.boxWithShadow+" "+styles.container}>
            <div className={styles.header}>
                <div className={styles.iconGroup}>
                    <svg className={styles.icon}  width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                    </svg>
                </div>
                <h1 className={styles.title}>Uploaded Successfully!</h1>
            </div>
            <div className={styles.previewer}>
                <img
                    className={styles.previewImage}
                    src={getUrl(filename)}
                    alt=""
                />
            </div>
            <div className={styles.sharer}>
                <input className={styles.iptLink} type="text" value={getUrl(filename)} />
                <button className={isLinkCopied ? utils.btn + " " + styles.btnShare + " " + styles.btnShareClicked : utils.btn + " " + styles.btnShare} onClick={copyLink}>
                    { isLinkCopied ? "copied !" : "copy link"}
                </button>
            </div>
        </div>
    )    
}