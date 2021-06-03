import Image from 'next/image'
import styles from './image.module.css'

export default function ImageComponent ({width, height, icon}){
    return(
        <div className={styles.borderImage}>
            <Image 
                width={width} 
                height={height} 
                src='/favicon.ico' 
                className={styles.image}
            />
        </div>
    );
}