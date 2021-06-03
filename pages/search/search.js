import styles from '../../styles/search.module.css'

export default function Search(){  
    
    const onSearch = () =>{
        console.log('Nothen')
    }
    
    return(
        <div className={styles.searchContainer}>
                <input 
                    className={styles.search}
                    type='text' placeholder='Search'
                    onChange={e => setSearch(e.target.value)}
                /> 
            <button onClick={onSearch} className={styles.button}>Buscar</button>
        </div>
    )
}