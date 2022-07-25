import {useState,React} from "react";
import styles from './slider.module.css';

export default function Slider({ myNegociations }){
    
    const [indexSlider, setIndexSlider] = useState(0);
    const [close, setClose] =useState(false);

    const elements = [
        {
            title:'Sua primeira negociação?',
            img:'/intro.png',
            description:'Saiba o que se tem que fazer.'
        },
        {
            title:'Leia os termos de contrato',
            img:'/terms.png',
            description:'Ao aceitar ou realizar primeira negociação você aceita os termos de uso da nossa aplicação e submete-se aos termos da lei do comsumidor da república de Angola.'
        },
        {
            title:'Siga pessoas que têm conhecimento.',
            img:'/connectpeople.png',
            description:'Na bantu marketpalce você encontra pessoas com conhecimento em startup para lhe ajudar a abrir seu negócio.'
        },
        {
            title:'Negocie aplicativos de seu interesse, e escolha as percentagens de negócio.',
            img:'/apps.png',
            description:'Escolha as suas opções, quanto negociar e prazos de entrega para o negócio em questão.'
        }     
    ];
    
    const onNext = () => {
        if(indexSlider < elements.length -1){
            setIndexSlider(indexSlider + 1);
        }
    }
    const onPreviews = () => {
        if(indexSlider > 0){
            setIndexSlider(indexSlider - 1);
        }
    }
    const Card = ({ imgSrc,title,description,index }) => (
        <div className={styles.card}>
            <img className={styles.img} src={imgSrc} />
            <h3>{title}</h3>
            <p>{description}</p>
            <div className={styles.buttons}>
                {indexSlider != 0 ? <button className={styles.button} type='submit' onClick={onPreviews}>Anterior</button> : <button className={styles.none}></button>}
                {indexSlider !== 3 ? <button className={styles.button} type='submit' onClick={onNext}>Próximo</button> : <button onClick={() => setClose(true)} className={indexSlider == 3 ? styles.buttonRed : styles.none}>{indexSlider == 3 ? 'Finalizar' :''}</button>}
            </div>
        </div>
    )
    return(
        <div className={styles.container}>
            {!close ? <Card 
                            imgSrc={elements[indexSlider].img}
                            title={elements[indexSlider].title}
                            description={elements[indexSlider].description}
                                /> 
                        : ''
            }
        </div>
    );
}
const getServerSideProps = async (context) =>{
    // Getting the array negociations to see if has negociations
    // fi has return to a var call myNegociations
    return {
        props:{
            myNegociations:true
        }
    }
}