import {useState,useEffect} from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import swl from 'sweetalert';
import styles from './create.module.css'

export default function Create(){
    const router = useRouter();
    const [name,setName] = useState('');
    const [fullName,setFullName] = useState('');
    const [province,setProvince] = useState('');
    const [description,setDescription] = useState('');
    const [password,setPass] = useState('')
    const [confirmPass,setConfirmPass] = useState('');
    const [phone,setPhone] = useState('');
    const [href, setHref] = useState('');

    const loadImage = (e) => {
        setHref(e.target.files[0]);
    }

    const onCreateAccount = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file',href);
        formData.append('name',name);
        formData.append('fullName',fullName);
        formData.append('province',province);
        formData.append('description',description);
        formData.append('password',password);
        formData.append('phone',phone);
       
        // formData.forEach(file => console.log(file));

        if(password === confirmPass && href && name && fullName && province && description && phone){
            const result = await axios.post('/api/account/create',
                formData
            );
            
            const { tokenId } = result.data;
            if(tokenId){
                sessionStorage.setItem('tokenId',tokenId);
                swl({
                    title:'Sucesso',
                    text:`Conta criada com sucesso`,
                    icon:'success'
                });
            // router.push(`/profile/${tokenId}`)
            setTimeout(() => router.push('/account/login') ,2000); 

        }else{
            swl({
                title:'Algum erro aconteceu',
                text:`1- As palavras passes devem ser iguais. 
                2- Carrega uma imagem de tamnho 1080 x 1080
                3- Nenhum campo deve estar vazio`,
                icon:'error'
            });
           
        }
            
        }
    }
    
    return(
        <div className={styles.container}>

            <div className={styles.createaccount}>
                <img src='/createaccount.png'/>
            </div>
            
                <div className={styles.formdata}>
                    <h2>Crie uma conta para para descubrir aplicativos e divulgar os seus</h2>
                    <img 
                        src={href === '' ? '/camera.png' : href }  className={styles.imageContainer}
                    />
                    <div className={styles.myForm}>
                        
                            <input 
                                className={styles.upload}
                                type='file' 
                                name='file'
                                onChange={loadImage}
                            />
                       
                            <input 
                                type='text' 
                                name='fullname'
                                placeholder='Primeiro e último nome'
                                onChange={e => setFullName(e.target.value)}
                            />
                            <input 
                                type='text' 
                                name='username'
                                placeholder='Nome de usuário'
                                onChange={e => setName(e.target.value)}
                            />

                            <input 
                                type='text' 
                                name='province'
                                placeholder='Província'
                                onChange={e => setProvince(e.target.value)}
                            />
                            <input 
                                type='tel' 
                                name='telefone'
                                placeholder='Telefone'
                                onChange={e => setPhone(e.target.value)}
                            />
                            <input 
                                type='password' 
                                name='password'
                                placeholder='Palavra passe'
                                onChange={e => setPass(e.target.value)}
                            />
                            <input 
                                type='password' 
                                name='confirmpassword' 
                                placeholder='Confirmar palavra passe'
                                onChange={e => setConfirmPass(e.target.value)}
                            />
                            <input 
                                type='textarea' 
                                name='description'
                                placeholder='descrição sobre você' 
                                onChange={e => setDescription(e.target.value)}
                            />
                            <button onClick={onCreateAccount}>Criar conta</button>
                        
                    </div>
                </div>
        </div>
       

    )
}
