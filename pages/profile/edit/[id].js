import axios from 'axios';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import styles from './edit.module.css';
import swal from 'sweetalert';

export default function EditPreofile(){
      const [href,setHref] = useState();
      const [fullName,setFullName] = useState();
      const [province,setProvince] = useState();
      const [description,setDesc] = useState();
      const [phone,setPhone] = useState();
      const [myId,setId] = useState();

      useEffect(()=> setId(sessionStorage.getItem('tokenId')),[]);

      const router = useRouter();
      const id = router.query.id;

      const onSave = async (e) => {
            e.preventDefault();
            if(href&&fullName&&province&&description&&phone&&myId){
                  const formData = new FormData();

                  formData.append('file',href);
                  formData.append('fullName',fullName);
                  formData.append('province',province);
                  formData.append('description',description);
                  formData.append('phone',phone);
                  formData.append('_id',id);

                  const result = await axios.put('/api/account/create',formData);
                  if(result){
                        swal({
                              title:'Sucesso!',
                              text:`Alterado com sucesso, redirecionando...`,
                              icon:'success',
                              warning:false,
                        });
                        setTimeout(() => router.push('/profile/'+myId), 5000);
                  } 
                  
            }else {
                  swal({
                        title:'Algum erro ocorreu!',
                        text:`Todos os campos devem estar preenchidos 
                        Use um número de telefone AO
                        Use uma foto do tamanho 1024*1024`,
                        icon:'warning',
                        button:'Tentar de novo',
                        warning:true,
                  });
            }
      }
      const onLoad = (e) => {
            setHref(e.target.files[0]);
      }
      
      return (
            <div className={styles.container}>
                  <input type='file' onChange={onLoad} placeholder='foto' />
                  <input type='text' onChange={e => setFullName(e.target.value)} placeholder='Full name' />
                  <input type='text' onChange={e => setPhone(e.target.value)} placeholder='Telefone' /> 
                  <input type='text' onChange={e => setProvince(e.target.value)} placeholder='Província' /> 
                  <input type='text' onChange={e => setDesc(e.target.value)} placeholder='Descrição' />
                  <div>
                        <button onClick={onSave}>Salvar</button>
                  </div> 
            </div>
      );
}